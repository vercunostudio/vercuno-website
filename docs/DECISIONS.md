# VERCUNO — Decision Log

## Brand

Name: VERCUNO
Tagline: Digital, Built Better.
Positioning: Independent Software & AI Studio

Business model:
Custom project-based digital services.

## Visual Identity

Approved direction:
Bold Editorial Minimalist

Primary palette:
#02070A
#0297DE
#FC734D
#F5F8FF

Visual reference:
https://melon.studio/

Use as inspiration, not replication.

## Typography

Manrope:
Main headlines

Instrument Serif Italic:
Editorial accents

Inter:
Body and UI labels

## Hero

Approved concept:
Hero V2

Headline:
Digital, Built Better.

Visual:
Oversized typography with monumental V.

Vercy:
Not included in initial Hero.

## Development

Workflow:
Section-by-section implementation.

Coding agent:
OpenCode

Preferred model for current experiment:
ClassAI kai-baik, subject to availability.

Current scope:
Selected Work implemented as V1 per the approved A+ specification;
PENDING OWNER IMPLEMENTATION APPROVAL.
Services implemented as V1 (Concept C+) per
docs/sections/03-SERVICES.md; PENDING OWNER IMPLEMENTATION APPROVAL.

## Git

Repository:
vercunostudio/vercuno-website

Do not push or deploy without owner approval.

## Portfolio

WORLD//ONE
VETO
AI Content Studio

Present accurately as Founder Projects.

## Open Decisions

- Official domain availability
- Trademark verification
- Final production contact flow
- AI Content Studio: owner-supplied authentic screenshot or
  permanent typographic entry (current spec assumes the latter)
- Selected Work implementation approval (V1 built and verified,
  awaiting owner review)
- Selected Work V1 implementation interpretations for owner review:
  (a) screenshots use semantic <picture> with the pre-optimized
  AVIF/WebP pairs instead of next/image re-encoding; (b) mobile
  inline slots use the desktop 16/10 captures while the portrait
  mobile captures stay unused; (c) secondary desktop captures stay
  unused in V1 (plate carries one image per project)
- Services specification approval and its four open items
  (docs/sections/03-SERVICES.md §14): repeated blue italic accent,
  mobile jump index, framing of service 04, short vs full index
  labels at narrow desktop widths
- About V1.1 implementation approval (About V1 design APPROVED by
  owner 2026-11-24). V1.1 adds interaction to the Vercy mark only.
  Built and verified; awaiting owner review. Open items: the companion
  line's "reviews everything we ship" clause, the belief 03 phrasing,
  and commercial usage rights for both the original board and the new
  green-screen renders. Still open: whether Vercy appears anywhere
  earlier than About. Settled by implementation: Vercy mark shipped,
  Neutral resting state, interactive hover/click states, "It" pronoun,
  no third body paragraph, no section CTA, no waving state (none
  exists in the authentic source set).

## Selected Work — Design Direction

Approved concept: A+ "The Interactive Ledger" (owner selection
from the 2026-11-24 design exploration; Concepts A/B/C
proposed, Concept A enhanced with the interactive preview
plate).

Direction: oversized editorial ledger rows on Midnight Black —
massive "Selected Work" heading with Instrument Serif Italic
Electric Blue accent echoing the Hero's "Better.", orange
eyebrow, three hairline-divided rows with Cantaloupe index
numerals, Manrope ExtraBold titles, category labels, arrows.
Desktop adds a cursor-following floating screenshot plate with
smooth delayed easing; mobile stacks inline imagery.

Projects (Founder Projects, never client work):

01 WORLD//ONE — Web Development —
https://world-one-lilac.vercel.app
02 VETO — Blockchain Web Application —
https://veto-opal.vercel.app
03 AI Content Studio — AI Content Workflow — no verified
public destination; renders as a typographic entry with a
"Case study pending" state, not linked.

No invented metrics, testimonials, clients, or results.

## Services — Design Direction

Approved concept for specification: C+ "The Interactive Operating
Manual" (owner selection from the Services design exploration;
Concept C "The Operating Manual" enhanced with Concept A's
reciprocal interaction).

Direction: a manual for what the studio builds — orange eyebrow and
factual count, oversized "What / We Build." masthead in the left
editorial column (Instrument Serif Italic Electric Blue accent
echoing the Hero), a sticky desktop service index, and four
hairline-ruled indexed entries on the right: Cantaloupe index
numerals, Manrope ExtraBold titles, Instrument Serif Italic
definitions, Inter scope copy, middot capability lists.

Reciprocity: the index and the entries highlight one another on
hover and focus; an IntersectionObserver keeps the active index
item in step with scroll via aria-current (a state toggle, not a
scroll animation).

Deliberately excluded: the cursor-following screenshot plate,
scroll hijacking, pinning, cards, icon grids, pricing, timelines,
SLAs, and testimonials.

Services (from the PRD service list, evidenced by founder projects):
01 Web Development (WORLD//ONE)
02 Custom Software (VETO)
03 AI & Workflow Automation (AI Content Studio)
04 Technical Maintenance & Support (PRD service; no shipped
evidence — framed as a capability, never as client work)

Anchor: #services (live in primaryNav; resolves to the section).
CTA: existing projectMailto Start a Project with
section-specific supporting copy.

Status: IMPLEMENTED as Section 03 V1 below Selected Work
(components/services.tsx, lib/services.ts, lib/services-motion.ts).
PENDING OWNER IMPLEMENTATION APPROVAL. Hero V2.2 and Selected Work
V1 remain locked and unchanged.

## About — Design Direction

Proposed concept: A+C "The Statement, closed with a colophon"
(owner direction from the 2026-11-24 About design exploration;
Concepts A/B/C proposed, Concept A selected with Concept C's small
Vercy colophon ending).

Direction: one oversized Manrope ExtraBold belief statement —
"We build / software that / earns its place / on the internet." —
with "earns" in Instrument Serif Italic Electric Blue, continuing
the accent established by Hero ("Better.") and Services ("Build.").
A narrow Inter column beneath carries the studio's position; three
Cantaloupe-indexed belief rows hang beside it in an asymmetric
offset column with no links, markers, or sticky behaviour.

Ending: a hairline rule, a 64–80px circular Vercy mark cropped from
the authentic expression board (Neutral resting, one 420ms Happy
greeting per session), one companion line, and the existing
Start a Project text link. No hanging scroll, no caption, no
character animation loop.

Vercy appears here for the first time on the site. The mark is a
documented crop + CSS mask of docs/references/Vercy Mascot
Expression Board.png; the character is never regenerated,
recoloured, or redesigned, and the white reference sheet is never
used as a production visual. A text-only fallback is pre-approved
if clean extraction is not feasible.

Positioning: VERCUNO is presented as an independent, founder-led
software and AI studio, deliberately small. No team size, founding
date, years of experience, client results, testimonials, awards,
partnerships, or guarantees are claimed, and founder projects are
not described as paid or commercially shipped launches.

Status: IMPLEMENTED as Section 04 V1 below Services
(components/about.tsx, lib/about.ts, lib/about-motion.ts,
public/assets/mascot/). PENDING OWNER IMPLEMENTATION APPROVAL.
Hero V2.2, Selected Work V1 and Services V1 remain locked and
unchanged.

## About V1 — Implementation notes

Vercy asset pipeline: six WebP crops (Neutral and Happy, 72/96/160)
extracted from docs/references/Vercy Mascot Expression Board.png by
bright-pixel bust bounding box, expanded to a centred square, with no
retouching of character pixels. `public/assets/mascot/` was empty
before this pass.

Rejected implementations, recorded so they are not retried:

- AVIF primary for the mark. The AVIF crops decode to a stale frame
  in Chromium when swapped, so WebP only ships (3.3 KB at 160px).
- A stacked second layer for the greeting. An
  absolutely-positioned child is clipped by the frame's
  `overflow: hidden` circle.
- Mutating `<img src>` / `<picture>` `<source srcset>`. The browser
  repaints the previous frame for the whole 420ms hold.

Shipped approach: the mark is a CSS `background-image` on a
`.vercy__face` span; the greeting is one `is-greeting` class toggle.
The circular frame (border-radius + hairline ring on the board's own
card field `#050B15`) is a design element, not baked alpha.

Deliberate deviation from the Section 04 specification: the colophon
ships WITHOUT the `Start a Project` text link specified in
04-ABOUT §4.7, per owner direction that the section ends on the Vercy
colophon. The site therefore has no section CTA between Services and
Process; the header `Let's Talk` pill is the persistent conversion
path. Reversible without structural change.

Landing offset: `scroll-margin-top: 1.5rem` is scoped to `.about`
only. `#work` and `#services` landing behaviour is unchanged; no
global `scroll-padding-top` was introduced.

Verification (2026-11-24, production build): typecheck, ESLint and
`next build` pass; page prerenders static. Checked 1440, 1180, 1024,
768, 390 and 320 — no horizontal overflow, no clipped statement
descenders, zero console errors. `#about` lands with the eyebrow
visible at both desktop and mobile. Reduced motion fetches only the
Neutral crop and never activates the greeting. No-JS renders the full
statement, all beliefs and the Neutral mark. Hero 900px, Selected
Work 1143px / 3 rows, Services 1667px / 4 entries — unchanged.

## Change Control

Document decisions before implementation.

Do not replace previously approved designs
without owner approval.

Update this log when decisions change.

## Hero V2.2 Approval
Hero V2.2 approved by project owner.
LOCKED. Preserve the approved design and motion during
development of future sections. Do not modify Hero code
without explicit owner review.

## Selected Work V1 Approval

Selected Work V1 implementation approved by owner on 2026-11-24. Preserve its approved visual design and interactions.

## Services V1 — Final Approval

Approved: 2026-11-24
Concept: C+ Interactive Operating Manual

Section 03 is locked. Future sections must preserve
its approved design and functionality.

## About V1.1 — Interactive Vercy

Owner direction (2026-11-24): About V1 design is APPROVED. V1.1
enhances only the Vercy colophon mark; layout, typography, copy,
spacing and structure are unchanged.

This supersedes 04-ABOUT §8.2, which forbade pointer reactions on the
mark and required a new owner decision for any. This task is that
decision; the no-loop rule still holds (the only loop is the idle
breath).

Authentic assets: the eight green-screen renders in docs/references/
are the source. `docs/references/vercy-greenscreen/` named in the
brief does not exist. Three states ship, keyed with alpha and despilled
by `scripts/vercy-export.mjs`: neutral (r1c1), happy (full frame,
`…224426.jpg`), surprised (full frame, `…224254.jpg`). Head scale is
matched across all three. **No waving state exists in the source set**,
so hover uses Happy; no frame was invented.

Shipped interaction: `<button>` with an accessible name; idle Neutral
with a 5.2s breathing loop paused off-screen; hover/focus → Happy;
click/tap/Enter → Surprised for 620ms then back. State is CSS classes
only — no React state, no re-render on pointer motion, no layout shift
(verified identical geometry across all states). Touch skips Happy and
goes straight to Surprised.

Reduced motion keeps the mark a static Neutral portrait, hides the
reaction layers and never downloads them. No-JS renders the button with
the Neutral portrait and full copy.

Verification (2026-11-24, production build): typecheck, ESLint, next
build pass. No overflow or console errors at 1440/1180/1024/768/390/320.
Keyboard, touch tap, reduced motion, no-JS and locked-section
regression all pass. Hero 900, Work 1143/3 rows, Services 1667/4
entries unchanged.

Status: PENDING OWNER IMPLEMENTATION APPROVAL. About is NOT approved.

## About V1.1 — Final Approval

Approved: 2026-11-24
Concept: The Statement + Interactive Vercy Colophon

About V1.1 is locked for subsequent development.
Mascot usage rights remain a pre-launch checkpoint.

## Process V1 — The Operator's Index

Selected: 2026-11-24
Design Direction: APPROVED
Implementation: PENDING

The project owner selected Concept C.

Key decisions:
- Monumental outlined numerals 01–05.
- Active numerals fill Cantaloupe Orange.
- Asymmetrical desktop composition.
- Single-column mobile layout.
- Scroll-responsive stage transitions.
- One closing Let's Talk CTA.
- No primary navbar changes.
- Preserve all previously approved sections.

## Process V1 — Final Approval

Approved: 2026-11-24
Concept: The Operator's Index
Status: LOCKED

Five large outlined numerals with scroll-based
active states. Stage 05 detection bug resolved.
