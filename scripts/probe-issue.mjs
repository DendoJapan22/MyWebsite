// Read Next.js dev tools state via __NEXT_DEV_TOOLS_STATE__ or window APIs.
import { chromium, devices } from "playwright";

const browser = await chromium.launch({ headless: false, slowMo: 100 });
const context = await browser.newContext({ ...devices["Desktop Chrome"], locale: "ja-JP" });
const page = await context.newPage();
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);

// Click the Next.js dev tools button
const clickResult = await page.evaluate(() => {
  const portal = document.querySelector("nextjs-portal");
  const sr = portal?.shadowRoot;
  if (!sr) return "no shadow root";
  // The N icon is the dev tools indicator
  const indicators = sr.querySelectorAll("[data-nextjs-toast-wrapper], button");
  let candidates = [];
  for (const el of indicators) {
    const t = (el.textContent || "").trim().slice(0, 60);
    const aria = el.getAttribute?.("aria-label") || "";
    candidates.push({ tag: el.tagName, text: t, aria });
  }
  return candidates;
});
console.log("Found dev tool elements:");
console.log(JSON.stringify(clickResult, null, 2));

await page.waitForTimeout(2000);
await browser.close();
