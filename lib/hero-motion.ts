"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Hero V2.1 motion layer.
 *
 * One master timeline choreographs the cinematic intro; pointer systems
 * (interactive V, orbital parallax, magnetic CTA) attach only after the
 * intro settles and only on devices with a fine pointer. All transforms
 * run on compositor-friendly properties; no React state changes on
 * pointer move. Everything is torn down on unmount.
 */

const EASE = "expo.out";
const pointerFineQuery = "(pointer: fine)";

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Build the Hero V2.1 cinematic intro on a paused timeline.
 *
 * The beat map mirrors the approved spec: header 50ms -> eyebrow 120ms
 * -> rule 150ms -> headline 280/400ms -> Better 620ms -> V 500ms ->
 * lede 950ms -> CTAs 1050ms -> footer 1200ms. Callers decide when (or
 * whether) to play it — the V2.2 preloader starts it after its own
 * reveal transition completes.
 */
export function buildHeroIntroTimeline(): gsap.core.Timeline {
  const master = gsap.timeline({ paused: true });
  const root = document.querySelector<HTMLElement>(".hero");

  const query = root ? gsap.utils.selector(root) : gsap.utils.selector(document);

  const header = document.querySelector(".site-header__inner");

  if (header) {
    master.fromTo(
      header,
      { autoAlpha: 0, y: -18 },
      { autoAlpha: 1, y: 0, duration: 0.9, ease: EASE },
      0.05,
    );
  }

  const eyebrow = query('[data-motion="eyebrow"]');
  const eyebrowLine = query(".eyebrow__line");

  if (eyebrow.length) {
    master.fromTo(
      eyebrow,
      { autoAlpha: 0, y: 12 },
      { autoAlpha: 1, y: 0, duration: 0.75, ease: EASE },
      0.12,
    );
  }

  if (eyebrowLine.length) {
    master.fromTo(
      eyebrowLine,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.85, ease: EASE, transformOrigin: "left center" },
      0.15,
    );
  }

  // Masked editorial reveals: lines rise into a clipping mask.
  const lines = [
    { el: query('[data-motion="line-1"]'), at: 0.28 },
    { el: query('[data-motion="line-2"]'), at: 0.4 },
  ];

  for (const { el, at } of lines) {
    if (!el.length) {
      continue;
    }

    master.fromTo(
      el,
      {
        y: "0.45em",
        clipPath: "inset(0% 0% 110% 0%)",
        autoAlpha: 0,
      },
      {
        y: "0em",
        clipPath: "inset(-0.3em -0.3em -0.3em -0.3em)",
        autoAlpha: 1,
        duration: 1.05,
        ease: EASE,
      },
      at,
    );
  }

  // "Better." gets its own elegant beat: slight rise + settle.
  const better = query('[data-motion="better"]');

  if (better.length) {
    master.fromTo(
      better,
      {
        y: "0.5em",
        clipPath: "inset(0% 0% 115% 0%)",
        autoAlpha: 0,
      },
      {
        y: "0em",
        clipPath: "inset(-0.3em -0.3em -0.3em -0.3em)",
        autoAlpha: 1,
        duration: 1.15,
        ease: "power4.out",
      },
      0.62,
    );
  }

  // The V: controlled scale + depth entrance.
  const v = query(".hero__v");

  if (v.length) {
    master.fromTo(
      v,
      { autoAlpha: 0, scale: 0.94, xPercent: 2, transformOrigin: "72% 46%" },
      { autoAlpha: 1, scale: 1, xPercent: 0, duration: 1.5, ease: EASE },
      0.5,
    );
  }

  // Orbital line draws itself on.
  const orbitCircle = query(".hero__orbits circle");

  if (orbitCircle.length) {
    master.fromTo(
      orbitCircle,
      { strokeDashoffset: 1 },
      { strokeDashoffset: 0, duration: 2.2, ease: EASE },
      0.35,
    );
  }

  const lede = query('[data-motion="lede"]');

  if (lede.length) {
    master.fromTo(
      lede,
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 0.9, ease: EASE },
      0.95,
    );
  }

  const actions = query('[data-motion="actions"]');

  if (actions.length) {
    master.fromTo(
      actions,
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 0.9, ease: EASE },
      1.05,
    );
  }

  const foot = query('[data-motion="foot"]');

  if (foot.length) {
    master.fromTo(
      foot,
      { autoAlpha: 0, y: 14 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: EASE,
        stagger: 0.08,
      },
      1.2,
    );
  }

  return master;
}

/**
 * Force-reveal every gated hero element and clear motion transforms.
 * No clearProps: GSAP applies clearProps at tween completion, which
 * would wipe the inline styles this set() just wrote and re-expose
 * the CSS initial states.
 */
export function revealHeroInstantly() {
  const root = document.querySelector<HTMLElement>(".hero");
  const scope = root ?? document;

  gsap.set(scope.querySelectorAll("[data-motion], .site-header__inner, .hero__v, .hero__orbits circle"), {
    opacity: 1,
    visibility: "visible",
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    xPercent: 0,
    yPercent: 0,
    clipPath: "inset(-0.3em -0.3em -0.3em -0.3em)",
    strokeDashoffset: 0,
  });
}

/** Pointer systems (V tracking, orbit parallax, magnetic CTA). Fine pointers only. */
function attachPointerSystems(root: HTMLElement, disposers: Array<() => void>) {
  if (!window.matchMedia(pointerFineQuery).matches) {
    return;
  }

  const teardowns: Array<() => void> = [];

        // --- 2. Interactive giant V --------------------------------
        const vEl = root.querySelector<SVGSVGElement>(".hero__v--desktop");

        if (vEl) {
          const vXTo = gsap.quickTo(vEl, "x", { duration: 0.9, ease: "power3.out" });
          const vYTo = gsap.quickTo(vEl, "y", { duration: 0.9, ease: "power3.out" });
          const vRTo = gsap.quickTo(vEl, "rotation", { duration: 1.1, ease: "power3.out" });
          // Layered depth: the V travels opposite to the cursor orbit.
          const onMove = (event: PointerEvent) => {
            const nx = event.clientX / window.innerWidth - 0.5;
            const ny = event.clientY / window.innerHeight - 0.5;

            vXTo(nx * 26);
            vYTo(ny * 18);
            vRTo(nx * 1.6);
          };
          const onLeave = () => {
            vXTo(0);
            vYTo(0);
            vRTo(0);
          };

          window.addEventListener("pointermove", onMove, { passive: true });
          window.addEventListener("pointerleave", onLeave, { passive: true });
          teardowns.push(() => {
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerleave", onLeave);
            gsap.set(vEl, { clearProps: "x,y,rotation" });
          });
        }

        // --- 3. Living orbital detail --------------------------------
        const orbitGroup = root.querySelector<SVGGElement>(".hero__orbit-group");
        let orbitFloat: gsap.core.Tween | undefined;

        if (orbitGroup) {
          // Idle breathing: slow, tiny, independent of the cursor.
          orbitFloat = gsap.to(orbitGroup, {
            xPercent: 0.4,
            yPercent: 0.5,
            duration: 9,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });

          const oXTo = gsap.quickTo(orbitGroup, "x", { duration: 1.4, ease: "power2.out" });
          const oYTo = gsap.quickTo(orbitGroup, "y", { duration: 1.4, ease: "power2.out" });
          const onOrbitMove = (event: PointerEvent) => {
            const nx = event.clientX / window.innerWidth - 0.5;
            const ny = event.clientY / window.innerHeight - 0.5;

            oXTo(nx * 14);
            oYTo(ny * 10);
          };

          window.addEventListener("pointermove", onOrbitMove, { passive: true });
          teardowns.push(() => {
            window.removeEventListener("pointermove", onOrbitMove);
            orbitFloat?.kill();
            gsap.set(orbitGroup, { clearProps: "x,y,xPercent,yPercent" });
          });
        }

        // --- 4. Magnetic primary CTA ---------------------------------
        const magnet = root.querySelector<HTMLElement>('[data-motion="magnetic"]');

        if (magnet) {
          let rect: DOMRect | null = null;
          let rectInvalid = true;
          const invalidate = () => {
            rectInvalid = true;
          };
          window.addEventListener("resize", invalidate);
          window.addEventListener("scroll", invalidate, { passive: true });

          const mXTo = gsap.quickTo(magnet, "x", { duration: 0.5, ease: "power3.out" });
          const mYTo = gsap.quickTo(magnet, "y", { duration: 0.5, ease: "power3.out" });
          const radius = 140;

          const onMagnetMove = (event: PointerEvent) => {
            if (rectInvalid || !rect) {
              rect = magnet.getBoundingClientRect();
              rectInvalid = false;
            }

            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = event.clientX - cx;
            const dy = event.clientY - cy;
            const distance = Math.hypot(dx, dy);

            if (distance < radius + Math.max(rect.width, rect.height) / 2) {
              // Cap the pull so the button never leaves its neighbourhood.
              mXTo(dx * 0.18);
              mYTo(dy * 0.18);
            } else {
              mXTo(0);
              mYTo(0);
            }
          };
          const onMagnetLeave = () => {
            mXTo(0);
            mYTo(0);
          };

          window.addEventListener("pointermove", onMagnetMove, { passive: true });
          window.addEventListener("pointerleave", onMagnetLeave, { passive: true });
          teardowns.push(() => {
            window.removeEventListener("pointermove", onMagnetMove);
            window.removeEventListener("pointerleave", onMagnetLeave);
            window.removeEventListener("resize", invalidate);
            window.removeEventListener("scroll", invalidate);
            gsap.set(magnet, { clearProps: "x,y" });
          });
        }

  disposers.push(...teardowns);
}

export function useHeroMotion() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    // Safety net: if anything below throws, reveal the page instantly.
    try {
      if (prefersReducedMotion()) {
        revealHeroInstantly();

        return;
      }

      const disposers: Array<() => void> = [];

      // -----------------------------------------------------------
      // The preloader decides whether the intro plays now or later.
      // Without the preloader (reduced motion / repeat visit), the
      // intro runs immediately — identical to V2.1 behavior.
      // -----------------------------------------------------------
      const pending = document.documentElement.classList.contains("intro-pending");

      if (!pending) {
        const intro = buildHeroIntroTimeline();
        intro.play();
        disposers.push(() => intro.kill());
      }

      attachPointerSystems(root, disposers);

      // -----------------------------------------------------------
      // Reduced motion requested mid-session: stop everything, reveal.
      // -----------------------------------------------------------
      const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      const onMotionChange = () => {
        if (!motionQuery.matches) {
          return;
        }

        gsap.killTweensOf("*");
        revealHeroInstantly();
      };

      motionQuery.addEventListener("change", onMotionChange);
      disposers.push(() => motionQuery.removeEventListener("change", onMotionChange));

      return () => {
        gsap.killTweensOf("*");

        for (const dispose of disposers) {
          dispose();
        }
      };
    } catch {
      revealHeroInstantly();
    }
  }, []);

  return rootRef;
}
