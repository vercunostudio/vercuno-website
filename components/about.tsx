"use client";

import { useRef } from "react";
import {
  aboutBody,
  aboutPosition,
  beliefs,
  statementAriaLabel,
  statementLines,
  vercyLine,
  vercySrcSet,
  vercyStates,
} from "@/lib/about";
import { useAboutMotion } from "@/lib/about-motion";

/**
 * Section 04 — About (Concept A+C "The Statement + Colophon").
 *
 * One oversized editorial statement, a narrow position/body column, three
 * belief rows offset into a second column, and a colophon foot that
 * introduces Vercy at 64–80px before handing off. No pinning, no numbered
 * index, no imagery besides the single mascot mark.
 *
 * Motion lives in lib/about-motion.ts; hover states are CSS.
 */
export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useAboutMotion(sectionRef);

  return (
    <section aria-labelledby="about-title" className="about" id="about" ref={sectionRef}>
      <div className="about__head">
        <p className="eyebrow" data-amotion="eyebrow">
          <span aria-hidden="true" className="eyebrow__line" />
          <span>About</span>
        </p>
      </div>

      <div aria-hidden="true" className="about__rule" data-amotion="rule" />

      <div className="about__body">
        <div className="about__lead">
          <h2
            aria-label={statementAriaLabel}
            className="about__statement"
            id="about-title"
          >
            {statementLines.map((line, index) => (
              <span className="about__line" key={index}>
                <span className="about__line-inner" data-amotion="line">
                  {line.lead}
                  {line.accent ? (
                    <em className="about__accent">{line.accent}</em>
                  ) : null}
                  {line.trail}
                </span>
              </span>
            ))}
          </h2>

          <div className="about__prose">
            <p className="about__position" data-amotion="prose">
              {aboutPosition}
            </p>
            {aboutBody.map((paragraph) => (
              <p className="about__paragraph" data-amotion="prose" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <ol className="about__beliefs">
          {beliefs.map((belief) => (
            <li className="belief" data-amotion="belief" key={belief.index}>
              <span aria-hidden="true" className="belief__index">
                {belief.index}
              </span>
              <p className="belief__title">{belief.title}</p>
              <p className="belief__definition">{belief.definition}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="about__colophon" data-amotion="colophon">
        <span
          aria-hidden="true"
          className="about__colophon-rule"
          data-amotion="colophon-rule"
        />

        <div className="about__colophon-row">
          <VercyMark />
          <p className="about__companion">{vercyLine}</p>
        </div>
      </div>
    </section>
  );
}

/**
 * The Vercy mark — an interactive, authentic character in a circular frame.
 *
 * Three transparent busts are keyed from the green-screen renders
 * (scripts/vercy-export.mjs) at a matched head scale:
 *
 *   neutral   — resting, arms down
 *   happy     — hover / keyboard focus, arms up
 *   surprised — click / tap, wide eyes and raised hands
 *
 * Interaction is driven entirely by CSS classes toggled from
 * lib/about-motion.ts, so pointer motion never re-renders React. The element
 * is a real <button> with an accessible name, so keyboard users get the same
 * reactions via focus and Enter/Space.
 *
 * Only Neutral is referenced without `loading="lazy"`; Happy and Surprised
 * load lazily. Under reduced motion the motion hook leaves this element inert
 * and CSS pins it to Neutral — see app/globals.css.
 */
function VercyMark() {
  return (
    <button
      aria-label={`${vercyLine} Activate to say hello.`}
      className="vercy"
      data-vercy-frame
      type="button"
    >
      <span aria-hidden="true" className="vercy__breath">
        {/* Plain <img> by design: the three states are absolutely stacked and
            cross-faded by CSS. next/image would wrap each one in an extra
            element, which breaks the stacking and adds a layout box this
            fixed-size circular frame does not need. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="vercy__img vercy__img--neutral"
          decoding="async"
          draggable={false}
          height={320}
          sizes="80px"
          src={`${vercyStates.neutral}-160.webp`}
          srcSet={vercySrcSet("neutral")}
          width={320}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="vercy__img vercy__img--happy"
          decoding="async"
          draggable={false}
          height={320}
          loading="lazy"
          sizes="80px"
          src={`${vercyStates.happy}-160.webp`}
          srcSet={vercySrcSet("happy")}
          width={320}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="vercy__img vercy__img--surprised"
          decoding="async"
          draggable={false}
          height={320}
          loading="lazy"
          sizes="80px"
          src={`${vercyStates.surprised}-160.webp`}
          srcSet={vercySrcSet("surprised")}
          width={320}
        />
      </span>
    </button>
  );
}
