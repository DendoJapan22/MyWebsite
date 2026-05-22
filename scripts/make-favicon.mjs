/**
 * Generates the site favicon set from the Drasil logo.
 *
 * Source : public/images/drasil-logo-full.png  (2000x1186 — wordmark + tree)
 * Only the tree mark is used; the "Drasil" wordmark is illegible at favicon
 * sizes. The tree is isolated by connected-component analysis: it is the
 * largest opaque component. A plain rectangular crop cannot be used because
 * the "i" stem of the wordmark sits inside the tree's bounding box, so every
 * non-tree component is masked to transparent before cropping.
 *
 * Design: the green tree centered on a white rounded-square tile, so it reads
 * as an app icon in the browser tab.
 *
 * Outputs (Next.js 16 metadata file conventions — auto-injected into <head>):
 *   src/app/icon.png        512x512  white rounded tile  — browser tabs / search
 *   src/app/apple-icon.png  180x180  white SQUARE tile   — iOS home screen
 *   src/app/favicon.ico     16/32/48 white rounded tile  — legacy + /favicon.ico
 *
 * apple-icon is a full square (no rounded corners): iOS applies its own mask
 * and paints any transparent area — such as pre-rounded corners — black.
 *
 * Run:  node scripts/make-favicon.mjs
 */
import { fileURLToPath } from "node:url";
import path from "node:path";
import { writeFile } from "node:fs/promises";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LOGO = path.join(ROOT, "public/images/drasil-logo-full.png");
const APP = path.join(ROOT, "src/app");

const TREE_FRAC = 0.7; // tree height as a fraction of the tile (rest is margin)
const RADIUS_FRAC = 0.22; // corner radius as a fraction of the tile side
const TILE = "#ffffff"; // tile background

/**
 * Isolate the tree mark from the logo: label every opaque connected
 * component, keep the largest one (the tree), mask the rest transparent,
 * and crop to the tree's bounding box.
 */
async function extractTree() {
  const { data, info } = await sharp(LOGO)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info; // channels = 4 (RGBA)
  const opaque = (p) => data[p * 4 + 3] > 16;

  const label = new Int32Array(W * H);
  const comps = [];
  let nextLabel = 0;
  for (let start = 0; start < W * H; start++) {
    if (!opaque(start) || label[start]) continue;
    nextLabel++;
    let minX = W, minY = H, maxX = 0, maxY = 0, count = 0;
    const stack = [start];
    label[start] = nextLabel;
    while (stack.length) {
      const p = stack.pop();
      const x = p % W;
      const y = (p / W) | 0;
      count++;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || nx >= W || ny < 0 || ny >= H) continue;
          const np = ny * W + nx;
          if (opaque(np) && !label[np]) {
            label[np] = nextLabel;
            stack.push(np);
          }
        }
      }
    }
    comps.push({ label: nextLabel, count, minX, minY, maxX, maxY });
  }

  const tree = comps.reduce((a, b) => (b.count > a.count ? b : a));
  for (let p = 0; p < W * H; p++) {
    if (label[p] !== tree.label) data[p * 4 + 3] = 0; // mask non-tree pixels
  }

  const width = tree.maxX - tree.minX + 1;
  const height = tree.maxY - tree.minY + 1;
  console.log(
    `tree component: ${tree.count} px, ` +
      `bbox x:${tree.minX}-${tree.maxX} y:${tree.minY}-${tree.maxY} (${width}x${height})`,
  );
  return sharp(data, { raw: { width: W, height: H, channels: 4 } })
    .extract({ left: tree.minX, top: tree.minY, width, height })
    .png()
    .toBuffer();
}

/** White tile of `side`px — rounded-square, or a plain square when `rounded` is false. */
async function tile(side, rounded) {
  if (!rounded) {
    return sharp({
      create: {
        width: side,
        height: side,
        channels: 4,
        background: TILE,
      },
    })
      .png()
      .toBuffer();
  }
  const r = Math.round(side * RADIUS_FRAC);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${side}" height="${side}">`
    + `<rect width="${side}" height="${side}" rx="${r}" ry="${r}" fill="${TILE}"/></svg>`;
  return sharp(Buffer.from(svg)).png().toBuffer();
}

/** Green tree centered on a `side`px white tile. */
async function composeIcon(treeBuf, side, rounded) {
  const base = await tile(side, rounded);
  const tree = await sharp(treeBuf)
    .resize({ height: Math.round(side * TREE_FRAC) })
    .png()
    .toBuffer();
  return sharp(base)
    .composite([{ input: tree, gravity: "center" }])
    .png()
    .toBuffer();
}

/** Assemble a multi-resolution .ico that embeds PNG bitmaps. */
function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4); // image count

  const entries = Buffer.alloc(16 * images.length);
  let offset = 6 + 16 * images.length;
  for (let i = 0; i < images.length; i++) {
    const { size, data } = images[i];
    const e = i * 16;
    entries.writeUInt8(size >= 256 ? 0 : size, e + 0); // width (0 = 256)
    entries.writeUInt8(size >= 256 ? 0 : size, e + 1); // height
    entries.writeUInt8(0, e + 2); // color count (0 = truecolor)
    entries.writeUInt8(0, e + 3); // reserved
    entries.writeUInt16LE(1, e + 4); // color planes
    entries.writeUInt16LE(32, e + 6); // bits per pixel
    entries.writeUInt32LE(data.length, e + 8); // bytes in resource
    entries.writeUInt32LE(offset, e + 12); // offset from file start
    offset += data.length;
  }
  return Buffer.concat([header, entries, ...images.map((i) => i.data)]);
}

async function main() {
  const treeBuf = await extractTree();

  const icon = await composeIcon(treeBuf, 512, true);
  const appleIcon = await composeIcon(treeBuf, 180, false);

  const icoSizes = [16, 32, 48];
  const icoImages = [];
  for (const size of icoSizes) {
    icoImages.push({ size, data: await composeIcon(treeBuf, size, true) });
  }
  const favicon = buildIco(icoImages);

  await writeFile(path.join(APP, "icon.png"), icon);
  await writeFile(path.join(APP, "apple-icon.png"), appleIcon);
  await writeFile(path.join(APP, "favicon.ico"), favicon);

  console.log(`icon.png       ${icon.length} bytes  (512x512, white rounded tile)`);
  console.log(`apple-icon.png ${appleIcon.length} bytes  (180x180, white square tile)`);
  console.log(
    `favicon.ico    ${favicon.length} bytes  (${icoSizes.join("/")} px, white rounded tile)`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
