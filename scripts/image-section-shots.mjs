import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.BASE ?? "http://localhost:3210";
const OUT = path.resolve("screenshots/sections");
await mkdir(OUT, { recursive: true });

const SHOTS = [
  // Home — sections with new images
  { name: "home-problem", url: "/", viewport: { width: 1440, height: 900 }, selector: "section:has(.chapter-num):has-text('Problem')" },
  { name: "home-craftbalance", url: "/", viewport: { width: 1440, height: 900 }, selector: "section:has-text('Our Approach')" },
  { name: "home-process", url: "/", viewport: { width: 1440, height: 1100 }, selector: "section:has(.chapter-num):has-text('Process')" },
  { name: "home-drasil", url: "/", viewport: { width: 1440, height: 900 }, selector: "#drasil" },

  // About — 4 chapter bleeds
  { name: "about-ch01-reality", url: "/about", viewport: { width: 1440, height: 900 }, selector: "article:has-text('Reality')" },
  { name: "about-ch02-whyai", url: "/about", viewport: { width: 1440, height: 900 }, selector: "article:has-text('Why AI')" },
  { name: "about-ch03-arrival", url: "/about", viewport: { width: 1440, height: 900 }, selector: "article:has-text('Arrival')" },
  { name: "about-ch04-vision", url: "/about", viewport: { width: 1440, height: 900 }, selector: "article:has-text('Vision')" },

  // Mobile — same sections
  { name: "home-problem-mob", url: "/", viewport: { width: 390, height: 844 }, selector: "section:has(.chapter-num):has-text('Problem')" },
  { name: "home-craftbalance-mob", url: "/", viewport: { width: 390, height: 844 }, selector: "section:has-text('Our Approach')" },
  { name: "home-process-mob", url: "/", viewport: { width: 390, height: 844 }, selector: "section:has(.chapter-num):has-text('Process')" },
  { name: "home-drasil-mob", url: "/", viewport: { width: 390, height: 844 }, selector: "#drasil" },
  { name: "about-ch02-mob", url: "/about", viewport: { width: 390, height: 844 }, selector: "article:has-text('Why AI')" },
  { name: "about-ch04-mob", url: "/about", viewport: { width: 390, height: 844 }, selector: "article:has-text('Vision')" },
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

  // Scroll fully to trigger lazy/reveal animations, then back to top
  const docHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const step = Math.max(300, Math.floor(shot.viewport.height * 0.7));
  for (let y = 0; y < docHeight; y += step) {
    await page.evaluate((y0) => window.scrollTo(0, y0), y);
    await page.waitForTimeout(60);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);

  try {
    const el = await page.locator(shot.selector).first();
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await el.screenshot({ path: path.join(OUT, `${shot.name}.png`) });
    console.log(`captured ${shot.name}`);
  } catch (e) {
    console.warn(`FAILED ${shot.name}:`, e.message);
  }
  await ctx.close();
}

await browser.close();
console.log(`done → ${OUT}`);
