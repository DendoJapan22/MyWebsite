import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const OUT = "screenshots/price-layer-check";
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();

async function shot(label, viewport) {
  const ctx = await browser.newContext({
    viewport,
    deviceScaleFactor: 2,
    locale: "ja-JP",
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000/?t=" + Date.now(), {
    waitUntil: "networkidle",
  });
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });
  // settle reveals: scroll through whole page
  const h = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y <= h; y += 400) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(60);
  }
  // measure the price <section>
  const rect = await page.evaluate(() => {
    const el = document.getElementById("price");
    const r = el.getBoundingClientRect();
    return { top: r.top + window.scrollY, height: Math.ceil(r.height) };
  });
  await page.evaluate((y) => window.scrollTo(0, y), rect.top);
  await page.waitForTimeout(400);
  await page.screenshot({
    path: `${OUT}/full-${label}.png`,
    clip: { x: 0, y: 0, width: viewport.width, height: Math.min(rect.height, viewport.height * 3) },
  });
  await ctx.close();
}

await shot("desktop", { width: 1440, height: 2400 });
await shot("mobile", { width: 390, height: 2600 });

await browser.close();
console.log("done");
