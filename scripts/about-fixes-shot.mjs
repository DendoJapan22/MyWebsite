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
const context = await browser.newContext({
  viewport: VP,
  deviceScaleFactor: 2,
});
const page = await context.newPage();
await page.setExtraHTTPHeaders({ "Cache-Control": "no-cache, no-store" });
await context.clearCookies();

await page.goto(`${BASE}/about?t=${Date.now()}`, { waitUntil: "networkidle" });
await page.evaluate(async () => {
  if (document.fonts && document.fonts.ready) await document.fonts.ready;
});

const docHeight = await page.evaluate(
  () => document.documentElement.scrollHeight,
);
for (let y = 0; y <= docHeight; y += 600) {
  await page.evaluate(
    (yy) => window.scrollTo({ top: yy, behavior: "instant" }),
    y,
  );
  await page.waitForTimeout(160);
}
await page.waitForTimeout(800);

const targets = [
  {
    name: "reality-overlay",
    locate: () => {
      const ps = Array.from(document.querySelectorAll("p"));
      const t = ps.find((p) => p.textContent?.includes("02 — Reality"));
      if (!t) return null;
      let n = t;
      while (n && n.tagName !== "ARTICLE") n = n.parentElement;
      if (!n) return null;
      const r = n.getBoundingClientRect();
      return { top: r.top + window.scrollY, height: Math.ceil(r.height) };
    },
    pad: 60,
  },
  {
    name: "signature-compact",
    locate: () => {
      const ps = Array.from(document.querySelectorAll("p"));
      const t = ps.find((p) => p.textContent?.includes("— Signature"));
      if (!t) return null;
      let n = t;
      while (n && n.tagName !== "SECTION") n = n.parentElement;
      if (!n) return null;
      const r = n.getBoundingClientRect();
      return { top: r.top + window.scrollY, height: Math.ceil(r.height) };
    },
    pad: 40,
  },
];

for (const t of targets) {
  const found = await page.evaluate(t.locate);
  if (!found) {
    console.warn("Not found:", t.name);
    continue;
  }
  await page.evaluate(
    (y) => window.scrollTo({ top: y, behavior: "instant" }),
    Math.max(found.top - t.pad, 0),
  );
  await page.waitForTimeout(900);

  const captureH = Math.min(found.height + t.pad * 2, VP.height * 4);
  await page.setViewportSize({ width: VP.width, height: captureH });
  await page.waitForTimeout(300);

  await page.screenshot({
    path: path.join(OUT_DIR, `${t.name}.png`),
    clip: { x: 0, y: 0, width: VP.width, height: captureH },
  });
  console.log("Saved", t.name, "h=" + captureH);
}

await browser.close();
