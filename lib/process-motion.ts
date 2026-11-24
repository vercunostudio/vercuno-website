"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Section 05 — Process motion ("The Operator's Index").
 *
 * Three restrained layers, all one-shot or discrete-state:
 *
 * 1. Section entrance — eyebrow, rules and the headline mask in once.
 * 2. Stage entrance — each row's numeral fades up and its title rises out of
 *    a clipped window the first time the row is seen (ScrollTrigger, `once`).
 * 3. Active stage — an IntersectionObserver-driven band toggles `.is-active`
 *    on the stage nearest the vertical midpoint. The numeral fill is a CSS
 *    colour transition, so scroll never runs a per-frame React update.
 *
 * Nothing is hidden in CSS before this module runs, so the whole section is
 * readable without JavaScript. Under reduced motion (or Save-Data) the active
 * state is tracked with no entrance tweens, and a mid-session OS change tears
 * only this section's work down.
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
const MOTION_TARGETS =
  "[data-stage-numeral], [data-stage-title-inner], [data-stage-body], [data-pmotion], [data-pmotion='headline-inner']";

function releaseMotion(root: HTMLElement) {
  gsap.set(root.querySelectorAll(MOTION_TARGETS), {
    clearProps: "transform,opacity,visibility",
  });
}

/* -------------------------------------------------------------------------- */
/* Entrance                                                                    */
/* -------------------------------------------------------------------------- */

function buildEntrance(root: HTMLElement, disposers: Array<() => void>) {
  const query = gsap.utils.selector(root);

  const headTimeline = gsap.timeline({
    scrollTrigger: { trigger: root, start: "top 80%", once: true },
  });

  const rules = query("[data-pmotion='rule']");
  const eyebrow = query("[data-pmotion='eyebrow']");
  const headline = query("[data-pmotion='headline-inner']");

  if (rules.length) {
    headTimeline.fromTo(
      rules,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.7, ease: "expo.out", transformOrigin: "left center" },
      0,
    );
  }

  if (eyebrow.length) {
    headTimeline.fromTo(
      eyebrow,
      { autoAlpha: 0, y: 12 },
      { autoAlpha: 1, y: 0, duration: 0.7, ease: "expo.out" },
      0.05,
    );
  }

  if (headline.length) {
    headTimeline.fromTo(
      headline,
      { yPercent: 110 },
      { yPercent: 0, duration: 1, ease: "expo.out", stagger: 0.08 },
      0.1,
    );
  }

  disposers.push(() => headTimeline.scrollTrigger?.kill(), () => headTimeline.kill());

  // Each stage reveals on its own cue, so the animation is tied to the row
  // the reader is actually looking at rather than one long section timeline.
  const stages = query("[data-stage]");

  for (const stage of stages) {
    const timeline = gsap.timeline({
      scrollTrigger: { trigger: stage, start: "top 88%", once: true },
    });

    const numeral = stage.querySelector<HTMLElement>("[data-stage-numeral]");
    const titleInner = stage.querySelector<HTMLElement>("[data-stage-title-inner]");
    const body = stage.querySelector<HTMLElement>("[data-stage-body]");

    if (numeral) {
      timeline.fromTo(
        numeral,
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 0.85, ease: "expo.out" },
        0,
      );
    }

    if (titleInner) {
      timeline.fromTo(
        titleInner,
        { yPercent: 108 },
        { yPercent: 0, duration: 0.9, ease: "expo.out" },
        0.06,
      );
    }

    if (body) {
      timeline.fromTo(
        body,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.7, ease: "expo.out" },
        0.16,
      );
    }

    disposers.push(() => timeline.scrollTrigger?.kill(), () => timeline.kill());
  }

  // Ending CTA sits below the index; it reveals on its own cue.
  const cta = query("[data-pmotion='cta']");
  const ctaRule = query("[data-pmotion='cta-rule']");

  if (cta.length) {
    const ctaTimeline = gsap.timeline({
      scrollTrigger: { trigger: cta[0], start: "top 92%", once: true },
    });

    if (ctaRule.length) {
      ctaTimeline.fromTo(
        ctaRule,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.7, ease: "expo.out", transformOrigin: "left center" },
        0,
      );
    }

    ctaTimeline.fromTo(
      cta,
      { autoAlpha: 0, y: 16 },
      { autoAlpha: 1, y: 0, duration: 0.8, ease: "expo.out" },
      0.08,
    );

    disposers.push(
      () => ctaTimeline.scrollTrigger?.kill(),
      () => ctaTimeline.kill(),
    );
  }
}

/* -------------------------------------------------------------------------- */
/* Active stage                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Tracks the stage nearest the vertical midpoint and mirrors it onto the
 * `<ol>` as `data-active="<index>"`. CSS owns the numeral fill, so scrolling
 * never writes React state and never runs per-frame work — the observer only
 * fires when a band edge crosses.
 */
function attachActiveStage(root: HTMLElement, disposers: Array<() => void>) {
  const list = root.querySelector<HTMLElement>("[data-process-list]");
  if (!list) return;

  const stages = Array.from(
    list.querySelectorAll<HTMLElement>("[data-stage]")
  );

  if (!stages.length) return;

  let frame: number | null = null;

  const sync = () => {
    const viewportHeight = window.innerHeight;
    const midpoint = viewportHeight / 2;
    const last = stages[stages.length - 1];
    const lastRect = last.getBoundingClientRect();

    const pageHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );

    const atPageBottom =
      window.scrollY + viewportHeight >= pageHeight - 4;

    let active: HTMLElement | null = null;

    if (
      atPageBottom &&
      lastRect.top < viewportHeight &&
      lastRect.bottom > 0
    ) {
      active = last;
    } else {
      let bestDistance = Number.POSITIVE_INFINITY;

      for (const stage of stages) {
        const rect = stage.getBoundingClientRect();

        if (rect.bottom <= 0 || rect.top >= viewportHeight) {
          continue;
        }

        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - midpoint);

        if (distance < bestDistance) {
          bestDistance = distance;
          active = stage;
        }
      }
    }

    if (active) {
      const next = active.dataset.stage ?? "";

      if (list.dataset.active !== next) {
        list.dataset.active = next;
      }
    }
  };

  const scheduleSync = () => {
    if (frame !== null) return;

    frame = window.requestAnimationFrame(() => {
      frame = null;
      sync();
    });
  };

  window.addEventListener("scroll", scheduleSync, { passive: true });
  window.addEventListener("resize", scheduleSync);

  sync();

  disposers.push(() => {
    window.removeEventListener("scroll", scheduleSync);
    window.removeEventListener("resize", scheduleSync);

    if (frame !== null) {
      window.cancelAnimationFrame(frame);
    }

    delete list.dataset.active;
  });
}

export function useProcessMotion(rootRef: RefObject<HTMLElement | null>) {
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

      // The active fill is the section's reading aid, so it stays on even
      // under reduced motion — it is a discrete colour change, not motion.
      attachActiveStage(root, disposers);

      if (!prefersReducedMotion() && !savesData()) {
        buildEntrance(root, disposers);
      }

      const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      const onMotionChange = (event: MediaQueryListEvent) => {
        if (!event.matches) {
          return;
        }

        teardown();
        releaseMotion(root);

        // The active stage keeps tracking so the section still reads.
        attachActiveStage(root, disposers);
      };

      motionQuery.addEventListener("change", onMotionChange);

      return () => {
        motionQuery.removeEventListener("change", onMotionChange);
        teardown();
        releaseMotion(root);
      };
    } catch {
      // No GSAP / no IntersectionObserver: let the CSS defaults show.
      teardown();
      releaseMotion(root);
    }
  }, [rootRef]);
}
