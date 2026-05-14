import { chromium, devices } from "playwright";

const browser = await chromium.launch();
const context = await browser.newContext({
  ...devices["Pixel 7"],
  locale: "ja-JP",
  reducedMotion: "reduce",
});
const page = await context.newPage();
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });

// Slowly walk to trigger reveals
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 200) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 200));
  }
});

// Take a screenshot at exactly y=6400 (mid-price section)
await page.evaluate(() => window.scrollTo(0, 6400));
await page.waitForTimeout(500);
await page.screenshot({ path: "screenshots/audit-20260512/_focus/at-y-6400.png" });

await page.evaluate(() => window.scrollTo(0, 7200));
await page.waitForTimeout(500);
await page.screenshot({ path: "screenshots/audit-20260512/_focus/at-y-7200.png" });

await browser.close();
console.log("done");
