"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Section 03 — Services motion + active index (Concept C+).
 *
 * Entrance: one ScrollTrigger timeline for the head/masthead/index and a
 * batch for the four entries, mirroring the Selected Work masking language.
 * Active index: a single IntersectionObserver toggles data-active /
 * aria-current on the index links and the matching entry — state, not motion.
 * Reciprocal hover/focus lives in CSS (data-index-target <-> data-service-entry).
 * No pinning, no scroll hijacking, no per-frame work.
 */

const EASE = "expo.out";
const DESKTOP_QUERY = "(min-width: 1024px)";

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function revealInstantly(root: HTMLElement) {
  gsap.set(root.querySelectorAll("[data-smotion]"), {
    opacity: 1,
    visibility: "visible",
    y: 0,
    scaleX: 1,
    clipPath: "inset(-0.3em -0.3em -0.3em -0.3em)",
    clearProps: "transform,clipPath",
  });
}

function setActiveIndex(root: HTMLElement, activeId: string | null) {
  const links = Array.from(
    root.querySelectorAll<HTMLAnchorElement>(".services__index-link"),
  );
  const entries = Array.from(
    root.querySelectorAll<HTMLElement>("[data-service-entry]"),
  );

  let activeLink: HTMLAnchorElement | null = null;

  for (const link of links) {
    const isActive = link.dataset.indexTarget === activeId;

    link.classList.toggle("is-active", isActive);
    link.closest(".services__index-item")?.classList.toggle("is-active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "true");
      activeLink = link;
    } else {
      link.removeAttribute("aria-current");
    }
  }

  for (const entry of entries) {
    entry.classList.toggle("is-active", entry.dataset.serviceEntry === activeId);
  }

  positionMarker(root, activeLink);
}

/** The marker follows the active item, or the previewed one while hovering. */
function syncMarker(root: HTMLElement) {
  const item = root.querySelector<HTMLElement>(
    ".services__index-item.is-preview, .services__index-item.is-active",
  );
  const link = item?.querySelector<HTMLAnchorElement>(".services__index-link") ?? null;

  positionMarker(root, link);
}

/**
 * The marker is a 2px Electric Blue bar riding the index rail. It is moved
 * with a transform (never a layout property) to align with the active item.
 */
function positionMarker(root: HTMLElement, activeLink: HTMLAnchorElement | null) {
  const marker = root.querySelector<HTMLElement>("[data-index-marker]");
  const rail = marker?.parentElement;
  const link = activeLink;

  if (!marker || !rail || !link) {
    if (marker) {
      marker.style.opacity = "0";
    }

    return;
  }

  marker.style.opacity = "1";

  const railTop = rail.getBoundingClientRect().top;
  const linkRect = link.getBoundingClientRect();

  marker.style.transform = `translateY(${Math.round(linkRect.top - railTop)}px)`;
  marker.style.height = `${Math.round(linkRect.height)}px`;
}

function attachActiveIndex(root: HTMLElement, disposers: Array<() => void>) {
  const entries = Array.from(
    root.querySelectorAll<HTMLElement>("[data-service-entry]"),
  );

  if (!entries.length) {
    return;
  }

  // The observer only reports crossings of the middle band; the active
  // entry is then the last one whose band has been reached, so a tall entry
  // never holds the highlight after the next one has taken over.
  const bandTopRatio = 0.35;
  const crossed = new Set<string>();
  let lastActive: string | null = null;

  const resolve = () => {
    const midY = window.innerHeight * (bandTopRatio + (0.55 - bandTopRatio) / 2);

    let next: HTMLElement | undefined;

    for (const entry of entries) {
      const rect = entry.getBoundingClientRect();
      const isAtOrAboveMid = rect.top <= midY;

      if (crossed.has(entry.dataset.serviceEntry ?? "") || isAtOrAboveMid) {
        next = entry;
      }
    }

    const id = next?.dataset.serviceEntry ?? null;

    if (id === lastActive) {
      return;
    }

    lastActive = id;
    setActiveIndex(root, id);
  };

  const observer = new IntersectionObserver(
    (records) => {
      for (const record of records) {
        const id = (record.target as HTMLElement).dataset.serviceEntry ?? "";

        if (record.isIntersecting) {
          crossed.add(id);
        }
      }

      resolve();
    },
    { rootMargin: "-35% 0px -45% 0px", threshold: 0 },
  );

  for (const entry of entries) {
    observer.observe(entry);
  }

  disposers.push(() => observer.disconnect());
}

function clearHoverPreviews(root: HTMLElement) {
  for (const el of root.querySelectorAll(".is-preview")) {
    el.classList.remove("is-preview");
  }
}

/**
 * CSS-only reciprocal highlight needs one small bridge: when an index link
 * is hovered/focused we flag the counterpart entry (and vice versa) so CSS
 * can style the pair with plain selectors. No React state, no layout reads.
 */
function attachReciprocal(root: HTMLElement, disposers: Array<() => void>) {
  let lastKey: string | null = null;

  const preview = (fromIndex: boolean, id: string | null) => {
    clearHoverPreviews(root);

    if (id) {
      if (fromIndex) {
        root
          .querySelector(`[data-service-entry="${id}"]`)
          ?.classList.add("is-preview");
      } else {
        root
          .querySelector(`.services__index-item [data-index-target="${id}"]`)
          ?.closest(".services__index-item")
          ?.classList.add("is-preview");
      }
    }

    syncMarker(root);
  };

  /**
   * One delegated handler covers both directions. The hovered index link
   * previews its entry; a hovered entry previews its index row. Leaving both
   * clears the pair, so nothing persists.
   */
  const onPointerOver = (event: PointerEvent) => {
    const indexLink = (event.target as Element | null)?.closest?.("[data-index-target]");
    const entry = (event.target as Element | null)?.closest?.("[data-service-entry]");

    // Index first: the index lives outside the entries, so both cannot match
    // the same target, but the order keeps the intent explicit.
    const key = indexLink
      ? `i:${indexLink.getAttribute("data-index-target")}`
      : entry
        ? `e:${entry.getAttribute("data-service-entry")}`
        : null;

    if (key === lastKey) {
      return;
    }

    lastKey = key;

    if (indexLink) {
      preview(true, indexLink.getAttribute("data-index-target"));
    } else if (entry) {
      preview(false, entry.getAttribute("data-service-entry"));
    } else {
      preview(false, null);
    }
  };

  const clear = () => {
    lastKey = null;
    preview(false, null);
  };

  const onFocusIn = (event: FocusEvent) => {
    const target = (event.target as Element | null)?.closest?.(
      "[data-index-target], [data-service-entry]",
    ) as HTMLElement | null;

    if (!target) {
      return;
    }

    const id = target.getAttribute("data-index-target") ?? target.getAttribute("data-service-entry");

    lastKey = `f:${id}`;
    preview(target.hasAttribute("data-index-target"), id);
  };

  const onFocusOut = (event: FocusEvent) => {
    const next = (event.relatedTarget as Element | null)?.closest?.(
      "[data-index-target], [data-service-entry]",
    );

    if (!next) {
      lastKey = null;
      preview(false, null);
    }
  };

  root.addEventListener("pointerover", onPointerOver, { passive: true });
  root.addEventListener("pointerleave", clear);
  root.addEventListener("focusin", onFocusIn);
  root.addEventListener("focusout", onFocusOut);

  disposers.push(() => {
    root.removeEventListener("pointerover", onPointerOver);
    root.removeEventListener("pointerleave", clear);
    root.removeEventListener("focusin", onFocusIn);
    root.removeEventListener("focusout", onFocusOut);
    clearHoverPreviews(root);
  });
}

function buildEntrance(root: HTMLElement, disposers: Array<() => void>) {
  const query = gsap.utils.selector(root);

  const eyebrow = query('[data-smotion="eyebrow"]');
  const eyebrowLine = query(".eyebrow__line");
  const count = query('[data-smotion="count"]');
  const headRule = query('[data-smotion="rule"]');
  const headings = query('[data-smotion="heading-inner"]');
  const aside = query('[data-smotion="aside"]');
  const lede = query('[data-smotion="lede"]');
  const foot = query('[data-smotion="foot"]');

  const headerTl = gsap.timeline({
    scrollTrigger: { trigger: root, start: "top 78%", once: true },
  });

  if (headRule.length) {
    headerTl.fromTo(
      headRule,
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

  if (headings.length) {
    headerTl.fromTo(
      headings,
      { y: "0.35em", clipPath: "inset(0% 0% 110% 0%)", autoAlpha: 0 },
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

  if (aside.length) {
    headerTl.fromTo(
      aside,
      { autoAlpha: 0, y: 14 },
      { autoAlpha: 1, y: 0, duration: 0.7, ease: EASE, stagger: 0.08 },
      0.32,
    );
  }

  const indexLinks = query(".services__index-link");

  if (indexLinks.length) {
    headerTl.fromTo(
      indexLinks,
      { autoAlpha: 0, y: 8 },
      { autoAlpha: 1, y: 0, duration: 0.6, ease: EASE, stagger: 0.06 },
      0.4,
    );
  }

  if (lede.length) {
    headerTl.fromTo(
      lede,
      { autoAlpha: 0, y: 14 },
      { autoAlpha: 1, y: 0, duration: 0.7, ease: EASE },
      0.2,
    );
  }

  disposers.push(() => headerTl.scrollTrigger?.kill(), () => headerTl.kill());

  const entries = Array.from(
    root.querySelectorAll<HTMLElement>('[data-smotion="entry"]'),
  );

  if (entries.length) {
    const batch = ScrollTrigger.batch(entries, {
      once: true,
      start: "top 88%",
      onEnter: (nodes) => {
        const rules = nodes
          .map((entry) => entry.querySelector<HTMLElement>(".service__rule"))
          .filter((el): el is HTMLElement => Boolean(el));

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

    disposers.push(() => footTween.scrollTrigger?.kill(), () => footTween.kill());
  }
}

export function useServicesMotion(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    // Listeners stay for the section's lifetime; entrance disposers are kept
    // separately so a mid-session reduced-motion switch only stops motion.
    const listeners: Array<() => void> = [];
    const entrance: Array<() => void> = [];

    try {
      gsap.registerPlugin(ScrollTrigger);

      // Active index + reciprocity are state, not motion: always attached.
      // The index itself is desktop-only navigation.
      const desktop = window.matchMedia(DESKTOP_QUERY);

      if (desktop.matches) {
        attachActiveIndex(root, listeners);
        attachReciprocal(root, listeners);
      }

      const onResize = () => syncMarker(root);

      window.addEventListener("resize", onResize);
      listeners.push(() => window.removeEventListener("resize", onResize));

      const onDesktopChange = () => {
        if (!desktop.matches) {
          setActiveIndex(root, null);
          clearHoverPreviews(root);

          return;
        }
      };

      desktop.addEventListener("change", onDesktopChange);
      listeners.push(() => desktop.removeEventListener("change", onDesktopChange));

      if (!prefersReducedMotion()) {
        buildEntrance(root, entrance);
      } else {
        revealInstantly(root);
      }

      const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      const onMotionChange = () => {
        if (!motionQuery.matches) {
          return;
        }

        for (const dispose of entrance) {
          dispose();
        }

        entrance.length = 0;
        revealInstantly(root);
      };

      motionQuery.addEventListener("change", onMotionChange);
      listeners.push(() => motionQuery.removeEventListener("change", onMotionChange));
    } catch {
      revealInstantly(root);
    }

    return () => {
      for (const dispose of [...entrance, ...listeners]) {
        dispose();
      }
    };
  }, [rootRef]);
}
