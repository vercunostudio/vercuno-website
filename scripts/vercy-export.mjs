/**
 * VERCUNO — Vercy state exporter (asset prep, not shipped).
 *
 * Turns the eight authentic green-screen renders in docs/references/ into
 * transparent, head-framed WebP busts for the About colophon mark.
 *
 * Pipeline per state:
 *   1. cut the source cell (4x2 contact sheet cell, or a full-frame render)
 *   2. chroma-key the green field to alpha, with despill
 *   3. find the character's head (brightest cluster in the upper body)
 *   4. crop a fixed aspect window centred on that head, at a fixed head-to-
 *      frame ratio, so every expression lands at the same optical scale
 *   5. export 2x and 1x WebP
 *
 * Nothing is generated: every pixel comes from the authentic render. Only the
 * background is removed and the framing is normalised.
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SRC = "docs/references";
const OUT = "public/assets/mascot";

/* -------------------------------------------------------------------------- */
/* Sources                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Each state names its sheet, cell, and the head-to-frame ratio.
 *
 * Head framing is expressed as "head width occupies N% of the frame width",
 * then the frame is a square anchored so the head sits in the upper third.
 * That keeps the bust readable inside a circular crop.
 */
const STATES = [
  {
    name: "neutral",
    sheet: "image_20261122223734.jpg",
    cell: "r1c1",
    // Resting. Calm closed-eye expression, arms down.
    // Head occupies 74% of the frame; the bust fills the circle.
    headRatio: 0.74,
    // Head top sits 17% down from the frame top, leaving headphone headroom.
    headTopPad: 0.17,
  },
  {
    name: "happy",
    sheet: "image_20261122224426.jpg",
    cell: "full",
    // Celebration: both arms up, eyes curved. The authentic "yes!" frame.
    // Matched to Neutral's head scale so the swap does not resize.
    headRatio: 0.74,
    headTopPad: 0.17,
  },
  {
    name: "surprised",
    sheet: "image_20261122224254.jpg",
    cell: "full",
    // Wide round eyes, both hands raised. The authentic startle frame.
    headRatio: 0.74,
    headTopPad: 0.17,
  },
];

/** 4x2 contact-sheet cell geometry, expressed as fractions. */
const CELLS = {
  r1c1: [0, 0, 0.25, 0.5],
  r1c2: [0.25, 0, 0.25, 0.5],
  r1c3: [0.5, 0, 0.25, 0.5],
  r1c4: [0.75, 0, 0.25, 0.5],
  r2c1: [0, 0.5, 0.25, 0.5],
  r2c2: [0.25, 0.5, 0.25, 0.5],
  r2c3: [0.5, 0.5, 0.25, 0.5],
  r2c4: [0.75, 0.5, 0.25, 0.5],
};

/* -------------------------------------------------------------------------- */
/* Chroma key                                                                  */
/* -------------------------------------------------------------------------- */

function keyGreen(rgb, width, height, { low = 26, high = 78 } = {}) {
  const out = Buffer.alloc(width * height * 4);

  for (let i = 0, p = 0, q = 0; i < width * height; i++, p += 3, q += 4) {
    const r = rgb[p];
    const g = rgb[p + 1];
    const b = rgb[p + 2];

    // Green excess over the strongest non-green channel. Near 0 for Vercy's
    // navy/silver palette, ~228 for the field.
    const other = Math.max(r, b);
    const d = g - other;

    let a = 1;

    if (d >= high) {
      a = 0;
    } else if (d > low) {
      a = 1 - (d - low) / (high - low);
    }

    // Despill after alpha: clamp residual green to the non-green ceiling so
    // the antialiased rim reads neutral on a dark page, never green.
    let gg = g;

    if (d > 0) {
      gg = Math.min(g, other + 2);
    }

    out[q] = r;
    out[q + 1] = gg;
    out[q + 2] = b;
    out[q + 3] = Math.round(a * 255);
  }

  return out;
}

/** Keeps only the largest opaque cluster, dropping JPEG specks on the field. */
function largestComponent(rgba, width, height, threshold = 24) {
  const seen = new Uint8Array(width * height);
  let best = null;
  const stack = [];

  for (let start = 0; start < width * height; start++) {
    if (seen[start] || rgba[start * 4 + 3] <= threshold) continue;

    stack.length = 0;
    stack.push(start);
    seen[start] = 1;
    const px = [];

    while (stack.length) {
      const idx = stack.pop();
      px.push(idx);
      const x = idx % width;
      const y = (idx - x) / width;

      const ns = [
        x > 0 ? idx - 1 : -1,
        x < width - 1 ? idx + 1 : -1,
        y > 0 ? idx - width : -1,
        y < height - 1 ? idx + width : -1,
      ];

      for (const n of ns) {
        if (n < 0 || seen[n] || rgba[n * 4 + 3] <= threshold) continue;
        seen[n] = 1;
        stack.push(n);
      }
    }

    if (!best || px.length > best.length) best = px;
  }

  if (!best) return rgba;

  const keep = new Uint8Array(width * height);
  for (const idx of best) keep[idx] = 1;

  for (let i = 0; i < width * height; i++) {
    if (!keep[i]) rgba[i * 4 + 3] = 0;
  }

  return rgba;
}

/* -------------------------------------------------------------------------- */
/* Head detection                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Finds the head as the widest bright horizontal band in the upper half.
 *
 * Vercy's face is a large glossy dome with a glowing visor; in every authentic
 * frame it is the brightest, widest contiguous feature of the silhouette,
 * sitting above the torso. Working from the alpha silhouette plus luminance
 * keeps this robust across expressions (the eye glyphs change, the dome does
 * not).
 */
function findHead(rgba, width, height) {
  // Per-row extremes of the opaque silhouette.
  const rows = [];

  for (let y = 0; y < height; y++) {
    let minX = Infinity;
    let maxX = -Infinity;
    let lumSum = 0;
    let count = 0;

    for (let x = 0; x < width; x++) {
      const p = (y * width + x) * 4;
      if (rgba[p + 3] < 40) continue;

      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      lumSum += rgba[p] + rgba[p + 1] + rgba[p + 2];
      count++;
    }

    if (count === 0) {
      rows.push(null);
      continue;
    }

    rows.push({ y, minX, maxX, width: maxX - minX + 1, lum: lumSum / count });
  }

  const valid = rows.filter(Boolean);

  if (!valid.length) return null;

  const top = valid[0].y;
  const bottom = valid[valid.length - 1].y;
  const span = bottom - top;

  // The head lives in the upper 55% of the silhouette.
  const searchEnd = Math.min(bottom, top + Math.round(span * 0.55));

  let headRow = null;

  for (const row of rows) {
    if (!row || row.y > searchEnd) continue;
    if (!headRow || row.width > headRow.width) headRow = row;
  }

  if (!headRow) return null;

  // Walk up from the widest row to find the dome's top edge, and down to find
  // where the head stops being the widest feature.
  const headWidth = headRow.width;

  let headTop = headRow.y;

  while (headTop > top) {
    const row = rows[headTop - 1];
    if (!row) break;
    if (row.width < headWidth * 0.55) break;
    headTop--;
  }

  let headBottom = headRow.y;

  while (headBottom < searchEnd) {
    const row = rows[headBottom + 1];
    if (!row) break;
    if (row.width < headWidth * 0.72) break;
    headBottom++;
  }

  return {
    cx: (headRow.minX + headRow.maxX) / 2,
    top: headTop,
    bottom: headBottom,
    width: headWidth,
  };
}

/* -------------------------------------------------------------------------- */
/* Build                                                                       */
/* -------------------------------------------------------------------------- */

async function build(state) {
  const src = `${SRC}/${state.sheet}`;
  const meta = await sharp(src).metadata();
  const { width: W, height: H } = meta;

  let pipe = sharp(src).removeAlpha();

  if (state.cell !== "full") {
    const [fx, fy, fw, fh] = CELLS[state.cell];
    pipe = pipe.extract({
      left: Math.round(fx * W),
      top: Math.round(fy * H),
      width: Math.round(fw * W),
      height: Math.round(fh * H),
    });
  }

  const { data, info } = await pipe.raw().toBuffer({ resolveWithObject: true });

  if (info.channels !== 3) throw new Error(`${state.name}: expected RGB`);

  const keyed = largestComponent(
    keyGreen(data, info.width, info.height),
    info.width,
    info.height,
  );

  const head = findHead(keyed, info.width, info.height);

  if (!head) throw new Error(`${state.name}: no head found`);

  // Square frame: head width / headRatio. Anchored on the head's horizontal
  // centre, with the head's top edge at 14% of the frame height so there is
  // headroom for the headphones inside a circular crop.
  const size = Math.round(head.width / state.headRatio);
  const left = Math.round(head.cx - size / 2);
  const top = Math.round(head.top - size * state.headTopPad);

  // Pad the canvas when the frame runs past the cell edge, so the subject is
  // never clipped by the export itself.
  const padLeft = Math.max(0, -left);
  const padTop = Math.max(0, -top);
  const padRight = Math.max(0, left + size - info.width);
  const padBottom = Math.max(0, top + size - info.height);

  const padded = await sharp(keyed, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .extend({
      top: padTop,
      bottom: padBottom,
      left: padLeft,
      right: padRight,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  const framedBox = {
    left: left + padLeft,
    top: top + padTop,
    width: size,
    height: size,
  };

  const base = await sharp(padded).extract(framedBox).png().toBuffer();

  const widths = [320, 160, 96, 72];

  for (const w of widths) {
    await sharp(base)
      .resize(w, w, { fit: "cover", kernel: "lanczos3" })
      .webp({ quality: 86, alphaQuality: 92, effort: 6 })
      .toFile(`${OUT}/${state.name}-${w}.webp`);
  }

  return { name: state.name, head, size, widths };
}

await mkdir(OUT, { recursive: true });

const results = [];

for (const state of STATES) {
  results.push(await build(state));
}

console.log(JSON.stringify(results, null, 2));
