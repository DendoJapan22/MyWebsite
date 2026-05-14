import { chromium } from "playwright";
import path from "node:path";

const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ??
    "/home/dendo/.cache/ms-playwright/chromium-1208/chrome-linux64/chrome",
});
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 1200 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();
await page.goto("http://localhost:3000/?t=" + Date.now(), {
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

const handle = await page.evaluateHandle(() => {
  const ps = Array.from(document.querySelectorAll("p"));
  return (
    ps.find((p) => {
      const t = p.textContent ?? "";
      return (
        t.includes("第1期パートナー") &&
        t.includes("ヶ月のご契約") &&
        t.includes("大幅なデザイン変更")
      );
    }) ?? null
  );
});
const el = handle.asElement();
if (!el) {
  console.warn("notes not found");
  process.exit(1);
}
await el.scrollIntoViewIfNeeded();
await page.waitForTimeout(400);
const box = await el.boundingBox();
if (!box) {
  console.warn("no box");
  process.exit(1);
}
const pad = 60;
await page.screenshot({
  path: path.resolve("screenshots/price-notes.png"),
  clip: {
    x: Math.max(0, box.x - pad),
    y: Math.max(0, box.y - pad),
    width: Math.min(1440 - Math.max(0, box.x - pad), box.width + pad * 2),
    height: box.height + pad * 2,
  },
});
console.log(`done w=${box.width} h=${box.height}`);
await ctx.close();
await browser.close();
