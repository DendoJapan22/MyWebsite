import sharp from "sharp";
import { copyFile } from "node:fs/promises";

const SRC = "public/images/logo-full.webp";
const BACKUP = "public/images/logo-full.original.webp";
const PAPER = [0xfa, 0xf8, 0xf3]; // --color-paper #faf8f3

// Backup original first
try {
  await copyFile(SRC, BACKUP);
  console.log("Backed up to", BACKUP);
} catch {}

const { data, info } = await sharp(SRC)
  .raw()
  .toBuffer({ resolveWithObject: true });

console.log("Source:", info.width + "x" + info.height, "channels:", info.channels);

let replaced = 0;
const ch = info.channels;
for (let i = 0; i < data.length; i += ch) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const brightness = (r + g + b) / 3;
  // near-gray (R≈G≈B) AND bright → likely checker indicator pattern
  const isNearGray =
    Math.abs(r - g) < 18 && Math.abs(g - b) < 18 && Math.abs(r - b) < 18;
  if (brightness > 198 && isNearGray) {
    data[i] = PAPER[0];
    data[i + 1] = PAPER[1];
    data[i + 2] = PAPER[2];
    replaced++;
  }
}
console.log("Replaced", replaced, "pixels of", data.length / ch);

await sharp(data, {
  raw: {
    width: info.width,
    height: info.height,
    channels: info.channels,
  },
})
  .webp({ quality: 92 })
  .toFile(SRC);

console.log("Wrote cleaned image to", SRC);
