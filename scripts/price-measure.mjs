import { chromium } from "playwright";

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
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

const data = await page.evaluate(() => {
  const section = document.getElementById("price");
  const within = (el) => section.contains(el);
  const all = Array.from(section.querySelectorAll("span,p,ul,div"));
  const pick = (pred) => all.filter(pred).filter(within);

  const r = (el) => {
    const b = el.getBoundingClientRect();
    return {
      top: Math.round(b.top), bottom: Math.round(b.bottom),
      left: Math.round(b.left), right: Math.round(b.right),
    };
  };

  const big39 = pick((e) => e.tagName==="SPAN" && /^¥39,000$/.test((e.textContent||"").trim()) && parseFloat(getComputedStyle(e).fontSize)>60)[0];
  const big4980 = pick((e) => e.tagName==="SPAN" && /^¥4,980$/.test((e.textContent||"").trim()) && parseFloat(getComputedStyle(e).fontSize)>30)[0];
  const strike78 = pick((e) => e.tagName==="SPAN" && (e.textContent||"").trim()==="¥78,000")[0];
  const initialLabel = pick((e) => e.tagName==="P" && (e.textContent||"").trim()==="Initial Fee")[0];
  const monthlyLabel = pick((e) => e.tagName==="P" && (e.textContent||"").trim()==="Monthly Fee")[0];
  const lists = pick((e) => e.tagName==="UL");

  return {
    initialLabel: initialLabel ? r(initialLabel) : null,
    monthlyLabel: monthlyLabel ? r(monthlyLabel) : null,
    strike78: strike78 ? r(strike78) : null,
    big39: big39 ? r(big39) : null,
    big4980: big4980 ? r(big4980) : null,
    initialList: lists[0] ? r(lists[0]) : null,
    monthlyList: lists[1] ? r(lists[1]) : null,
  };
});
console.log(JSON.stringify(data, null, 2));

await ctx.close();
await browser.close();
