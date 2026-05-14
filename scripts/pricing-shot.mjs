import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const OUT_DIR = path.resolve("screenshots");
const VP = { width: 1440, height: 900 };

await mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ??
    "/home/dendo/.cache/ms-playwright/chromium-1208/chrome-linux64/chrome",
});

const TARGETS = [
  {
    name: "top-price",
    url: `${BASE}/`,
    locate: () => {
      const els = Array.from(document.querySelectorAll("p"));
      const t = els.find((e) => e.textContent?.includes("04 / Price"));
      if (!t) return null;
      let n = t;
      while (n && n.tagName !== "SECTION") n = n.parentElement;
      if (!n) return null;
      const r = n.getBoundingClientRect();
      return { top: r.top + window.scrollY, height: Math.ceil(r.height) };
    },
  },
  {
    name: "works-partner",
    url: `${BASE}/works`,
    locate: () => {
      const els = Array.from(document.querySelectorAll("h2"));
      const t = els.find((e) => e.textContent?.includes("第1期パートナーとして"));
      if (!t) return null;
      let n = t;
      while (n && n.tagName !== "SECTION") n = n.parentElement;
      if (!n) return null;
      const r = n.getBoundingClientRect();
      return { top: r.top + window.scrollY, height: Math.ceil(r.height) };
    },
  },
  {
    name: "commerce-price-block",
    url: `${BASE}/legal/commerce`,
    locate: () => {
      const dts = Array.from(document.querySelectorAll("dt"));
      const t = dts.find((e) => e.textContent?.includes("販売価格"));
      if (!t) return null;
      const row = t.parentElement;
      if (!row) return null;
      const r = row.getBoundingClientRect();
      return { top: r.top + window.scrollY, height: Math.ceil(r.height) };
    },
  },
];

for (const t of TARGETS) {
  const ctx = await browser.newContext({
    viewport: VP,
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  await page.setExtraHTTPHeaders({ "Cache-Control": "no-cache, no-store" });
  await ctx.clearCookies();
  await page.goto(`${t.url}?t=${Date.now()}`, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
  });

  const docHeight = await page.evaluate(
    () => document.documentElement.scrollHeight,
  );
  for (let y = 0; y <= docHeight; y += 600) {
    await page.evaluate((yy) => window.scrollTo({ top: yy, behavior: "instant" }), y);
    await page.waitForTimeout(140);
  }
  await page.waitForTimeout(500);

  const found = await page.evaluate(t.locate);
  if (!found) {
    console.warn("Not found:", t.name);
    await ctx.close();
    continue;
  }
  const pad = 40;
  await page.evaluate(
    (y) => window.scrollTo({ top: y, behavior: "instant" }),
    Math.max(found.top - pad, 0),
  );
  await page.waitForTimeout(800);

  const captureH = Math.min(found.height + pad * 2, VP.height * 4);
  await page.setViewportSize({ width: VP.width, height: captureH });
  await page.waitForTimeout(300);

  await page.screenshot({
    path: path.join(OUT_DIR, `${t.name}.png`),
    clip: { x: 0, y: 0, width: VP.width, height: captureH },
  });
  console.log("Saved", t.name, "h=" + captureH);
  await ctx.close();
}

await browser.close();
