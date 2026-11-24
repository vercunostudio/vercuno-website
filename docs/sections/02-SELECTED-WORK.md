# VERCUNO — Section 02: Selected Work

Version: 1.0 (Concept A+ — The Interactive Ledger)
Status: APPROVED - Owner approval 2026-11-24
IMPLEMENTATION APPROVAL
Concept source: Design exploration, 2026-11-24 (Concepts A/B/C)
Owner selection: Concept A, enhanced with interactive project
previews and motion (A+).

## 1. Purpose

Showcase VERCUNO's design and engineering capability through
verified founder projects.

The section creates credibility and funnels qualified visitors to
Explore Work (this section) and Start a Project.

It also gives the Hero's `#work` navigation target a real
destination. The `aria-describedby="work-pending"` note in the
Hero is removed when this section ships.

## 2. Projects (verified data only)

01 — WORLD//ONE
Category: Web Development
URL: https://world-one-lilac.vercel.app

02 — VETO
Category: Blockchain Web Application
URL: https://veto-opal.vercel.app

03 — AI Content Studio
Category: AI Content Workflow
URL: None verified. Typographic entry, not linked.

All three are Founder Projects — built and shipped by the
studio, not paid client work. The section must state this.

Forbidden: metrics, testimonials, clients, awards, fake
results, stock imagery, fabricated UI.

## 3. Design direction — Concept A+ "The Interactive Ledger"

Bold Editorial Minimalist, continuous with Hero V2.2.

The Ledger presents work as an oversized editorial index:
massive typography, thin hairline rows, orange index numerals,
monumental negative space. The A+ enhancement adds a premium
interactive layer: a floating screenshot plate that follows the
cursor with smooth delayed easing while a row is hovered.

Type carries the design. Imagery appears on demand and never
becomes a grid of SaaS cards.

## 4. Desktop composition

Reference viewport: 1440 x 900. Check also 1280, 1920.

Anatomy, top to bottom:

1. Section header row:
   - Eyebrow: orange rule (1.75rem x 3px mobile, 4rem x 4px
     desktop) + "SELECTED WORK" in Inter Medium uppercase,
     tracked 0.18-0.2em. Matches the Hero eyebrow anatomy.
   - Right-aligned counter: "3 PROJECTS" in Inter, muted.
     Factual count only. No dates, no fake metrics.

2. Section heading, one line at large widths:
   "Selected" — Manrope ExtraBold, ivory #F5F8FF.
   "Work." — Instrument Serif Italic, Electric Blue #0297DE.
   The italic treatment and blue color intentionally echo the
   Hero's "Better." so the section reads as the next sentence
   of the same editorial voice.
   Size: clamp(4.5rem, 10.5vw, 9.5rem), line-height 0.9-1.0,
   letter-spacing -0.05em. Must not clip or wrap awkwardly.
   At <=1024px it wraps to two lines ("Selected" / "Work.")
   stacked with the same 0.94 line rhythm as the Hero.

3. Ledger rows (exactly three), separated by thin dividers:
   1px solid rgb(245 248 255 / 22%) top rule above row 01 and
   1px solid rgb(245 248 255 / 14%) between and after rows.
   Row anatomy (desktop):
   - Index: "01" tabular, Inter Medium, ~0.9rem, Cantaloupe
     Orange #FC734D, followed by a muted "/" separator.
   - Title: Manrope ExtraBold, clamp(3rem, 5.2vw, 5.5rem),
     ivory, letter-spacing -0.04em, line-height 1. "WORLD//ONE"
     may tighten tracking to fit one line without clipping.
   - Category: Inter Medium uppercase, tracked 0.14em,
     rgba(245,248,255,0.78), right column, vertically centered.
   - Arrow: up-right arrow icon ~1.5rem, Electric Blue,
     matching the Hero text-link icon vocabulary.
   - One italic Instrument Serif descriptor per project, set
     beneath the title or in the right column, muted:
     01 "A world built from curiosity."
     02 "Permissions, under control."
     03 "Content workflows, engineered."
     These are capability descriptors, not results.

4. Asymmetry: titles occupy the left ~55%; category and arrow
   sit right-aligned in a fixed metadata column. The index
   hangs in the far left gutter. Row height 180-220px desktop.

5. Section footer strip, matching the Hero bottom strip:
   hairline top border; left: "Founder Projects — designed and
   built by VERCUNO."; right: "Start a Project ↗" text-link
   (mailto, same href as the Hero primary CTA).

Midnight Black #02070A background throughout. The shared film
grain overlay from globals.css already applies. No cards, no
glassmorphism, no boxed tiles.

## 5. Floating preview plate (desktop only)

One shared plate, positioned fixed, pointer-events none,
aria-hidden. Contains one <img> per project, stacked; only the
active one is visible (opacity crossfade, ~450ms expo-out).

Frame: width ~min(26rem, 26vw), aspect-ratio 16/10,
object-cover, 1px border rgb(245 248 255 / 22%), slight
shadow, radius 2px. A 3px Cantaloupe Orange registration tick
sits at the top-left corner of the frame (the "plate mark").

Behavior:
- Appears when a row is hovered or focus-visible (keyboard
  focus shows the plate; plate is decorative only and the row
  remains the link target).
- Position follows the cursor with smooth delayed follow:
  translate lerps toward the cursor at ~0.12 factor per frame
  (GSAP quickTo with ~0.5-0.7s duration, power3.out), plus a
  subtle rotation based on horizontal velocity, clamped to
  +/-4deg. Never blocks the row text (pointer-events none).
- Enters with scale 0.92 -> 1 + fade; exits with fade + scale.
- Moving between rows crossfades the visible screenshot and
  gently re-seats the plate (no hard cuts).
- Hidden entirely on touch devices, width < 1024px, and under
  prefers-reduced-motion.

## 6. Row interactions

- Row hover: row background receives a faint Electric Blue wash
  rgb(2 151 222 / 4%) via a full-width ::before; title
  translates right ~8px with expo-out; index brightens to
  #ff8b69; arrow translates (3px, -3px) and brightens — all
  consistent with existing Hero motion vocabulary.
- Title underline draw on hover: 1px ivory line drawing left to
  right under the title, 400ms expo-out (same as nav underline).
- Entire row is one <a> (stretched link over the row) so the
  large target is a single link with one accessible name:
  "WORLD//ONE — Web Development (opens in new tab)" pattern,
  using rel="noopener noreferrer" target="_blank".
- Keyboard: :focus-visible shows the blue wash + plate; focus
  ring per existing :focus-visible token (2px ivory, 4px
  offset). Tab order: row 01 -> 02 -> 03 -> footer link.
- AI Content Studio row is NOT a link: no href, arrow replaced
  by a muted "Case study pending" label (Inter, small, muted).
  It must not look broken: index 03 and title render normally.

## 7. Motion

Entrance (one GSAP timeline, ScrollTrigger once:true, no scrub
on text):
- 0ms: top hairline scaleX 0 -> 1, 600ms expo-out.
- 60ms: eyebrow fades/rises; orange rule scaleX draw.
- 120ms: heading masked rise (clip-path inset bottom, 0.35em
  translateY), 800ms expo-out — same masking language as the
  Hero headline.
- Rows stagger 120ms apart at ~20% viewport intersection:
  rise 24px + fade, 700ms expo-out each.
- Footer strip fades last.

Scroll behavior: native scrolling only. No pinning, no scroll
hijacking, no scroll-driven transforms on the rows themselves.
A single subtle use of GSAP is the plate follow + entrance
timeline. No WebGL.

Reduced motion: everything renders immediately — no entrance
transforms, no plate, no hover translate; hover keeps only
color changes (background wash, arrow color) which are allowed
as non-motion feedback. Focus states unchanged.

No-JS: rows are plain links; heading and rows fully visible
(no CSS-hidden initial states outside the .motion-ready gate
pattern used by the Hero).

## 8. Mobile composition

Reference: 390 x 844. Also verify 320 x 568 and 768 x 1024.

- Single column. Section header row becomes eyebrow + counter
  stacked or inline-wrap; heading wraps to two lines at
  clamp(3rem, 14vw, 4.5rem).
- Each project becomes a stacked block:
  index (orange) + title line 1, category line 2, descriptor
  line 3, then inline image.
- Inline imagery replaces the floating plate on touch/narrow:
  a full-width 16/10 crop of the project screenshot above or
  below the text block (choose below-title placement), with
  the same 1px border and orange registration tick. Images
  lazy-load; explicit width/height to prevent CLS.
- AI Content Studio: no image requirement on mobile if no
  authentic asset exists; renders the same typographic block
  with "Case study pending" instead of an image slot.
- Touch targets: entire row block is a link (WORLD//ONE, VETO)
  with min-height >= 64px; comfortable spacing.
- No hover-dependent information anywhere. No horizontal
  overflow at any tested width.

## 9. Accessibility

- Semantic structure: <section aria-labelledby>, h2 heading,
  project titles as h3.
- Real links with meaningful accessible names; external links
  announce "opens in new tab".
- Plate is aria-hidden decorative; no information exists only
  in the plate.
- Visible focus states on rows and footer link.
- Alt text describes the actual interface, e.g. "WORLD//ONE
  homepage — six destination map of Vincen Sanjaya's work".
- Reduced-motion support per section 7.
- Contrast: body text rgba(245,248,255,0.78)+ on Midnight,
  matching Hero tokens (>= 6:1 verified pattern).

## 10. Performance

- next/image for all screenshots, explicit dimensions, AVIF/WebP
  fallbacks, lazy below-fold; only plate images sized for the
  plate (no 2560px source for a 26rem plate — cap plate source
  ~1200px wide).
- Plate mounted once; pointermove uses gsap.quickTo (no React
  re-render per frame), rect caching invalidated on resize.
- Entrance timeline built only when section is near viewport
  (ScrollTrigger with once:true).
- No new dependencies. GSAP 3 already shipped with the Hero.
- Target: no CLS from imagery; section adds minimal JS beyond
  one small hook file.

## 11. Assets

Source of truth: public/assets/projects/<project>/ captured
from the live sites only.

Required captures (desktop 1440x900 and mobile 390x844):
- world-one: 2 desktop + 1 mobile
- veto: 2 desktop + 1 mobile
- ai-content-studio: none available; typographic fallback.
  If the owner later supplies an authentic screenshot, add
  desktop + mobile captures and enable imagery.

Never use stock images or fabricated interfaces. If a capture
is unusable (modals, cookie banners, broken layout), recapture
or document the gap.

## 12. Scope boundary

Implement Selected Work only. Do not redesign the Hero. Do not
build Services, About, Contact, /work pages, or project detail
pages. Project rows link to the verified live URLs, not to
unbuilt /work/[slug] pages. Do not push or deploy without
approval.

## 13. Acceptance criteria

1. Visual direction matches this spec (owner-approved A+).
2. Three authentic projects; Founder Projects framing present.
3. Desktop and mobile verified at 1440x900, 768x1024, 390x844,
   320x568.
4. Motion smooth; reduced-motion renders static instantly.
5. Row links work and point to verified destinations only;
   AI Content Studio row is correctly non-linked.
6. Hero #work anchor resolves to this section; pending note
   removed.
7. No fake claims. No horizontal overflow. No CLS from images.
8. Lint, typecheck, production build pass; console clean.
9. Hero V2.2 unchanged (diff-scoped to new section files).
10. Owner approves the implementation.

## 15. Implementation Log (V1 — pending owner implementation approval)

Status: Implemented, verified, awaiting owner visual and interaction review.

Stack: Next.js 16 (App Router), TypeScript, Tailwind CSS 4, GSAP 3
(ScrollTrigger — already bundled with the gsap dependency, no new
packages).

Implementation files:

- lib/site.ts — selectedProjects data (verified URLs, authentic asset
  paths, alt text) + Founder Projects framing comment.
- components/selected-work.tsx — section markup (client component for
  the motion hook; prerenders to static HTML).
- lib/work-motion.ts — entrance timeline, row batch staggering, and
  the floating preview plate system.
- app/globals.css — appended "Section 02 — Selected Work" block.
- app/page.tsx — section rendered directly below the Hero.
- components/hero.tsx — removed the aria-describedby="work-pending"
  note and its sr-only span (spec §1: removed when this section
  ships). No visual or motion change to the Hero.
- lib/site.ts — comment on nav anchors updated: #work now resolves;
  #services/#about remain reserved.

Design decisions and interpretations:

1. Images use semantic <picture> (AVIF source + WebP fallback) instead
   of next/image: the assets in public/assets/projects/ are already
   pre-optimized, exact-dimension pairs, and <picture> serves them
   byte-exact with zero reprocessing. Spec §10's actual requirements
   are all met: explicit width/height (no CLS), lazy loading, plate
   sources at 1440px (< the ~1200px guidance is exceeded only because
   the same authentic asset is reused; measured cost ~20-63KB each),
   static rendering, no new dependencies. Flagged for owner review.
2. Mobile inline imagery uses the desktop captures (1440x900, natively
   16/10) as §8 requires a full-width 16/10 crop; the portrait mobile
   captures (390x844) are reserved for a possible future portrait
   slot at owner request.
3. Secondary desktop captures (world-one-desktop-02 = WORLD//ONE's
   internal work page, veto-desktop-02 = VETO "How it works" grid)
   are unused in V1; the plate spec calls for one image per project
   and the primary captures are unambiguous. They remain available.
4. The plate appears on hover and on keyboard focus of linked rows
   only. AI Content Studio shows no plate (no authentic image may be
   fabricated); its row renders index/title/category/descriptor
   normally with a muted "Case study pending" label where the arrow
   would be.

Motion systems (lib/work-motion.ts):

- Entrance: one GSAP timeline on the section (ScrollTrigger, once,
  start "top 78%"): top hairline scaleX 600ms -> eyebrow fade/rise +
  orange rule draw 60ms -> heading masked rise (0.35em, clip-path,
  800ms expo-out, staggered) 120ms. Matches the Hero masking language.
- Rows: ScrollTrigger.batch (once, start "top 88%"), rows rise 24px +
  fade 700ms expo-out, staggered 120ms; each row's hairline draws
  scaleX 600ms alongside.
- Footer strip: own once-trigger ("top 92%"), fade + rise last.
- Plate: mounted once, fixed, pointer-events none, aria-hidden.
  gsap.quickTo x/y (0.6s power3.out) toward the cursor, offset to the
  right and vertically centered, clamped to a 20px viewport margin,
  flipping to the cursor's left near the right edge. Rotation derives
  per-frame from the plate's horizontal lag (gsap.ticker while
  visible), clamped to +/-4deg and self-decaying to 0. Enter scale
  0.92 -> 1 + fade 450ms expo-out; exit fade + scale 350ms power2.in;
  switching rows crossfades the stacked screenshots 450ms expo-out.
  Keyboard focus shows the plate beside the focused row and keeps
  re-seating while the browser's focus autoscroll settles (bounded
  rAF watch). Pointer systems attach only on (pointer: fine) and
  >=1024px; no React state updates on pointer movement.
- Reduced motion: the hook reveals everything instantly and never
  mounts the plate; CSS additionally forces all gated elements
  visible/static and keeps hover to non-motion color feedback.
- No-JS: no gate classes ship in the HTML, so rows/heading/footer are
  fully visible and the plate stays hidden (verified).

Verified (2026-11-24, dev + production build):

- ESLint, tsc, next build pass; page prerenders as static content.
- Viewports screenshot-inspected: 1440x900, 1280x900, 1920x900,
  768x1024, 390x844, 320x568.
- No horizontal overflow at any tested viewport; titles never clip
  ("AI Content Studio" wraps gracefully at 320px).
- Measured plate physics: max rotation 4.0deg under a fast sweep,
  settles to 0.00deg; hover leave hides the plate (opacity 0);
  hovering the pending row hides the plate; right-edge flip keeps the
  plate inside the viewport.
- Keyboard: tab order row 01 -> row 02 -> footer link; accessible
  names "WORLD//ONE — Web Development (opens in new tab)" pattern;
  plate shows on focus, vertically centered on the row (measured
  centerDelta 0 after the scroll settles); 2px ivory focus ring.
- Anchor: #work resolves (hash set, section lands at viewport top);
  Explore Work + nav Work both navigate; pending note removed.
- Row links open the verified live sites in a new tab (popup URL
  asserted); rel="noopener noreferrer" present.
- CLS measured 0 across a full scroll pass; AVIF served natively;
  images lazy-load and report complete.
- Reduced motion: everything visible at 120ms, no transforms, plate
  display none.
- No-JS: full static render, rows are plain links.
- Console: no errors in dev or production (only the React DevTools
  info message and HMR log in dev).
- Hero V2.2: untouched except the sanctioned pending-note removal;
  intro/preloader/motion intact.

Review artifacts: /tmp/vercuno-shots/ (work-desktop-1440.png,
work-desktop-1440-b.png, work-desktop-foot.png, work-plate-row1.png,
work-plate-tilt.png, work-plate-row2.png, work-plate-flip.png,
work-plate-row3-noimg.png, work-focus-row1.png, work-focus-row2.png,
work-tablet-768.png, work-tablet-768-foot.png, work-mobile-390.png,
work-mobile-390-2/3.png, work-mobile-320.png, work-mobile-320-2.png,
work-reduced-motion.png, work-nojs.png, work-desktop-1280.png,
work-desktop-1920.png, work-prod-1440.png, work-prod-plate.png,
hero-after-work-unchanged.png) and /tmp/vercuno-shots/video/
(work-motion-desktop.mp4 + .webm, work-scroll-mobile.mp4 + .webm).

Open items requiring owner decision:

1. <picture> vs next/image for the screenshots (see decision 1).
2. Mobile inline slot uses desktop 16/10 captures; the portrait
   mobile captures are unused in V1 (decision 2).
3. Secondary desktop captures are unused in V1 (decision 3).
4. AI Content Studio remains a typographic entry; if the owner later
   supplies an authentic screenshot, add desktop + mobile captures
   and enable imagery per spec §11.

Status: PENDING OWNER IMPLEMENTATION APPROVAL.

## 14. Implementation notes (pending implementation)

- New files, Hero untouched: components/selected-work.tsx,
  components/selected-work-motion.ts (or a lib/work-motion.ts),
  optional components/work-preview-plate.tsx; section styles
  appended to app/globals.css under a new clearly-marked block;
  data in lib/site.ts (project entries with verified URLs).
- Reuse tokens and classes where possible: --gutter,
  --ease-out-expo, .eyebrow pattern, .text-link pattern,
  hairline color values, film grain (already global).
- Follow the Hero's motion-gate pattern: pre-paint class gating
  (.motion-ready) plus reduced-motion CSS overrides; no layout
  shift when the gate class is absent.
- Then run: lint, typecheck, next build; screenshot all four
  reference viewports; verify console clean; record artifacts
  under /tmp/vercuno-shots/.

## 16. Approval workflow

1. Owner reviews this specification. (DONE — approved A+)
2. Assets captured (Phase 2 of the doc task).
3. Implementation of this spec, scoped per section 12.
4. Verification + owner review.
5. Owner approval; then DECISIONS.md implementation status
   update and commit (with owner approval for the commit).

## Owner Approval - 2026-11-24

Selected Work V1 implementation approved by owner.
