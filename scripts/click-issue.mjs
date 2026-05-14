// Click Next.js dev tools "Issue" button and read panel content.
import { chromium, devices } from "playwright";

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  ...devices["Pixel 7"],
  locale: "ja-JP",
});
const page = await context.newPage();
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

// Find and click "Issue" in the shadow DOM
const opened = await page.evaluate(async () => {
  const portal = document.querySelector("nextjs-portal");
  if (!portal || !portal.shadowRoot) return "no portal";
  const buttons = portal.shadowRoot.querySelectorAll("button, [role=button]");
  for (const b of buttons) {
    const t = (b.textContent || "").trim();
    if (/issue/i.test(t)) {
      b.click();
      return `clicked: ${t}`;
    }
  }
  return "no issue button found";
});
console.log(opened);
await page.waitForTimeout(800);

// Read the entire visible panel text
const panel = await page.evaluate(() => {
  const portal = document.querySelector("nextjs-portal");
  if (!portal || !portal.shadowRoot) return null;
  return portal.shadowRoot.textContent?.slice(0, 4000) || "(no text)";
});
console.log("\nPanel text:\n", panel);

await browser.close();
