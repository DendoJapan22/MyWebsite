import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import gifenc from "gifenc";

const { GIFEncoder, quantize, applyPalette } = gifenc;

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const OUT_DIR = path.resolve("screenshots");

await mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ??
    "/home/dendo/.cache/ms-playwright/chromium-1208/chrome-linux64/chrome",
});

async function staticShot({ name, url, viewport, deviceScaleFactor = 2, scrollTo = 0 }) {
  const context = await browser.newContext({ viewport, deviceScaleFactor });
  const page = await context.newPage();
  await page.goto(`${BASE}${url}`, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
  });
  if (scrollTo > 0) {
    // Stepwise scroll so reveal animations trigger
    const steps = 8;
    for (let i = 1; i <= steps; i++) {
      await page.evaluate(
        (y) => window.scrollTo({ top: y, behavior: "instant" }),
        Math.round((scrollTo * i) / steps),
      );
      await page.waitForTimeout(160);
    }
  }
  await page.waitForTimeout(900);
  const file = path.join(OUT_DIR, `${name}.png`);
  await page.screenshot({ path: file, fullPage: false });
  console.log("Saved", file);
  await context.close();
}

async function fullPageShot({ name, url, viewport }) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 2 });
  const page = await context.newPage();
  await page.goto(`${BASE}${url}`, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
  });
  // Scroll through entire page to trigger all in-view reveal animations
  const docHeight = await page.evaluate(
    () => document.documentElement.scrollHeight,
  );
  const step = 600;
  for (let y = 0; y <= docHeight; y += step) {
    await page.evaluate((yy) => window.scrollTo({ top: yy, behavior: "instant" }), y);
    await page.waitForTimeout(180);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(500);
  const file = path.join(OUT_DIR, `${name}.png`);
  await page.screenshot({ path: file, fullPage: true });
  console.log("Saved", file);
  await context.close();
}

async function recordScrollGif({
  name,
  url,
  viewport,
  totalScrollPx,
  durationMs,
  fps = 18,
  scale = 0.6,
}) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  const page = await context.newPage();
  await page.goto(`${BASE}${url}`, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
  });
  // Wait a moment so hero load animation completes before we start scrolling
  await page.waitForTimeout(2200);

  const frameInterval = 1000 / fps;
  const totalFrames = Math.ceil((durationMs / 1000) * fps);
  const frames = [];

  const start = Date.now();
  for (let i = 0; i < totalFrames; i++) {
    const t = i / (totalFrames - 1); // 0..1
    // ease-in-out scroll position so it feels human
    const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    const scrollY = Math.round(totalScrollPx * eased);
    await page.evaluate(
      (y) => window.scrollTo({ top: y, behavior: "instant" }),
      scrollY,
    );

    const target = start + i * frameInterval;
    const wait = target - Date.now();
    if (wait > 0) await page.waitForTimeout(wait);
    const buf = await page.screenshot({ type: "png", fullPage: false });
    frames.push(buf);
  }
  await context.close();

  console.log(`Decoding ${frames.length} frames...`);
  const sample = sharp(frames[0]);
  const meta = await sample.metadata();
  const w = Math.round(meta.width * scale);
  const h = Math.round(meta.height * scale);

  const decoded = [];
  for (const f of frames) {
    const { data } = await sharp(f)
      .resize(w, h, { kernel: "lanczos3" })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    decoded.push(
      new Uint8ClampedArray(data.buffer, data.byteOffset, data.byteLength),
    );
  }

  // Build palette from a mid-frame
  const repFrame = decoded[Math.floor(decoded.length * 0.5)];
  const palette = quantize(repFrame, 192, { format: "rgba4444" });

  console.log(`Encoding GIF ${w}x${h} ${frames.length} frames...`);
  const gif = GIFEncoder();
  const delay = Math.round(1000 / fps);
  for (const rgba of decoded) {
    const indexed = applyPalette(rgba, palette, "rgba4444");
    gif.writeFrame(indexed, w, h, { palette, delay });
  }
  gif.finish();
  const out = path.join(OUT_DIR, `${name}.gif`);
  await writeFile(out, Buffer.from(gif.bytes()));
  console.log("Saved", out);
}

const VIEWPORT_DESKTOP = { width: 1440, height: 900 };

// 1) Static shot of /works page (top — disclaimer + grid + sample card visible)
await fullPageShot({
  name: "works-page-fullpage",
  url: "/works",
  viewport: VIEWPORT_DESKTOP,
});

// 2) Static shot of homepage works teaser (scrolled into view)
await staticShot({
  name: "home-works-teaser",
  url: "/",
  viewport: VIEWPORT_DESKTOP,
  scrollTo: 7300, // works teaser top
});

// 3) Scroll animation GIF — hero → problem → service (~3 sections)
await recordScrollGif({
  name: "scroll-anim-hero-to-service",
  url: "/",
  viewport: { width: 1280, height: 800 },
  totalScrollPx: 2900,
  durationMs: 6000,
  fps: 16,
  scale: 0.55,
});

// 4) Static shots — top of hero, problem in view, service in view
await staticShot({
  name: "scroll-snap-01-hero",
  url: "/",
  viewport: VIEWPORT_DESKTOP,
  scrollTo: 0,
});
await staticShot({
  name: "scroll-snap-02-problem",
  url: "/",
  viewport: VIEWPORT_DESKTOP,
  scrollTo: 1100,
});
await staticShot({
  name: "scroll-snap-03-service",
  url: "/",
  viewport: VIEWPORT_DESKTOP,
  scrollTo: 2400,
});

await browser.close();
console.log("done");
