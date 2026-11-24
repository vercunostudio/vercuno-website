# VERCUNO — Section 04: About

Version: 1.1 (Concept A+C — The Statement, with the interactive Vercy mark)
Status: IMPLEMENTED as Section 04 V1.1 — PENDING OWNER IMPLEMENTATION APPROVAL
Concept source: About design exploration (Concepts A / B / C)
Owner direction (2026-11-24): Concept A "The Statement", ending with
Concept C's small Vercy colophon mark. V1 design APPROVED by owner;
V1.1 adds interaction to the mark only and preserves layout,
typography, copy and spacing.
Scope: Implemented below Services. About V1.1 is NOT approved.

Working title: The Statement.

## 1. Purpose

Say who is behind the work.

Hero declares. Selected Work proves. Services specify. About is the
only section on the site allowed to state conviction — why a studio
this small exists, and what standard it holds itself to. It should
convert "young studio" from a liability into a position: the studio
is small on purpose, and the standard is the differentiator.

The section must:

1. Establish VERCUNO as a real independent, founder-led studio
   without inflating it.
2. State beliefs in the first person — the section's unique voice.
3. Describe the approach to design, engineering, and business
   needs in plain commercial language.
4. Give the owner a credible "why talk to them" answer.
5. Introduce Vercy for the first time on the site, quietly.
6. Give the existing reserved `About` navigation item
   (`href="#about"` in `lib/site.ts`) its real destination.

It must not:

- Claim a team, headcount, hiring intent, or organisational scale.
- Claim years of agency experience or a founding date.
- Claim awards, recognition, certifications, or partnerships.
- Claim client results, conversions, revenue, or performance gains.
- Describe founder projects as paid or commercially shipped launches.
- Present capabilities that Services does not already state.
- Repeat the Services index pattern (numerals, sticky column,
  reciprocal highlight) or the Work plate pattern.

## 2. Concept

**The Statement, closed with a colophon.**

Concept A carries the mass of the section: one oversized Manrope
ExtraBold belief statement, revealed line by line as the reader
arrives, with a single Instrument Serif Italic Electric Blue word
that turns the sentence. Under it, a narrow editorial column holds
the studio's position and three beliefs. Nothing is pinned, nothing
is numbered, nothing is a card.

Concept C contributes only its ending: a printer's-device-sized
Vercy mark at the foot of the copy, seated on a hairline rule, with
one line of Inter beneath. It is the quietest possible introduction
of a mascot — the studio's companion signing the statement, not a
character performing.

Explicitly rejected from the exploration:

- Concept B's framed "workbench" plate, callout connectors, and
  sticky media column. Not used.
- Concept C's rotated wordmark, three-column text flow, and
  pull-quote interrupts. Not used.
- A light/inverted section. Palette ratio forbids it.
- Any scroll-driven ambient loop, parallax on type, or pinned
  statement that traps the scroll.

Type is the design. The only image is one 64–80px Vercy mark.

## 3. Section identity

Anchor: `id="about"`
Heading element level: `h2` (single `h2` in the section; beliefs are
not headings, they are list items)
Landing behavior: `#about` must land with the eyebrow and the first
headline line legible just below the viewport top, using a
section-scoped `scroll-margin-top` only. Do not add a global
`scroll-padding-top`; it would alter the approved landing behaviour
of `#work` and `#services`.

Background: Midnight Black `#02070A`, exactly as Services. The
global film-grain overlay (`body::after`) already applies; nothing
new is layered beneath it. The section owns no background image,
gradient, or noise of its own.

Order on the homepage: after Services, before Process.

## 4. Content (proposed final copy)

All copy is derived from approved truth: the PRD positioning,
Hero lede vocabulary, Services service definitions, and the three
founder projects. The section stays deliberately short — roughly
150 words of visible body copy plus the statement.

### 4.1 Eyebrow

```
About
```

with the existing hairline `eyebrow__line` treatment used by
Services.

### 4.2 Statement (the `h2`)

Four lines, desktop:

```
We build
software that
earns its place
on the internet.
```

The accent word is `earns`, set in Instrument Serif Italic,
Electric Blue `#0297DE` — the third use of the blue italic accent
on the page, after Hero's "Better." and Services' "Build.". This
continues the established typographic identity rather than
introducing a new device (see 03-SERVICES §14 decision 1).

Mobile/tablet line breaks are owned by the layout, not by hard
`<br>`: the statement wraps naturally so no line orphans a single
word at 320px.

### 4.3 Position line (under the statement, left column)

> "Digital, Built Better." is not a slogan. It is the standard we
> hold ourselves to on every project.

### 4.4 Body (two short paragraphs)

> VERCUNO is an independent software and AI studio, founder-led and
> deliberately small. Direct access, fewer handoffs, and one standard
> across design and engineering.

> We approach every engagement the same way: understand the business
> problem first, design the simplest thing that answers it, then
> engineer it to hold up after launch.

Third optional paragraph, ship only if the columns balance at 1440
(check at build time):

> Good design is not decoration, and engineering is not
> implementation. Both are decisions about how a business works —
> and both are made here, by the same people.

### 4.5 Beliefs (three rows, right column)

| Index | Belief (Manrope ExtraBold) | Definition (Inter) |
|---|---|---|
| 01 | Clarity over cleverness | If a screen needs explaining, it needs redesigning. |
| 02 | Engineering is a design decision | How something is built shows up in how it feels. |
| 03 | Small studio, direct access | You talk to the people doing the work. |

Index numerals are **Cantaloupe Orange `#FC734D`**, 2-digit, at
Services' index scale but without any link, marker, or rail.

No numeric claims appear anywhere in these rows.

### 4.6 Colophon foot (Vercy moment)

Rule, then the mark, then one line, then the CTA:

```
[hairline rule]

[Vercy mark, 64–80px, circular]

The studio's companion. It reviews everything we ship.

                                   Start a Project →
```

Copy notes:

- "It" is intentional for the companion until the owner states a
  preferred pronoun.
- "reviews everything we ship" is a character statement, not a
  service claim. If it reads as a guarantee at review, fall back to
  "The studio's companion." alone.
- No Vercy dialogue, no speech bubble, no name label beyond the one
  line.

### 4.7 CTA

Reuses the existing `projectMailto` and the `text-link` pattern with
`ArrowUpRight`, matching the Services footer strip exactly. No new
button variant, no new section-specific CTA component.

### 4.8 Explicitly forbidden copy

- "Our team of N engineers / designers."
- "X years of combined experience."
- "Since 20XX."
- "Trusted by …", "Featured in …", "Award-winning …".
- "We have helped clients increase …".
- "Launched and scaled N products" (only three founder projects
  exist, and AI Content Studio has no verified public destination).

## 5. Desktop composition

Reference: 1440 × 900. Gutter: `var(--gutter)` (48–72px).

Two columns inside the gutter, 62% / 30% with an 8% empty channel:

```
┌──────────────────────────────────────────────────────────────┐
│ — About                                                      │
│ ─────────────────────────────────────────────────────────────│
│                                                              │
│  We                                   01 ─────────────────   │
│  software that                        Clarity over           │
│  earns its place                      cleverness             │
│  on the internet.                     If a screen needs…     │
│                                                              │
│  "Digital, Built Better." is not      02 ─────────────────   │
│  a slogan. It is the standard…        Engineering is a…      │
│                                       How something is…     │
│  VERCUNO is an independent                                        │
│  software and AI studio…              03 ─────────────────   │
│                                       Small studio,          │
│  We approach every engagement…        direct access          │
│                                       You talk to the…       │
│                                                              │
│  ─────────────────────────────────────────────────────────   │
│  (v)  The studio's companion.             Start a Project →   │
└──────────────────────────────────────────────────────────────┘
```

Specifics:

- **Statement block**: max-width 62ch of the display face; measured
  in px, ~700–760px at 1440. Four lines at the desktop display size
  (§7). Asymmetric: the statement's last line is shorter than the
  first, so the block's ragged right edge is the composition.
- **Right column**: starts at the top of the position line's
  baseline, **not** at the statement's top. This vertical offset
  (~2.5–3rem) is the asymmetry — the beliefs hang beside the copy,
  they do not share a top rule with it.
- **Belief rows**: each is a hairline-topped block; the numeral sits
  in a fixed 2.5rem column, the belief title in Manrope ExtraBold
  at 1.25–1.5rem, the definition in Inter at 0.9375rem with
  78% ivory. No hover state beyond a luminance change (§8.3).
- **Colophon foot**: full-bleed hairline rule spanning the content
  width; below it a single row — Vercy mark (left, 72px), the
  companion line (left, next to the mark), `Start a Project` (right,
  baseline-aligned to the companion line). This deliberately mirrors
  the Services footer strip's horizontal rhythm while changing what
  fills it.
- **Negative space**: the section is allowed to run ~90–110vh at
  1440. The whitespace above the statement (after the eyebrow rule)
  is the chapter break from Services and is not to be compressed.

### 5.1 Intermediate desktop widths (1024–1180px)

- Columns move to 58% / 34%; the belief definitions lose their
  78% ivory and go to 74% (do not shrink below the 0.875rem floor).
- Statement drops to the 1180–1320 measurement band (§7).
- Belief numerals stay in their fixed column; no collapse.

## 6. Tablet and mobile composition

### 6.1 Tablet (768 × 1024)

- Single column. Statement first, then position line, body, beliefs,
  then the colophon foot.
- Statement sits at 56–68px, three to four lines; the accent word
  must not begin a line.
- Beliefs stack as hairline-separated blocks, numeral inline-left of
  the title on the same baseline (not above it) to save vertical
  space.
- Colophon foot: mark and companion line centred-left, CTA on its
  own row below, left-aligned.
- Vercy mark may step up to 80px here; it has room.

### 6.2 Mobile (390 × 844)

- Gutter `--gutter` = 20–24px. Single column throughout.
- Statement at 40–48px, four to five lines, line-height 0.98.
- Position line at 1.0625rem, body at 0.9375rem / 1.6.
- Beliefs: numeral above the title (space is tighter than tablet),
  title 1.125rem, definition 0.875rem.
- Colophon foot: mark 56–64px, companion line beneath it, full-width
  `Start a Project` tap target ≥ 44px height.
- No horizontal overflow at any width; nothing negative-margined
  beyond the gutter.

### 6.3 320px floor

Verified copy behaviour is a spec requirement, not an assumption:

- Statement wraps to 5–6 lines at 40px; no word breaks mid-word; no
  hyphenation.
- The longest unbreakable tokens are `VERCUNO` and `"Digital,
  Built Better."` — both fit in 272px of content width at their
  sizes. The quoted tagline keeps its quotation marks and renders on
  two lines if needed.
- Belief titles wrap; the numeral column collapses to a stacked
  layout at ≤ 360px so a two-word title never renders in a 120px
  column.
- Colophon companion line wraps to two lines; the mark never shrinks
  below 56px (below that, the crop reads as a smudge — see §9.4
  fallback).

## 7. Typography and spacing

All values use the existing tokens (`--font-display`, `--font-sans`,
`--font-editorial`, `--ease-out-expo`). No new font is loaded.

| Element | Face | Size | Notes |
|---|---|---|---|
| Eyebrow | Inter 500 | 0.59375rem | matches `.eyebrow`, 0.2em tracking, uppercase |
| Statement | Manrope 800 | `clamp(2.5rem, 6.6vw, 6.75rem)` | line-height 0.92, letter-spacing −0.03em |
| Statement accent | Instrument Serif Italic | 1.04em of statement | Electric Blue |
| Position line | Inter 400 | `clamp(1rem, 1.35vw, 1.1875rem)` | ivory 92%, max 46ch |
| Body | Inter 400 | `clamp(0.9375rem, 1.1vw, 1.0625rem)` | ivory 78%, line-height 1.62, max 46ch |
| Belief title | Manrope 800 | `clamp(1.0625rem, 1.5vw, 1.4rem)` | ivory, line-height 1.15 |
| Belief definition | Inter 400 | 0.9375rem | ivory 74–78%, line-height 1.55 |
| Belief numeral | Inter 500 | 0.6875rem | Cantaloupe, 0.16em tracking |
| Companion line | Inter 400 | 0.875rem | ivory 62%, matches `.services__foot-note` |
| CTA | Inter 500 | 1rem (1.125rem ≥ 768px) | existing `.text-link` |

Vertical rhythm: section padding-block
`clamp(5.5rem, 13vh, 9rem)` top / `clamp(3.5rem, 8vh, 6rem)` bottom —
identical to Services so the two sections breathe the same. Statement
to position line: `clamp(1.5rem, 3vh, 2.25rem)`. Position line to
body: 1.25rem. Body paragraphs: 1.1em. Belief rows: 1.5rem apart.
Colophon rule: `clamp(2.5rem, 6vh, 4rem)` above.

Kill widows/orphans on the position line and each body paragraph
with a restrained `text-wrap: pretty` where supported; never force
a `<br>` inside prose.

## 8. Motion

One timeline, section-scoped, GSAP + ScrollTrigger, `once: true`.
Total choreography under ~1.6s. Nothing loops.

### 8.1 Entrance (on first entry, once per load)

1. **Eyebrow + rule** — 400ms ease-out; the hairline scales X 0→1
   from the left, matching `.services__rule`.
2. **Statement** — the four lines are wrapped in per-line
   `overflow: clip` masks in the server HTML (`<span class="line">
   <span class="line__inner">`). Inner spans translate Y from 100%
   to 0 with `power3.out`, 900ms, 90ms stagger. Line 4 starts last.
3. **Accent word** — no separate animation. It rides its line.
   (Revealing `earns` separately would read as a trick.)
4. **Position + body** — 24px rise, opacity 0→1, 600ms,
   `power2.out`, starting 200ms after the statement begins,
   60ms stagger per block.
5. **Belief rows** — the hairline wipes in (scaleX), then the row
   rises 16px, 500ms, 90ms stagger.
6. **Colophon foot** — rule scaleX, then mark and line fade+rise.
   Vercy is *not* animated in beyond this; see 8.2.

Trigger: one ScrollTrigger at `"top 72%"` on the section. The
statement may use its own trigger at `"top 78%"` so it never
finishes revealing off-screen on short viewports.

### 8.2 Vercy — one reaction, once per session

- On the colophon foot entering view, the mark swaps from the
  **Neutral** crop to the **Happy** crop for 420ms, then returns.
  This is the only character animation in the section.
- Implemented as a single `src`/`srcset` attribute swap on one
  `<img>` (or a two-image opacity crossfade if the swap flickers).
  No sprite sheets, no video, no canvas, no Lottie.
- Gate: fires at most once per browser session
  (`sessionStorage` key `vc:vercy-greeted`), never on repeat
  scroll-through, never on a return visit.
- Skipped entirely under `prefers-reduced-motion: reduce` and when
  `navigator.connection.saveData` is set.
- **Do not** add hover animation, cursor tracking, idle bobbing, or
  blinking loops. If a blink loop is ever proposed, it is a NEW
  decision requiring owner approval.

### 8.3 Hover / focus (fine pointers only)

- Belief row hover: title shifts 4px right (not 6px, to stay calmer
  than Services), hairline brightens to 32% ivory, definition to
  86% ivory. 250ms, `--ease-out-expo`. No color change, no numeral
  movement.
- CTA: inherits the existing `.text-link` behaviour unchanged.
- Nothing in this section responds to the pointer except those two.

### 8.4 Reduced motion

- All entrance tweens are skipped; every element renders at final
  state (opacity 1, no transform, masks fully open). The
  `motion-ready` gate class must never be applied to About when
  reduced motion is set — same pattern as Hero/Services.
- The Vercy reaction is disabled.
- A mid-session OS-level switch toggles cleanly: kill only this
  section's tweens and triggers; never touch other sections'
  ScrollTriggers (the Services lesson, 03-SERVICES §8.4).

### 8.5 No-JS

No gate classes in the server HTML. The statement, all four lines,
body, beliefs, colophon mark (static Neutral), and CTA render fully
without JavaScript. There is no state to lose — the scene is static
copy.

## 9. Vercy — authentic asset preparation

### 9.1 Source

`docs/references/Vercy Mascot Expression Board.png` — 1536 × 1024,
opaque. This is the **only** authentic Vercy artwork in the
repository. `public/assets/mascot/` is currently empty.

| Region | Coordinates (x1, y1, x2, y2) | Cell size | Asset |
|---|---|---|---|
| Expression Library, row 1 | 410, 46 → 1520, 172 | ~111 × 126 | 10 crops |
| Expression Library, row 2 | 410, 186 → 1520, 312 | ~111 × 126 | 10 crops |
| Gesture Library | 410, 362 → 1150, 498 | ~74 × 136 | 10 poses |
| Action Set | 410, 598 → 1140, 730 | ~122 × 132 | 6 actions |
| Turnaround | 410, 786 → 950, 972 | ~109 × 186 | 5 views |

Columns begin at approximately x = 420 and repeat on a ~110px pitch
(row 1/row 2) — the exact pitch must be re-measured on the
individual cell before each crop, because the cells are not
perfectly uniform.

### 9.2 Assets required by this specification

Only **two** crops are needed for V1:

| File | Source cell | Why |
|---|---|---|
| `vercy-neutral.avif` / `.webp` | Expression row 1, col 1 | resting state |
| `vercy-happy.avif` / `.webp` | Expression row 1, col 2 | 420ms greeting |

Optional, only if the owner later approves a second reaction:
`vercy-curious` (row 1, col 6) and `vercy-thinking` (row 1, col 7).

Nothing else from the board is used. Gestures, actions, turnaround
and motion sequences stay unused in V1 — they are full-body poses
that would require the character's limbs to be readable at 64px,
which they are not.

### 9.3 Preparation procedure (per crop)

1. **Locate** the cell using the region table, then nudge by
   inspecting a 2× zoom of the cell edges.
2. **Crop the bust only**, not the full body: head, helmet, upper
   chest. At 64–80px the circular mark can show roughly the head
   and shoulders — a full body at that size reads as noise. Crop
   from the top of the helmet to just below the chin/chest line.
3. **Fit into a centred square** with the head's optical centre on
   the circle's centre, leaving ~8% breathing room at the top of
   the helmet.
4. **Mask to a circle** with a `border-radius: 50%` container plus
   `overflow: hidden` — do **not** bake a circular alpha into the
   raster. The circular frame is a design element (a printer's
   device), and CSS gives a crisper edge at every DPR.
5. **Background handling.** The source cell sits on the board's dark
   card field (approximately `#0B1520`). The mark's circular frame
   is filled with that sampled field colour, not Midnight Black, so
   the seam is invisible; the frame carries a 1px ivory-14%
   hairline ring so it reads as a deliberate device rather than an
   unstyled image. This is the honest option: no invented character
   art, no fake transparency, no visible white sheet edge.
6. **Anti-aliased edge.** After masking, apply a 1px inset ring on
   the container rather than an alpha feathered edge — feathering
   a raster circle against a dark field produces a halo.
7. **Scale.** Export at 2× the largest CSS size (80px → 160px
   square), then also a 1× 80px and a 64px variant if the browser
   needs them. Two sizes per expression are enough.
8. **Encode.** AVIF primary, WebP fallback, via the same `.avif` /
   `.webp` pair convention as Selected Work's `<picture>` pattern.
   Target: ≤ 6 KB AVIF, ≤ 12 KB WebP per crop at 160px.
9. **Never** upscale beyond the source. A 160px square crop comes
   from roughly 260 px of board pixels — there is resolution to
   spare; do not push past 200px square.
10. **Never** recolour, tint, sharpen, regenerate, or re-prompt the
    character. Colour grading is out of scope; the board's own
    lighting is the character's look.

### 9.4 Feasibility assessment

Straightforward: the expression cells are dark-field, high-contrast,
and cleanly separated by wide gutters, so a rectangular crop plus a
CSS circular mask lands correctly. Risks:

- **Board frame contamination.** The board's rounded card borders
  and the white sheet background sit close to the outer columns
  (col 10 of each expression row and the shortest gesture columns).
  Verify each chosen cell's right/left edge at 4× zoom before
  cropping.
- **Label contamination.** Each cell's name label sits ~8px below
  the bust. Crop one or two pixels above the label baseline; if
  any glyph intrudes, mask it with the circular frame's lower edge
  rather than painting over the art.
- **Background mismatch.** If the sampled field colour visibly
  steps at the frame edge against Midnight Black, the fix is the
  hairline ring (9.3 step 5), not a blur or a gradient.

### 9.5 Text-only fallback (pre-approved)

If clean extraction is not feasible at review, the section ships
**without any Vercy image** and the colophon foot becomes:

```
[hairline rule]

Vercy is the studio's companion.
It reviews everything we ship.

                          Start a Project →
```

Set at 0.9375rem Inter, no logo substitute, no placeholder box, no
emoji, no geometric stand-in. The colophon reads as a signature
line and the section loses nothing structurally. Shipping the
fallback is a complete V1, not a degraded one.

A second fallback, if the companion line itself is judged too
oblique without the mark: omit the companion line as well and leave
the rule and CTA. The beliefs still close the section.

## 10. Accessibility

- **Structure.** One `h2` (the statement). Beliefs are an unordered
  or ordered list — use `<ol>` because the numerals are meaningful
  ordering, and keep the numerals as visible `<span aria-hidden>`
  with the title supplying the reading. Position line and body are
  `<p>`. The colophon foot is a `<div>` with the companion line as
  `<p>`.
- **Statement readability.** Each masked line is a `<span>` inside
  the `h2`; the accessible text is the full sentence with natural
  spacing. Ensure the line spans do not inject stray spaces into
  the accessible name — the statement's accessible text must read
  "We build software that earns its place on the internet."
- **Vercy mark.** Decorative: `alt=""` plus an accompanying text
  line that carries the meaning. Do not label the image "Vercy the
  robot mascot" — the meaning is in the copy, and the character has
  an established name that the copy already uses.
- **Contrast (targets, verified at build).** Statement ivory on
  Midnight ≈ 18:1. Body 78% ivory ≈ 11:1. Belief definitions
  74–78% ≈ 10:1. Cantaloupe numerals on Midnight ≈ 6.4:1 — passes
  AA for the small non-essential index, and it is not the sole
  carrier of order because the belief titles are readable prose.
  Companion line 62% ≈ 6.6:1, matching the Services foot note.
  Electric Blue accent on Midnight ≈ 5.6:1 — the accent word is
  inside a sentence whose meaning survives without colour, so the
  blue is emphasis, not information.
- **Focus.** Only two focusable elements: the CTA (existing 2px
  ivory `:focus-visible` ring) and the skip-link chain. Belief rows
  are not links and must not be tabbable.
- **Reduced motion.** §8.4.
- **Zoom.** At 200% browser zoom the layout reflows to the mobile
  composition; no fixed-height masks clip glyph descenders. The
  line masks need `padding-bottom` equal to the descender depth so
  "place" and "internet." are never clipped.
- **Selection.** Existing `::selection` (Electric Blue on Midnight)
  applies; verify the statement remains legible when partially
  selected.

## 11. Performance

- One section, no background media, no video, no WebGL, no canvas.
- Two images total: ~6 KB AVIF + ~12 KB WebP for the mark. Both
  `loading="lazy"` `decoding="async"` with explicit
  `width`/`height` to reserve the square and avoid layout shift.
  The 64–80px mark is below the fold for most loads; do not
  preload it.
- The greeting crop is the **same image element** with a swapped
  source, so the second expression is only fetched when the swap
  fires (and never under reduced motion / saveData). If the swap
  flickers on slow connections, preload the happy crop on idle via
  `requestIdleCallback` — not on mount.
- One `useGSAP`-style hook, one ScrollTrigger pair
  (eyebrow+body, statement) plus one IntersectionObserver for the
  greeting. No `will-change` left on after tween completion.
- New JS budget target: ≤ 3 KB gzipped on top of the existing
  bundle. No new dependency. `gsap` is already installed and used.

## 12. Integration

- **Anchor.** `id="about"` on the section element.
  `lib/site.ts` already lists `{ label: "About", href: "#about" }`;
  no change to `primaryNav` is required. The mobile menu picks it up
  automatically.
- **Files this section will touch at build time** (documented for
  the later pass, not created now):
  - `components/about.tsx` (new)
  - `lib/about.ts` (new — copy constants, belief list, asset paths)
  - `lib/about-motion.ts` (new — GSAP entrance + greeting trigger)
  - `app/globals.css` (append a `/* About (Section 04) */` block;
    no edits inside existing blocks)
  - `app/page.tsx` (add `<About />` after `<Services />`)
  - `app/layout.tsx` (only if the section needs a metadata
    description update — not expected)
- **Locked sections.** Hero V2.2, Selected Work V1 and Services V1
  are not edited. No token renames, no `:root` changes, no global
  `scroll-padding-top`. If a shared rule must change, it is raised
  for owner approval before touching it.
- **Reused tokens.** `--color-midnight`, `--color-electric`,
  `--color-cantaloupe`, `--color-ivory`, `--gutter`,
  `--ease-out-expo`, `--font-display`, `--font-sans`,
  `--font-editorial`. Reused classes: `.eyebrow`, `.text-link`,
  the `.services__rule` hairline treatment (re-authored under an
  About-prefixed name rather than shared, to keep Services locked).
- **Copy source.** Where practical, belief strings and the copy
  land in `lib/about.ts` as typed constants, mirroring the
  `lib/services.ts` pattern.

## 13. Implementation boundaries (for the later build pass)

Build exactly this:

1. Eyebrow, hairline rule, four-line statement with one blue accent.
2. Position line, two (or three) body paragraphs.
3. Three belief rows.
4. Colophon foot: rule, Vercy mark, companion line, CTA.
5. One entrance timeline, one greeting swap, reduced-motion and
   no-JS paths.

Do not build:

- A framed plate, screenshot, or device mock-up.
- A rotated wordmark or multi-column newspaper flow.
- Team cards, headshots, portraits, avatars, or bios.
- Timeline, milestone list, or founding-date display.
- Testimonial, logo wall, award row, or ratings.
- Counters, animated statistics, or numbers of any kind beyond the
  three belief indices.
- Cursor effects, marquees, parallax on type, background loops.
- Any Vercy pose from the board's Gesture, Action, or Turnaround
  sections.
- A second `h2`, or beliefs promoted to headings.

## 14. Acceptance criteria

1. `#about` in the primary nav lands on the section with eyebrow and
   first statement line visible below the header.
2. Section renders with exactly one `h2`, three belief list items,
   one image, one CTA link.
3. No horizontal overflow at 320, 360, 390, 768, 1024, 1180, 1440,
   1920. Verified, not assumed.
4. Statement lines are fully visible, never clipped at the
   descender, at 320px and at 200% zoom.
5. Reduced motion: no transform, no opacity change, no greeting
   swap — all content at final state, no console errors.
6. No-JS: full copy visible, static Neutral mark, working CTA.
7. Greeting swap fires at most once per session and not at all
   under saveData.
8. Hero, Selected Work and Services screenshots are byte-identical
   to their approved state (no height, no spacing drift introduced
   by the new section).
9. Contrast measured on the built page for every text style;
   all ≥ AA.
10. `next lint`, `tsc --noEmit`, `next build` pass; page remains
    statically prerendered.
11. The Vercy image, if shipped, is visibly a crop of the
    authentic board with no regenerated or altered character
    features; otherwise §9.5 fallback ships.

## 15. Approval workflow

1. Owner reviews this specification.
2. Owner resolves §16 decisions.
3. Implementation pass builds to §13, verifies §14, appends an
   implementation log to this file.
4. Owner approves or returns for revision.
5. Only then is About marked APPROVED and added to `DECISIONS.md`
   as locked.

Nothing in this file may be marked approved before step 4.

## 16. Remaining decisions

Decisions 1–4, 6 and 8 are settled by this implementation (see §17).
Decisions 5, 7, 9 and 10 remain open for owner review.

| # | Decision | Recommendation | Impact if deferred |
|---|---|---|---|
| 1 | ~~Vercy mark vs. text-only fallback~~ | **Resolved:** mark shipped as board crops | — |
| 2 | ~~Resting expression~~ | **Resolved:** Neutral (row 1, col 1) | — |
| 3 | ~~Greeting~~ | **Resolved:** shipped, 420 ms, once per session, disabled under reduced motion and Save-Data | — |
| 4 | ~~Vercy pronoun~~ | **Resolved:** "It" (interim; one-word change if the owner prefers otherwise) | — |
| 5 | Keep the "reviews everything we ship" half of the companion line, or shorten to "The studio's companion."? | Keep in spec; drop at review if it reads as a claim | Copy only |
| 6 | ~~Third body paragraph~~ | **Resolved:** out; two paragraphs balance the desktop columns | — |
| 7 | Belief 03 "Small studio, direct access" — does it risk reading as a limitation to enterprise buyers? | Keep; it is the section's strategic core | Copy only |
| 8 | ~~CTA at the section end~~ | **Resolved by owner direction:** no CTA; the section ends on the colophon | Reversible — §4.7 link can be restored |
| 9 | Confirm the board authorises commercial cropping. The expression board is a reference sheet; if it was produced as an internal reference without usage rights for web display, the fallback becomes mandatory. | Owner to confirm provenance | Blocks §9 entirely |
| 10 | Should Vercy appear anywhere before About (e.g. a footer or 404 mark) to prepare the introduction? | No — About is the first and only appearance in V1 | None |

## 17. Implementation log (V1)

Built 2026-11-24 to Concept A+C. Owner direction applied:

1. Oversized editorial statement, four masked lines.
2. "earns" in Instrument Serif Italic Electric Blue.
3. Documented asymmetric desktop composition; mobile/tablet single column.
4. The three approved beliefs, unchanged.
5. Colophon foot instead of a second Start a Project CTA.
6. `id="about"` on the section, so the existing nav item resolves.

### Files added / changed

| File | Status | Purpose |
|---|---|---|
| `components/about.tsx` | new | Section markup; `VercyMark` subcomponent |
| `lib/about.ts` | new | Statement lines, position, body, beliefs, Vercy line + asset paths |
| `lib/about-motion.ts` | new | GSAP entrance, colophon reveal, greeting trigger |
| `app/globals.css` | appended | `/* About (Section 04 …) */` block only; no existing rule edited |
| `app/page.tsx` | edited | `<About />` after `<Services />` |
| `public/assets/mascot/*.webp` | new | 6 crops (Neutral/Happy × 72/96/160) |

No locked-section file was touched. No dependency added.

### Deviations from the specification (and why)

1. **No section CTA.** §4.7 specified a `Start a Project` text link in
   the colophon. Owner direction for this pass explicitly ends the
   section on the Vercy colophon instead. The site therefore has no
   CTA between Services and Process; the header `Let's Talk` pill
   remains the persistent conversion path. Decision 8 in §16 is now
   resolved against the CTA.
2. **Vercy ships as **WebP only**, not AVIF + WebP.** §9.3 asked for
   an AVIF primary. The AVIF crops decode to a stale frame in Chromium
   when swapped, so the AVIF files were dropped. WebP is 3.3 KB at
   160px — the format saving was negligible. The `image-set()` and any
   `<picture>` AVIF path are documented as rejected in the component
   comments so this is not re-litigated.
3. **The mark is drawn with CSS `background-image`, not `<img>`.**
   §9.3 steps 4–5 assumed a raster inside a circular container. Two
   implementations were found non-viable in Chromium and are recorded
   here:
   - a stacked second layer is clipped by the frame's
     `overflow: hidden` circle (the `border-radius` clip removes an
     absolutely-positioned child);
   - mutating `<img src>` / `<source srcset>` on a `<picture>` repaints
     the previous frame for the full 420 ms hold.
   The shipped approach paints `--vercy-neutral` on a `.vercy__face`
   span and swaps to `--vercy-happy` via one `is-greeting` class. The
   frame keeps `border-radius: 50%` + `overflow: hidden` on the outer
   span; the inner face also carries its own radius so the circle is
   correct even without clipping.
4. **Crop geometry re-measured.** The §9.1 region table estimated a
   ~110 px column pitch; the real cells are not uniform. Each bust was
   located by bright-pixel bounding box on the board and expanded to a
   centred square at 1.10× the head box, so both expressions share the
   same optical scale:
   - Neutral: `(414, 60) → (497, 143)`
   - Happy: `(519, 57) → (604, 142)`
   Both crop above the cell name label, so no label pixels reach the
   frame.
5. **`scroll-margin-top: 1.5rem` scoped to `.about` only.** §3 asked
   for a section-scoped landing offset. Confirmed: `#work` and
   `#services` landing behaviour is unchanged.
6. **Third body paragraph (§4.4 optional) is not shipped.** Two
   paragraphs balance the desktop columns at 1440; the third pushed the
   left column well past the belief column with no gain.

### Motion as built

- One entrance timeline on `top 78%`: head rule, eyebrow, eyebrow
  line, four statement lines (`yPercent: 108 → 0`, 1.05 s,
  90 ms stagger), position + body (22 px rise, 70 ms stagger),
  three belief rows (16 px rise, 90 ms stagger).
- A separate colophon timeline on `top 92%` for the rule and foot.
- Greeting: IntersectionObserver at `threshold: 0.6`, fires once per
  browser session (`sessionStorage: vercuno-vercy-greeted`), holds
  Happy for 420 ms, then returns to Neutral.
- No pinning, no scroll hijacking, no loop, no cursor effect.

### Actual test results

Environment: `next start` on port 4317, production build, Playwright
(Chromium).

- **`npm run typecheck`** — pass, 0 errors.
- **`npm run lint`** — pass, 0 errors, 0 warnings.
- **`next build`** — pass. `/` prerenders static. No new dependency.

Viewports checked: 1440×900, 1180×820, 1024×768, 768×1024, 390×844,
320×568.

| Check | Result |
|---|---|
| Horizontal overflow (`scrollWidth > innerWidth`) | none at any width |
| Elements escaping the viewport inside `#about` | 0 at every width |
| Statement descender clipping | 0 clipped lines at every width |
| `h2` count in section | 1 |
| Belief list items | 3 |
| Statement accessible name | "We build software that earns its place on the internet." (matches visual text) |
| Statement size | 40px @320, 41.3px @390, 61.4px @768, 67.6px @1024, 77.9px @1180, 95px @1440 |
| Vercy mark size | 56px @320/390, 64px @768, 80px @1024+ |
| Console / page errors | 0 at every width |
| Colophon reveal | opacity 1 after scrolling into view; 0 hidden elements remaining |

**`#about` navigation.** Desktop nav `About` → hash `#about`, section
top at 24px, eyebrow at 141px, visible. Mobile menu (390) → hash
`#about`, eyebrow at 134px, visible. Keyboard: the nav link is 5th in
tab order, receives the 2px ivory `:focus-visible` ring, and Enter
lands on the section.

**Keyboard.** The section itself contains no focusable elements
(deliberate — beliefs are not links and no CTA is shipped), so tab
order passes through it without a trap. Verified by walking 25
presses from the top: skip-link → brand → Work → Services → About →
Let's Talk → … → Services CTA → footer.

**Reduced motion.** `motion-ready` is not applied. 0 elements below
opacity 1, 0 transformed elements, greeting never activated, and the
network log shows only `neutral-160.webp` was fetched — the Happy crop
is never downloaded. Mid-session OS toggle is handled (disposers stop
only this section's tweens and triggers).

**No-JS.** Section present, all 4 statement lines visible, 3 beliefs,
Neutral face painted from CSS, companion line rendered,
`motion-ready` absent.

**Greeting.** Fires on first scroll into the colophon, reverts after
420 ms, writes the session flag, and does not fire again on reload in
the same session.

**Locked-section regression.** Hero 900px, Selected Work 1143px with
3 rows, Services 1667px with 4 entries — all unchanged. Selected
Work's hover plate still reaches opacity 1. No console errors.

### Known issues

- The Vercy mark carries the board's card field (`#050B15`) as its
  circular fill plus a 1px ivory-14% ring. Against Midnight `#02070A`
  this reads as a deliberate device, but it is visible as a very
  slightly lighter disc at large sizes. Raising the ring to ~20% would
  soften the edge if the owner prefers.
- The Happy crop's head is framed marginally tighter than Neutral even
  after optical matching; the difference is ~2% of frame width and is
  not noticeable at 56–80px.
- The section has no CTA (see deviation 1). If the owner wants a
  conversion moment here, the §4.7 `Start a Project` link can be added
  beside the companion line without structural change.
- Commercial usage rights for cropping the expression board are still
  unconfirmed by the owner (decision 9). The shipped assets are crops
  of the repository's own reference board only.

### Preview

`npm run dev` → http://localhost:3000/#about

Status: IMPLEMENTED — PENDING OWNER IMPLEMENTATION APPROVAL.
NOT APPROVED. Locked sections untouched.

---

## 18. V1.1 — Interactive Vercy

Owner direction (2026-11-24): the V1 About design is approved. Enhance only
the existing Vercy colophon mark so the authentic character is interactive.
Layout, typography, copy, spacing and section structure are unchanged.

This supersedes 04-ABOUT §8.2, which said the mark must not react to the
pointer and that any such reaction needed a new owner decision. This task is
that decision.

### 18.1 Source assets and preparation

The authentic source material is the eight green-screen renders added to
`docs/references/` (`image_20261122223734.jpg` … `image_20261122224426.jpg`,
1376×768). Four are 4×2 expression/turnaround contact sheets; four are
full-frame single renders. `docs/references/vercy-greenscreen/` named in the
task brief does not exist; the files above are the only authentic Vercy
artwork beyond the original expression board.

`scripts/vercy-export.mjs` is the reproducible pipeline and is committed as
tooling (not shipped to the browser). Per state it:

1. cuts the source cell (contact-sheet cell or full frame);
2. chroma-keys the green field to alpha with a soft ramp plus a despill pass
   that clamps residual green to the non-green channel ceiling *after* alpha
   is derived, so antialiased edges read neutral rather than green;
3. keeps only the largest opaque cluster, discarding JPEG ringing specks;
4. locates the head as the widest bright band in the upper silhouette and
   crops a square window anchored on it at a fixed head-to-frame ratio;
5. exports 320/160/96/72 WebP with alpha.

Measured quality of the keyed output: **0 visible green-dominant pixels**, and
edge pixels carry *negative* green excess (mean −16), i.e. no green halo on a
dark background. Verified composited on Midnight, white and mid-grey.

Three states ship, all authentic and pixel-identical to the renders in
character design:

| State | Source | Authentic content | Use |
|---|---|---|---|
| `neutral` | `…223734.jpg` cell r1c1 | calm closed-eye face, arms down | idle |
| `happy` | `…224426.jpg` full frame | curved eyes, thumbs up, raised fist | hover / focus |
| `surprised` | `…224254.jpg` full frame | wide round eyes, both hands raised | click / tap |

Head scale was normalised across all three (0.741 / 0.738 / 0.734 of frame
width) so an expression swap never resizes the character.

**Gap reported:** there is no authentic "waving" state in the source set. The
task allowed "Happy **or** Waving"; Happy (thumbs up) is shipped. No gesture
was invented and no frame was synthesised.

Asset weight: 7.5–7.7 KB at 160px, 14–18 KB at 320px, 3–4 KB at 96px.

### 18.2 Interaction contract

The mark is a real `<button>` carrying an accessible name
(`"Vercy is the studio's companion. It reviews everything we ship. Activate to
say hello."`), so keyboard users get identical behaviour.

| Trigger | State | Notes |
|---|---|---|
| idle | Neutral + breathing | 5.2 s loop, 2 px rise + 1.2% scale, `sine.inOut` |
| pointer enter / keyboard focus | Happy | pointer events for `pointerType: "touch"` are ignored |
| pointer leave / blur | Neutral | |
| click / tap / Enter / Space | Surprised, then back | holds 620 ms, 6% scale pop |

- All state changes are **CSS class toggles** (`is-happy`, `is-surprised`).
  No React state, so pointer motion triggers zero re-renders.
- The three images are absolutely stacked; only `opacity` changes, so **there
  is no layout shift**: measured mark, companion-line and row geometry are
  byte-identical across idle → happy → surprised → idle.
- The breathing loop is GSAP on an inner `.vercy__breath` wrapper, and is
  **paused when the mark is off-screen** (`IntersectionObserver`), so it costs
  nothing while the section is not visible. It runs on the transform channel
  and cannot fight the opacity cross-fade.
- Happy and Surprised are `loading="lazy"` and additionally warmed by a
  prefetch only once the mark is within 200 px of the viewport.
- Touch taps skip the Happy state entirely (no hover-out exists to clear it)
  and go straight to Surprised → Neutral.

### 18.3 Reduced motion and no-JS

- `prefers-reduced-motion: reduce`: the motion hook returns before wiring any
  listener; CSS pins the mark to Neutral, hides the two reaction images, and
  removes breathing, hover, surprise and cursor affordance. Verified: network
  log contains **only** `neutral-96.webp` — the reaction states are never
  downloaded.
- No-JS: the mark renders as a static Neutral portrait inside a real button,
  with all copy, four statement lines and three beliefs present.
- Save-Data: character wiring is skipped, same as reduced motion.

### 18.4 Files changed in V1.1

| File | Change |
|---|---|
| `scripts/vercy-export.mjs` | new — asset prep pipeline (tooling, not shipped) |
| `public/assets/mascot/*.webp` | replaced — 12 transparent WebP busts (3 states × 4 widths) |
| `lib/about.ts` | `vercyMark`/`vercyField` replaced by `vercyStates`, `vercyWidths`, `vercySrcSet` |
| `lib/about-motion.ts` | greeting replaced by the Vercy character controller |
| `components/about.tsx` | static span replaced by the three-layer `<button>` |
| `app/globals.css` | `.vercy*` rules rewritten; reduced-motion block extended |

No layout, type, copy or spacing rule was touched. Hero, Work and Services are
untouched.

### 18.5 Test results (V1.1)

Production build, `next start` on port 4317, Playwright (Chromium).

- `npm run typecheck` — pass.
- `npm run lint` — pass, 0 errors, 0 warnings.
- `next build` — pass, `/` prerenders static.

| Check | Result |
|---|---|
| Horizontal overflow, 1440/1180/1024/768/390/320 | none at any width |
| Elements escaping viewport in `#about` | 0 at every width |
| Mark size | 80px @1024+, 64px @768, 56px @390/320 |
| Layout shift across all states | none (geometry identical) |
| Console / page errors | 0 at every width, every scenario |
| Desktop flow | idle → happy (hover) → surprised (click) → happy → idle |
| Keyboard flow | focus → happy; Enter → surprised; Tab out → idle |
| Mobile tap (390, touch) | neutral → surprised → neutral |
| Reduced motion | 0 hidden, breathing `none`, reaction images `display:none`, only neutral fetched |
| No-JS | button + neutral portrait + full copy |
| Locked sections | Hero 900, Work 1143 / 3 rows, Services 1667 / 4 entries — unchanged |

### 18.6 Known issues and limits

- The reaction poses are wider than the resting portrait, so each state uses
  its own `object-position`/`scale` to stay legible inside the circle. The
  head scale is matched, but the Happy/Surprised framing shows more torso than
  Neutral by necessity — the authentic action frames are full-body.
- There is no authentic waving state, so hover uses Happy. See 18.1.
- Commercial usage rights for the green-screen renders are unconfirmed, the
  same open item as decision 9 for the original board.
- The breathing loop is disabled when Save-Data is set, which also disables
  hover/click reactions; the mark then stays Neutral and static.

### Preview

`npm run dev` → http://localhost:3000/#about

Status: IMPLEMENTED (V1.1) — PENDING OWNER IMPLEMENTATION APPROVAL.
NOT APPROVED. Locked sections untouched.

## Owner Approval — 2026-11-24

Status: APPROVED
Version: About V1.1

The owner accepted the current About design and
interactive Vercy implementation.

Keep the approved design locked.
Verify mascot asset usage rights before public launch.
