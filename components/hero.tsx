"use client";

import { MonumentalV, OrbitalLines } from "@/components/hero-geometry";
import { ArrowDown, ArrowUpRight } from "@/components/icons";
import { useHeroMotion } from "@/lib/hero-motion";
import { projectMailto } from "@/lib/site";

export function Hero() {
  const rootRef = useHeroMotion();

  return (
    <section
      aria-labelledby="hero-title"
      className="hero"
      ref={rootRef}
    >
      <div aria-hidden="true" className="hero__decor">
        <OrbitalLines />
        <MonumentalV />
      </div>

      <div className="hero__body">
        <div className="hero__content">
          <p className="eyebrow" data-motion="eyebrow">
            <span aria-hidden="true" className="eyebrow__line" />
            <span>Independent Software &amp; AI Studio</span>
          </p>

          <h1 className="hero__headline" id="hero-title">
            <span className="hero__line hero__line--first">
              <span className="hero__line-inner" data-motion="line-1">
                Digital,
              </span>
            </span>
            <span className="hero__line hero__line--second">
              <span className="hero__line-inner" data-motion="line-2">
                Built
              </span>
              <span className="hero__line-inner hero__line-inner--accent" data-motion="better">
                <em className="hero__better">Better.</em>
              </span>
            </span>
          </h1>

          <p className="hero__lede" data-motion="lede">
            We design and engineer websites, custom software, and intelligent
            workflows for ambitious businesses.
          </p>

          <div className="hero__actions" data-motion="actions">
            <a className="button button--primary" data-motion="magnetic" href={projectMailto}>
              <span>Start a Project</span>
              <ArrowUpRight className="button__icon" />
            </a>
            <a className="text-link" href="#work">
              <span>Explore Work</span>
              <ArrowUpRight className="text-link__icon" />
            </a>
          </div>
        </div>
      </div>

      <div className="hero__foot">
        <p className="hero__intro" data-motion="foot">
          <span className="hero__index">01</span>
          <span aria-hidden="true" className="hero__slash">
            /
          </span>
          <span>Intro</span>
        </p>

        <p className="hero__services" data-motion="foot">
          <span>Design</span>
          <span aria-hidden="true" className="hero__dot">
            &middot;
          </span>
          <span>Development</span>
          <span aria-hidden="true" className="hero__dot">
            &middot;
          </span>
          <span>Automation</span>
        </p>

        <p className="hero__scroll-desktop" data-motion="foot">
          <span>Scroll to explore</span>
          <ArrowDown />
        </p>

        <p className="hero__scroll-compact" data-motion="foot">
          <span>Scroll</span>
          <ArrowDown />
        </p>
      </div>
    </section>
  );
}
