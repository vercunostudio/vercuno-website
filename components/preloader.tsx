"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { buildHeroIntroTimeline, revealHeroInstantly } from "@/lib/hero-motion";

/**
 * Hero V2.2 cinematic preloader.
 *
 * Beats:
 *   0.00s  overlay in place, counter 000%
 *   0.00-1.55s  nonlinear count to 100% with a synchronized blue rule
 *   1.55-2.05s  hold at 100%
 *   2.05-2.75s  Electric Blue panel rises, covers the loader
 *   2.75-3.55s  panel continues up and exits, revealing the hero;
 *               the existing hero intro timeline starts underneath
 *
 * Session behavior: plays once per browser tab (sessionStorage flag);
 * ?intro=1 forces a replay. Reduced motion or a repeat visit never
 * shows the loader and the hero intro runs immediately (existing
 * behavior). The pre-paint gate in app/layout.tsx adds .intro-pending
 * and locks scroll before first paint, so no unready content flashes.
 *
 * The overlay is always mounted and shown/hidden imperatively via
 * the `hidden` attribute (no React state, no re-renders), so the
 * effect can always reach the DOM. Server HTML ships it hidden, so
 * there is no flash and no hydration mismatch.
 */

const SESSION_KEY = "vercuno-intro-seen";

/**
 * Whether this load was gated for the intro before first paint. The
 * pre-paint script decides once per document (reduced motion and
 * repeat visits never get the gate); React strict-mode remounts
 * re-read the same decision instead of consulting the session flag,
 * so a remount mid-sequence resumes cleanly.
 */
function wasGatedForIntro(): boolean {
  return document.documentElement.classList.contains("intro-pending");
}

export function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const docEl = document.documentElement;

    if (!root) {
      return;
    }

    if (!wasGatedForIntro()) {
      // Repeat visit / reduced motion: ensure nothing stays hidden or
      // locked even if the pre-paint gate ran on a stale navigation.
      docEl.classList.remove("intro-pending");
      docEl.style.removeProperty("overflow");

      return;
    }

    root.hidden = false;

    // Mark the session so a client-side remount (e.g. React strict mode
    // double-effect in dev) never replays the loader within this tab.
    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // Storage unavailable: the loader simply plays on each full load.
    }

    const disposers: Array<() => void> = [];
    const counter = root.querySelector<HTMLElement>(".preloader__count");
    const rule = root.querySelector<HTMLElement>(".preloader__rule");
    const panel = root.querySelector<HTMLElement>(".preloader__panel");
    const brand = root.querySelector<HTMLElement>(".preloader__brand");
    const accent = root.querySelector<HTMLElement>(".preloader__accent");

    // Idempotent start: a strict-mode remount may arrive mid-sequence.
    gsap.set(root, { clearProps: "all" });
    gsap.set(panel, { yPercent: 100 });
    gsap.set(rule, { scaleX: 0 });

    if (counter) {
      counter.textContent = "000%";
    }

    // Failsafe: if anything stalls (background tab throttling, error),
    // force the page usable after six seconds. Cancelled by finish().
    let failsafe = 0;
    const disarmFailsafe = () => {
      window.clearTimeout(failsafe);
    };

    const finish = () => {
      disarmFailsafe();
      docEl.classList.remove("intro-pending");
      docEl.style.removeProperty("overflow");
      root.hidden = true;
    };

    // ---- Nonlinear count: fast launch, long mid cruise, snappy end. ----
    const state = { value: 0 };
    const COUNTER_DURATION = 1.55;

    const counterTween = gsap.to(state, {
      value: 100,
      duration: COUNTER_DURATION,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counter) {
          counter.textContent = String(Math.round(state.value)).padStart(3, "0") + "%";
        }

        if (rule) {
          gsap.set(rule, { scaleX: state.value / 100 });
        }
      },
      onComplete: () => {
        if (counter) {
          counter.textContent = "100%";
        }

        if (rule) {
          gsap.set(rule, { scaleX: 1 });
        }
      },
    });

    const timeline = gsap.timeline({ onComplete: finish });

    try {
      timeline
        // Loader content arrives gently.
        .fromTo(
          brand ?? {},
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.6, ease: "expo.out" },
          0,
        )
        .fromTo(
          accent ?? {},
          { scaleX: 0 },
          { scaleX: 1, duration: 0.7, ease: "expo.out", transformOrigin: "left center" },
          0.1,
        )
        .fromTo(
          [counter ?? {}, rule ?? {}],
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.5, ease: "power2.out", stagger: 0.08 },
          0.15,
        )
        // The count itself (0 -> 1.55s).
        .add(counterTween, 0)
        // Brief hold at 100%.
        .to({}, { duration: 0.5 }, COUNTER_DURATION)
        // Loader content fades as the panel arrives.
        .to(
          [counter ?? {}, rule ?? {}, brand ?? {}, accent ?? {}],
          { autoAlpha: 0, duration: 0.35, ease: "power2.in", stagger: 0.02 },
          COUNTER_DURATION + 0.5,
        )
        // Electric panel rises from the bottom to cover the loader.
        .fromTo(
          panel ?? {},
          { yPercent: 100 },
          {
            yPercent: 0,
            duration: 0.7,
            ease: "expo.inOut",
          },
          COUNTER_DURATION + 0.5,
        )
        // Overlay hands over to the panel; loader root can go and must
        // stop intercepting input the moment the panel takes over.
        .set(
          root,
          { autoAlpha: 0, pointerEvents: "none" },
          COUNTER_DURATION + 0.62,
        )
        // Panel continues upward and exits, revealing the hero.
        .to(
          panel ?? {},
          {
            yPercent: -100,
            duration: 0.8,
            ease: "expo.inOut",
            onComplete: () => {
              gsap.set(panel, { clearProps: "all" });
            },
          },
          COUNTER_DURATION + 0.78,
        )
        // Hero intro starts while the panel is sweeping away — the
        // handover reads as one continuous cinematic sequence.
        .add(() => {
          const intro = buildHeroIntroTimeline();
          intro.play();
          disposers.push(() => intro.kill());
        }, COUNTER_DURATION + 1.08);
    } catch {
      revealHeroInstantly();
      finish();
    }

    failsafe = window.setTimeout(() => {
      timeline.kill();
      counterTween.kill();
      revealHeroInstantly();
      finish();
    }, 6000);
    disposers.push(disarmFailsafe);

    // Reduced motion requested mid-loader: skip straight to the page.
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = () => {
      if (!motionQuery.matches) {
        return;
      }

      timeline.kill();
      revealHeroInstantly();
      finish();
    };

    motionQuery.addEventListener("change", onMotionChange);
    disposers.push(() => motionQuery.removeEventListener("change", onMotionChange));

    return () => {
      timeline.kill();
      counterTween.kill();

      for (const dispose of disposers) {
        dispose();
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="preloader"
      hidden
      ref={rootRef}
    >
      <div className="preloader__panel" />

      <div className="preloader__stage">
        <p className="preloader__brand">VERCUNO</p>
        <span aria-hidden="true" className="preloader__accent" />
        <p aria-hidden="true" className="preloader__count">
          000%
        </p>
        <span aria-hidden="true" className="preloader__track">
          <span className="preloader__rule" />
        </span>
      </div>
    </div>
  );
}
