import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const OUT_DIR = path.resolve("screenshots");

const VIEWPORTS = [
  { name: "reality-desktop", width: 1440, height: 900 },
  { name: "reality-mobile", width: 390, height: 844 },
];

await mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ??
    "/home/dendo/.cache/ms-playwright/chromium-1208/chrome-linux64/chrome",
});

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  await page.setExtraHTTPHeaders({ "Cache-Control": "no-cache, no-store" });
  await context.clearCookies();

  await page.goto(`${BASE}/about?t=${Date.now()}`, {
    waitUntil: "networkidle",
  });
  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
  });

  // scroll to load lazy content
  const docHeight = await page.evaluate(
    () => document.documentElement.scrollHeight,
  );
  for (let y = 0; y <= docHeight; y += 600) {
    await page.evaluate(
      (yy) => window.scrollTo({ top: yy, behavior: "instant" }),
      y,
    );
    await page.waitForTimeout(140);
  }
  await page.waitForTimeout(600);

  // locate the 02 / Reality block by its eyebrow text
  const found = await page.evaluate(() => {
    const ps = Array.from(document.querySelectorAll("p"));
    const target = ps.find((p) => p.textContent?.includes("02 — Reality"));
    if (!target) return null;
    let node = target;
    while (node && node.tagName !== "ARTICLE") node = node.parentElement;
    if (!node) return null;
    const rect = node.getBoundingClientRect();
    return { top: rect.top + window.scrollY, height: Math.ceil(rect.height) };
  });

  if (!found) {
    console.warn("Could not find 02 / Reality article on", vp.name);
    await context.close();
    continue;
  }

  const padTop = 40;
  await page.evaluate(
    (y) => window.scrollTo({ top: y, behavior: "instant" }),
    Math.max(found.top - padTop, 0),
  );
  await page.waitForTimeout(900);

  const captureH = Math.min(found.height + padTop * 2, vp.height * 4);

  // Resize page height to fit the block, then screenshot the visible area
  await page.setViewportSize({ width: vp.width, height: captureH });
  await page.waitForTimeout(300);

  await page.screenshot({
    path: path.join(OUT_DIR, `${vp.name}.png`),
    clip: { x: 0, y: 0, width: vp.width, height: captureH },
  });
  console.log("Saved", vp.name, "h=" + captureH);
  await context.close();
}

await browser.close();
