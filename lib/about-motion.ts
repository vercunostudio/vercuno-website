"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { vercyStates, type VercyState } from "@/lib/about";

/**
 * Section 04 — About motion (Concept A+C), with Vercy V1.1 interactions.
 *
 * Two independent layers:
 *
 * 1. The entrance timeline (statement, prose, beliefs, colophon), once per
 *    load, ScrollTrigger-driven. Unchanged from V1.
 * 2. The Vercy character controller — idle breathing, hover/focus → Happy,
 *    click/tap → Surprised then back. All state is a CSS class toggle; no
 *    React state is involved, so pointer motion never re-renders the tree.
 *
 * Everything sits behind the same gates as the rest of the section: nothing
 * animates under `prefers-reduced-motion: reduce` or when Save-Data is on, and
 * a mid-session OS change tears it down cleanly without touching other
 * sections' ScrollTriggers.
 */

const EASE = "expo.out";

/** How long the Surprised reaction holds before returning to idle. */
const SURPRISE_HOLD_MS = 620;

/** Idle breathing: a slow, low-amplitude loop. Never a bob or a hop. */
const BREATH_DURATION_S = 5.2;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function savesData(): boolean {
  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection;

  return Boolean(connection?.saveData);
}

/** Renders everything at its final state — used for reduced motion and errors. */
function revealInstantly(root: HTMLElement) {
  gsap.set(root.querySelectorAll("[data-amotion]"), {
    opacity: 1,
    visibility: "visible",
    y: 0,
    scaleX: 1,
    clipPath: "inset(-0.3em -0.3em -0.3em -0.3em)",
    clearProps: "transform,clipPath,opacity,visibility",
  });
}

/* -------------------------------------------------------------------------- */
/* Vercy controller                                                            */
/* -------------------------------------------------------------------------- */



/**
 * Drives the character through CSS classes on the frame:
 *
 *   (none)        idle     — Neutral, breathing
 *   .is-happy     hover/focus   — Happy
 *   .is-surprised click/tap     — Surprised, holds, then returns
 *
 * The three images are already in the DOM and stacked; only opacity changes,
 * so there is no layout shift and nothing re-renders.
 *
 * Keyboard: focus behaves like hover. Enter/Space (already handled natively by
 * <button>) trigger the surprise. Pointer: enter/leave for hover.
 */
function attachVercy(root: HTMLElement, disposers: Array<() => void>) {
  const frame = root.querySelector<HTMLButtonElement>("[data-vercy-frame]");

  if (!frame) {
    return;
  }

  // Warm the two reaction states in the background so the first hover or tap
  // is painted instantly instead of flashing an empty layer. Small files, and
  // only fetched once the character has actually been seen.
  const warm = () => {
    for (const state of ["happy", "surprised"] as VercyState[]) {
      const image = new Image();
      image.decoding = "async";
      image.src = `${vercyStates[state]}-160.webp`;
    }
  };

  let warmed = false;
  const warmOnce = () => {
    if (warmed) return;
    warmed = true;
    warm();
  };

  const warmObserver = new IntersectionObserver(
    (records) => {
      if (records.some((record) => record.isIntersecting)) {
        warmObserver.disconnect();
        warmOnce();
      }
    },
    { rootMargin: "200px" },
  );

  warmObserver.observe(frame);

  let surpriseTimer = 0;

  // Set from the click event so a touch-driven focus does not apply the
  // hover treatment (touch has no hover-out to clear it).
  let lastInteractionWasTouch = false;

  const surprise = () => {
    // Restart cleanly if it is already reacting.
    window.clearTimeout(surpriseTimer);
    frame.classList.remove("is-surprised");

    // Force a reflow so re-adding the class replays the enter transition even
    // when the user taps twice quickly.
    void frame.offsetWidth;

    frame.classList.add("is-surprised");

    surpriseTimer = window.setTimeout(() => {
      surpriseTimer = 0;
      frame.classList.remove("is-surprised");
    }, SURPRISE_HOLD_MS);
  };

  // Hover is only wired for real pointers; touch devices use the tap path.
  const onPointerEnter = (event: PointerEvent) => {
    if (event.pointerType === "touch") return;
    warmOnce();
    if (!surpriseTimer) {
      frame.classList.add("is-happy");
    }
  };

  const onPointerLeave = (event: PointerEvent) => {
    if (event.pointerType === "touch") return;
    frame.classList.remove("is-happy");
  };

  const onPointerDown = (event: PointerEvent) => {
    lastInteractionWasTouch = event.pointerType === "touch";
  };

  const onFocus = () => {
    // A tap focuses the button before the click handler runs. Touch has no
    // hover-out, so the Happy state is skipped entirely on touch; the tap
    // plays Surprised instead.
    if (lastInteractionWasTouch) {
      return;
    }

    warmOnce();
    frame.classList.add("is-happy");
  };

  const onBlur = () => {
    frame.classList.remove("is-happy");
    frame.classList.remove("is-surprised");
    lastInteractionWasTouch = false;
  };

  const onClick = () => {
    warmOnce();
    surprise();
  };

  frame.addEventListener("pointerdown", onPointerDown);
  frame.addEventListener("pointerenter", onPointerEnter);
  frame.addEventListener("pointerleave", onPointerLeave);
  frame.addEventListener("focus", onFocus);
  frame.addEventListener("blur", onBlur);
  frame.addEventListener("click", onClick);

  // Idle breathing. Two slow tweens on the inner breath wrapper: a 3px rise
  // and a 1% scale. Low amplitude so it reads as alive, never as bouncing.
  const breath = frame.querySelector<HTMLElement>(".vercy__breath");
  let breathTween: gsap.core.Timeline | null = null;

  if (breath) {
    breathTween = gsap
      .timeline({ paused: true })
      .to(breath, {
        scale: 1.012,
        y: -2,
        duration: BREATH_DURATION_S / 2,
        ease: "sine.inOut",
      })
      .to(breath, {
        scale: 1,
        y: 0,
        duration: BREATH_DURATION_S / 2,
        ease: "sine.inOut",
      });

    breathTween.repeat(-1);

    // Only breathe while the mark is actually on screen.
    const breathObserver = new IntersectionObserver(
      (records) => {
        for (const record of records) {
          if (record.isIntersecting) {
            breathTween?.play();
          } else {
            breathTween?.pause();
          }
        }
      },
      { threshold: 0.1 },
    );

    breathObserver.observe(frame);

    disposers.push(() => {
      breathObserver.disconnect();
      breathTween?.kill();
      gsap.set(breath, { clearProps: "transform" });
    });
  }

  disposers.push(() => {
    warmObserver.disconnect();
    window.clearTimeout(surpriseTimer);
    frame.removeEventListener("pointerdown", onPointerDown);
    frame.removeEventListener("pointerenter", onPointerEnter);
    frame.removeEventListener("pointerleave", onPointerLeave);
    frame.removeEventListener("focus", onFocus);
    frame.removeEventListener("blur", onBlur);
    frame.removeEventListener("click", onClick);
    frame.classList.remove("is-happy", "is-surprised");
  });
}

/* -------------------------------------------------------------------------- */
/* Entrance                                                                    */
/* -------------------------------------------------------------------------- */

function buildEntrance(root: HTMLElement, disposers: Array<() => void>) {
  const query = gsap.utils.selector(root);

  const headRule = query('[data-amotion="rule"]');
  const eyebrow = query('[data-amotion="eyebrow"]');
  const eyebrowLine = query(".eyebrow__line");
  const lines = query('[data-amotion="line"]');
  const prose = query('[data-amotion="prose"]');
  const beliefRows = query('[data-amotion="belief"]');
  const colophonRule = query('[data-amotion="colophon-rule"]');
  const colophon = query('[data-amotion="colophon"]');

  const timeline = gsap.timeline({
    scrollTrigger: { trigger: root, start: "top 78%", once: true },
  });

  if (headRule.length) {
    timeline.fromTo(
      headRule,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.6, ease: EASE, transformOrigin: "left center" },
      0,
    );
  }

  if (eyebrow.length) {
    timeline.fromTo(
      eyebrow,
      { autoAlpha: 0, y: 12 },
      { autoAlpha: 1, y: 0, duration: 0.75, ease: EASE },
      0.06,
    );
  }

  if (eyebrowLine.length) {
    timeline.fromTo(
      eyebrowLine,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.85, ease: EASE, transformOrigin: "left center" },
      0.06,
    );
  }

  // Statement: each line rises out of its own clipped window.
  if (lines.length) {
    timeline.fromTo(
      lines,
      { yPercent: 108, autoAlpha: 0 },
      { yPercent: 0, autoAlpha: 1, duration: 1.05, ease: EASE, stagger: 0.09 },
      0.14,
    );
  }

  if (prose.length) {
    timeline.fromTo(
      prose,
      { autoAlpha: 0, y: 22 },
      { autoAlpha: 1, y: 0, duration: 0.75, ease: EASE, stagger: 0.07 },
      0.5,
    );
  }

  if (beliefRows.length) {
    timeline.fromTo(
      beliefRows,
      { autoAlpha: 0, y: 16 },
      { autoAlpha: 1, y: 0, duration: 0.7, ease: EASE, stagger: 0.09 },
      0.62,
    );
  }

  disposers.push(() => timeline.scrollTrigger?.kill(), () => timeline.kill());

  // The colophon sits below the beliefs; it reveals on its own cue.
  if (colophonRule.length || colophon.length) {
    const colophonTimeline = gsap.timeline({
      scrollTrigger: { trigger: colophon[0] ?? root, start: "top 92%", once: true },
    });

    if (colophonRule.length) {
      colophonTimeline.fromTo(
        colophonRule,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.7, ease: EASE, transformOrigin: "left center" },
        0,
      );
    }

    if (colophon.length) {
      colophonTimeline.fromTo(
        colophon,
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: EASE },
        0.1,
      );
    }

    disposers.push(
      () => colophonTimeline.scrollTrigger?.kill(),
      () => colophonTimeline.kill(),
    );
  }
}

export function useAboutMotion(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    // Entrance disposers are kept apart from the character so a mid-session
    // reduced-motion switch stops motion without touching other sections.
    const entrance: Array<() => void> = [];
    const character: Array<() => void> = [];

    try {
      gsap.registerPlugin(ScrollTrigger);

      if (!prefersReducedMotion()) {
        buildEntrance(root, entrance);

        if (!savesData()) {
          attachVercy(root, character);
        }
      } else {
        revealInstantly(root);
      }

      const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      const onMotionChange = () => {
        if (!motionQuery.matches) {
          return;
        }

        for (const dispose of [...entrance, ...character]) {
          dispose();
        }

        entrance.length = 0;
        character.length = 0;
        revealInstantly(root);
      };

      motionQuery.addEventListener("change", onMotionChange);

      return () => {
        motionQuery.removeEventListener("change", onMotionChange);

        for (const dispose of [...entrance, ...character]) {
          dispose();
        }
      };
    } catch {
      revealInstantly(root);
    }
  }, [rootRef]);
}
