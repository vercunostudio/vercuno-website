"use client";

import { Fragment } from "react";
import { ArrowUpRight } from "@/components/icons";
import { selectedProjects } from "@/lib/site";
import { useWorkMotion } from "@/lib/work-motion";

/**
 * Section 02 — Selected Work (Concept A+ "The Interactive Ledger").
 *
 * Oversized editorial ledger rows on Midnight Black. Desktop adds a
 * cursor-following screenshot plate (fine pointers only); touch/narrow
 * viewports render authentic inline imagery instead. AI Content Studio has
 * no verified public destination, so its row is a typographic entry with a
 * "Case study pending" state and no link. All motion lives in
 * lib/work-motion.ts; hover/focus states are CSS.
 */
export function SelectedWork() {
  const sectionRef = useWorkMotion();

  return (
    <section aria-labelledby="work-title" className="work" id="work" ref={sectionRef}>
      <div className="work__head">
        <p className="eyebrow" data-wmotion="eyebrow">
          <span aria-hidden="true" className="eyebrow__line" />
          <span>Selected Work</span>
        </p>
        <p className="work__count" data-wmotion="count">
          3 Projects
        </p>
      </div>

      <h2 className="work__heading" id="work-title">
        <span className="work__heading-line">
          <span className="work__heading-inner" data-wmotion="heading-inner">
            Selected
          </span>
        </span>
        <span className="work__heading-line">
          <span className="work__heading-inner" data-wmotion="heading-inner">
            <em className="work__accent">Work.</em>
          </span>
        </span>
      </h2>

      <div className="work__ledger">
        <div aria-hidden="true" className="work__rule work__rule--strong" data-wmotion="rule" />
        {selectedProjects.map((project, index) => (
          <Fragment key={project.index}>
            {project.url ? (
              <a
                aria-label={`${project.title} — ${project.category} (opens in new tab)`}
                className="work__row"
                data-plate-slot={project.image ? String(index) : "none"}
                data-wmotion="row"
                href={project.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="work__index">
                  <span className="work__index-num">{project.index}</span>
                  <span aria-hidden="true" className="work__index-sep">
                    /
                  </span>
                </span>
                <h3 className="work__title">
                  <span className="work__title-text">{project.title}</span>
                </h3>
                <p className="work__category">{project.category}</p>
                <p className="work__descriptor">{project.descriptor}</p>
                <span aria-hidden="true" className="work__arrow">
                  <ArrowUpRight className="work__arrow-icon" />
                </span>
                {project.image ? (
                  <span className="work__media">
                    <span aria-hidden="true" className="work__mark" />
                    <picture>
                      <source srcSet={project.image.avif} type="image/avif" />
                      <img
                        alt={project.image.alt}
                        decoding="async"
                        height={project.image.height}
                        loading="lazy"
                        src={project.image.webp}
                        width={project.image.width}
                      />
                    </picture>
                  </span>
                ) : (
                  <span className="work__pending">Case study pending</span>
                )}
              </a>
            ) : (
              <div className="work__row" data-plate-slot="none" data-wmotion="row">
                <span className="work__index">
                  <span className="work__index-num">{project.index}</span>
                  <span aria-hidden="true" className="work__index-sep">
                    /
                  </span>
                </span>
                <h3 className="work__title">
                  <span className="work__title-text">{project.title}</span>
                </h3>
                <p className="work__category">{project.category}</p>
                <p className="work__descriptor">{project.descriptor}</p>
                <span className="work__pending">Case study pending</span>
              </div>
            )}
            <div aria-hidden="true" className="work__rule" data-wmotion="rule" />
          </Fragment>
        ))}
      </div>

      <div className="work__foot" data-wmotion="foot">
        <p className="work__foot-note">Founder Projects — designed and built by VERCUNO.</p>
        <a className="text-link work__foot-link" href="#contact">
          <span>Start a Project</span>
          <ArrowUpRight className="text-link__icon" />
        </a>
      </div>

      <div aria-hidden="true" className="work-plate" data-wmotion="plate">
        <span className="work-plate__mark" />
        {selectedProjects.map((project, index) =>
          project.image ? (
            <span className="work-plate__media" data-plate-media={String(index)} key={project.index}>
              <picture>
                <source srcSet={project.image.avif} type="image/avif" />
                <img
                  alt=""
                  decoding="async"
                  height={project.image.height}
                  loading="lazy"
                  src={project.image.webp}
                  width={project.image.width}
                />
              </picture>
            </span>
          ) : null,
        )}
      </div>
    </section>
  );
}
