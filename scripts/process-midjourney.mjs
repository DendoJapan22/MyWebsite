// Convert Midjourney outputs in public/images/_inbox/ to WebP at the target
// aspect ratio and dimensions used across the site.
//
// Usage:
//   1. Drop Midjourney outputs into `public/images/_inbox/` using the
//      target filenames listed in TARGETS below (any of .png/.jpg/.jpeg).
//      Example: `about-arrival.png` will become `about-arrival.webp`.
//   2. Run: `node scripts/process-midjourney.mjs`
//   3. Optimized WebPs are written to `public/images/`.
//
// The script uses `fit: cover` so the source image is center-cropped to the
// target aspect ratio. If a Midjourney output already matches the target ratio
// closely, the crop is invisible.

import sharp from "sharp";
import { readdir, mkdir, stat } from "node:fs/promises";
import path from "node:path";

const INBOX = "public/images/_inbox";
const OUT_DIR = "public/images";

// Target specs. Each entry: filename without extension → { width, height, quality }
const TARGETS = {
  // Works (4:3 card thumbnails)
  "works-reform-placeholder": { width: 1200, height: 900, quality: 82 },
  "works-architect-placeholder": { width: 1200, height: 900, quality: 82 },

  // About essay bleed images (4:3 to match Part 02 reference)
  "about-arrival": { width: 1200, height: 900, quality: 82 },
  "about-why-ai": { width: 1200, height: 900, quality: 82 },
  "about-vision": { width: 1200, height: 900, quality: 82 },

  // About signature accent (3:2 small)
  "about-signature-accent": { width: 900, height: 600, quality: 84 },

  // Letterbox strips (21:9 for PageHero / atmosphere)
  "contact-atmosphere": { width: 1600, height: 686, quality: 82 },
  "about-hero": { width: 1600, height: 686, quality: 82 },
  "works-hero": { width: 1600, height: 686, quality: 82 },
};

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  if (!(await exists(INBOX))) {
    await mkdir(INBOX, { recursive: true });
    console.log(`Created ${INBOX}/ — drop Midjourney outputs there and re-run.`);
    return;
  }

  const files = await readdir(INBOX);
  if (files.length === 0) {
    console.log(`Inbox is empty: ${INBOX}/`);
    console.log("Expected filenames (any of .png / .jpg / .jpeg / .webp):");
    Object.entries(TARGETS).forEach(([name, spec]) =>
      console.log(`  ${name}.png  (${spec.width}×${spec.height})`),
    );
    return;
  }

  let processed = 0;
  let skipped = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (![".png", ".jpg", ".jpeg", ".webp"].includes(ext)) {
      console.log(`  skip (not image): ${file}`);
      skipped++;
      continue;
    }
    const name = path.basename(file, ext);
    const spec = TARGETS[name];
    if (!spec) {
      console.log(`  skip (no target spec for "${name}"): ${file}`);
      console.log(
        `        rename to one of: ${Object.keys(TARGETS).join(", ")}`,
      );
      skipped++;
      continue;
    }

    const inPath = path.join(INBOX, file);
    const outPath = path.join(OUT_DIR, `${name}.webp`);
    const meta = await sharp(inPath).metadata();
    await sharp(inPath)
      .resize(spec.width, spec.height, { fit: "cover", position: "centre" })
      .webp({ quality: spec.quality })
      .toFile(outPath);
    const outSize = (await stat(outPath)).size;
    console.log(
      `  ✓ ${file} (${meta.width}×${meta.height}) → ${name}.webp (${spec.width}×${spec.height}, ${(outSize / 1024).toFixed(1)} KB)`,
    );
    processed++;
  }

  console.log(`\nProcessed: ${processed}, skipped: ${skipped}`);
  if (processed > 0) {
    console.log(`Output: ${OUT_DIR}/*.webp`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
