// Open Next.js dev tools and dump the issues panel.
import { chromium, devices } from "playwright";

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ ...devices["Desktop Chrome"], locale: "ja-JP" });
const page = await context.newPage();
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);

// Click the indicator button
await page.evaluate(() => {
  const portal = document.querySelector("nextjs-portal");
  const sr = portal?.shadowRoot;
  if (!sr) return;
  const btn = sr.querySelector('button[aria-label="Open Next.js Dev Tools"]');
  btn?.click();
});
await page.waitForTimeout(1000);

// Take screenshot to see the panel
await page.screenshot({ path: "screenshots/audit-20260512/_focus/devtools-panel.png" });

// Then click Issues / Build Errors in the panel if exists
const result = await page.evaluate(() => {
  const portal = document.querySelector("nextjs-portal");
  const sr = portal?.shadowRoot;
  if (!sr) return null;
  const buttons = sr.querySelectorAll("button, a, [role=button], [role=link]");
  const out = [];
  for (const b of buttons) {
    const t = (b.textContent || "").trim().slice(0, 60);
    const aria = b.getAttribute?.("aria-label") || "";
    if (t || aria) out.push({ tag: b.tagName, text: t, aria });
  }
  return out;
});
console.log("Dev tool buttons after opening:");
console.log(JSON.stringify(result, null, 2));

// Try clicking the issues button
await page.evaluate(() => {
  const portal = document.querySelector("nextjs-portal");
  const sr = portal?.shadowRoot;
  if (!sr) return;
  const els = sr.querySelectorAll("button, a, [role=button]");
  for (const e of els) {
    const t = (e.textContent || "").trim().toLowerCase();
    if (t.includes("issue") || t === "1") {
      e.click();
      return;
    }
  }
});
await page.waitForTimeout(1200);
await page.screenshot({ path: "screenshots/audit-20260512/_focus/devtools-issue.png" });

await browser.close();
