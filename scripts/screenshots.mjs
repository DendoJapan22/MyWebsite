import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const OUT_DIR = path.resolve("screenshots");
const VIEWPORT = { width: 1440, height: 900 };

const TARGETS = (process.env.PAGES ?? "top,works,about,contact").split(",");
const ALL = {
  top: { name: "top", url: `${BASE}/` },
  works: { name: "works", url: `${BASE}/works` },
  about: { name: "about", url: `${BASE}/about` },
  contact: { name: "contact", url: `${BASE}/contact` },
};
const PAGES = TARGETS.map((k) => ALL[k]).filter(Boolean);

await mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ??
    "/home/dendo/.cache/ms-playwright/chromium-1208/chrome-linux64/chrome",
});
const context = await browser.newContext({
  viewport: VIEWPORT,
  deviceScaleFactor: 2,
});
const page = await context.newPage();

for (const target of PAGES) {
  await page.goto(target.url, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
  });

  // Pre-scroll the entire page to trigger all in-view Reveal animations
  const docHeight = await page.evaluate(
    () => document.documentElement.scrollHeight,
  );
  const step = 600;
  for (let y = 0; y <= docHeight; y += step) {
    await page.evaluate(
      (yy) => window.scrollTo({ top: yy, behavior: "instant" }),
      y,
    );
    await page.waitForTimeout(180);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(500);

  const file = path.join(OUT_DIR, `${target.name}.png`);
  await page.screenshot({ path: file, fullPage: true });
  console.log("Saved", file);
}

await browser.close();
