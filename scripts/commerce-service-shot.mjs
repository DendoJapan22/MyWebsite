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
await page.goto("http://localhost:3000/legal/commerce?t=" + Date.now(), {
  waitUntil: "networkidle",
});
await page.evaluate(async () => {
  if (document.fonts?.ready) await document.fonts.ready;
});
const docHeight = await page.evaluate(
  () => document.documentElement.scrollHeight,
);
for (let y = 0; y <= docHeight; y += 600) {
  await page.evaluate((yy) => window.scrollTo({ top: yy, behavior: "instant" }), y);
  await page.waitForTimeout(120);
}
await page.waitForTimeout(400);

const found = await page.evaluate(() => {
  const dts = Array.from(document.querySelectorAll("dt"));
  const t = dts.find((e) => e.textContent?.includes("提供サービス"));
  if (!t) return null;
  const row = t.parentElement;
  if (!row) return null;
  const r = row.getBoundingClientRect();
  return { top: r.top + window.scrollY, height: Math.ceil(r.height) };
});
if (!found) {
  console.warn("not found");
  process.exit(1);
}
const pad = 40;
await page.evaluate(
  (y) => window.scrollTo({ top: y, behavior: "instant" }),
  Math.max(found.top - pad, 0),
);
await page.waitForTimeout(500);
const captureH = found.height + pad * 2;
await page.setViewportSize({ width: 1440, height: captureH });
await page.waitForTimeout(300);
await page.screenshot({
  path: path.resolve("screenshots/commerce-service-block.png"),
  clip: { x: 0, y: 0, width: 1440, height: captureH },
});
await ctx.close();
await browser.close();
console.log("done");
