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

async function shot({ name, viewport, deviceScaleFactor = 2 }) {
  const context = await browser.newContext({ viewport, deviceScaleFactor });
  const page = await context.newPage();
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
  });
  // Allow hero animation to settle (longest delay ~1.55s + 1.8s duration)
  await page.waitForTimeout(3500);
  const file = path.join(OUT_DIR, `${name}.png`);
  await page.screenshot({ path: file, fullPage: false });
  console.log("Saved", file);
  await context.close();
}

async function recordGif({
  name,
  viewport,
  durationMs,
  fps = 18,
  scale = 0.6,
  clip,
}) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  const page = await context.newPage();
  // Pre-warm: load page once so JS/CSS/images are cached.
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
  });

  // Reload to trigger animations from frame 0; capture frames as PNG buffers.
  // We use a separate "render" page with a tiny pre-pause then start capturing.
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));

  const frameInterval = 1000 / fps;
  const totalFrames = Math.ceil((durationMs / 1000) * fps);
  const frames = [];

  // Reload and immediately capture — we miss the very first ~50ms of paint
  // but that's the initial state (all opacity 0) anyway.
  const reload = page.reload({ waitUntil: "domcontentloaded" });

  const start = Date.now();
  // Wait for reload to finish responding so screenshots don't fail
  await reload;

  for (let i = 0; i < totalFrames; i++) {
    const target = start + i * frameInterval;
    const wait = target - Date.now();
    if (wait > 0) await page.waitForTimeout(wait);
    const buf = await page.screenshot({
      type: "png",
      fullPage: false,
      clip,
    });
    frames.push(buf);
  }
  await context.close();

  // Decode + downscale every frame to raw RGBA.
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
    decoded.push(new Uint8ClampedArray(data.buffer, data.byteOffset, data.byteLength));
  }

  // Build a global palette from a representative frame.
  console.log(`Quantizing palette...`);
  const repFrame = decoded[Math.floor(decoded.length * 0.85)];
  const palette = quantize(repFrame, 192, { format: "rgba4444" });

  // Encode GIF
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

const TARGETS = (process.env.TARGETS ?? "desktop,mobile").split(",");

for (const t of TARGETS) {
  if (t === "desktop") {
    await shot({
      name: "hero-map-desktop",
      viewport: { width: 1440, height: 900 },
    });
    await recordGif({
      name: "hero-map-desktop",
      viewport: { width: 1280, height: 800 },
      durationMs: 3500,
      fps: 18,
      scale: 0.6,
    });
  } else if (t === "mobile") {
    await shot({
      name: "hero-map-mobile",
      viewport: { width: 390, height: 844 },
    });
    await recordGif({
      name: "hero-map-mobile",
      viewport: { width: 390, height: 844 },
      durationMs: 3500,
      fps: 18,
      scale: 0.75,
    });
  }
}

await browser.close();
console.log("done");
