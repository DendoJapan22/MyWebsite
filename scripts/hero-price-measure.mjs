import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const OUT = "screenshots/hero-price-check";
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();

async function run(label, viewport) {
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
  await page.waitForTimeout(500);

  const data = await page.evaluate(() => {
    // The card: the motion.div with border + p-6/p-8 wrapping 初期費用
    const labels = Array.from(document.querySelectorAll("p"));
    const initial = labels.find((p) => (p.textContent || "").trim() === "初期費用");
    if (!initial) return null;
    let card = initial.parentElement;
    while (card && !/\bborder\b/.test(card.className)) card = card.parentElement;

    const big = Array.from(document.querySelectorAll("span")).find(
      (s) => (s.textContent || "").trim() === "39,000",
    );
    const figRow = big?.parentElement; // flex row holding ¥ + 39,000

    const rect = (el) => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return {
        left: Math.round(r.left), right: Math.round(r.right),
        width: Math.round(r.width),
        paddingLeft: cs.paddingLeft, paddingRight: cs.paddingRight,
        fontSize: cs.fontSize,
        overflow: cs.overflow,
      };
    };

    const cardR = card.getBoundingClientRect();
    const cs = getComputedStyle(card);
    const innerLeft = cardR.left + parseFloat(cs.paddingLeft);
    const innerRight = cardR.right - parseFloat(cs.paddingRight);

    return {
      card: rect(card),
      innerLeft: Math.round(innerLeft),
      innerRight: Math.round(innerRight),
      figRow: figRow ? rect(figRow) : null,
      bigSpan: big ? rect(big) : null,
      overflowPx: figRow
        ? Math.round(figRow.getBoundingClientRect().right - innerRight)
        : null,
    };
  });
  console.log(label, JSON.stringify(data, null, 2));

  await page.screenshot({ path: `${OUT}/${label}.png` });
  await ctx.close();
}

await run("desktop-1440", { width: 1440, height: 900 });
await run("desktop-1280", { width: 1280, height: 800 });
await run("laptop-1024", { width: 1024, height: 700 });

await browser.close();
console.log("done");
