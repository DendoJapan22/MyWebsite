/**
 * Re-encode and right-size the public/images assets actually used by the site.
 *
 * Strategy: each source file maps to one *-opt.webp output. Targets are chosen
 * from the displayed context (background-cover hero, 50vw bleed, 33vw thumb,
 * 180px service card, 40-48px logo) rather than the source's native size, with
 * a 1920px hard cap for hero/full-width and 1000px for thumbnail tiers. Quality
 * is dropped when the image is rendered under a heavy overlay/opacity (e.g.
 * 0.32 hero wash, 0.22 process banner) because the loss is invisible there.
 *
 * Originals are left in place — the user removes them after visual review.
 *
 * Run:  node scripts/optimize-images.mjs
 */
import { fileURLToPath } from "node:url";
import path from "node:path";
import { readdir, stat } from "node:fs/promises";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const IMG_DIR = path.join(ROOT, "public/images");

/**
 * Per-file plan. `width` is the target output width; height is auto from the
 * source aspect ratio (sharp's default). Use `null` to skip resizing and only
 * re-encode at the requested quality.
 */
const PLAN = [
  // ---- Hero / full-bleed backgrounds (cap 1920) ----
  { src: "hero-washi.webp",          width: null, quality: 72, note: "full-bleed hero bg, opacity 0.32 — heavy overlay so lower q is invisible" },
  { src: "process-banner.webp",      width: 1600, quality: 75, note: "4-column bg via background-size 400%, opacity 0.22" },
  { src: "divider-ink.webp",         width: 1600, quality: 75, note: "100vw divider band, only 60-80px tall, opacity 0.42 with linear mask" },

  // ---- 50vw / 60vw section bleeds (cap 1000) ----
  { src: "problem-workshop.webp",    width: 1000, quality: 75, note: "50vw bleed in AboutEssay/AboutTeaser/Hero edge — grayscale" },
  { src: "about-craft-balance.webp", width: 1000, quality: 78, note: "50vw bleed in AboutEssay Why-AI chapter" },
  { src: "drasil-tree.webp",         width: 1000, quality: 72, note: "60vw decorative bg, opacity 0.32 grayscale" },

  // ---- Thumbnail-tier (cap 1000, often displayed much smaller) ----
  { src: "service-drafting.webp",    width: 800,  quality: 78, note: "180px service card on desktop, 100vw on mobile" },
  { src: "service-map.webp",         width: 800,  quality: 78, note: "180px service card" },
  { src: "service-photos.webp",      width: 800,  quality: 78, note: "180px service card" },
  { src: "works-suzuki-sample.webp", width: 800,  quality: 80, note: "33vw works grid thumb" },

  // ---- Logo (header displays at h-10/12 → ~40-48px tall) ----
  { src: "drasil-logo-full.png",     width: 400,  quality: 88, note: "header logo, displayed at 40-48px tall × ~67-81px wide; even at 2× retina 200×120 suffices, 400 leaves safety margin" },
];

function fmtKB(bytes) {
  return (bytes / 1024).toFixed(1).padStart(7) + " KB";
}

async function processOne({ src, width, quality, note }) {
  const inPath = path.join(IMG_DIR, src);
  const base = src.replace(/\.(webp|png|jpe?g)$/i, "");
  const outName = `${base}-opt.webp`;
  const outPath = path.join(IMG_DIR, outName);

  const inSize = (await stat(inPath)).size;
  let pipeline = sharp(inPath);
  const meta = await pipeline.metadata();

  if (width && meta.width && meta.width > width) {
    pipeline = pipeline.resize({ width, withoutEnlargement: true });
  }
  pipeline = pipeline.webp({ quality, effort: 6 });

  await pipeline.toFile(outPath);
  const outMeta = await sharp(outPath).metadata();
  const outSize = (await stat(outPath)).size;
  const delta = inSize - outSize;
  const pct = ((delta / inSize) * 100).toFixed(1);

  return {
    src,
    out: outName,
    inSize,
    outSize,
    delta,
    pct,
    inDims: `${meta.width}x${meta.height}`,
    outDims: `${outMeta.width}x${outMeta.height}`,
    quality,
    note,
  };
}

async function main() {
  const existing = new Set(await readdir(IMG_DIR));
  const results = [];
  for (const job of PLAN) {
    if (!existing.has(job.src)) {
      console.warn(`SKIP (missing): ${job.src}`);
      continue;
    }
    const r = await processOne(job);
    results.push(r);
    console.log(
      `${r.src.padEnd(32)} ${r.inDims.padEnd(10)} ${fmtKB(r.inSize)}  →  ` +
        `${r.out.padEnd(36)} ${r.outDims.padEnd(10)} ${fmtKB(r.outSize)}  (-${r.pct}%, q${r.quality})`,
    );
  }

  const inTotal = results.reduce((s, r) => s + r.inSize, 0);
  const outTotal = results.reduce((s, r) => s + r.outSize, 0);
  const deltaTotal = inTotal - outTotal;
  const pctTotal = ((deltaTotal / inTotal) * 100).toFixed(1);
  console.log("");
  console.log(`TOTAL  in: ${fmtKB(inTotal)}   out: ${fmtKB(outTotal)}   saved: ${fmtKB(deltaTotal)} (-${pctTotal}%)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
