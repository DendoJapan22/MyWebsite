import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const OUT = "screenshots/hero-price-check";
await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();

async function shot(label, viewport, dsf) {
  const ctx = await browser.newContext({
    viewport,
    deviceScaleFactor: dsf,
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
  await page.waitForTimeout(500);

  const box = await page.evaluate(() => {
    const initial = Array.from(document.querySelectorAll("p")).find(
      (p) => (p.textContent || "").trim() === "初期費用",
    );
    let card = initial?.parentElement;
    while (card && !/\bborder\b/.test(card.className)) card = card.parentElement;
    if (!card) return null;
    const r = card.getBoundingClientRect();
    return { x: r.x, y: r.y, w: r.width, h: r.height };
  });
  if (!box) return;
  const pad = 24;
  await page.screenshot({
    path: `${OUT}/zoom-${label}.png`,
    clip: {
      x: Math.max(0, box.x - pad),
      y: Math.max(0, box.y - pad),
      width: box.w + pad * 2,
      height: box.h + pad * 2,
    },
  });
  await ctx.close();
}

await shot("desktop", { width: 1440, height: 900 }, 3);
await shot("mobile", { width: 390, height: 844 }, 3);
await browser.close();
console.log("done");
