"use client";

import { useRef } from "react";
import { ArrowUpRight } from "@/components/icons";
import { useProcessMotion } from "@/lib/process-motion";
import { processCta, processHeading, processStages } from "@/lib/process";

/**
 * Section 05 — Process (Concept C "The Operator's Index").
 *
 * Five vertically stacked stages: copy on the left, a monumental outlined
 * numeral on the right, thin dividers between rows. As each row crosses the
 * viewport midpoint the numeral fills Cantaloupe Orange and the title rises
 * through its mask — see lib/process-motion.ts.
 *
 * Without JavaScript every row, title, description and the CTA are already
 * visible (the CSS never hides them); the motion hook only adds entrances and
 * the active-state fill.
 */
export function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useProcessMotion(sectionRef);

  return (
    <section
      aria-labelledby="process-title"
      className="process"
      id="process"
      ref={sectionRef}
    >
      <div className="process__head">
        <p className="eyebrow" data-pmotion="eyebrow">
          <span aria-hidden="true" className="eyebrow__line" />
          <span>
            {processHeading.eyebrowIndex} / {processHeading.eyebrowLabel}
          </span>
        </p>
      </div>

      <div aria-hidden="true" className="process__rule" data-pmotion="rule" />

      <div className="process__lead">
        <h2 className="process__heading" id="process-title">
          <span className="process__heading-line">
            <span className="process__heading-mask">
              <span className="process__heading-inner" data-pmotion="headline-inner">
                {processHeading.lead}
              </span>
            </span>
          </span>{" "}
          <span className="process__heading-line">
            <span className="process__heading-mask">
              <span
                className="process__heading-inner process__heading-accent"
                data-pmotion="headline-inner"
              >
                {processHeading.accent}
              </span>
            </span>
          </span>
        </h2>
      </div>

      <ol className="process__list" data-process-list>
        {processStages.map((stage) => (
          <li className="process__stage" data-stage={stage.index} key={stage.index}>
            <div className="process__stage-body" data-stage-body>
              <p className="process__stage-meta">
                <span aria-hidden="true" className="process__stage-index">
                  {stage.index}
                </span>
                <span className="visually-hidden">Stage {stage.index}</span>
                <em className="process__stage-accent">{stage.accent}</em>
              </p>

              <h3 className="process__stage-title">
                <span className="process__stage-title-mask">
                  <span className="process__stage-title-inner" data-stage-title-inner>
                    {stage.title}
                  </span>
                </span>
              </h3>

              <p className="process__stage-description">{stage.description}</p>
            </div>

            <span aria-hidden="true" className="process__numeral-wrap">
              <span className="process__numeral" data-stage-numeral>
                {stage.index}
              </span>
            </span>
          </li>
        ))}
      </ol>

      <div className="process__cta">
        <div aria-hidden="true" className="process__cta-rule" data-pmotion="cta-rule" />

        <div className="process__cta-row" data-pmotion="cta">
          <p className="process__cta-line">
            {processCta.title}{" "}
            <span className="process__cta-accent">{processCta.label}</span>
          </p>

          <a className="button button--primary process__cta-link" href="#contact">
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="button__icon" />
          </a>
        </div>
      </div>
    </section>
  );
}
