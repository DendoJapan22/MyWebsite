import { chromium, devices } from "playwright";

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ ...devices["Pixel 7"], locale: "ja-JP" });
const page = await context.newPage();
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

// Open the issue panel
await page.evaluate(() => {
  const portal = document.querySelector("nextjs-portal");
  const sr = portal?.shadowRoot;
  if (!sr) return;
  const buttons = sr.querySelectorAll("button, [role=button]");
  for (const b of buttons) {
    if (/issue/i.test(b.textContent || "")) {
      b.click();
      return;
    }
  }
});
await page.waitForTimeout(1500);

// Extract just visible (non-style) text from the shadow DOM
const text = await page.evaluate(() => {
  const portal = document.querySelector("nextjs-portal");
  const sr = portal?.shadowRoot;
  if (!sr) return null;
  const elements = sr.querySelectorAll("*");
  const seen = new Set();
  const result = [];
  for (const el of elements) {
    if (el.tagName === "STYLE" || el.tagName === "SCRIPT") continue;
    const txt = el.childNodes
      ? Array.from(el.childNodes)
          .filter((n) => n.nodeType === 3)
          .map((n) => n.textContent?.trim() || "")
          .filter(Boolean)
          .join(" ")
      : "";
    if (txt && !seen.has(txt) && txt.length < 500) {
      seen.add(txt);
      result.push(txt);
    }
  }
  return result;
});
console.log("Visible text in dev panel:");
text?.forEach((t, i) => console.log(`  ${i + 1}. ${t}`));

// Also grab a screenshot of the panel
await page.screenshot({ path: "screenshots/audit-20260512/_focus/dev-panel.png" });

await browser.close();
