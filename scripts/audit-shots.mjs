// Capture full-page screenshots of all routes at desktop + mobile widths.
// Usage: node scripts/audit-shots.mjs
// Requires a dev server already running on PORT (defaults to 3000).
import { chromium, devices } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const PORT = Number(process.env.PORT ?? 3000);
const BASE = `http://localhost:${PORT}`;
const OUT = process.env.OUT ?? `screenshots/audit-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}`;

const ROUTES = [
  { name: "home", path: "/" },
  { name: "about", path: "/about" },
  { name: "works", path: "/works" },
  { name: "contact", path: "/contact" },
  { name: "legal-commerce", path: "/legal/commerce" },
];

const VIEWPORTS = [
  { name: "desktop", config: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 } },
  { name: "mobile", config: { ...devices["Pixel 7"] } },
];

async function run() {
  const browser = await chromium.launch();
  for (const vp of VIEWPORTS) {
    const dir = path.join(OUT, vp.name);
    await mkdir(dir, { recursive: true });
    const context = await browser.newContext({
      ...vp.config,
      locale: "ja-JP",
      timezoneId: "Asia/Tokyo",
      reducedMotion: "reduce", // freeze animations so screenshots are deterministic
    });
    const page = await context.newPage();
    for (const r of ROUTES) {
      const url = `${BASE}${r.path}`;
      console.log(`[${vp.name}] → ${url}`);
      await page.goto(url, { waitUntil: "networkidle" });
      await page.waitForTimeout(800);
      // Walk the page in small steps to give IntersectionObserver time to fire.
      await page.evaluate(async () => {
        const step = Math.floor(window.innerHeight * 0.35);
        const total = document.body.scrollHeight;
        for (let y = 0; y < total; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 250));
        }
        window.scrollTo(0, total);
        await new Promise((r) => setTimeout(r, 400));
        window.scrollTo(0, 0);
        await new Promise((r) => setTimeout(r, 400));
      });
      await page.waitForTimeout(400);
      const file = path.join(dir, `${r.name}.png`);
      await page.screenshot({ path: file, fullPage: true });
      console.log(`   ✓ ${file}`);
    }
    await context.close();
  }
  await browser.close();
  console.log("\nDone.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
