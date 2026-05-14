// Capture viewport-sized scroll snapshots of the home page so we can see
// individual sections clearly (full-page screenshots are heavily compressed).
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const ROUND = process.env.ROUND ?? "1";
const OUT_DIR = path.resolve(`screenshots/pdca-r${ROUND}-sections`);
await mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ??
    "/home/dendo/.cache/ms-playwright/chromium-1208/chrome-linux64/chrome",
});

const captureFor = async (viewport, label) => {
  const ctx = await browser.newContext({
    viewport,
    deviceScaleFactor: 2,
    locale: "ja-JP",
  });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
  });
  await page.waitForTimeout(600);

  const docHeight = await page.evaluate(
    () => document.documentElement.scrollHeight,
  );
  let n = 0;
  for (let y = 0; y < docHeight; y += viewport.height) {
    await page.evaluate((y0) => window.scrollTo(0, y0), y);
    await page.waitForTimeout(450);
    await page.screenshot({
      path: path.join(OUT_DIR, `${label}-scroll-${String(n).padStart(2, "0")}.png`),
      fullPage: false,
    });
    n += 1;
  }
  console.log(`${label}: ${n} shots`);
  await ctx.close();
};

await captureFor({ width: 1440, height: 900 }, "desktop");
await captureFor({ width: 390, height: 844 }, "mobile");

await browser.close();
console.log(`done → ${OUT_DIR}`);
