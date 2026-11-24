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
