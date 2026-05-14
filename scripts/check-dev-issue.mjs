// Capture Next.js dev overlay panel by clicking the indicator.
import { chromium, devices } from "playwright";

const browser = await chromium.launch();
const context = await browser.newContext({
  ...devices["Pixel 7"],
  locale: "ja-JP",
});
const page = await context.newPage();
const consoleMessages = [];
page.on("console", (m) => consoleMessages.push({ type: m.type(), text: m.text() }));
page.on("pageerror", (e) => consoleMessages.push({ type: "pageerror", text: e.message }));
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);

// Try to find Next.js dev tools shadow root and click "Issue"
const result = await page.evaluate(() => {
  // Find the dev tools host element
  const hosts = Array.from(document.querySelectorAll("*")).filter(
    (el) => el.shadowRoot,
  );
  const reports = [];
  for (const h of hosts) {
    reports.push({
      tag: h.tagName,
      id: h.id,
      cls: (h.className?.toString() || "").slice(0, 80),
    });
  }
  return reports;
});
console.log("Shadow hosts:", result);

// Dev overlay is usually `nextjs-portal` element
const portalText = await page.evaluate(() => {
  const portal = document.querySelector("nextjs-portal");
  if (!portal) return null;
  // Try to access shadow root
  const sr = portal.shadowRoot;
  if (!sr) return "portal exists but no shadowRoot";
  return sr.textContent?.slice(0, 1000) || "(empty)";
});
console.log("\nPortal text:\n", portalText);

console.log("\nConsole messages:", consoleMessages.length);
consoleMessages.forEach((m) => console.log(`  [${m.type}] ${m.text.slice(0, 200)}`));

await browser.close();
