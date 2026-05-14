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

// Anchor on "Phase 01" so we capture the steps + bottom of process + top of works
const found = await page.evaluate(() => {
  const spans = Array.from(document.querySelectorAll("span"));
  const t = spans.find(s => s.textContent?.trim() === "Phase 01");
  if (!t) return null;
  // capture from this span's top down to the works thumbnails area
  const r = t.getBoundingClientRect();
  return { top: r.top + window.scrollY - 40, height: 1100 };
});
if (!found) { console.warn("not found"); process.exit(1); }
const pad = 20;
await page.evaluate(
  (y) => window.scrollTo({ top: y, behavior: "instant" }),
  Math.max(found.top - pad, 0),
);
await page.waitForTimeout(700);
const captureH = Math.ceil(Math.min(found.height + pad * 2, 2400));
await page.setViewportSize({ width: 1440, height: captureH });
await page.waitForTimeout(300);
await page.screenshot({
  path: path.resolve("screenshots/redesign/process-and-works-top.png"),
  clip: { x: 0, y: 0, width: 1440, height: captureH },
});
console.log("Saved h=" + captureH);
await ctx.close();
await browser.close();
