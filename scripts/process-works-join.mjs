import { chromium } from "playwright";
import path from "node:path";

const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ??
    "/home/dendo/.cache/ms-playwright/chromium-1208/chrome-linux64/chrome",
});
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();
await page.goto("http://localhost:3000/?t=" + Date.now(), {
  waitUntil: "networkidle",
});
await page.evaluate(async () => {
  if (document.fonts?.ready) await document.fonts.ready;
});
const docHeight = await page.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y <= docHeight; y += 600) {
  await page.evaluate(yy => window.scrollTo({ top: yy, behavior: "instant" }), y);
  await page.waitForTimeout(140);
}
await page.waitForTimeout(400);

// Find the 07 / Works heading and capture the area just above + just below it
const found = await page.evaluate(() => {
  const ps = Array.from(document.querySelectorAll("p"));
  const t = ps.find(p => p.textContent?.trim() === "07 / Works");
  if (!t) return null;
  const r = t.getBoundingClientRect();
  return { y: r.top + window.scrollY };
});
if (!found) { console.warn("not found"); process.exit(1); }

const startY = Math.max(found.y - 580, 0);
await page.evaluate(
  (y) => window.scrollTo({ top: y, behavior: "instant" }),
  startY,
);
await page.waitForTimeout(700);
await page.setViewportSize({ width: 1440, height: 800 });
await page.waitForTimeout(300);
await page.screenshot({
  path: path.resolve("screenshots/redesign/process-works-zoom.png"),
  clip: { x: 0, y: 0, width: 1440, height: 800 },
});
console.log("Saved");
await ctx.close();
await browser.close();
