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

// Pre-scroll to trigger reveal animations
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

// 1-3: Hero bottom → Problem boundary
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

const heroSection = await page.evaluate(() => {
  const sec = document.querySelector("section");
  const r = sec.getBoundingClientRect();
  return { top: r.top + window.scrollY, height: r.height };
});
const problem = await findSectionByChapter("02 / Problem");
if (problem && heroSection) {
  // capture last 360px of hero + first 240px of problem
  const startY = heroSection.top + heroSection.height - 360;
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), startY);
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(OUT_DIR, "g1_hero-problem-boundary.png"),
    clip: { x: 0, y: 0, width: 1440, height: 600 },
  });
  console.log("Saved hero→problem boundary");
}

// 1-1: Service section image close-up
const service = await findSectionByChapter("03 / Service");
if (service) {
  // Scroll so service section is centered
  const targetY = service.top - 80;
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), targetY);
  await page.waitForTimeout(900);
  await page.screenshot({
    path: path.join(OUT_DIR, "g1_service-feathered.png"),
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });
  console.log("Saved service feathered");

  // Second service card area
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), targetY + 500);
  await page.waitForTimeout(700);
  await page.screenshot({
    path: path.join(OUT_DIR, "g1_service-feathered-2.png"),
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });
  console.log("Saved service feathered 2");
}

// 1-2: About teaser section
const about = await findSectionByChapter("07 / About");
if (about) {
  const targetY = about.top - 80;
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), targetY);
  await page.waitForTimeout(900);
  await page.screenshot({
    path: path.join(OUT_DIR, "g1_about-teaser.png"),
    clip: { x: 0, y: 0, width: 1440, height: 700 },
  });
  console.log("Saved about teaser");
}

await browser.close();
