"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Section 02 — Selected Work motion layer (Concept A+).
 *
 * One entrance timeline (ScrollTrigger, once) covers the section header,
 * masked heading rise and footer strip; ledger rows + their hairline rules
 * enter via ScrollTrigger.batch (stagger 120ms when several intersect
 * together). The floating preview plate runs on fine pointers, >=1024px,
 * motion allowed: quickTo follow with velocity rotation clamped to +/-4deg.
 * No React state on pointer movement. Everything is torn down on unmount.
 */

const EASE = "expo.out";
const pointerFineQuery = "(pointer: fine)";
const rotationLimit = 4;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Force-reveal every gated element; the plate stays hidden (decorative). */
function revealWorkInstantly(root: HTMLElement) {
  gsap.set(root.querySelectorAll('[data-wmotion]:not([data-wmotion="plate"])'), {
    opacity: 1,
    visibility: "visible",
    y: 0,
    scale: 1,
    rotation: 0,
    scaleX: 1,
    clipPath: "inset(-0.3em -0.3em -0.3em -0.3em)",
  });
}

function buildEntrance(root: HTMLElement, disposers: Array<() => void>) {
  const query = gsap.utils.selector(root);

  const eyebrow = query('[data-wmotion="eyebrow"]');
  const eyebrowLine = query(".eyebrow__line");
  const count = query('[data-wmotion="count"]');
  const headingInners = query('[data-wmotion="heading-inner"]');
  const firstRule = query(".work__rule--strong");
  const foot = query('[data-wmotion="foot"]');

  // Spec beat map: rule 0ms -> eyebrow 60ms -> heading 120ms. Rows and the
  // footer strip have their own triggers so tall sections stay correct.
  const headerTl = gsap.timeline({
    scrollTrigger: { trigger: root, start: "top 78%", once: true },
  });

  if (firstRule.length) {
    headerTl.fromTo(
      firstRule,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.6, ease: EASE, transformOrigin: "left center" },
      0,
    );
  }

  if (eyebrow.length) {
    headerTl.fromTo(
      eyebrow,
      { autoAlpha: 0, y: 12 },
      { autoAlpha: 1, y: 0, duration: 0.75, ease: EASE },
      0.06,
    );
  }

  if (eyebrowLine.length) {
    headerTl.fromTo(
      eyebrowLine,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.85, ease: EASE, transformOrigin: "left center" },
      0.06,
    );
  }

  if (count.length) {
    headerTl.fromTo(
      count,
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, duration: 0.7, ease: EASE },
      0.1,
    );
  }

  if (headingInners.length) {
    headerTl.fromTo(
      headingInners,
      {
        y: "0.35em",
        clipPath: "inset(0% 0% 110% 0%)",
        autoAlpha: 0,
      },
      {
        y: "0em",
        clipPath: "inset(-0.3em -0.3em -0.3em -0.3em)",
        autoAlpha: 1,
        duration: 0.8,
        ease: EASE,
        stagger: 0.09,
      },
      0.12,
    );
  }

  disposers.push(() => headerTl.scrollTrigger?.kill(), () => headerTl.kill());

  // Rows stagger 120ms apart as they intersect (~12% of the viewport edge).
  const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-wmotion="row"]'));

  if (rows.length) {
    const batch = ScrollTrigger.batch(rows, {
      once: true,
      start: "top 88%",
      onEnter: (nodes) => {
        const rules = nodes
          .map((row) => row.previousElementSibling)
          .filter(
            (el): el is HTMLElement =>
              el instanceof HTMLElement && el.dataset.wmotion === "rule",
          );

        if (rules.length) {
          gsap.to(rules, {
            scaleX: 1,
            duration: 0.6,
            ease: EASE,
            stagger: 0.06,
            overwrite: "auto",
          });
        }

        gsap.to(nodes, {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: EASE,
          stagger: 0.12,
          overwrite: "auto",
        });
      },
    });

    disposers.push(() => {
      for (const trigger of batch) {
        trigger.kill();
      }
    });
  }

  if (foot.length) {
    const footTween = gsap.fromTo(
      foot,
      { autoAlpha: 0, y: 14 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: EASE,
        scrollTrigger: { trigger: foot[0] ?? root, start: "top 92%", once: true },
      },
    );

    disposers.push(
      () => footTween.scrollTrigger?.kill(),
      () => footTween.kill(),
    );
  }
}

/**
 * Floating preview plate. Fine pointers, >=1024px, motion allowed only.
 * Follows the cursor with quickTo easing; rotation derives from the plate's
 * horizontal lag (so it decays to 0 on its own), clamped to +/-4deg.
 */
function attachPlate(root: HTMLElement, disposers: Array<() => void>) {
  if (!window.matchMedia(pointerFineQuery).matches) {
    return;
  }

  const ledger = root.querySelector<HTMLElement>(".work__ledger");
  const plate = root.querySelector<HTMLElement>('[data-wmotion="plate"]');

  if (!ledger || !plate) {
    return;
  }

  const medias = Array.from(
    plate.querySelectorAll<HTMLElement>("[data-plate-media]"),
  );

  const xTo = gsap.quickTo(plate, "x", { duration: 0.6, ease: "power3.out" });
  const yTo = gsap.quickTo(plate, "y", { duration: 0.6, ease: "power3.out" });
  const rotationSetter = gsap.quickSetter(plate, "rotation", "deg");

  let targetX = 0;
  let targetY = 0;
  let activeSlot = -1;
  let visible = false;
  let viewportW = window.innerWidth;
  let viewportH = window.innerHeight;
  let plateW = 0;
  let plateH = 0;
  const focusWatchers: Array<() => void> = [];

  // CSS owns the size (min(26rem, 26vw), 16/10); mirror it for clamping.
  const measure = () => {
    viewportW = window.innerWidth;
    viewportH = window.innerHeight;
    plateW = Math.min(416, viewportW * 0.26);
    plateH = (plateW * 10) / 16;
  };

  measure();
  gsap.set(plate, { autoAlpha: 0, scale: 0.92, rotation: 0 });

  // Velocity-responsive tilt: the lag between target and current x, clamped.
  const ticker = () => {
    const current = Number(gsap.getProperty(plate, "x"));
    const lag = targetX - current;

    rotationSetter(gsap.utils.clamp(-rotationLimit, rotationLimit, lag * 0.05));
  };

  const clampToViewport = (cx: number, cy: number) => {
    const margin = 28;
    const pad = 20;

    let x = cx + margin;

    if (x + plateW > viewportW - pad) {
      x = cx - plateW - margin;
    }

    x = gsap.utils.clamp(pad, Math.max(pad, viewportW - plateW - pad), x);

    targetX = x;
    targetY = gsap.utils.clamp(
      pad,
      Math.max(pad, viewportH - plateH - pad),
      cy - plateH / 2,
    );

    xTo(targetX);
    yTo(targetY);
  };

  const crossfade = (slot: number) => {
    for (const media of medias) {
      const isActive = Number(media.dataset.plateMedia) === slot;

      gsap.to(media, {
        autoAlpha: isActive ? 1 : 0,
        duration: 0.45,
        ease: "expo.out",
        overwrite: "auto",
      });
    }
  };

  const show = (slot: number, snap: boolean, cx: number, cy: number) => {
    clampToViewport(cx, cy);

    if (snap) {
      gsap.set(plate, { x: targetX, y: targetY, scale: 0.92, rotation: 0 });
    }

    crossfade(slot);

    if (!visible) {
      visible = true;
      gsap.ticker.add(ticker);
    }

    gsap.to(plate, {
      autoAlpha: 1,
      scale: 1,
      duration: 0.45,
      ease: "expo.out",
      overwrite: "auto",
    });
  };

  const hide = () => {
    if (!visible) {
      return;
    }

    visible = false;
    activeSlot = -1;
    gsap.ticker.remove(ticker);
    gsap.to(plate, {
      autoAlpha: 0,
      scale: 0.94,
      rotation: 0,
      duration: 0.35,
      ease: "power2.in",
      overwrite: "auto",
    });
  };

  const onLedgerOver = (event: PointerEvent) => {
    const row = (event.target as Element | null)?.closest?.("[data-plate-slot]");

    if (!row) {
      return;
    }

    const slot = row.getAttribute("data-plate-slot");

    if (slot === "none") {
      hide();

      return;
    }

    const next = Number(slot);

    if (visible && next === activeSlot) {
      return;
    }

    activeSlot = next;
    show(next, !visible, event.clientX, event.clientY);
  };

  const onLedgerMove = (event: PointerEvent) => {
    if (!visible) {
      return;
    }

    clampToViewport(event.clientX, event.clientY);
  };

  const onLedgerLeave = () => {
    hide();
  };

  const onFocusIn = (event: FocusEvent) => {
    const row = (event.target as Element | null)?.closest?.(
      '[data-plate-slot]:not([data-plate-slot="none"])',
    );

    if (!row) {
      return;
    }

    const slot = Number(row.getAttribute("data-plate-slot"));

    // The browser autoscrolls the focused row into view after focusin, so
    // keep re-seating until the scroll position settles (bounded watch).
    let lastY = window.scrollY;
    let frames = 0;
    let raf = 0;

    const settle = () => {
      const rect = row.getBoundingClientRect();

      activeSlot = slot;
      show(
        slot,
        !visible,
        rect.right - plateW - 40,
        rect.top + rect.height / 2,
      );
    };

    const watch = () => {
      frames += 1;
      const y = window.scrollY;

      if (y !== lastY) {
        lastY = y;
        settle();
      }

      if (frames < 90 && visible && activeSlot === slot) {
        raf = window.requestAnimationFrame(watch);
      }
    };

    settle();
    raf = window.requestAnimationFrame(watch);

    focusWatchers.push(() => {
      window.cancelAnimationFrame(raf);
    });
  };

  const onFocusOut = (event: FocusEvent) => {
    if (!ledger.contains(event.relatedTarget as Node | null)) {
      hide();
    }
  };

  const onResize = () => {
    measure();

    if (viewportW < 1024) {
      hide();
    }
  };

  ledger.addEventListener("pointerover", onLedgerOver);
  ledger.addEventListener("pointermove", onLedgerMove, { passive: true });
  ledger.addEventListener("pointerleave", onLedgerLeave);
  ledger.addEventListener("focusin", onFocusIn);
  ledger.addEventListener("focusout", onFocusOut);
  window.addEventListener("resize", onResize);

  disposers.push(() => {
    ledger.removeEventListener("pointerover", onLedgerOver);
    ledger.removeEventListener("pointermove", onLedgerMove);
    ledger.removeEventListener("pointerleave", onLedgerLeave);
    ledger.removeEventListener("focusin", onFocusIn);
    ledger.removeEventListener("focusout", onFocusOut);
    window.removeEventListener("resize", onResize);
    gsap.ticker.remove(ticker);

    for (const cancel of focusWatchers) {
      cancel();
    }

    gsap.killTweensOf([plate, ...medias]);
    gsap.set(plate, { clearProps: "all" });
  });
}

export function useWorkMotion() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    try {
      if (prefersReducedMotion()) {
        revealWorkInstantly(root);

        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const disposers: Array<() => void> = [];

      buildEntrance(root, disposers);
      attachPlate(root, disposers);

      // Reduced motion requested mid-session: stop everything, reveal.
      const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      const onMotionChange = () => {
        if (!motionQuery.matches) {
          return;
        }

        for (const dispose of disposers) {
          dispose();
        }

        revealWorkInstantly(root);
      };

      motionQuery.addEventListener("change", onMotionChange);
      disposers.push(() => motionQuery.removeEventListener("change", onMotionChange));

      return () => {
        for (const dispose of disposers) {
          dispose();
        }
      };
    } catch {
      revealWorkInstantly(root);
    }
  }, []);

  return rootRef;
}
