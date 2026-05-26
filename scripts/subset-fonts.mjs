/**
 * Build subsetted woff2 files for the two Japanese display/body faces.
 *
 * Outputs (committed to the repo):
 *   src/app/fonts/shippori-mincho-b1-400.woff2
 *   src/app/fonts/shippori-mincho-b1-500.woff2
 *   src/app/fonts/noto-sans-jp-400.woff2
 *   src/app/fonts/noto-sans-jp-500.woff2
 *
 * Subset characters:
 *   - Every unique char appearing in ./out HTML (run `npm run build` first
 *     so out/ exists — script aborts with a hint otherwise)
 *   - All hiragana (U+3041–U+3096, plus the small/iteration marks)
 *   - All katakana (U+30A1–U+30FA, plus the middle dot and the prolonged
 *     sound mark)
 *   - All 2,136 Joyo (常用) kanji  — safety buffer so later edits don't
 *     create missing glyphs
 *   - ASCII 0x20–0x7E (basic Latin)
 *   - CJK Symbols and Punctuation U+3000–U+303F  (、。「」『』 etc.)
 *   - Halfwidth/Fullwidth forms U+FF00–U+FFEF  (full-width ASCII variants)
 *
 * Source: @fontsource/noto-sans-jp and @fontsource/shippori-mincho-b1
 * ship a single merged Japanese woff2 per weight under
 * .../files/<name>-japanese-<weight>-normal.woff2 — those are the input.
 * Latin glyphs are NOT included in those merged subsets, but the CSS
 * fallback chain (Hiragino/Yu Mincho/Yu Gothic) covers Latin for the rare
 * cases it appears inside a Japanese-faced element.
 *
 * Re-run after meaningful text additions: `node scripts/subset-fonts.mjs`
 */
import { fileURLToPath } from "node:url";
import path from "node:path";
import { readFile, writeFile, mkdir, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import subsetFont from "subset-font";
import joyoPkg from "joyo-kanji";
const { kanji: JOYO_KANJI } = joyoPkg;

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_HTML_DIR = path.join(ROOT, "out");
const FONTS_OUT = path.join(ROOT, "src/app/fonts");

const SOURCES = [
  {
    label: "shippori-mincho-b1-400",
    src: "node_modules/@fontsource/shippori-mincho-b1/files/shippori-mincho-b1-japanese-400-normal.woff2",
  },
  {
    label: "shippori-mincho-b1-500",
    src: "node_modules/@fontsource/shippori-mincho-b1/files/shippori-mincho-b1-japanese-500-normal.woff2",
  },
  {
    label: "noto-sans-jp-400",
    src: "node_modules/@fontsource/noto-sans-jp/files/noto-sans-jp-japanese-400-normal.woff2",
  },
  {
    label: "noto-sans-jp-500",
    src: "node_modules/@fontsource/noto-sans-jp/files/noto-sans-jp-japanese-500-normal.woff2",
  },
];

function fmtKB(n) {
  return (n / 1024).toFixed(1).padStart(8) + " KB";
}

function rangeChars(start, end) {
  let s = "";
  for (let cp = start; cp <= end; cp++) s += String.fromCodePoint(cp);
  return s;
}

async function scanHtmlChars() {
  if (!existsSync(OUT_HTML_DIR)) {
    throw new Error(
      `Missing ${OUT_HTML_DIR}. Run \`npm run build\` first so the HTML to scan exists.`,
    );
  }
  // Walk out/ recursively, collect .html and inline-scripted text
  const chars = new Set();
  async function walk(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) {
        await walk(p);
      } else if (/\.(html|txt|json)$/.test(e.name)) {
        const txt = await readFile(p, "utf8");
        for (const ch of txt) chars.add(ch);
      }
    }
  }
  await walk(OUT_HTML_DIR);
  return chars;
}

function buildCharset(htmlChars) {
  const set = new Set(htmlChars);

  // Hiragana + iteration marks + small forms (U+3041..U+3096, U+309B..U+309F)
  for (const ch of rangeChars(0x3041, 0x3096)) set.add(ch);
  for (const ch of rangeChars(0x309b, 0x309f)) set.add(ch);

  // Katakana (U+30A0..U+30FF — includes middle dot, prolonged sound mark)
  for (const ch of rangeChars(0x30a0, 0x30ff)) set.add(ch);

  // 2,136 Joyo Kanji (safety buffer)
  for (const ch of JOYO_KANJI) set.add(ch);

  // ASCII 0x20..0x7E
  for (const ch of rangeChars(0x20, 0x7e)) set.add(ch);

  // CJK Symbols and Punctuation U+3000..U+303F
  for (const ch of rangeChars(0x3000, 0x303f)) set.add(ch);

  // Halfwidth/Fullwidth forms U+FF00..U+FFEF
  for (const ch of rangeChars(0xff00, 0xffef)) set.add(ch);

  return set;
}

async function main() {
  console.log("Scanning out/ HTML for used characters...");
  const htmlChars = await scanHtmlChars();
  const charset = buildCharset(htmlChars);
  const charsString = [...charset].join("");
  console.log(
    `Charset assembled: ${charset.size} unique code points ` +
      `(${htmlChars.size} discovered in HTML)`,
  );

  await mkdir(FONTS_OUT, { recursive: true });

  let inTotal = 0;
  let outTotal = 0;
  const rows = [];

  for (const { label, src } of SOURCES) {
    const srcPath = path.join(ROOT, src);
    if (!existsSync(srcPath)) {
      console.warn(`SKIP (missing source): ${src}`);
      continue;
    }
    const srcBuf = await readFile(srcPath);
    const srcSize = srcBuf.length;
    const outBuf = await subsetFont(srcBuf, charsString, {
      targetFormat: "woff2",
    });
    const outPath = path.join(FONTS_OUT, `${label}.woff2`);
    await writeFile(outPath, outBuf);
    const outSize = (await stat(outPath)).size;
    inTotal += srcSize;
    outTotal += outSize;
    const pct = (((srcSize - outSize) / srcSize) * 100).toFixed(1);
    rows.push({ label, srcSize, outSize, pct });
    console.log(
      `${label.padEnd(28)}  ${fmtKB(srcSize)}  →  ${fmtKB(outSize)}  (-${pct}%)`,
    );
  }

  console.log("");
  console.log(
    `TOTAL  in: ${fmtKB(inTotal)}   out: ${fmtKB(outTotal)}   ` +
      `saved: ${fmtKB(inTotal - outTotal)} ` +
      `(-${(((inTotal - outTotal) / inTotal) * 100).toFixed(1)}%)`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
