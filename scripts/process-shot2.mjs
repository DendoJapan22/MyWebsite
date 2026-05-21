import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
await mkdir("screenshots/process-check", { recursive: true });
const b = await chromium.launch();
async function shot(label, vp) {
  const c = await b.newContext({ viewport: vp, deviceScaleFactor: 2, locale: "ja-JP", reducedMotion: "reduce" });
  const p = await c.newPage();
  await p.goto("http://localhost:3000/?t=" + Date.now(), { waitUntil: "networkidle" });
  await p.evaluate(async () => { if (document.fonts?.ready) await document.fonts.ready; });
  const h = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y <= h; y += 400) { await p.evaluate(yy => scrollTo(0, yy), y); await p.waitForTimeout(50); }
  const rect = await p.evaluate(() => {
    const el = [...document.querySelectorAll("p")].find(e => /06 \/ Process/.test(e.textContent || ""));
    let s = el; while (s && s.tagName !== "SECTION") s = s.parentElement;
    const r = s.getBoundingClientRect();
    return { top: r.top + scrollY, height: Math.ceil(r.height) };
  });
  await p.evaluate(y => scrollTo(0, y), rect.top);
  await p.waitForTimeout(400);
  await p.screenshot({ path: `screenshots/process-check/${label}.png`, clip: { x: 0, y: 0, width: vp.width, height: Math.min(rect.height, vp.height * 2.5) } });
  await c.close();
}
await shot(process.argv[2] || "before-desktop", { width: 1440, height: 1100 });
await shot(process.argv[2] ? process.argv[2].replace("desktop","mobile") : "before-mobile", { width: 390, height: 1400 });
await b.close();
console.log("done");
