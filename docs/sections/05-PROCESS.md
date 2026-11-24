# VERCUNO — Section 05: Process

Version: 1.0
Design: The Operator's Index
Design Status: APPROVED
Implementation Status: PENDING

## 1. Purpose

Explain VERCUNO's five-stage project approach
through an expressive editorial experience.

The section should communicate clarity,
structure, and engineering discipline.

The workflow describes a proposed approach,
not guaranteed timelines or outcomes.

## 2. Creative Direction

Concept C — The Operator's Index.

Large outlined numbers become the primary
visual identity of this section.

Visual language:
- Bold Editorial Minimalist
- Monumental outlined numerals
- Asymmetrical typography
- Generous negative space
- Subtle scroll-driven animation
- Strong readability

Avoid generic timeline cards and repetitive
layouts from previous sections.

## 3. Section Heading

Eyebrow:
05 / OUR PROCESS

Headline:
How We Work.

Typography:
- Manrope ExtraBold for "How We"
- Instrument Serif Italic for "Work."
- Electric Blue accent on "Work."

Background:
#02070A

Text:
#F5F8FF

## 4. Process Stages

### 01 — Discovery

Accent: listen

Description:
We begin by understanding your business,
goals, challenges, and project requirements.

### 02 — Planning & Design

Accent: shape

Description:
We define the solution, establish scope,
and develop a design direction aligned
with your needs.

### 03 — Development

Accent: build

Description:
We turn the agreed plan into a functional
digital product, focusing on usability,
maintainability, and implementation quality.

### 04 — Testing & Refinement

Accent: refine

Description:
We review functionality, responsiveness,
and usability, then address issues identified
during testing.

### 05 — Launch & Handover

Accent: deliver

Description:
We prepare the agreed deliverables for
launch or handover and provide the relevant
information needed for continued use.

## 5. Desktop Layout

Reference viewport: 1440x900

- Full-width editorial section.
- Large heading at the top.
- Five vertically stacked stages.
- Content occupies approximately 55% left.
- Monumental numerals occupy the right.
- Stage titles use Manrope ExtraBold.
- Accent verbs use Instrument Serif Italic.
- Thin horizontal dividers separate stages.
- Generous vertical spacing between stages.

Numeral size:
clamp(160px, 15vw, 220px)

Numerals:
01, 02, 03, 04, 05

Default:
Transparent fill with thin Ivory outline.

Active:
Cantaloupe Orange #FC734D fill.

The numerals must not obscure readable content.

## 6. Mobile Layout

Reference viewport: 390x844
Small mobile: 320x568

- Single-column composition.
- Numerals remain prominent.
- Numerals may appear above or beside titles.
- Size approximately 96–120px.
- All descriptions remain visible.
- No horizontal overflow.
- No sticky elements.
- No hover-dependent information.

Use fluid typography and spacing.

## 7. Motion & Interactions

Reuse existing GSAP infrastructure.

Scroll behavior:
1. Stage enters viewport.
2. Numeral transitions from outline to fill.
3. Stage title reveals through masking.
4. Accent word and description enter subtly.
5. Previous stages remain readable.

Animation:
- Refined easing
- Approximately 300–500ms transitions
- Transform and opacity where possible
- Discrete numeral color/fill transition
- No continuous animation loops

Active stage detection:
IntersectionObserver or GSAP ScrollTrigger.

Avoid per-frame React state updates.

Do not use:
- Scroll hijacking
- Heavy WebGL
- Cursor-following images
- Unnecessary pinned layouts
- Excessive blur or particle effects

Respect prefers-reduced-motion.

## 8. Ending CTA

Text:
Have something in mind? Let's Talk.

Use the existing verified contact destination
from the project's shared configuration.

Do not create a new or broken route.

## 9. Integration

Section ID:
process

Position:
After About V1.1 and before Contact.

Do not modify the primary navbar.

Preserve approved sections:
01 Hero V2.2
02 Selected Work V1
03 Services V1
04 About V1.1

## 10. Accessibility

- Semantic section with an h2 heading.
- Use an ordered list containing five stages.
- Each stage has a semantic h3 heading.
- Decorative numerals are aria-hidden.
- All information accessible without JavaScript.
- Visible keyboard focus on the CTA.
- Reduced-motion support.
- Maintain WCAG AA contrast for meaningful text.

## 11. Performance

- Reuse existing dependencies and fonts.
- No external imagery required.
- No new animation library.
- Avoid layout thrashing.
- Keep JavaScript isolated.
- Avoid unnecessary browser recording.
- No QA video generation.

## 12. Acceptance Criteria

1. Visually matches Concept C direction.
2. All five stages are readable.
3. Large outlined numerals work correctly.
4. Scroll changes active numeral styling.
5. Smooth entrance animations.
6. Desktop layout is balanced.
7. Mobile layout has no overflow.
8. CTA destination works.
9. Reduced-motion behavior works.
10. No-JavaScript content stays visible.
11. Existing sections remain unchanged.
12. ESLint passes.
13. TypeScript passes.
14. Production build passes.
15. Owner approves final implementation.

## 13. Scope

Build Section 05 only.

Do not build Contact or Footer yet.

Do not redesign any approved section.

Do not push or deploy without approval.

## 14. Approval

Design Concept C:
APPROVED by project owner.

Implementation:
PENDING OWNER REVIEW.

## 15. Implementation Record

Status: PENDING OWNER IMPLEMENTATION APPROVAL.

Built:

- `components/process.tsx` — `<section id="process" aria-labelledby>`,
  one `<h2>` ("How We *Work.*"), one `<ol>` of five `<li>` stages, each with
  an `<h3>`. Numerals are `aria-hidden`; a visually hidden "Stage 01"
  prefix keeps the reading order intact.
- `lib/process.ts` — approved copy, verbatim from §3–4 and §8.
- `lib/process-motion.ts` — GSAP entrance timelines (section head, one
  per stage, CTA) plus an IntersectionObserver midpoint band that writes
  `data-active` on the `<ol>`. No React state, no per-frame work.
- `app/globals.css` — `.process*` block; desktop 55/45 split, numerals
  `clamp(160px, 15vw, 220px)`; active fill is a CSS colour transition.
- `app/page.tsx` — `<Process />` after `<About />`.

Decisions for owner review:

1. Navbar is untouched — no "Process" link was added (out of scope per §9).
2. CTA reuse: `projectMailto` from `lib/site.ts` (same destination as the
   Hero and Services CTAs) on a `button--primary`, plus the §8 line
   "Have something in mind? Let's Talk."
3. Under reduced motion the numerals are shown with their outline only and
   the active fill is still applied (a discrete colour change, not motion).
   The entrance tweens are skipped entirely.
4. Mobile numerals resolve to ~105px at 390 and ~86px at 320 to stay
   inside the 96–120px target without overflowing at 320.

## Process V1 — Owner Approval

Status: APPROVED
Approved: 2026-11-24

Concept C — The Operator's Index.

The owner approved the final layout, motion,
and corrected stage 05 scroll activation.
Future work must preserve this section.
