import { chromium, devices } from "playwright";

const browser = await chromium.launch();
const context = await browser.newContext({
  ...devices["Pixel 7"],
  locale: "ja-JP",
  reducedMotion: "reduce",
});
const page = await context.newPage();
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });

// Slowly walk the page to trigger every IntersectionObserver
await page.evaluate(async () => {
  const step = Math.floor(window.innerHeight * 0.5);
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 250));
  }
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 300));
});

// Find every top-level <section> and report its offset/height
const info = await page.evaluate(() => {
  const sections = Array.from(document.querySelectorAll("main section, body > section"));
  return sections.map((s) => {
    const r = s.getBoundingClientRect();
    const styleTop = getComputedStyle(s).paddingTop;
    return {
      tag: s.tagName,
      cls: s.className?.toString().slice(0, 80) ?? "",
      top: Math.round(r.top + window.scrollY),
      height: Math.round(r.height),
      paddingTop: styleTop,
      firstText: (s.textContent || "").trim().slice(0, 40),
    };
  });
});
console.log("=== Sections ===");
info.forEach((s, i) =>
  console.log(`#${i} y=${s.top}..${s.top + s.height} (h=${s.height}) pt=${s.paddingTop} :: ${s.firstText}`),
);

// Page total
const total = await page.evaluate(() => document.body.scrollHeight);
console.log(`\nTotal page height: ${total}`);

await browser.close();
