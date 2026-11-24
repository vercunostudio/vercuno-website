"use client";

import { useRef } from "react";
import { ContactForm } from "@/components/contact-form";
import { useContactMotion } from "@/lib/contact-motion";
import { contactCopy, contactHeading } from "@/lib/contact";
import { STUDIO_EMAIL } from "@/lib/site";

/**
 * Section 06 — Contact ("The Grand Project Brief", Concept B).
 *
 * Editorial two-column composition: the masked "Start a Project." masthead
 * and supporting copy on the left, the inquiry form panel on the right. The
 * luminous Electric Blue arc lives in the footer below and frames the
 * monumental wordmark — see components/site-footer.tsx.
 *
 * Without JavaScript every element is already visible (the CSS never hides
 * them); the motion hook only adds the entrances.
 */
export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useContactMotion(sectionRef);

  return (
    <section
      aria-labelledby="contact-title"
      className="contact"
      id="contact"
      ref={sectionRef}
    >
      <div className="contact__head">
        <p className="eyebrow" data-cmotion="eyebrow">
          <span aria-hidden="true" className="eyebrow__line" />
          <span>
            {contactHeading.eyebrowIndex} / {contactHeading.eyebrowLabel}
          </span>
        </p>
      </div>

      <div className="contact__grid">
        <div className="contact__intro">
          <h2 className="contact__heading" id="contact-title">
            <span className="contact__heading-line">
              <span className="contact__heading-mask">
                <span className="contact__heading-inner" data-cmotion="headline-inner">
                  {contactHeading.lead}
                </span>
              </span>
            </span>{" "}
            <span className="contact__heading-line">
              <span className="contact__heading-mask">
                <span
                  className="contact__heading-inner contact__heading-accent"
                  data-cmotion="headline-inner"
                >
                  {contactHeading.accent}
                </span>
              </span>
            </span>
          </h2>

          <p className="contact__support" data-cmotion="copy">
            {contactCopy.supportLead}
            <span aria-hidden="true"> </span>
            {contactCopy.supportBody}
          </p>

          <p className="contact__direct" data-cmotion="copy">
            {contactCopy.directLabel}{" "}
            <a href={`mailto:${STUDIO_EMAIL}`}>{STUDIO_EMAIL}</a>
          </p>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
