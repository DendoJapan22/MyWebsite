// Slice tall mobile screenshots into viewport-sized sections for easier review.
import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";

const DIR = process.argv[2] ?? "screenshots/audit-20260512/mobile";
const OUT = path.join(DIR, "_chunks");
const CHUNK_H = 2400;

const files = (await readdir(DIR)).filter((f) => f.endsWith(".png") && !f.includes("_chunks"));
await mkdir(OUT, { recursive: true });

for (const f of files) {
  const src = path.join(DIR, f);
  const meta = await sharp(src).metadata();
  const w = meta.width;
  const h = meta.height;
  const name = path.basename(f, ".png");
  const chunks = Math.ceil(h / CHUNK_H);
  console.log(`${f}: ${w}x${h} → ${chunks} chunks`);
  for (let i = 0; i < chunks; i++) {
    const top = i * CHUNK_H;
    const height = Math.min(CHUNK_H, h - top);
    const outFile = path.join(OUT, `${name}-${String(i + 1).padStart(2, "0")}.png`);
    await sharp(src).extract({ left: 0, top, width: w, height }).toFile(outFile);
  }
}
console.log("Done.");
