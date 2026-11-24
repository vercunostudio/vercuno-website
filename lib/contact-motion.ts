"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Section 06 — Contact & Footer motion ("The Grand Project Brief").
 *
 * Four restrained layers, all one-shot or scroll-mapped:
 *
 * 1. Contact entrance — eyebrow, headline mask and supporting copy in once.
 * 2. Form entrance — the inquiry panel rises gently beneath the copy.
 * 3. Wordmark reveal — the monumental VERCUNO wordmark rises out of its mask
 *    the first time the footer is seen.
 * 4. Signature arc — the Electric Blue arc draws itself with scroll progress
 *    (scrub), so the reveal is tied to how far the reader has travelled into
 *    the finale. It completes as the wordmark comes into view.
 *
 * Nothing is hidden in CSS before this module runs, so both blocks stay fully
 * readable without JavaScript. Under reduced motion (or Save-Data) no
 * entrance tweens are built and the arc renders fully drawn; a mid-session OS
 * change tears only these blocks' work down.
 */

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function savesData(): boolean {
  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection;

  return Boolean(connection?.saveData);
}

/** Elements GSAP may transform or fade; reset when motion is torn down. */
const CONTACT_TARGETS = "[data-cmotion]";
const FOOTER_TARGETS = "[data-fmotion], .site-footer__arc";

function releaseMotion(root: HTMLElement, targets: string) {
  gsap.set(root.querySelectorAll(targets), {
    clearProps: "transform,opacity,visibility,strokeDashoffset",
  });
}

/* -------------------------------------------------------------------------- */
/* Contact entrance                                                            */
/* -------------------------------------------------------------------------- */

function buildContactEntrance(root: HTMLElement, disposers: Array<() => void>) {
  const query = gsap.utils.selector(root);

  const timeline = gsap.timeline({
    scrollTrigger: { trigger: root, start: "top 78%", once: true },
  });

  const eyebrowLine = query(".eyebrow__line");
  const eyebrow = query("[data-cmotion='eyebrow']");
  const headline = query("[data-cmotion='headline-inner']");
  const copy = query("[data-cmotion='copy']");
  const form = query("[data-cmotion='form']");

  if (eyebrowLine.length) {
    timeline.fromTo(
      eyebrowLine,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.7, ease: "expo.out", transformOrigin: "left center" },
      0,
    );
  }

  if (eyebrow.length) {
    timeline.fromTo(
      eyebrow,
      { autoAlpha: 0, y: 12 },
      { autoAlpha: 1, y: 0, duration: 0.7, ease: "expo.out" },
      0.05,
    );
  }

  if (headline.length) {
    timeline.fromTo(
      headline,
      { yPercent: 110 },
      { yPercent: 0, duration: 1, ease: "expo.out", stagger: 0.09 },
      0.08,
    );
  }

  if (copy.length) {
    timeline.fromTo(
      copy,
      { autoAlpha: 0, y: 14 },
      { autoAlpha: 1, y: 0, duration: 0.8, ease: "expo.out", stagger: 0.08 },
      0.3,
    );
  }

  if (form.length) {
    timeline.fromTo(
      form,
      { autoAlpha: 0, y: 22 },
      { autoAlpha: 1, y: 0, duration: 0.9, ease: "expo.out" },
      0.42,
    );
  }

  disposers.push(() => timeline.scrollTrigger?.kill(), () => timeline.kill());
}

/* -------------------------------------------------------------------------- */
/* Footer: wordmark reveal + signature arc                                     */
/* -------------------------------------------------------------------------- */

function buildFooterMotion(root: HTMLElement, disposers: Array<() => void>) {
  const query = gsap.utils.selector(root);

  const meta = query("[data-fmotion='meta']");
  const wordmark = query("[data-fmotion='wordmark']");

  if (meta.length) {
    const metaTimeline = gsap.timeline({
      scrollTrigger: { trigger: root, start: "top 88%", once: true },
    });

    metaTimeline.fromTo(
      meta,
      { autoAlpha: 0, y: 16 },
      { autoAlpha: 1, y: 0, duration: 0.8, ease: "expo.out" },
      0,
    );

    disposers.push(
      () => metaTimeline.scrollTrigger?.kill(),
      () => metaTimeline.kill(),
    );
  }

  if (wordmark.length) {
    const timeline = gsap.timeline({
      scrollTrigger: { trigger: root, start: "top 80%", once: true },
    });

    timeline.fromTo(
      wordmark,
      { yPercent: 108 },
      { yPercent: 0, duration: 1.15, ease: "expo.out" },
      0,
    );

    disposers.push(() => timeline.scrollTrigger?.kill(), () => timeline.kill());
  }

  // Animate the flowing highlight only while the footer is visible.
  // The underlying arc stays visible at all times.
  const flowObserver = new IntersectionObserver(
    ([entry]) => {
      root.classList.toggle(
        "site-footer--flow-active",
        entry.isIntersecting,
      );
    },
    { rootMargin: "10% 0px 10% 0px" },
  );

  flowObserver.observe(root);

  disposers.push(() => {
    flowObserver.disconnect();
    root.classList.remove("site-footer--flow-active");
  });

}

/* -------------------------------------------------------------------------- */
/* Hooks                                                                       */
/* -------------------------------------------------------------------------- */

function useSectionMotion(
  rootRef: RefObject<HTMLElement | null>,
  targets: string,
  build: (root: HTMLElement, disposers: Array<() => void>) => void,
) {
  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const disposers: Array<() => void> = [];

    const teardown = () => {
      for (const dispose of disposers) {
        dispose();
      }

      disposers.length = 0;
    };

    try {
      gsap.registerPlugin(ScrollTrigger);

      if (!prefersReducedMotion() && !savesData()) {
        build(root, disposers);
      }

      const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      const onMotionChange = (event: MediaQueryListEvent) => {
        if (!event.matches) {
          return;
        }

        teardown();
        releaseMotion(root, targets);
      };

      motionQuery.addEventListener("change", onMotionChange);

      return () => {
        motionQuery.removeEventListener("change", onMotionChange);
        teardown();
        releaseMotion(root, targets);
      };
    } catch {
      // No GSAP / no ScrollTrigger: let the CSS defaults show.
      teardown();
      releaseMotion(root, targets);
    }
  }, [rootRef, targets, build]);
}

export function useContactMotion(rootRef: RefObject<HTMLElement | null>) {
  useSectionMotion(rootRef, CONTACT_TARGETS, buildContactEntrance);
}

export function useFooterMotion(rootRef: RefObject<HTMLElement | null>) {
  useSectionMotion(rootRef, FOOTER_TARGETS, buildFooterMotion);
}
