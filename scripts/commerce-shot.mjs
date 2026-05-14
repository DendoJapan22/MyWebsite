import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const OUT_DIR = path.resolve("screenshots");

await mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ??
    "/home/dendo/.cache/ms-playwright/chromium-1208/chrome-linux64/chrome",
});

const TARGETS = [
  { name: "commerce-desktop", url: `${BASE}/legal/commerce`, w: 1440, h: 900 },
  { name: "commerce-mobile", url: `${BASE}/legal/commerce`, w: 390, h: 844 },
  // Capture footer with legal link visible (use top page; full-page would be too large, so scroll to bottom)
  { name: "footer-with-legal", url: `${BASE}/`, w: 1440, h: 900, scrollToFooter: true },
];

for (const t of TARGETS) {
  const ctx = await browser.newContext({
    viewport: { width: t.w, height: t.h },
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
  await page.waitForTimeout(600);

  if (t.scrollToFooter) {
    const found = await page.evaluate(() => {
      const f = document.querySelector("footer");
      if (!f) return null;
      const r = f.getBoundingClientRect();
      return { top: r.top + window.scrollY, height: Math.ceil(r.height) };
    });
    if (found) {
      await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), Math.max(found.top - 20, 0));
      await page.waitForTimeout(800);
      const captureH = Math.min(found.height + 40, t.h * 4);
      await page.setViewportSize({ width: t.w, height: captureH });
      await page.waitForTimeout(300);
      await page.screenshot({
        path: path.join(OUT_DIR, `${t.name}.png`),
        clip: { x: 0, y: 0, width: t.w, height: captureH },
      });
      console.log("Saved", t.name, "h=" + captureH);
    }
  } else {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForTimeout(400);
    await page.screenshot({
      path: path.join(OUT_DIR, `${t.name}.png`),
      fullPage: true,
    });
    console.log("Saved", t.name);
  }
  await ctx.close();
}

await browser.close();
