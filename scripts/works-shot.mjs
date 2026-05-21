import { chromium } from "playwright";
const browser = await chromium.launch({
  executablePath: "/home/dendo/.cache/ms-playwright/chromium-1208/chrome-linux64/chrome",
});
for (const vp of [
  { name: "works-desktop", w: 1440, h: 900 },
  { name: "works-mobile", w: 390, h: 844 },
]) {
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: 2, locale: "ja-JP" });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await page.evaluate(async () => { if (document.fonts?.ready) await document.fonts.ready; });
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 500) { await page.evaluate(y0 => window.scrollTo(0, y0), y); await page.waitForTimeout(50); }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  const el = page.locator("#works, section:has(.chapter-num):has-text('Works')").first();
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await el.screenshot({ path: `/home/dendo/projects/MyWebsite/screenshots/sections/${vp.name}.png` });
  console.log("captured", vp.name);
  await ctx.close();
}
await browser.close();
