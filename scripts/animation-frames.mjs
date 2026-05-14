import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const OUT = path.resolve("screenshots/anim");
const VIEWPORT = { width: 1440, height: 900 };
const EXEC =
  process.env.CHROME_PATH ??
  "/home/dendo/.cache/ms-playwright/chromium-1208/chrome-linux64/chrome";

await mkdir(OUT, { recursive: true });

async function captureSection({ name, scrollTo, frames, reducedMotion }) {
  const browser = await chromium.launch({ executablePath: EXEC });
  const ctx = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    reducedMotion: reducedMotion ? "reduce" : "no-preference",
  });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
  });
  // Settle initial hero before scrolling, unless we're capturing the hero itself
  if (scrollTo) {
    await page.waitForTimeout(2200);
    await page.evaluate((target) => {
      let el = null;
      if (target.kind === "id") {
        el = document.getElementById(target.value);
      } else if (target.kind === "chapter") {
        const all = document.querySelectorAll("p");
        el = Array.from(all).find(
          (p) => p.textContent && p.textContent.trim() === target.value,
        );
        if (el) {
          // Walk up to the nearest section
          let cur = el;
          while (cur && cur.tagName !== "SECTION") cur = cur.parentElement;
          el = cur ?? el;
        }
      }
      if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
    }, scrollTo);
  }

  for (const [label, ms] of frames) {
    await page.waitForTimeout(ms);
    const file = path.join(OUT, `${name}-${label}.png`);
    await page.screenshot({ path: file, fullPage: false });
    console.log("saved", file);
  }
  await browser.close();
}

// Hero: on page load, the entrance animation runs. Capture at 0/350/900/2000ms.
await captureSection({
  name: "01-hero",
  scrollTo: null,
  frames: [
    ["t0000", 60],
    ["t0350", 290],
    ["t0900", 550],
    ["t2000", 1100],
  ],
});

// Problem: scroll Problem into view, then capture intersection animation frames.
await captureSection({
  name: "02-problem",
  scrollTo: { kind: "chapter", value: "02 / Problem" },
  frames: [
    ["t0000", 30],
    ["t0350", 320],
    ["t0900", 550],
    ["t2200", 1300],
  ],
});

// Service: the section has id="service".
await captureSection({
  name: "03-service",
  scrollTo: { kind: "id", value: "service" },
  frames: [
    ["t0000", 30],
    ["t0400", 370],
    ["t1000", 600],
    ["t2200", 1200],
  ],
});

// Reduced-motion comparison: snapshot service mid-animation under reduce
await captureSection({
  name: "04-reduced-service",
  scrollTo: { kind: "id", value: "service" },
  reducedMotion: true,
  frames: [
    ["t0000", 30],
    ["t0400", 370],
  ],
});
