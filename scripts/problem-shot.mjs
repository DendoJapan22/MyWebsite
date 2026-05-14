import { chromium } from "playwright";
import path from "node:path";

const BASE = "http://localhost:3000";
const OUT_DIR = path.resolve("screenshots");
const VIEWPORT_DESKTOP = { width: 1440, height: 900 };

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
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(400);

  await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll("section"));
    const target = all.find((s) => s.textContent?.includes("02 / Problem"));
    target?.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await page.waitForTimeout(600);
  const section = await page.evaluateHandle(() => {
    const all = Array.from(document.querySelectorAll("section"));
    return all.find((s) => s.textContent?.includes("02 / Problem"));
  });
  const file = path.join(OUT_DIR, `problem-${label}.png`);
  await section.asElement().screenshot({ path: file });
  console.log("Saved", file);
  await context.close();
}

await shoot(VIEWPORT_DESKTOP, "desktop");
await shoot({ width: 390, height: 844 }, "mobile");
await browser.close();
