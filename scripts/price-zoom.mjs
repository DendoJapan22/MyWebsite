import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const OUT = "screenshots/price-layer-check";
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 3,
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
await page.evaluate(() => {
  const el = document.getElementById("price");
  if (el) el.scrollIntoView({ block: "start", behavior: "instant" });
});
await page.waitForTimeout(800);

// Tight crop around the big ¥39,000 — find the span
const box = await page.evaluate(() => {
  const spans = Array.from(document.querySelectorAll("span"));
  const big = spans.find((s) => /^¥39,000$/.test((s.textContent || "").trim()) &&
    parseFloat(getComputedStyle(s).fontSize) > 60);
  if (!big) return null;
  const r = big.getBoundingClientRect();
  return { x: r.x, y: r.y, w: r.width, h: r.height };
});
if (!box) {
  console.log("big ¥39,000 not found");
  process.exit(1);
}
const pad = 60;
await page.screenshot({
  path: `${OUT}/zoom-39000.png`,
  clip: {
    x: Math.max(0, box.x - pad),
    y: Math.max(0, box.y - pad),
    width: box.w + pad * 2,
    height: box.h + pad * 2,
  },
});

// Dump rects of all stacked elements in the Initial Fee column
const rects = await page.evaluate(() => {
  const out = [];
  const log = (label, el) => {
    if (!el) return;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    out.push({
      label,
      tag: el.tagName,
      top: Math.round(r.top),
      bottom: Math.round(r.bottom),
      left: Math.round(r.left),
      right: Math.round(r.right),
      h: Math.round(r.height),
      fontSize: cs.fontSize,
      lineHeight: cs.lineHeight,
      zIndex: cs.zIndex,
      position: cs.position,
    });
  };
  const spans = Array.from(document.querySelectorAll("span"));
  log("¥78,000 strike", spans.find((s) => (s.textContent||"").trim()==="¥78,000"));
  log("通常価格", spans.find((s) => (s.textContent||"").trim()==="通常価格"));
  log("¥39,000 big", spans.find((s) => /^¥39,000$/.test((s.textContent||"").trim()) && parseFloat(getComputedStyle(s).fontSize)>60));
  return out;
});
console.log(JSON.stringify(rects, null, 2));

await ctx.close();
await browser.close();
console.log("done");
