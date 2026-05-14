import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const OUT_DIR = path.resolve("screenshots");
const VIEWPORT = { width: 1440, height: 900 };

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
await page.waitForTimeout(500);

async function findSectionByChapter(chapterText) {
  return await page.evaluate((needle) => {
    const ps = Array.from(document.querySelectorAll("p"));
    const target = ps.find((p) => p.textContent?.trim().startsWith(needle));
    if (!target) return null;
    let node = target;
    while (node && node.tagName !== "SECTION") node = node.parentElement;
    if (!node) return null;
    const rect = node.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    return { top, height: rect.height };
  }, chapterText);
}

const price = await findSectionByChapter("04 / Price");
if (price) {
  const targetY = price.top - 60;
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), targetY);
  await page.waitForTimeout(900);
  await page.screenshot({
    path: path.join(OUT_DIR, "g2_price-top.png"),
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });
  console.log("Saved price top");

  await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), targetY + 500);
  await page.waitForTimeout(700);
  await page.screenshot({
    path: path.join(OUT_DIR, "g2_price-cards.png"),
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });
  console.log("Saved price cards");
}

const process_ = await findSectionByChapter("05 / Process");
if (process_) {
  const targetY = process_.top - 60;
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), targetY);
  await page.waitForTimeout(900);
  await page.screenshot({
    path: path.join(OUT_DIR, "g2_process-top.png"),
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });
  console.log("Saved process top");

  await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), targetY + 400);
  await page.waitForTimeout(700);
  await page.screenshot({
    path: path.join(OUT_DIR, "g2_process-steps.png"),
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });
  console.log("Saved process steps");
}

await browser.close();
