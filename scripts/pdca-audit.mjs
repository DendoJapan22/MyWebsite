// PDCA audit: take desktop + mobile screenshots of each page,
// capture viewport-sized hero shots, full-page shots, and key sections.
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const ROUND = process.env.ROUND ?? "1";
const OUT_DIR = path.resolve(`screenshots/pdca-r${ROUND}`);

await mkdir(OUT_DIR, { recursive: true });

const PAGES = [
  { name: "home", url: `${BASE}/` },
  { name: "works", url: `${BASE}/works` },
  { name: "about", url: `${BASE}/about` },
  { name: "contact", url: `${BASE}/contact` },
  { name: "commerce", url: `${BASE}/legal/commerce` },
];

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ??
    "/home/dendo/.cache/ms-playwright/chromium-1208/chrome-linux64/chrome",
});

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 2,
    locale: "ja-JP",
    timezoneId: "Asia/Tokyo",
  });
  const page = await context.newPage();

  for (const target of PAGES) {
    try {
      await page.goto(target.url, { waitUntil: "networkidle", timeout: 60_000 });
    } catch (e) {
      console.warn(`navigation issue on ${target.url}: ${e.message}`);
    }
    await page.evaluate(async () => {
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }
    });
    await page.waitForTimeout(700);

    // Above-the-fold (viewport-only)
    await page.screenshot({
      path: path.join(OUT_DIR, `${target.name}-${vp.name}-hero.png`),
      fullPage: false,
    });

    // Scroll through to trigger Reveal animations
    const docHeight = await page.evaluate(
      () => document.documentElement.scrollHeight,
    );
    const step = Math.max(300, Math.floor(vp.height * 0.7));
    for (let y = 0; y < docHeight; y += step) {
      await page.evaluate((y0) => window.scrollTo(0, y0), y);
      await page.waitForTimeout(80);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);

    // Full page
    await page.screenshot({
      path: path.join(OUT_DIR, `${target.name}-${vp.name}-full.png`),
      fullPage: true,
    });
    console.log(`captured ${target.name} ${vp.name}`);
  }

  await context.close();
}

await browser.close();
console.log(`done → ${OUT_DIR}`);
