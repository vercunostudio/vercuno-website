# VERCUNO — Section 03: Services

Version: 1.0 (Concept C+ — The Interactive Operating Manual)
Status: SPECIFICATION — PENDING OWNER APPROVAL
Concept source: Services design exploration (Concepts A / B / C)
Owner direction: Concept C "The Operating Manual", enhanced with
Concept A's reciprocal interaction.
Scope: Implemented as Section 03 V1 below Selected Work.
Status: PENDING OWNER IMPLEMENTATION APPROVAL.

Working title: Interactive Operating Manual.

Final owner decisions (2026-11-24):
1. Keep the Electric Blue Instrument Serif Italic "Build." —
   the blue italic accent is part of VERCUNO's typographic
   identity, not a one-off.
2. No mobile jump index. The four services read naturally in one
   column at every width below the desktop breakpoint.
3. Technical Maintenance & Support stays as a service offering,
   with no invented customer history, SLAs, certifications,
   guarantees, or metrics.
4. Shortened index labels at intermediate desktop widths; full
   service names everywhere in the content and in accessible
   names.

## 1. Purpose

Explain what VERCUNO builds, in commercial language, to business
owners, founders, and technical partners who are deciding whether
to start a conversation.

The section must:

1. Make the four service areas legible in one scroll.
2. Signal engineering depth without listing a fantasy tech stack.
3. Feel unmistakably VERCUNO: editorial, asymmetric, typographic.
4. Route intent to Start a Project.

It also gives the existing `Services` navigation item
(`href="#services"` in `lib/site.ts`) a real destination. The
`#services` anchor is reserved today and must be documented here
as the future target.

## 2. Concept

**The Operating Manual.** A service catalogue is treated as a
manual: numbered chapters, a persistent table of contents, hairline
rulers, and precise stage directions instead of marketing gloss.

Concept C supplies the structure (editorial masthead + indexed
entries + sticky index). Concept A's reciprocal interaction supplies
the movement: selecting, hovering, or focusing a service establishes
a two-way relationship between the index and the entry — the index
lights the entry, and the entry lights the index.

Explicitly rejected from the exploration:

- Cursor-following screenshot plate (Concept A's plate). Not used.
- Scroll hijacking, pinning, or snap. Not used.
- Glass cards, icon grids, gradient blobs, stock device mockups.

Type is the design. Structures are hairlines. Motion is small,
precise, and reversible.

## 3. Section identity

Anchor: `id="services"`
Heading element level: `h2`
Landing behavior: `#services` must land with the eyebrow and
masthead heading legible just below the viewport top. Do not
introduce a global `scroll-padding-top` that would alter the two
approved sections; scope scroll offset to this landing only (see §11).

Background: Midnight Black `#02070A`. The existing global film grain
overlay already applies; nothing new is layered on top.

## 4. Content (final copy)

Copy is derived only from verified evidence: the PRD service list
(§3), the Hero lede, and the three founder projects (WORLD//ONE,
VETO, AI Content Studio) whose capabilities are documented in
`lib/site.ts` and `docs/sections/02-SELECTED-WORK.md`.

Forbidden: guarantees, timelines, SLAs, response times, uptime,
client names, testimonials, fixed pricing, package tiers, invented
metrics ("100+ projects"), and any claim of paid client work for the
founder projects.

### 4.1 Masthead (left editorial column)

- Eyebrow: `SERVICES`
- Heading, two lines:
  - `What`
  - `We Build.` — "We" in Manrope ExtraBold Ivory;
    "Build." in Instrument Serif Italic Electric Blue, echoing the
    Hero's "Better." and Selected Work's "Work."

  The blue italic accent is now used at every section heading.
  This repetition is confirmed house style (an editorial
  signature) by owner decision — keep "Build." in Electric Blue
  Instrument Serif Italic.
- Secondary line (Instrument Serif Italic, muted ivory ~66%):
  `Capabilities, stated plainly.`
- Ledger note (Inter, small, muted):
  `Four disciplines. One studio. Scope is defined per project.`

### 4.2 Section lede (right column, above entry 01)

`Four ways to work with the studio. Every engagement is scoped
individually after a short discovery, so the work fits the problem
rather than a package.`

### 4.3 Service entries

Each entry: index, title, one-line definition, a short scope
paragraph, and a capability list of four items. The capability list
uses a middot separator to match the Hero footer vocabulary.

**01 — Web Development**
Definition: `Sites that carry a brand and convert.`
Scope: `Design and engineering for marketing sites, brand sites,
and content-driven pages — built for fast loading, clean semantics,
and straightforward editorial control.`
Capabilities: `Design systems` · `Responsive implementation` ·
`Performance` · `SEO foundations`

**02 — Custom Software**
Definition: `Applications built around how your business runs.`
Scope: `Web applications where the interface is the product:
dashboards, internal tools, and data-driven interfaces designed
around real operational workflows.`
Capabilities: `Product interface design` · `Web application
engineering` · `Authentication and permissions` · `Third-party
integrations`

**03 — AI & Workflow Automation**
Definition: `Repetitive work, handled by systems.`
Scope: `AI-assisted and rule-based pipelines that move content,
data, and decisions through a defined process, with a human
review point wherever the outcome matters.`
Capabilities: `AI content pipelines` · `API and data flow
orchestration` · `Human review checkpoints` · `Prompt and logic
documentation`

**04 — Technical Maintenance & Support**
Definition: `Keep what ships healthy and current.`
Scope: `Ongoing technical care for live sites and applications:
fixes, dependency and security updates, and incremental
improvements.`
Capabilities: `Bug fixes` · `Dependency and security updates` ·
`Monitoring checks` · `Incremental improvements`

Verification hooks (for the implementer, not shown on the site):

- 01 is evidenced by WORLD//ONE (editorial web build).
- 02 is evidenced by VETO (permissions-based web application).
- 03 is evidenced by AI Content Studio (AI content workflow).
- 04 is the PRD service list item; it must stay framed as a
  service offered, never as an active contracted arrangement with
  named clients.

Do not add a fifth service, a pricing row, or a "starting at" line.

### 4.4 CTA (section footer strip)

Supported by the existing working destination only:
`projectMailto` from `lib/site.ts` (`mailto:vercuno.studio@gmail.com`,
subject `Project inquiry — VERCUNO`). No new form, no new route.

- Note (left): `Not sure which one you need? Describe the problem
  and the studio will scope the right shape.`
- Link (right): `Start a Project ↗` — reuses the existing
  `.text-link` component pattern and its hover motion.

The note is supporting text only; it makes no promise about how
quickly a reply arrives.

## 5. Desktop composition

Reference viewport: 1440 x 900. Verify 1280, 1920, and 1024.

Grid: two columns inside the standard `--gutter` padding
(`clamp(1.25rem, 5vw, 4.5rem)`). Deliberate asymmetry:

| Column | Track |
| --- | --- |
| Left editorial masthead | `minmax(0, 0.86fr)`, sticky |
| Right entries | `minmax(0, 1.3fr)` |
| Column gap | `clamp(2.5rem, 6vw, 7rem)` |

Anatomy, top to bottom:

1. **Section head row** (full width): eyebrow (`SERVICES`, orange
   rule + Inter Medium uppercase, tracked 0.2em) on the left; a
   factual count `FOUR DISCIPLINES` on the right in the muted
   counter style used by Selected Work's `3 PROJECTS`. Matches the
   established eyebrow anatomy exactly.

2. **Two-column body.** The left column begins at the same
   baseline as the right column's lede.

   Left (sticky):
   - Masthead heading, `What` / `We Build.`, Manrope ExtraBold with
     the blue Instrument Serif Italic accent, size
     `clamp(3.5rem, 6.4vw, 6.5rem)`, line-height 0.92,
     letter-spacing -0.05em.
   - Secondary italic line, 1.05–1.2rem, ~66% ivory.
   - Ledger note, 0.8rem, ~58% ivory.
   - Then a vertical hairline starting a **Service Index**: four
     links. Full titles at wide desktop; shortened labels at
     intermediate desktop widths (1024–1180px) where the left
     column cannot hold the longest title on one line:
     `Web Development` → `Web`, `Custom Software` → `Software`,
     `AI & Workflow Automation` → `Automation`,
     `Technical Maintenance & Support` → `Support`.
     Full service names always appear in the entries and in each
     index link's accessible name (see §9). Index type: Inter
     Medium, 0.78rem, tracked 0.1em, index numerals tabular at
     58% ivory, labels at 70% ivory.
   - Index links are real anchors to the entry ids
     (`#services-web-development`, etc.). Clicking one scrolls the
     native way and activates that entry.

3. **Right column: four entries.** Each entry is a block with:
   - A full-width hairline at its top (1.75px of the row's width in
     Cantaloupe at the active/hover state; 1px `rgb(245 248 255 /
     16%)` at rest).
   - Row A: index `01` (tabular, Cantaloupe Orange `#FC734D`,
     Inter Medium ~0.85rem) and the title (Manrope ExtraBold,
     `clamp(2.2rem, 3.6vw, 3.6rem)`, ivory, letter-spacing -0.04em,
     line-height 1.0). Title turns Electric Blue at the active
     state.
   - Row B: the definition line in Instrument Serif Italic, ~1.25rem,
     ivory.
   - Row C: the scope paragraph, Inter, 0.95rem, line-height 1.65,
     `rgb(245 248 255 / 78%)`, max-width ~34rem.
   - Row D: capability line — four items separated by `·`,
     Inter Medium uppercase 0.7rem, tracked 0.14em,
     `rgb(245 248 255 / 62%)`.
   - Entry vertical rhythm: top hairline → 1.25rem → title row →
     0.85rem → definition → 0.6rem → scope → 1.1rem → capabilities
     → 2.5–3.5rem to the next hairline.
   - No boxes, no icons, no drop shadows in the entry body. One
     orange registration tick (3px, ~1.5rem wide) may sit at the
     entry's top-left at the active state, matching the Selected
     Work plate mark vocabulary.

4. **Footer strip**, matching the Selected Work footer: hairline top
   border (1px, `rgb(245 248 255 / 18%)`), left supporting note,
   right `Start a Project ↗` text-link.

Asymmetry note: the left column is intentionally narrower and holds
oversized type; the right column is wider and quieter. The count
sits in the far-right edge of the head row; the index hangs in the
left column's gutter edge.

### 5.1 Sticky index behavior

- `position: sticky` on the left column, `top: calc(1.5rem +
  env(safe-area-inset-top))` (no global header overlap: the site
  header is `position: absolute`, not fixed, so no height offset is
  required).
- The sticky scope is the body grid only; it releases when the
  fourth entry passes.
- A 1px vertical hairline with a 2px Electric Blue marker that
  translates between index items. The marker moves with a
  450ms `--ease-out-expo` transition — transform only, never a
  layout property.

### 5.2 Intermediate desktop widths (1024–1180px)

At these widths the left column is too narrow for
`Technical Maintenance & Support` on one line. The index renders
shortened labels (`Web`, `Software`, `Automation`, `Support`) until
`min-width: 1181px`, where the full titles fit and the index
switches to them. Both states keep the tabular index numeral and the
full accessible name. The entries themselves always show full
titles.

## 6. Mobile and tablet composition

Reference: 390 x 844. Verify 320 x 568 and 768 x 1024.

- Single column at `< 1024px`. The sticky index and sticky
  masthead are disabled (`position: static`).
- Head row: eyebrow and count stack or inline-wrap, as in Selected
  Work at narrow widths.
- Masthead heading wraps to two lines, `clamp(2.75rem, 13vw, 4rem)`.
- No mobile jump index (owner decision). The four services simply
  follow the masthead in one column, in order.
- Entries stack with the same row anatomy. The capability line may
  wrap to two lines; separators stay visible (no orphan middots —
  wrap as `display: flex; flex-wrap: wrap` with per-item middots
  suppressed on the first item).
- Titles: `clamp(1.9rem, 8.4vw, 2.9rem)`.
- Entry anchors keep `scroll-margin-top` (1.5rem) so a hash landing
  is not flush against the viewport edge.
- CTA: the existing `.text-link` stays inline (the Hero's
  full-width primary button rule applies to primary buttons, not
  text links). Minimum touch target 44x44px for every index link
  and the CTA.
- No horizontal overflow at 320px.

## 7. Typography and spacing

Reuse only existing tokens and families: `--font-manrope`,
`--font-instrument`, `--font-inter`, `--color-*`, `--gutter`,
`--ease-out-expo`. No new fonts, no new color variables.

| Element | Family / weight | Size | Notes |
| --- | --- | --- | --- |
| Eyebrow | Inter 500 | 0.59375rem | 0.2em tracking, uppercase |
| Masthead heading | Manrope 800 | clamp(3.5rem, 6.4vw, 6.5rem) | lh 0.92, -0.05em |
| Masthead accent | Instrument Italic 400 | 1.06em of heading | Electric Blue |
| Count | Inter 500 | 0.75rem | 0.16em tracking, 58% ivory |
| Entry index | Inter 500 tabular | 0.85rem | Cantaloupe |
| Entry title | Manrope 800 | clamp(2.2rem, 3.6vw, 3.6rem) | lh 1.0, -0.04em |
| Entry definition | Instrument Italic | ~1.25rem | lh 1.4 |
| Entry scope | Inter 400 | 0.95rem | lh 1.65, 78% ivory |
| Capabilities | Inter 500 | 0.7rem | 0.14em tracking, uppercase |
| Index links | Inter 500 | 0.78rem | 0.1em tracking |
| Footer note | Inter 400 | 0.8rem | 62% ivory |

Spacing: section padding block `clamp(5.5rem, 13vh, 9rem)` top /
`clamp(3.5rem, 8vh, 6rem)` bottom, padding-inline `var(--gutter)` —
identical to Selected Work so the vertical rhythm continues.

Contrast floor: body copy at 78% ivory on Midnight
(≈ 12.9:1 computed for a comparable pair; verify with a contrast
checker at implementation). Nothing below 58% ivory for text that
carries meaning. Index numerals in Cantaloupe must be paired with a
text label, never used as the only active-state signal.

## 8. Motion

All motion uses GSAP 3 (already bundled) + ScrollTrigger, the same
gate pattern as the Hero and Selected Work. Native scrolling only.
No pinning. No `scrollIntoView({behavior: "smooth"})` calls beyond
the site's existing `html { scroll-behavior: smooth }`.

### 8.1 Entrance (once per load)

One timeline, `ScrollTrigger` `start: "top 78%"`, `once: true`:

- 0ms — head hairline draws `scaleX 0 → 1`, 600ms expo-out.
- 60ms — eyebrow fades and rises 10px; orange rule draws.
- 120ms — masthead heading masked rise: `clip-path: inset(0 0
  105% 0)` → `inset(-0.3em)`, 0.35em translateY, 800ms expo-out
  (identical to the Selected Work heading language).
- 200ms — index items fade in with a 60ms stagger.
- Entries via `ScrollTrigger.batch` (`start: "top 88%"`, once):
  rise 24px + fade, 700ms expo-out, 120ms stagger when two or more
  intersect together; each entry's top hairline draws `scaleX`
  600ms alongside.
- Footer strip fades last, on its own `once` trigger.

### 8.2 Active index (scroll-linked state, not scroll animation)

`IntersectionObserver` on the four entries, root margin
`-40% 0px -50% 0px` so the active entry is the one crossing the
vertical middle of the viewport.

- Active state updates the index item (`aria-current="true"`,
  `data-active`), the sticky marker position, and the entry's own
  active styling (title Electric Blue, hairline brightening,
  orange tick).
- This is a discrete class toggle, not a per-frame transform. It
  reconstructs what the reader is already looking at; it does not
  drive scroll.
- Because of this, `aria-current` is applied on the index links
  only (they alone are exposed as navigation controls; see §9).

### 8.3 Reciprocal hover / focus (fine pointers)

- Hovering or focusing an entry: its index numeral in the sticky
  index brightens to `#ff8b69` and its marker widens to 2px Electric
  Blue; the entry title takes a 1px underline that draws left →
  right in 400ms (the same rule as the Selected Work titles); the
  scope paragraph lifts to 90% ivory (color only, 250ms).
- Hovering or focusing an index link: the corresponding entry's
  hairline brightens to the active weight and its index numeral
  brightens — the index "previews" the entry without moving it.
- Transitions: transform/color only; 250–450ms; `--ease-out-expo`.
- Leaving restores the resting state. No persistent highlight.

### 8.4 Reduced motion

`prefers-reduced-motion: reduce`:

- No entrance transforms; everything renders at final state
  immediately.
- No marker slide transition (marker snaps).
- No hover/focus translate or draw. Hover keeps color changes only
  (allowed as non-motion feedback).
- Active-index tracking still runs (it is state, not motion) and
  still uses `aria-current`.
- The index and the sticky behavior remain. Sticky positioning is
  layout, not animation, and aids navigation.

### 8.5 No-JS

No `data-smotion` gate classes are present in the server HTML, so:
all four entries, the masthead, the index, and the CTA are fully
visible and readable. Index links remain plain in-page anchors that
work without JS. No content depends on the active-index state.

## 9. Accessibility

- `<section id="services" aria-labelledby="services-title">`,
  heading `h2`, entry titles `h3`.
- Sticky index marked as `<nav aria-label="Service index">` with a
  list of four real anchors. Each anchor's accessible name is the
  full service title, e.g. "01 — Web Development" — always the
  full name, even where the visible label is shortened
- Active state announced via `aria-current="true"` on the index
  link. Never color-only: the active index item also gains a 2px
  marker and the `aria-current` attribute.
- **Reciprocal index for assistive tech.** Concept A's reciprocity,
  translated: hovering an index link previews its entry visually;
  for keyboard and screen-reader users the same relationship exists
  through focus management and `aria-current`. Additionally, each
  entry ends with a small "Back to index ↑" text link
  (`href="#services-index"`, where `#services-index` is an id on
  the index nav) so a keyboard user who jumped into an entry can
  return without tabbing through the rest of the section. This link
  is a normal text link, not a script.
- Focus: existing global `:focus-visible` (2px ivory, 4px offset)
  applies unchanged. Sticky elements must never trap focus or
  cover a focused element — verify the sticky masthead does not
  overlap a focused entry at 1024x768 and 1280x800.
- Semantics: the index is complementary navigation, not a tablist.
  Do not use `role="tablist"` / `aria-selected` — the entries are
  not panels being swapped, and a tab pattern would add
  keyboard traps and reading-order problems for no benefit.
- Contrast: all text meets WCAG AA; capability and footer text stay
  at 58–62% ivory minimum. Verify with a contrast checker.
- No motion is required to read the section. No content exists
  only in a hover state.

## 10. Performance

- Static server-rendered markup. The Active Index hook is the only
  client logic: one `IntersectionObserver`, four observed elements,
  one class update per threshold crossing. No per-frame work, no
  React state on pointer movement.
- One entrance timeline per page load, built only when the section
  is near the viewport (`ScrollTrigger`, `once`).
- GSAP is already a dependency (Hero + Selected Work). No new
  packages, no fonts, no images in this section.
- Sticky positioning must not introduce layout shift; the index
  column reserves its height from the start.
- CLS target: 0. Section height stable before and after hydration.
- Target performance budget: section adds ≤ ~2KB of JS logic and no
  new network requests beyond the existing bundle.
- Prerendered to static HTML; verify the section renders with JS
  disabled.

## 11. Integration

- `app/page.tsx`: render the Services section directly below
  Selected Work. Do not touch the Hero or Selected Work components.
- Anchor: `<section id="services">`. `#services` currently points
  at nothing; it must resolve after this section ships.
- Landing offset: scope any scroll offset to this section only
  (e.g. `section#services { scroll-margin-top: … }` or a one-time
  hash handling on load). Do not add a global `scroll-padding-top`
  that would shift the Hero's or Selected Work's existing landing
  behavior.
- `lib/site.ts` comment on `primaryNav` should be updated when this
  section ships: `#services` now resolves; `#about` remains
  reserved. Leave the `{ label: "Services", href: "#services" }`
  entry exactly as is.
- Reuse existing tokens and patterns: `.eyebrow`,
  `.eyebrow__line`, `.text-link`, `--gutter`, `--ease-out-expo`,
  the hairline color values, the film grain (global).
- Follow the pre-paint `.motion-ready` gate pattern for entrance
  states, with no-JS fallback as in §8.5.
- Section styles: append to `app/globals.css` under a clearly
  marked `Section 03 — Services` block.

## 12. Implementation boundaries (for the later build pass)

Allowed:

- `components/services.tsx` (section markup + entry data usage)
- `lib/services.ts` (or entries added to `lib/site.ts` — prefer a
  dedicated file to avoid growing `site.ts`)
- `lib/services-motion.ts` (entrance timeline + active index hook)
- Section 03 styles block in `app/globals.css`
- One line in `app/page.tsx` rendering the section
- A comment-only update in `lib/site.ts` noting `#services` resolves

Not allowed:

- Modifying `components/hero.tsx`, `components/hero-geometry.tsx`,
  `components/site-header.tsx`, `components/preloader.tsx`,
  `components/selected-work.tsx`, or `lib/hero-motion.ts` /
  `lib/work-motion.ts`
- Redesigning Hero V2.2 or Selected Work V1 in any way
- Building About, Process, Contact, /work pages, or any section
  beyond Services
- New dependencies, fonts, images, or WebGL
- Cursor-following effects, scroll hijacking, pinning, or snap
- Inventing metrics, clients, testimonials, timelines, SLAs, or
  pricing
- Committing, pushing, or deploying without explicit owner approval

## 13. Acceptance criteria

1. Four services render with the exact copy in §4, in the stated
   order, with no fabricated claims.
2. Desktop shows the asymmetrical two-column composition with a
   sticky masthead + index; entries live in the wider right column.
3. Active index tracks scroll on desktop; `aria-current` updates;
   the marker moves by transform only.
4. Reciprocal hover/focus works both directions (index → entry,
   entry → index) and never persists after leaving.
5. Entrance reveals are smooth; reduced-motion renders the section
   static and complete immediately.
6. No scroll hijacking: native scroll speed and position are
   untouched; no pinning or snap.
7. `#services` resolves to the section; the nav Services link
   works; landing is legible below the viewport top.
8. Mobile is single-column with no horizontal overflow at 320px,
   390px, 768px; touch targets ≥ 44px.
9. CTA uses `projectMailto` and the supporting note appears; no
   fake form.
10. Lint, typecheck, production build pass; console clean.
11. Hero V2.2 and Selected Work V1 are byte-unchanged (diff-scoped
    to new files + the sanctioned page/comment lines).
12. Keyboard-only pass: reach every index link, entry "Back to
    index" link, and the CTA with visible focus; sticky elements
    never cover a focused element.
13. Owner approves the specification, then the implementation.

## 14. Owner decisions (resolved 2026-11-24)

1. **Blue italic accent repetition** — KEEP. The Electric Blue
   Instrument Serif Italic accent (`Better.` / `Work.` / `Build.`)
   is part of VERCUNO's typographic identity. No alternative.
2. **Mobile jump index** — REMOVED. The four services present
   naturally in a single column on mobile; no compact jump row.
3. **Service 04 framing** — KEEP as a service offering. Text states
   the capability only; no customer history, SLAs, certifications,
   guarantees, or metrics.
4. **Index labels at intermediate desktop widths** — shortened
   labels per §5.2, with full service names preserved in the
   content and in accessible names.

## 15. Approval workflow

1. Owner reviews this specification and its decisions (§14). DONE.
2. Implementation pass scoped per §12. DONE (V1 below).
3. Verification per §13, then owner visual and interaction review
   at localhost.
4. Owner approval; only then update `DECISIONS.md` status from
   "PENDING OWNER IMPLEMENTATION APPROVAL" to approved and commit
   with explicit approval.

## 16. Implementation log (V1 — pending owner implementation approval)

Status: Implemented, verified, awaiting owner visual and interaction
review. NOT approved.

Stack: Next.js 16 (App Router), TypeScript, Tailwind CSS 4, GSAP 3
(ScrollTrigger — already bundled; no new packages).

Files:

- `lib/services.ts` — service data (four entries, exact §4 copy),
  short index labels, `servicesIndexId`, CTA note.
- `components/services.tsx` — section markup (client component for
  the motion/state hook; prerenders to static HTML).
- `lib/services-motion.ts` — entrance timeline, ScrollTrigger batch
  for the entries, IntersectionObserver active index, reciprocal
  hover/focus bridge, marker positioning.
- `app/globals.css` — appended "Section 03 — Services" block.
- `app/page.tsx` — section rendered directly below Selected Work.
- `lib/site.ts` — comment updated: `#services` now resolves.

Design decisions and interpretations:

1. **Sticky containing block.** The masthead wrapper
   (`.services__aside`) is `display: contents` on desktop. Without it
   the body grid produced two implicit rows (masthead in row 1,
   entries in row 2) and the sticky could only travel its own
   height. With `display: contents` the sticky is a direct grid item
   and travels the full entry column.
2. **Intermediate-width labels.** Both the full title and the short
   label ship in the markup; CSS reveals one
   (`--short` below 1181px, `--full` at ≥1181px) so no measurement or
   hydration-dependent state is needed. Each link's accessible name
   is always `NN — Full Service Title`.
3. **Active index.** An IntersectionObserver reports crossings of a
   middle band (`-35% 0px -45% 0px`); the active entry is the last
   one that has reached the band midline. This avoids a tall entry
   holding the highlight after the next one takes over. The marker
   is moved with a transform only.
4. **"Back to index" link.** Present on every entry in the DOM (real
   link to `#services-index`). Visually shown on mobile/tablet;
   visually hidden on desktop where the index is permanently
   visible, but it reappears on `:focus-visible` so keyboard users
   can still return from an entry.
5. **Reciprocity.** One delegated `pointerover` handler plus
   `focusin`/`focusout` flags the counterpart with `.is-preview`;
   CSS owns the visual response in both directions. `pointerleave`
   on the section clears the pair so nothing persists.
6. **Reduced motion.** Entrance tweens/triggers are skipped and
   everything renders at final state; the active index and
   reciprocity still run (state, not motion). A mid-session switch
   stops only this section's entrance disposers — other sections'
   ScrollTriggers are never touched.
7. **No-JS.** No gate classes in the server HTML: all four entries,
   masthead, lede, index and CTA render fully. Index links are plain
   in-page anchors.

Verified (2026-11-24, dev + production build):

- ESLint, `tsc --noEmit`, `next build` pass; page prerenders static.
- Viewports checked: 1440x900, 1024x768, 768x1024, 390x844, 320x568.
  No horizontal overflow at any width; no overflow-causing elements
  inside the section.
- Desktop: two-column grid (481px / 728px at 1440), sticky masthead
  holds at 24px through the whole entry column; index shows full
  titles at 1440 and short labels at 1024; entries always show full
  titles. Single column and `position: static` below 1024px.
- Active index: scrolling to entry 02 sets `aria-current` on
  "02 — Custom Software"; scrolling to the last entry sets it on
  "04 — Technical Maintenance & Support". Marker visible and
  transform-positioned. Works with reduced motion.
- Reciprocity: hovering an entry shifts its title 6px, draws the
  underline, highlights its index row and moves the marker;
  hovering an index link flags the entry. Both clear on leave
  (measured `.is-preview` count returns to 0).
- Keyboard: index links expose full names ("01 — Web Development"),
  2px ivory focus ring; "Back to index" returns to
  `#services-index`; entry hash lands with `scroll-margin`.
- `#services` nav link scrolls to the section top; eyebrow visible
  at 117px from the viewport top after landing.
- Contrast (computed against Midnight): scope 11.5:1, index
  labels 9.3:1, capabilities/back/footer 7.4:1, note/count 6.6:1.
  All ≥ AA.
- Touch targets: back link and CTA ≥ 44px at 320/390/768.
- Reduced motion: all gated elements at final state (opacity 1, no
  transform), no errors.
- No-JS: 4 entries, 4 index links, everything visible, no
  `motion-ready` gate.
- Locked sections: Hero height and headline unchanged; Selected
  Work still has 3 rows and its plate appears on hover
  (opacity 1); no console errors at 1440 or 390.

Known issues:

- Desktop page height (3710px at 1440) means the final entries sit
  in the lower part of the document; the sticky masthead releases
  near the end of the section, as specified.

Review artifacts: /tmp/vc-services-1440-a.png,
/tmp/vc-services-1440-b.png, /tmp/vc-services-1024.png,
/tmp/vc-services-390-a.png, /tmp/vc-services-mobile-full.png,
/tmp/vc-work-regression.png (screenshots used for debugging only).

Status: PENDING OWNER IMPLEMENTATION APPROVAL.

## Owner Approval — 2026-11-24

Status: APPROVED
Version: Services V1

The project owner approved the Interactive Operating
Manual layout, content, and interactions.

Preserve this implementation during future development.
