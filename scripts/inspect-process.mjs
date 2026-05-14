import { chromium } from "playwright";

const browser = await chromium.launch({
  executablePath: "/home/dendo/.cache/ms-playwright/chromium-1208/chrome-linux64/chrome",
});
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto("http://localhost:3000/?t=" + Date.now(), { waitUntil: "networkidle" });
await page.evaluate(async () => { if (document.fonts?.ready) await document.fonts.ready; });

// Scroll to process
await page.evaluate(() => {
  const ps = Array.from(document.querySelectorAll("p"));
  const t = ps.find(p => p.textContent?.trim() === "06 / Process");
  if (t) t.scrollIntoView({ block: "start" });
});
await page.waitForTimeout(700);

const info = await page.evaluate(() => {
  const ps = Array.from(document.querySelectorAll("p"));
  const t = ps.find(p => p.textContent?.trim() === "06 / Process");
  if (!t) return null;
  let sec = t;
  while (sec && sec.tagName !== "SECTION") sec = sec.parentElement;
  const secRect = sec.getBoundingClientRect();

  // Find the grid (4-col) - the container with grid grid-cols-4
  const grids = sec.querySelectorAll(".grid");
  const stepGrid = Array.from(grids).find(g => g.className.includes("md:grid-cols-4"));
  const gridRect = stepGrid?.getBoundingClientRect();
  const cells = stepGrid ? Array.from(stepGrid.children) : [];
  const cellInfo = cells.map((c, i) => {
    const r = c.getBoundingClientRect();
    const cs = window.getComputedStyle(c);
    return {
      i,
      top: Math.round(r.top),
      bottom: Math.round(r.bottom),
      height: Math.round(r.height),
      borderRight: cs.borderRightWidth,
      display: cs.display,
      classes: c.className.slice(0, 100),
    };
  });

  // Check the next sibling section (works)
  const sections = Array.from(document.querySelectorAll("section"));
  const idx = sections.indexOf(sec);
  const next = sections[idx + 1];
  const nextRect = next?.getBoundingClientRect();

  // Find the duration badges (the "1 hour" / "1 week" / etc.)
  const durationBadges = cells.map((c) => {
    const div = c.querySelector("div.mt-auto");
    if (!div) return null;
    const r = div.getBoundingClientRect();
    const span = div.querySelector("span");
    return {
      wrapperTop: Math.round(r.top),
      wrapperBottom: Math.round(r.bottom),
      text: span?.textContent,
    };
  });

  return {
    section: { top: Math.round(secRect.top), bottom: Math.round(secRect.bottom), height: Math.round(secRect.height) },
    grid: gridRect ? { top: Math.round(gridRect.top), bottom: Math.round(gridRect.bottom), height: Math.round(gridRect.height) } : null,
    cells: cellInfo,
    durationBadges,
    nextSection: nextRect ? { top: Math.round(nextRect.top), bottom: Math.round(nextRect.bottom) } : null,
  };
});

console.log(JSON.stringify(info, null, 2));
await browser.close();
