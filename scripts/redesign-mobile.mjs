import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const OUT_DIR = path.resolve("screenshots/redesign-mobile");
const VP = { width: 390, height: 844 };

await mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ??
    "/home/dendo/.cache/ms-playwright/chromium-1208/chrome-linux64/chrome",
});

const ctx = await browser.newContext({
  viewport: VP,
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
const page = await ctx.newPage();
await page.goto(`${BASE}/?t=${Date.now()}`, { waitUntil: "networkidle" });
await page.evaluate(async () => {
  if (document.fonts?.ready) await document.fonts.ready;
});

const docHeight = await page.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y <= docHeight; y += 600) {
  await page.evaluate(yy => window.scrollTo({ top: yy, behavior: "instant" }), y);
  await page.waitForTimeout(140);
}
await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
await page.waitForTimeout(500);

await page.screenshot({
  path: path.join(OUT_DIR, "homepage-mobile.png"),
  fullPage: true,
});

console.log("Saved mobile fullpage");
await browser.close();
