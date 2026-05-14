import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = "http://localhost:3000";
const OUT = path.resolve("screenshots");
await mkdir(OUT, { recursive: true });

const SHOTS = [
  { name: "home-desktop-hero", url: "/", viewport: { width: 1440, height: 900 }, fullPage: false },
  { name: "home-desktop", url: "/", viewport: { width: 1440, height: 900 }, fullPage: true },
  { name: "home-mobile", url: "/", viewport: { width: 390, height: 844 }, fullPage: true },
  { name: "about-desktop", url: "/about", viewport: { width: 1440, height: 900 }, fullPage: true },
  { name: "about-mobile", url: "/about", viewport: { width: 390, height: 844 }, fullPage: true },
  { name: "contact-desktop", url: "/contact", viewport: { width: 1440, height: 900 }, fullPage: true },
  { name: "commerce-desktop", url: "/legal/commerce", viewport: { width: 1440, height: 900 }, fullPage: true },
];

const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ??
    "/home/dendo/.cache/ms-playwright/chromium-1208/chrome-linux64/chrome",
});

for (const shot of SHOTS) {
  const ctx = await browser.newContext({
    viewport: shot.viewport,
    deviceScaleFactor: 2,
    locale: "ja-JP",
    timezoneId: "Asia/Tokyo",
  });
  const page = await ctx.newPage();
  await page.goto(`${BASE}${shot.url}`, { waitUntil: "networkidle", timeout: 60_000 });
  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
  });
  await page.waitForTimeout(600);

  if (shot.fullPage) {
    const docHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    const step = Math.max(300, Math.floor(shot.viewport.height * 0.7));
    for (let y = 0; y < docHeight; y += step) {
      await page.evaluate((y0) => window.scrollTo(0, y0), y);
      await page.waitForTimeout(80);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);
  }

  await page.screenshot({
    path: path.join(OUT, `${shot.name}.png`),
    fullPage: shot.fullPage,
  });
  console.log(`captured ${shot.name}`);
  await ctx.close();
}

await browser.close();
console.log(`done → ${OUT}`);
