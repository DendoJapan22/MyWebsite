import { chromium } from "playwright";
const browser = await chromium.launch({
  executablePath: "/home/dendo/.cache/ms-playwright/chromium-1208/chrome-linux64/chrome",
});
for (const vp of [
  { name: "404-desktop", w: 1440, h: 900 },
  { name: "404-mobile", w: 390, h: 844 },
]) {
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: 2, locale: "ja-JP" });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000/nonexistent-page", { waitUntil: "networkidle" });
  await page.evaluate(async () => { if (document.fonts?.ready) await document.fonts.ready; });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `/home/dendo/projects/MyWebsite/screenshots/sections/${vp.name}.png`, fullPage: false });
  console.log("captured", vp.name);
  await ctx.close();
}
await browser.close();
