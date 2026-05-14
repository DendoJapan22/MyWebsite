import { chromium } from "playwright";
import path from "node:path";

const BASE = "http://localhost:3000";
const OUT_DIR = path.resolve("screenshots");

const browser = await chromium.launch({
  executablePath:
    "/home/dendo/.cache/ms-playwright/chromium-1208/chrome-linux64/chrome",
});

async function shoot(viewport, label) {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
  });

  // Pre-scroll to trigger reveals
  const docHeight = await page.evaluate(
    () => document.documentElement.scrollHeight,
  );
  for (let y = 0; y <= docHeight; y += 600) {
    await page.evaluate(
      (yy) => window.scrollTo({ top: yy, behavior: "instant" }),
      y,
    );
    await page.waitForTimeout(180);
  }

  // Position at the hero/problem boundary
  const target = await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll("section"));
    const problem = all.find((s) => s.textContent?.includes("02 / Problem"));
    if (!problem) return -1;
    const rect = problem.getBoundingClientRect();
    return rect.top + window.scrollY;
  });
  if (target < 0) {
    console.log("Problem section not found");
    await context.close();
    return;
  }
  // Show the boundary roughly 60% into the viewport (hero bottom + problem top)
  await page.evaluate(
    (y) => window.scrollTo({ top: y, behavior: "instant" }),
    Math.max(0, target - viewport.height * 0.55),
  );
  await page.waitForTimeout(500);

  const file = path.join(OUT_DIR, `boundary-${label}.png`);
  await page.screenshot({ path: file, fullPage: false });
  console.log("Saved", file);
  await context.close();
}

await shoot({ width: 1440, height: 900 }, "desktop");
await shoot({ width: 390, height: 844 }, "mobile");
await browser.close();
