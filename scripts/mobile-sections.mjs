import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const OUT_DIR = path.resolve("screenshots/redesign-mobile");
const VP = { width: 390, height: 844 };

await mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ??
    "/home/dendo/.cache/ms-playwright/chromium-1208/chrome-linux64/chrome",
});

const TARGETS = [
  { name: "01-hero", locator: () => 0 }, // top
  { name: "02-bridge-1", locator: () => {
    const ps = Array.from(document.querySelectorAll("p"));
    const t = ps.find(p => p.textContent?.includes("社長の代わりに"));
    if (!t) return null;
    let n = t;
    while (n && n.tagName !== "SECTION") n = n.parentElement;
    return n ? { top: n.getBoundingClientRect().top + window.scrollY, height: n.getBoundingClientRect().height } : null;
  } },
  { name: "03-numbers", locator: () => {
    const ps = Array.from(document.querySelectorAll("p"));
    const t = ps.find(p => p.textContent?.trim() === "04 / Numbers");
    if (!t) return null;
    let n = t;
    while (n && n.tagName !== "SECTION") n = n.parentElement;
    return n ? { top: n.getBoundingClientRect().top + window.scrollY, height: n.getBoundingClientRect().height } : null;
  } },
  { name: "04-price", locator: () => {
    const ps = Array.from(document.querySelectorAll("p"));
    const t = ps.find(p => p.textContent?.trim() === "05 / Price");
    if (!t) return null;
    let n = t;
    while (n && n.tagName !== "SECTION") n = n.parentElement;
    return n ? { top: n.getBoundingClientRect().top + window.scrollY, height: n.getBoundingClientRect().height } : null;
  } },
  { name: "06-about-teaser", locator: () => {
    const ps = Array.from(document.querySelectorAll("p"));
    const t = ps.find(p => p.textContent?.trim() === "08 / About");
    if (!t) return null;
    let n = t;
    while (n && n.tagName !== "SECTION") n = n.parentElement;
    return n ? { top: n.getBoundingClientRect().top + window.scrollY, height: n.getBoundingClientRect().height } : null;
  } },
  { name: "07-contact", locator: () => {
    const ps = Array.from(document.querySelectorAll("p"));
    const t = ps.find(p => p.textContent?.trim() === "09 / Contact");
    if (!t) return null;
    let n = t;
    while (n && n.tagName !== "SECTION") n = n.parentElement;
    return n ? { top: n.getBoundingClientRect().top + window.scrollY, height: n.getBoundingClientRect().height } : null;
  } },
];

for (const t of TARGETS) {
  const ctx = await browser.newContext({
    viewport: VP, deviceScaleFactor: 2, isMobile: true, hasTouch: true,
  });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/?t=${Date.now()}`, { waitUntil: "networkidle" });
  await page.evaluate(async () => { if (document.fonts?.ready) await document.fonts.ready; });

  const docHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y <= docHeight; y += 600) {
    await page.evaluate(yy => window.scrollTo({ top: yy, behavior: "instant" }), y);
    await page.waitForTimeout(140);
  }
  await page.waitForTimeout(400);

  if (t.name === "01-hero") {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForTimeout(400);
    await page.screenshot({
      path: path.join(OUT_DIR, `${t.name}.png`),
      clip: { x: 0, y: 0, width: VP.width, height: VP.height },
    });
    console.log("Saved", t.name);
    await ctx.close();
    continue;
  }

  const found = await page.evaluate(t.locator);
  if (!found) { console.warn("not found:", t.name); await ctx.close(); continue; }
  const pad = 16;
  await page.evaluate(y => window.scrollTo({ top: y, behavior: "instant" }), Math.max(found.top - pad, 0));
  await page.waitForTimeout(500);
  const captureH = Math.ceil(Math.min(found.height + pad * 2, VP.height * 5));
  await page.setViewportSize({ width: VP.width, height: captureH });
  await page.waitForTimeout(300);
  await page.screenshot({
    path: path.join(OUT_DIR, `${t.name}.png`),
    clip: { x: 0, y: 0, width: VP.width, height: captureH },
  });
  console.log("Saved", t.name, "h=" + captureH);
  await ctx.close();
}

await browser.close();
