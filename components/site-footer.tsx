"use client";

import { useRef } from "react";
import { ArrowUp, ArrowUpRight } from "@/components/icons";
import { useFooterMotion } from "@/lib/contact-motion";
import { footerNav, footerStrings } from "@/lib/contact";
import { STUDIO_EMAIL } from "@/lib/site";

/**
 * Signature Electric Blue arc (approved Concept C "The Grand Finale").
 *
 * One huge sweep rising from the lower-right and cresting over the
 * monumental wordmark — a fragment of an orbit, echoing the Hero's circle.
 * Three layered strokes (soft bloom, tight halo, crisp core) share one path
 * so the glow stays luminous without excessive bloom. Geometry is simplified
 * for compact viewports with a second variant. The arc is decorative only:
 * pointer-events none, behind the content, and it never overlaps the form.
 */
const ARC_DESKTOP =
  "M 1500 740 C 1140 690 850 570 650 380 S 330 40 -40 24";
const ARC_COMPACT =
  "M 430 470 C 300 440 214 372 164 276 S 76 96 -30 84";

function ArcStrokes({ d, idSuffix }: { d: string; idSuffix: string }) {
  return (
    <>
      <path
        className="site-footer__arc site-footer__arc--glow"
        d={d}
        filter={`url(#footer-arc-blur-soft-${idSuffix})`}
        pathLength="1"
        stroke={`url(#footer-arc-stroke-${idSuffix})`}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        className="site-footer__arc site-footer__arc--halo"
        d={d}
        filter={`url(#footer-arc-blur-tight-${idSuffix})`}
        pathLength="1"
        stroke={`url(#footer-arc-stroke-${idSuffix})`}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        className="site-footer__arc site-footer__arc--core"
        d={d}
        pathLength="1"
        stroke={`url(#footer-arc-stroke-${idSuffix})`}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        className="site-footer__arc-flow site-footer__arc-flow--glow"
        d={d}
        filter={`url(#footer-arc-blur-soft-${idSuffix})`}
        pathLength="1"
        stroke="#0297DE"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        className="site-footer__arc-flow site-footer__arc-flow--core"
        d={d}
        pathLength="1"
        stroke="#8CDEFF"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </>
  );
}

function ArcDefs({ idSuffix }: { idSuffix: string }) {
  return (
    <defs>
      <linearGradient
        id={`footer-arc-stroke-${idSuffix}`}
        x1="1"
        x2="0"
        y1="1"
        y2="0"
      >
        <stop offset="0" stopColor="#0aa8ec" stopOpacity="0.95" />
        <stop offset="0.52" stopColor="#0297de" stopOpacity="0.8" />
        <stop offset="1" stopColor="#0297de" stopOpacity="0.38" />
      </linearGradient>
      <filter
        height="400%"
        id={`footer-arc-blur-soft-${idSuffix}`}
        width="400%"
        x="-150%"
        y="-150%"
      >
        <feGaussianBlur stdDeviation="9" />
      </filter>
      <filter
        height="400%"
        id={`footer-arc-blur-tight-${idSuffix}`}
        width="400%"
        x="-150%"
        y="-150%"
      >
        <feGaussianBlur stdDeviation="1.4" />
      </filter>
    </defs>
  );
}

function FooterArc() {
  return (
    <>
      <svg
        aria-hidden="true"
        className="site-footer__arc-svg site-footer__arc-svg--desktop"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 1440 780"
      >
        <ArcDefs idSuffix="d" />
        <ArcStrokes d={ARC_DESKTOP} idSuffix="d" />
      </svg>

      <svg
        aria-hidden="true"
        className="site-footer__arc-svg site-footer__arc-svg--compact"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 390 520"
      >
        <ArcDefs idSuffix="m" />
        <ArcStrokes d={ARC_COMPACT} idSuffix="m" />
      </svg>
    </>
  );
}

/**
 * Section 06 — Footer ("The Grand Finale").
 *
 * Monumental VERCUNO wordmark framed by the Electric Blue arc, the verified
 * tagline and business email, working section navigation and a dynamic
 * copyright year. No social links are rendered: none are verified yet, and
 * inventing destinations is prohibited.
 */
export function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null);

  useFooterMotion(footerRef);

  const year = new Date().getFullYear();

  return (
    <footer aria-label="Site footer" className="site-footer" ref={footerRef}>
      <FooterArc />

      <div className="site-footer__inner">
        <div className="site-footer__top" data-fmotion="meta">
          <div className="site-footer__brand">
            <p className="site-footer__tagline">
              {footerStrings.taglineLead}{" "}
              <em className="site-footer__tagline-accent">
                {footerStrings.taglineAccent}
              </em>
            </p>
            <p className="site-footer__note">{footerStrings.note}</p>

            <a
              className="text-link site-footer__mail"
              href={`mailto:${STUDIO_EMAIL}`}
            >
              <span>{STUDIO_EMAIL}</span>
              <ArrowUpRight className="text-link__icon" />
            </a>
          </div>

          <nav aria-label={footerStrings.navLabel} className="site-footer__nav">
            <p aria-hidden="true" className="site-footer__nav-heading">
              {footerStrings.navHeading}
            </p>
            <ul className="site-footer__nav-list">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <a className="site-footer__nav-link" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="site-footer__wordmark">
          <span className="site-footer__wordmark-inner" data-fmotion="wordmark">
            {footerStrings.wordmark}
          </span>
        </p>

        <div className="site-footer__base">
          <p className="site-footer__copyright" suppressHydrationWarning>
            {footerStrings.copyright(year)}
          </p>

          <a className="site-footer__top-link" href="#main-content">
            <span>{footerStrings.backToTop}</span>
            <ArrowUp className="site-footer__top-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
}
