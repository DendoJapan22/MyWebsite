import { chromium } from "playwright";
const browser = await chromium.launch({
  executablePath: "/home/dendo/.cache/ms-playwright/chromium-1208/chrome-linux64/chrome",
});
const SHOTS = [
  // Mobile hero — viewport-fit
  { name: "hero-mobile-viewport", url: "/", w: 390, h: 844, kind: "viewport" },
  { name: "hero-desktop-viewport", url: "/", w: 1440, h: 900, kind: "viewport" },
  // CraftBalance
  { name: "craftbalance-desktop", url: "/", w: 1440, h: 900, selector: "section:has-text('Our Approach')" },
  { name: "craftbalance-mobile", url: "/", w: 390, h: 844, selector: "section:has-text('Our Approach')" },
  // Process
  { name: "process-desktop", url: "/", w: 1440, h: 1100, selector: "section:has(.chapter-num):has-text('Process')" },
  // BusinessInfo
  { name: "businessinfo-desktop", url: "/", w: 1440, h: 900, selector: "section:has-text('Business')" },
];
for (const s of SHOTS) {
  const ctx = await browser.newContext({ viewport: { width: s.w, height: s.h }, deviceScaleFactor: 2, locale: "ja-JP" });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000" + s.url, { waitUntil: "networkidle" });
  await page.evaluate(async () => { if (document.fonts?.ready) await document.fonts.ready; });
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 500) { await page.evaluate(y0 => window.scrollTo(0, y0), y); await page.waitForTimeout(50); }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  try {
    if (s.kind === "viewport") {
      await page.screenshot({ path: `/home/dendo/projects/MyWebsite/screenshots/sections/${s.name}.png`, fullPage: false });
    } else {
      const el = page.locator(s.selector).first();
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      await el.screenshot({ path: `/home/dendo/projects/MyWebsite/screenshots/sections/${s.name}.png` });
    }
    console.log("captured", s.name);
  } catch (e) { console.warn("FAIL", s.name, e.message); }
  await ctx.close();
}
await browser.close();
