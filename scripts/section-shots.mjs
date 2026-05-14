// Capture each major section of the home page as a single-viewport mobile screenshot.
import { chromium, devices } from "playwright";
import { mkdir } from "node:fs/promises";

const browser = await chromium.launch();
const context = await browser.newContext({
  ...devices["Pixel 7"],
  locale: "ja-JP",
  reducedMotion: "reduce",
});
const page = await context.newPage();
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });

await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 200) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 150));
  }
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 200));
});

await mkdir("screenshots/audit-20260512/_sections", { recursive: true });

const SECTIONS = [
  { name: "01-hero", y: 0 },
  { name: "03-bridge1", y: 1787 },
  { name: "04-service", y: 2246 },
  { name: "06-price-monthly", y: 6400 },
  { name: "07-bridge2", y: 7239 },
  { name: "08-process", y: 7698 },
  { name: "09-works", y: 9584 },
  { name: "10-about-teaser", y: 11877 },
  { name: "11-contact-teaser", y: 12724 },
  { name: "12-footer", y: 13627 },
];

for (const s of SECTIONS) {
  await page.evaluate((y) => window.scrollTo(0, y), s.y);
  await page.waitForTimeout(400);
  await page.screenshot({
    path: `screenshots/audit-20260512/_sections/${s.name}.png`,
  });
  console.log(`captured ${s.name} at y=${s.y}`);
}

await browser.close();
