import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const OUT_DIR = path.resolve("screenshots/redesign");
const VP = { width: 1440, height: 900 };

await mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ??
    "/home/dendo/.cache/ms-playwright/chromium-1208/chrome-linux64/chrome",
});

// Each target finds an anchor element and captures around it.
const TARGETS = [
  { name: "01-hero", url: `${BASE}/`, locate: () => {
    const h = document.querySelector("h1");
    if (!h) return null;
    const r = h.getBoundingClientRect();
    return { top: 0, height: window.innerHeight }; // full viewport
  } },
  { name: "02-bridge-1", url: `${BASE}/`, locate: () => {
    const ps = Array.from(document.querySelectorAll("p"));
    const t = ps.find(p => p.textContent?.includes("社長の代わりに"));
    if (!t) return null;
    let n = t;
    while (n && n.tagName !== "SECTION") n = n.parentElement;
    if (!n) return null;
    const r = n.getBoundingClientRect();
    return { top: r.top + window.scrollY, height: Math.ceil(r.height) };
  } },
  { name: "03-numbers", url: `${BASE}/`, locate: () => {
    const ps = Array.from(document.querySelectorAll("p"));
    const t = ps.find(p => p.textContent?.trim() === "04 / Numbers");
    if (!t) return null;
    let n = t;
    while (n && n.tagName !== "SECTION") n = n.parentElement;
    if (!n) return null;
    const r = n.getBoundingClientRect();
    return { top: r.top + window.scrollY, height: Math.ceil(r.height) };
  } },
  { name: "04-price", url: `${BASE}/`, locate: () => {
    const ps = Array.from(document.querySelectorAll("p"));
    const t = ps.find(p => p.textContent?.trim() === "05 / Price");
    if (!t) return null;
    let n = t;
    while (n && n.tagName !== "SECTION") n = n.parentElement;
    if (!n) return null;
    const r = n.getBoundingClientRect();
    return { top: r.top + window.scrollY, height: Math.ceil(r.height) };
  } },
  { name: "05-works-teaser", url: `${BASE}/`, locate: () => {
    const ps = Array.from(document.querySelectorAll("p"));
    const t = ps.find(p => p.textContent?.trim() === "07 / Works");
    if (!t) return null;
    let n = t;
    while (n && n.tagName !== "SECTION") n = n.parentElement;
    if (!n) return null;
    const r = n.getBoundingClientRect();
    return { top: r.top + window.scrollY, height: Math.ceil(r.height) };
  } },
  { name: "06-about-teaser", url: `${BASE}/`, locate: () => {
    const ps = Array.from(document.querySelectorAll("p"));
    const t = ps.find(p => p.textContent?.trim() === "08 / About");
    if (!t) return null;
    let n = t;
    while (n && n.tagName !== "SECTION") n = n.parentElement;
    if (!n) return null;
    const r = n.getBoundingClientRect();
    return { top: r.top + window.scrollY, height: Math.ceil(r.height) };
  } },
  { name: "07-contact", url: `${BASE}/`, locate: () => {
    const ps = Array.from(document.querySelectorAll("p"));
    const t = ps.find(p => p.textContent?.trim() === "09 / Contact");
    if (!t) return null;
    let n = t;
    while (n && n.tagName !== "SECTION") n = n.parentElement;
    if (!n) return null;
    const r = n.getBoundingClientRect();
    return { top: r.top + window.scrollY, height: Math.ceil(r.height) };
  } },
];

for (const t of TARGETS) {
  const ctx = await browser.newContext({ viewport: VP, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto(`${t.url}?t=${Date.now()}`, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });

  const docHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y <= docHeight; y += 600) {
    await page.evaluate(yy => window.scrollTo({ top: yy, behavior: "instant" }), y);
    await page.waitForTimeout(140);
  }
  await page.waitForTimeout(400);

  const found = await page.evaluate(t.locate);
  if (!found) {
    console.warn("Not found:", t.name);
    await ctx.close();
    continue;
  }
  const pad = 40;
  await page.evaluate(
    y => window.scrollTo({ top: y, behavior: "instant" }),
    Math.max(found.top - pad, 0),
  );
  await page.waitForTimeout(700);

  const captureH = Math.min(found.height + pad * 2, VP.height * 4);
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
