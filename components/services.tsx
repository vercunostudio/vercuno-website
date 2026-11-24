"use client";

import { useRef } from "react";
import { ArrowUpRight } from "@/components/icons";
import { projectMailto } from "@/lib/site";
import { services, servicesCtaNote, servicesIndexId } from "@/lib/services";
import { useServicesMotion } from "@/lib/services-motion";

/**
 * Section 03 — Services (Concept C+ "The Interactive Operating Manual").
 *
 * Desktop: sticky editorial masthead + service index on the left, four
 * indexed entries in the wider right column. The index and the entries
 * highlight each other reciprocally; an IntersectionObserver keeps the
 * active index item in step with scroll via aria-current (a discrete state
 * toggle, never a scroll animation). No cursor-following imagery, no pinning.
 *
 * Mobile/tablet (<1024px): single column, static masthead, no jump index.
 * Motion lives in lib/services-motion.ts; hover/focus states are CSS.
 */
export function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useServicesMotion(sectionRef);

  return (
    <section
      aria-labelledby="services-title"
      className="services"
      id="services"
      ref={sectionRef}
    >
      <div className="services__head">
        <p className="eyebrow" data-smotion="eyebrow">
          <span aria-hidden="true" className="eyebrow__line" />
          <span>Services</span>
        </p>
        <p className="services__count" data-smotion="count">
          Four Disciplines
        </p>
      </div>

      <div aria-hidden="true" className="services__rule" data-smotion="rule" />

      <div className="services__body">
        <div className="services__aside">
          <div className="services__sticky">
            <h2 className="services__heading" id="services-title">
              <span className="services__heading-line">
                <span className="services__heading-inner" data-smotion="heading-inner">
                  What
                </span>
              </span>
              <span className="services__heading-line">
                <span className="services__heading-inner" data-smotion="heading-inner">
                  We <em className="services__accent">Build.</em>
                </span>
              </span>
            </h2>

            <p className="services__tagline" data-smotion="aside">
              Capabilities, stated plainly.
            </p>
            <p className="services__note" data-smotion="aside">
              Four disciplines. One studio. Scope is defined per project.
            </p>

            <nav aria-label="Service index" className="services__index" id={servicesIndexId}>
              <span aria-hidden="true" className="services__index-rail">
                <span className="services__index-marker" data-index-marker />
              </span>
              <ol className="services__index-list">
                {services.map((service) => (
                  <li className="services__index-item" key={service.id}>
                    <a
                      aria-label={`${service.index} — ${service.title}`}
                      className="services__index-link"
                      data-index-target={service.id}
                      href={`#${service.id}`}
                    >
                      <span aria-hidden="true" className="services__index-num">
                        {service.index}
                      </span>
                      <span aria-hidden="true" className="services__index-label services__index-label--full">
                        {service.title}
                      </span>
                      <span aria-hidden="true" className="services__index-label services__index-label--short">
                        {service.shortLabel}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>

        <div className="services__main">
          <p className="services__lede" data-smotion="lede">
            Four ways to work with the studio. Every engagement is scoped
            individually after a short discovery, so the work fits the problem
            rather than a package.
          </p>

          <div className="services__list">
            {services.map((service) => (
              <article
                className="service"
                data-service-entry={service.id}
                data-smotion="entry"
                id={service.id}
                key={service.id}
              >
                <span
                  aria-hidden="true"
                  className="service__rule"
                  data-smotion="entry-rule"
                />
                <span aria-hidden="true" className="service__tick" />
                <div className="service__title-row">
                  <span aria-hidden="true" className="service__index">
                    {service.index}
                  </span>
                  <h3 className="service__title">
                    <span className="service__title-text">{service.title}</span>
                  </h3>
                </div>
                <p className="service__definition">{service.definition}</p>
                <p className="service__scope">{service.scope}</p>
                <ul className="service__capabilities">
                  {service.capabilities.map((item) => (
                    <li className="service__capability" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
                <a className="services__back" href={`#${servicesIndexId}`}>
                  <span>Back to index</span>
                  <ArrowUpRight className="services__back-icon" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="services__foot" data-smotion="foot">
        <p className="services__foot-note">{servicesCtaNote}</p>
        <a className="text-link services__foot-link" href={projectMailto}>
          <span>Start a Project</span>
          <ArrowUpRight className="text-link__icon" />
        </a>
      </div>
    </section>
  );
}
