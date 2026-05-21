import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
await mkdir("screenshots/header-check", { recursive: true });
const b = await chromium.launch();
async function shot(label, vp) {
  const c = await b.newContext({ viewport: vp, deviceScaleFactor: 2, locale: "ja-JP", reducedMotion: "reduce" });
  const p = await c.newPage();
  await p.goto("http://localhost:3000/?t=" + Date.now(), { waitUntil: "networkidle" });
  await p.evaluate(async () => { if (document.fonts?.ready) await document.fonts.ready; });
  await p.waitForTimeout(400);
  const hh = vp.width < 500 ? 120 : 150;
  await p.screenshot({ path: `screenshots/header-check/${label}-top.png`, clip: { x: 0, y: 0, width: vp.width, height: hh } });
  await p.evaluate(() => scrollTo(0, 600));
  await p.waitForTimeout(500);
  await p.screenshot({ path: `screenshots/header-check/${label}-scrolled.png`, clip: { x: 0, y: 0, width: vp.width, height: hh } });
  await c.close();
}
await shot("desktop", { width: 1440, height: 900 });
await shot("mobile", { width: 390, height: 844 });
await b.close();
console.log("done");
