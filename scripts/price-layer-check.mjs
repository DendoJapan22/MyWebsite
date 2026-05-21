import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const OUT = "screenshots/price-layer-check";
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();

// Capture distinct frames during the price section's reveal animation
async function frames(label, viewport) {
  const ctx = await browser.newContext({
    viewport,
    deviceScaleFactor: 2,
    locale: "ja-JP",
    reducedMotion: "no-preference",
  });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000/?t=" + Date.now(), {
    waitUntil: "networkidle",
  });
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });
  await page.evaluate(() => {
    const el = document.getElementById("price");
    if (el) el.scrollIntoView({ block: "start", behavior: "instant" });
  });

  const stamps = [80, 250, 500, 900, 1600];
  let prev = 0;
  for (const t of stamps) {
    await page.waitForTimeout(t - prev);
    prev = t;
    await page.screenshot({ path: `${OUT}/${label}-${t}ms.png` });
  }
  await ctx.close();
}

await frames("desktop", { width: 1440, height: 900 });
await frames("mobile", { width: 390, height: 844 });

await browser.close();
console.log("done");
