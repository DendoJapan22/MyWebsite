import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve("screenshots/jp-phrase-check");
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch({
  executablePath:
    "/home/dendo/.cache/ms-playwright/chromium-1208/chrome-linux64/chrome",
});

const TARGETS = [
  { name: "bridge-1", selector: "section:has-text('24時間、語ってくれる')" },
  { name: "bridge-2", selector: "section:has-text('約束は、それより大切に')" },
  { name: "bridge-3", selector: "section:has-text('次の世代へ手渡すために')" },
  { name: "numbers-note", selector: "section:has-text('数字で示す')" },
  { name: "footer", selector: "footer" },
];

for (const vp of [
  { label: "desktop", width: 1440, height: 900 },
  { label: "mobile", width: 390, height: 844 },
]) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 2,
    locale: "ja-JP",
  });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 500) {
    await page.evaluate((y0) => window.scrollTo(0, y0), y);
    await page.waitForTimeout(60);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);

  for (const t of TARGETS) {
    try {
      const el = page.locator(t.selector).first();
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(350);
      await el.screenshot({ path: path.join(OUT, `${t.name}-${vp.label}.png`) });
      console.log("captured", `${t.name}-${vp.label}`);
    } catch (e) {
      console.warn("FAIL", `${t.name}-${vp.label}`, e.message);
    }
  }
  await ctx.close();
}
await browser.close();
console.log("done →", OUT);
