import { chromium, devices } from "playwright";

const ROUTES = ["/", "/about", "/works", "/contact", "/legal/commerce"];
const VIEWPORTS = [
  { name: "desktop", config: { viewport: { width: 1440, height: 900 } } },
  { name: "mobile", config: { ...devices["Pixel 7"] } },
];

const browser = await chromium.launch();
for (const vp of VIEWPORTS) {
  const context = await browser.newContext({ ...vp.config, locale: "ja-JP" });
  const page = await context.newPage();
  for (const route of ROUTES) {
    const msgs = [];
    const errors = [];
    page.on("console", (m) => {
      if (m.type() === "warning" || m.type() === "error") msgs.push(`[${m.type()}] ${m.text()}`);
    });
    page.on("pageerror", (e) => errors.push(`[pageerror] ${e.message}`));
    page.on("requestfailed", (r) => msgs.push(`[requestfailed] ${r.url()} :: ${r.failure()?.errorText}`));
    await page.goto(`http://localhost:3000${route}`, { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      const step = Math.floor(window.innerHeight * 0.7);
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 80));
      }
    });
    await page.waitForTimeout(300);
    if (msgs.length || errors.length) {
      console.log(`\n[${vp.name}] ${route}`);
      msgs.forEach((m) => console.log("  " + m));
      errors.forEach((e) => console.log("  " + e));
    }
    page.removeAllListeners();
  }
  await context.close();
}
await browser.close();
