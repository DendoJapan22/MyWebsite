import { chromium } from "playwright";

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 1300 },
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
const h = await page.evaluate(() => document.body.scrollHeight);
for (let y = 0; y <= h; y += 400) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(50);
}
await page.evaluate(() => {
  document.getElementById("price").scrollIntoView({ block: "start" });
});
await page.waitForTimeout(400);

// Draw guide lines at the top edges of the two headline prices + list tops
await page.evaluate(() => {
  const section = document.getElementById("price");
  const within = (el) => section.contains(el);
  const all = Array.from(section.querySelectorAll("span,ul"));
  const big39 = all.find((e) => e.tagName==="SPAN" && /^¥39,000$/.test((e.textContent||"").trim()) && parseFloat(getComputedStyle(e).fontSize)>60 && within(e));
  const big4980 = all.find((e) => e.tagName==="SPAN" && /^¥4,980$/.test((e.textContent||"").trim()) && parseFloat(getComputedStyle(e).fontSize)>30 && within(e));
  const lists = all.filter((e) => e.tagName==="UL" && within(e));

  const line = (y, color, label) => {
    const d = document.createElement("div");
    Object.assign(d.style, {
      position: "fixed", left: "0", top: y + "px", width: "100%",
      height: "0", borderTop: "2px dashed " + color, zIndex: "99999",
    });
    const t = document.createElement("span");
    t.textContent = label;
    Object.assign(t.style, {
      position: "fixed", left: "6px", top: (y - 18) + "px",
      background: color, color: "#fff", font: "11px monospace",
      padding: "1px 5px", zIndex: "99999",
    });
    document.body.appendChild(d);
    document.body.appendChild(t);
  };

  const r39 = big39.getBoundingClientRect();
  const r4980 = big4980.getBoundingClientRect();
  line(r4980.top, "#c0392b", "¥4,980 top");
  line(r39.top, "#2d5a3f", "¥39,000 top  (39px lower)");
  if (lists[0] && lists[1]) {
    line(lists[1].getBoundingClientRect().top, "#c0392b", "monthly list top");
    line(lists[0].getBoundingClientRect().top, "#2d5a3f", "initial list top  (154px lower)");
  }
});
await page.waitForTimeout(200);
await page.screenshot({ path: "screenshots/price-layer-check/annotated.png" });

await ctx.close();
await browser.close();
console.log("done");
