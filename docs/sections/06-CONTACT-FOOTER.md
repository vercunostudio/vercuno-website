# VERCUNO — Section 06: Contact & Footer

Version: 1.0
Concept: The Grand Project Brief
Design Status: APPROVED
Implementation Status: APPROVED

## 1. Purpose

Convert interested visitors into qualified
project inquiries while ending the homepage
with a memorable branded experience.

## 2. Creative Direction

Hybrid of:
- Concept B: The Project Brief
- Concept C: The Grand Finale

Bold Editorial Minimalist.

Maintain the established VERCUNO brand identity.

## 3. Contact Layout

Desktop:
- Two-column asymmetric composition.
- Left: editorial headline and supporting copy.
- Right: compact project inquiry form.
- Strong typography and generous whitespace.

Eyebrow:
06 / LET'S TALK

Headline:
Start a Project.

Use Manrope ExtraBold for "Start a".
Use Instrument Serif Italic Electric Blue
for "Project."

Supporting copy:
Tell us what you're building.
We'll explore how VERCUNO can help.

## 4. Inquiry Form

Required fields:
- Name
- Email address
- Project details

Optional:
- Service category

Submit button:
Send Inquiry

Service options:
- Web Development
- Custom Software
- AI & Workflow Automation
- Technical Maintenance & Support
- Not sure yet

Use clear validation and error messages.

Never claim a successful submission
unless delivery was confirmed by the
configured form service or backend.

## 5. Submission Requirements

Destination:
vercuno.studio@gmail.com

Choose a secure production-capable
form delivery solution during implementation.

Requirements:
- Server-side validation
- Basic spam protection
- Rate limiting where supported
- No exposed API credentials
- Clear loading, success, and error states
- Working email delivery tested end-to-end

If the submission backend is not configured,
do not display a fake working form.

Keep a working email contact fallback.

Create a suitable privacy notice before
collecting personal information publicly.

## 6. Visual Motion

Contact:
- Headline masked reveal
- Subtle form entrance
- Refined input focus transitions
- Responsive button interactions

Finale:
- Oversized VERCUNO wordmark
- Restrained Electric Blue geometric accent
- Smooth scroll-triggered reveal
- Controlled cinematic feeling

Avoid heavy WebGL, scroll hijacking,
unnecessary loops, or excessive glow.

Respect prefers-reduced-motion.

## 7. Footer

Include:
- VERCUNO wordmark
- Digital, Built Better.
- Business email
- Working section navigation
- Verified social profiles only
- Dynamic copyright year

Do not invent social URLs.

No fixed service pricing.

## 8. Mobile

- Single-column layout
- Headline above form
- Full-width submit button
- Comfortable field spacing
- Large responsive footer wordmark
- No horizontal overflow
- No hover-dependent information

## 9. Integration

Section ID: contact

Position:
After Process V1.

Connect existing contact CTAs to
a real contact destination.

Preserve the established visual and
motion behavior of all approved sections.

## 10. Accessibility

- Semantic form and labels
- Accessible validation messages
- Keyboard navigation
- Visible focus indicators
- Screen-reader-friendly status messages
- Adequate contrast
- Reduced-motion support

## 11. Performance

Reuse existing fonts, tokens, and GSAP.

Avoid unnecessary dependencies.
Keep client JavaScript minimal.
Do not generate QA videos.

## 12. Acceptance Criteria

1. Approved B+C visual direction.
2. Responsive desktop/mobile design.
3. Functional form validation.
4. Verified delivery or explicit fallback.
5. Proper spam and error handling.
6. Accessible form interactions.
7. Working navigation and email links.
8. Large branded footer.
9. Smooth, restrained motion.
10. No layout overflow.
11. Lint, TypeScript, and build pass.
12. Existing sections remain intact.
13. Owner approves implementation.

## 13. Scope

Implement Contact & Footer only.

Do not redesign approved sections.
Do not invent client claims or results.
Do not commit, push, or deploy without approval.

Implementation remains pending owner review.

## 14. Signature Electric Blue Arc

MANDATORY DESIGN ELEMENT — OWNER APPROVED

Preserve the large luminous curved Electric Blue
arc from Concept C: The Grand Finale.

- Large sweeping curved line.
- Electric Blue #0297DE with subtle luminous glow.
- Originates from the lower-right area.
- Frames the monumental VERCUNO footer wordmark.
- Must feel architectural and cinematic.
- Animate its reveal smoothly on scroll.
- Use lightweight SVG and GSAP if appropriate.
- Respect prefers-reduced-motion.
- Simplify geometry for mobile.
- Never obscure form fields, CTA, or readable text.

IMPORTANT:
Do not replace the arc with an ordinary
straight divider, small decorative line,
or generic gradient background.

This is a signature element of the approved
Contact & Footer design.

---

## 15. Implementation Notes (V1)

Implemented: 2026-11-24
Status: IMPLEMENTED — PENDING OWNER IMPLEMENTATION APPROVAL

### Files

- components/contact.tsx — Section 06 editorial
  two-column composition (eyebrow 06 / LET'S TALK,
  masked "Start a / Project." masthead, supporting
  copy, verified direct email line).
- components/contact-form.tsx — inquiry form
  (Name, Email required; Service optional;
  Project details required). Accessible labels,
  aria-invalid + role=alert error messages,
  first-invalid focus management, live status
  region, disabled state during the mail handoff.
- components/site-footer.tsx — footer with the
  signature Electric Blue arc (desktop + compact
  variants), monumental wordmark, tagline with
  Instrument Serif Italic accent, verified email,
  section navigation, dynamic copyright year,
  Back to top.
- lib/contact.ts — all Section 06 content strings.
- lib/contact-motion.ts — GSAP entrances (contact
  + footer), scroll-scrubbed arc draw, wordmark
  mask reveal; reduced-motion and Save-Data
  guards; mid-session preference change teardown.
- app/globals.css — Section 06 styles appended.
- app/page.tsx — Contact added after Process;
  SiteFooter rendered after main.
- CTA integration (href only, visuals untouched):
  Hero "Start a Project", header nav pill
  "Let's Talk", mobile menu "Start a Project",
  Work + Services "Start a Project" links and
  the Process "Let's Talk" CTA now route to
  #contact. Direct mailto links remain in the
  mobile menu note, the contact section and the
  footer.

### Email delivery status

No form-delivery provider is configured in this
repository: no API routes, no .env credentials,
no provider packages (package.json holds only
gsap, next, react). Per the spec's fallback rule
the form implements the honest email-draft flow:

- Submit validates inputs client-side, then
  composes a mailto: draft to
  vercuno.studio@gmail.com with subject
  "Project inquiry — {name}" and a body carrying
  Name, Email, Service (when chosen) and the
  project details.
- The action is labelled "Continue via Email";
  a permanent note and a live-region status
  explain that the visitor must press send and
  that nothing is stored or sent by the website.
- No success state is ever displayed.

Needed for direct server-side delivery (owner
decision): choose a provider (e.g. Resend /
Postmark / Formspree), add its API route under
app/api/, move validation server-side, add the
honeypot + rate limiting there, and store
credentials in environment variables. The form
component is structured so the mailto dispatch
can be replaced by a fetch to that route.

### Motion

- Contact entrance: eyebrow line scaleX, eyebrow
  fade-rise, masked headline reveal, copy fade,
  form rise (one-shot, once:true).
- Footer: meta fade-rise, wordmark mask reveal
  (once), arc drawn by scroll position
  (scrub 0.6) so the reveal completes as the
  wordmark arrives.
- prefers-reduced-motion and Save-Data: no
  entrance tweens; the arc renders fully drawn;
  input/CTA transitions disabled.
- Implementation note: masked elements carry no
  CSS transform gate — GSAP must own their
  transforms. A CSS translateY gate is parsed
  and preserved by GSAP as a separate percent
  translate and would leave the element stuck
  at the gate offset after the reveal (verified
  during QA; hero/process pattern matched).

### Footer content decisions

- Social links: none rendered. No social URLs
  are verified anywhere in the repository and
  inventing destinations is prohibited. If the
  owner supplies verified profiles they can be
  added to the footer top row.
- No fixed service pricing (per spec).

### Verification performed

- ESLint: pass. TypeScript: pass. Production
  build: pass (Next.js 16.4.6, static prerender).
- Browser QA (production server, headless
  Chromium): zero console errors or warnings.
- Widths 1440 / 1024 / 768 / 390 / 320: no
  horizontal overflow anywhere; single-column
  mobile; full-width submit; compact arc variant
  below 768px; wordmark measured symmetric and
  unclipped at every width.
- Form: empty submit shows all three messages
  and focuses Name; invalid email flags
  aria-invalid; short details message; valid
  submit opens the prefilled mailto draft
  (verified encoded payload in the browser
  console) and shows the honest status line.
- Keyboard: tab order header → sections →
  form fields → submit → footer; Electric Blue
  focus ring on inputs (focus-visible); native
  select keyboard-operable.
- Reduced motion: content and arc render whole
  immediately; no tweens; transitions disabled.
- Navigation: header pill → #contact, footer
  section links, Back to top all verified.
- Locked sections: Hero V2.2, Selected Work V1,
  Services V1, About V1.1, Process V1 visuals
  unchanged (spot-checked; only CTA hrefs were
  integrated).

### Known observations

- The Process eyebrow's orange tick does not
  reveal (process-motion never animates
  .eyebrow__line and the base rule is
  scaleX(0)) — pre-existing, left untouched.
- Footer links below the fold are untabbable
  until the footer reveals (autoAlpha
  visibility:hidden in its pre-reveal state) —
  the same established pattern as the other
  approved sections' footers; focus recovers
  on the next tab cycle after the reveal.
- The arc passes behind the wordmark by design
  (z-layered); it never overlaps form fields,
  buttons or readable text at any tested width.


## Final Owner Approval — 2026-11-24

Status: APPROVED / LOCKED

Approved:
- Contact and Footer V1, Concept B + C.
- Flowing Electric Blue Arc, always-visible base.
- Continuous flowing highlight and reduced-motion support.
- Monumental VERCUNO wordmark.
- Validated inquiry form with honest mailto fallback.

Production email integration is deferred.
