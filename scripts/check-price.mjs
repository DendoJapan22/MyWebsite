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

// Scroll precisely to the price section
await page.evaluate(() => {
  const headings = Array.from(document.querySelectorAll("p, h2"));
  const target = headings.find((el) => /05 \/ Price/i.test(el.textContent || ""));
  if (target) target.scrollIntoView({ block: "start" });
});
await page.waitForTimeout(500);

// Walk slowly past the price section
await page.evaluate(async () => {
  const startY = window.scrollY;
  for (let dy = 0; dy < 1700; dy += 200) {
    window.scrollTo(0, startY + dy);
    await new Promise((r) => setTimeout(r, 200));
  }
});

await mkdir("screenshots/audit-20260512/_focus", { recursive: true });

// Screenshot just the price section
await page.evaluate(() => {
  const headings = Array.from(document.querySelectorAll("p, h2"));
  const target = headings.find((el) => /05 \/ Price/i.test(el.textContent || ""));
  if (target) target.scrollIntoView({ block: "start" });
});
await page.waitForTimeout(400);
await page.screenshot({ path: "screenshots/audit-20260512/_focus/price-top.png" });

// Scroll down to see monthly fee
await page.evaluate(() => window.scrollBy(0, 700));
await page.waitForTimeout(400);
await page.screenshot({ path: "screenshots/audit-20260512/_focus/price-monthly.png" });

await page.evaluate(() => window.scrollBy(0, 700));
await page.waitForTimeout(400);
await page.screenshot({ path: "screenshots/audit-20260512/_focus/price-notes.png" });

await browser.close();
console.log("done");
