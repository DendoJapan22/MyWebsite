import { chromium } from "playwright";
const b = await chromium.launch();
const c = await b.newContext({ viewport: { width: 1440, height: 1100 }, deviceScaleFactor: 3, locale: "ja-JP", reducedMotion: "reduce" });
const p = await c.newPage();
await p.goto("http://localhost:3000/?t=" + Date.now(), { waitUntil: "networkidle" });
await p.evaluate(async () => { if (document.fonts?.ready) await document.fonts.ready; });
const h = await p.evaluate(() => document.body.scrollHeight);
for (let y = 0; y <= h; y += 400) { await p.evaluate(yy => scrollTo(0, yy), y); await p.waitForTimeout(50); }
const box = await p.evaluate(() => {
  const ph = [...document.querySelectorAll("span")].find(e => (e.textContent||"").trim() === "Phase 01");
  let grid = ph; while (grid && !/md:grid-cols-4/.test(grid.className || "")) grid = grid.parentElement;
  const r = grid.getBoundingClientRect();
  return { x: r.x, y: r.y + scrollY, w: r.width, h: r.height };
});
await p.evaluate(y => scrollTo(0, y), box.y - 30);
await p.waitForTimeout(300);
await p.screenshot({ path: "screenshots/process-check/zoom-grid.png", clip: { x: box.x, y: 30, width: box.w / 2 + 20, height: box.h } });
await b.close();
console.log("done");
