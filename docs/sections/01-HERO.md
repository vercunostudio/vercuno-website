# VERCUNO — Hero V2 Specification

Section: 01 — Hero
Version: 2.0
Status: Visual direction approved
Implementation: Pending owner review

## 1. Concept

Bold Editorial Minimalist.

The Hero must communicate VERCUNO's
premium technology studio identity immediately.

Visual inspiration:
Editorial typography and expressive composition.

Do not reproduce another studio's design.

## 2. Main Headline

Digital,
Built Better.

Typography:

Digital / Built:
Manrope ExtraBold

Better:
Instrument Serif Italic

Colors:

Digital / Built: #F5F8FF
Better: #0297DE

Headline must dominate the composition.

## 3. Supporting Copy

"We design and engineer websites, custom software,
and intelligent workflows for ambitious businesses."

Eyebrow:
INDEPENDENT SOFTWARE & AI STUDIO

## 4. Navigation

Left:
Existing VERCUNO brand logo.

Right:
- Work
- Services
- About
- Let's Talk

Mobile:
Compact accessible navigation menu.

Do not use an invented replacement logo.

## 5. Desktop Composition

Reference viewport: 1440 x 900

- Midnight Black background
- Large editorial headline
- Strong asymmetrical layout
- Monumental electric-blue V on the right
- Thin orbital line or curved detail
- Controlled orange graphic accents
- Supporting copy near headline
- Primary and secondary CTA
- Minimal bottom information strip

The giant V must be visually distinctive
without obstructing readable content.

Maintain ample negative space.

## 6. Mobile Composition

Reference viewport: 390 x 844

- Single-column layout
- Stacked headline
- Readable typography
- Decorative V reduced or repositioned
- Full-width primary CTA
- Secondary CTA below or nearby
- Compact navigation

No horizontal scrolling.
No text or CTA obstruction.

Test also at 320px width.

## 7. CTA

Primary:
Start a Project

Secondary:
Explore Work

During Hero-only development:
- Use a working mailto link for the primary CTA.
- Do not create broken links to unfinished pages.
- The secondary CTA may remain visibly pending
  in prototype review until Work exists.

## 8. Motion

Entrance sequence:

0–300ms:
Navigation and orange line appear.

250–850ms:
Headline enters through staggered masking.

650–1100ms:
Better. and decorative V enter.

950–1400ms:
Description, CTA, and bottom details appear.

Interactions:
- Refined button hover
- Subtle underline motion
- Lightweight V movement if justified

Support reduced motion.
No forced scroll behavior.

## 9. Visual Boundaries

Do not include:
- Vercy mascot in Hero
- Stock photography
- SaaS dashboard cards
- Unnecessary gradients
- Heavy WebGL
- Fake awards
- Fake client metrics

Do not build other homepage sections.

## 10. Technical Requirements

- Responsive layout
- Accessible controls
- Optimized font loading
- Semantic heading hierarchy
- Minimal JavaScript
- No layout overflow
- Clean component structure
- Working mobile menu

## 11. Required Verification

Inspect:

1440 x 900
768 x 1024
390 x 844
320 x 568

Verify:
- Layout
- Typography
- CTA states
- Navigation
- Motion
- Reduced-motion behavior
- Build output
- Browser console

## 12. Acceptance Criteria

Hero is ready when:

1. Desktop matches approved art direction.
2. Mobile layout is usable.
3. Brand colors are consistent.
4. Typography and geometry feel intentional.
5. Animations are smooth.
6. Controls work as specified.
7. Accessibility is checked.
8. Build passes.
9. No unrelated sections were created.
10. Owner approves the implementation.

## 13. Reference Files

Expected, if available:

docs/references/hero-v2-desktop.png
docs/references/hero-v2-mobile.png

If these files are absent, use this written
specification and request visual review.

## 14. Completion Rule

After implementation, stop for review.

Do not mark APPROVED automatically.
Do not proceed to Selected Work.

## 15. Implementation Log (pending owner approval)

Status: Implemented, verified, awaiting owner review.

Stack: Next.js 16 (App Router), TypeScript,
Tailwind CSS 4. Fonts are self-hosted via
next/font (Manrope, Instrument Serif, Inter).

Implementation files:

- app/layout.tsx
- app/page.tsx
- app/globals.css
- components/site-header.tsx
- components/hero.tsx
- components/hero-geometry.tsx
- components/brand-mark.tsx
- components/icons.tsx
- lib/site.ts

Verified (2026-11-23):

- ESLint, tsc typecheck, production build pass.
- Viewports checked with screenshots:
  1440x900, 768x1024, 390x844, 320x568.
- No horizontal overflow at any tested viewport.
- Contrast: all checked text 6.25:1 or higher.
- Reduced motion renders all content immediately.
- Mobile menu: opens, locks scroll, Escape closes,
  link tap closes, 48px toggle target.
- Browser console: no errors (dev and production).

Open items requiring owner decision:

1. Desktop headline uses the documented 160px cap.
   The reference art appears closer to ~200px at
   1440 width. Owner to confirm size.
2. Reference nav uses a heavy studio wordmark with
   an orange terminal mark. The supplied brand PNGs
   are a lighter horizontal lockup and a square icon,
   so navigation renders the reference wordmark
   typographically in Manrope. Official PNG assets
   are untouched; logo-icon.png is the favicon.
   Owner to confirm the navigation wordmark.
3. Mobile reference shortens the eyebrow
   ("SOFTWARE & AI STUDIO") and the secondary CTA
   ("Explore Our Work"). Implementation uses the
   specification copy ("INDEPENDENT SOFTWARE & AI
   STUDIO", "Explore Work") at all sizes.
4. Work, Services, and About nav targets are
   in-page anchors reserved for future sections.
   Explore Work uses #work and is described as
   pending for assistive technology until Selected
   Work exists. No unfinished pages are linked.

## 16. V2.1 Motion Layer (pending owner approval)

Status: Implemented on top of the approved V2
design. No layout, copy, typography, or geometry
changes.

Stack: GSAP 3 (single added dependency) for the
coordinated timeline and spring interpolation;
CSS keeps interaction-state transitions (hover,
menu). Motion lives in lib/hero-motion.ts, driven
by one useHeroMotion hook mounted on the Hero.

Systems:

1. Cinematic intro: one GSAP master timeline
   replaces the previous eight loosely-coupled
   CSS keyframe animations. Beat map preserves
   the approved spec timing: header 50ms,
   eyebrow 120ms, orange rule 150ms, headline
   lines 280/400ms (masked rise), "Better."
   620ms (its own elegant rise), V 500ms
   (scale + drift depth), orbit draw 350ms,
   lede 950ms, CTAs 1050ms, footer 1200ms.
   Easing is expo.out / power4.out; no bounce.
2. Interactive V (desktop, pointer:fine only):
   gsap.quickTo spring interpolation on
   translate x/y and rotation. Max drift 26px
   horizontal, 18px vertical, 1.6deg rotation;
   elastic return to rest on pointer leave.
   SVG shape and colors untouched.
3. Orbital detail: slow 9s sine "breathing"
   float plus a counter-directional cursor
   parallax (14px/10px) on the circle group,
   creating layered depth against the V. No
   continuous spinning.
4. Magnetic primary CTA: proximity field
   (140px radius beyond the button edge) pulls
   the button up to ~18% of cursor offset,
   capped. Rect cached and invalidated on
   resize/scroll. Elastic release on leave.
   Keyboard focus and href unchanged.
5. Navigation: entrance handled by the same
   timeline; existing CSS hover underline and
   pill transitions kept as the motion language.

Accessibility and safety:

- A pre-paint script in app/layout.tsx adds
  .motion-ready only when JS is available and
  prefers-reduced-motion is not set. All motion
  initial states are gated behind that class, so
  no-JS and reduced-motion render the full
  static page (verified).
- Runtime listener flips reduced-motion on
  mid-session: timelines killed, inline styles
  cleared, CSS override forces visibility.
- Hero is now a client component to mount the
  hook; markup otherwise unchanged.
- gsap.context-style cleanup: master timeline
  killed, all listeners removed, transforms
  cleared on unmount.

Performance: pointermove handlers use
quickTo (no React re-renders, no layout reads
per frame except a cached CTA rect). Measured
in-browser: 0 dropped frames (>32ms) during a
20-point pointer sweep; ~61fps idle with the
ambient orbit tween running.

Verified (2026-11-23, dev + production):

- Intro sequence frames inspected at 0/500/900/
  2300ms; settled state opacity 1.00 on every
  element.
- V tracks pointer (x: -13.5 -> +5.1px across a
  full sweep) and returns to rest exactly.
- Orbit group parallax reacts and floats.
- Magnet attracts near, releases far, mailto
  href intact.
- Reduced motion: gate class absent, everything
  visible at 120ms, V transform stays "none"
  under pointer movement.
- No-JS: full static render verified.
- Mobile 390x844: intro plays, overflowX 0,
  menu opens/Escape closes; pointer systems
  disabled (pointer:fine gate).
- ESLint, tsc, next build pass; browser console
  clean in dev and production.

Review artifacts: /tmp/vercuno-shots/
(seq-1..4 entrance frames, qa-motion-reduced,
qa-nojs, qa-magnet-near, motion-desktop/
mobile) and /tmp/vercuno-shots/video/
(hero-motion-desktop.mp4, hero-motion-mobile
.mp4 + webm sources).

## 17. V2.2 Cinematic Preloader (pending owner approval)

Status: Implemented on top of V2.1. No changes
to hero design, copy, or interactions.

Files:

- components/preloader.tsx (new)
- lib/hero-motion.ts (refactor: the intro
  timeline is now built paused by
  buildHeroIntroTimeline and started by the
  preloader; pointer systems unchanged;
  revealHeroInstantly adds the V to its
  selector and no longer uses clearProps,
  which wiped the styles it set)
- app/layout.tsx (pre-paint gate extended
  with .intro-pending and a scroll lock)
- app/globals.css (preloader styles +
  .intro-pending hidden state)
- app/page.tsx (Preloader rendered first)

Sequence (one GSAP timeline, ~3.6s total):

1. 0.0-1.55s: Midnight Black overlay with
   centered VERCUNO wordmark, orange accent
   rule, large tabular counter 000%->100%
   (power2.inOut nonlinear), synchronized
   Electric Blue progress rule. Counter ends
   exactly at 100%. It represents the
   cinematic intro, not network progress.
2. 1.55-2.05s: hold at 100%.
3. 2.05-2.75s: Electric Blue full-screen
   panel rises from the bottom over the
   loader; loader content fades.
4. 2.75-3.55s: panel continues upward and
   exits; the existing V2.1 hero intro
   starts at ~2.6s underneath, so the
   reveal and the headline choreography
   read as one continuous handover.
5. Overlay hidden; scroll unlocked.

Session behavior:

- Plays once per browser tab via
  sessionStorage flag vercuno-intro-seen.
- ?intro=1 forces a replay.
- Reduced motion: loader never renders; the
  page is fully visible immediately (the
  pre-paint gate only adds .intro-pending
  when motion is allowed).
- No-JS: the overlay ships with the hidden
  attribute, so content is fully visible.
- A 6s failsafe force-reveals the page if
  anything stalls; it is cancelled on
  normal completion.

Technical notes:

- First-paint flash prevention: the
  pre-paint script adds .intro-pending and
  locks scroll before first paint; CSS
  forces gated hero elements invisible
  while that class is present. Verified:
  hero opacity 0 during the loader, 1
  after the reveal.
- The overlay is always mounted and toggled
  via the hidden attribute (no conditional
  render, no re-render per frame, no
  hydration mismatch; suppressHydration
  Warning on <html> covers the pre-paint
  class mutations).
- The effect is idempotent for React
  strict-mode remounts: it re-reads the
  pre-paint decision and resets initial
  states instead of consulting the session
  flag.
- The intro timeline is built exactly once
  per play (preloader or immediate path),
  so no duplicate timelines or listeners.
- Scroll lock uses html overflow hidden via
  the same pattern as the mobile menu and
  is restored on completion, reduced-motion
  mid-flight, failsafe, and unmount.

Verified (2026-11-23, dev + production):

- First visit: scroll locked, hero hidden,
  count reaches 100%, panel sweep, hero
  intro plays, scroll unlocked, overlay
  hidden, session flag set.
- Repeat visit (fresh tab, flag preset): no
  loader, hero intro immediately.
- ?intro=1 on a seen tab: loader replays
  and completes.
- Reduced motion: no loader, everything
  visible, no scroll lock.
- No-JS: content visible.
- Mobile 390x844: no overflow during or
  after the sequence; menu opens and Escape
  closes.
- ESLint, tsc, next build pass; console
  clean in dev and production.
- Long-run trace: element opacities stay 1
  after 7s (no late failsafe clobber).

Review artifacts: /tmp/vercuno-shots/
(pl-1..5 desktop sequence, pl-mobile-1/2,
pl-nojs) and /tmp/vercuno-shots/video/
(preloader-desktop.mp4, preloader-mobile
.mp4 + webm sources).

## Hero V2.2 Final Approval
Status: APPROVED by project owner
Scope: Hero, cinematic preloader, GSAP motion, and responsive navigation.
Future changes require owner review.
