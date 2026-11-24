"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ArrowUpRight } from "@/components/icons";
import {
  formStrings,
  serviceOptions,
  servicePlaceholder,
  validationMessages,
} from "@/lib/contact";
import { STUDIO_EMAIL } from "@/lib/site";

type InquiryValues = {
  name: string;
  email: string;
  service: string;
  details: string;
};

type InquiryErrors = Partial<
  Pick<InquiryValues, "name" | "email" | "details">
>;
type DispatchStatus = "idle" | "draft";

const FIELD_ORDER: Array<keyof InquiryErrors> = ["name", "email", "details"];

const EMPTY_VALUES: InquiryValues = { name: "", email: "", service: "", details: "" };

function validateValues(values: InquiryValues): InquiryErrors {
  const errors: InquiryErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const details = values.details.trim();

  if (!name) {
    errors.name = validationMessages.nameRequired;
  } else if (name.length < 2) {
    errors.name = validationMessages.nameShort;
  }

  if (!email) {
    errors.email = validationMessages.emailRequired;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = validationMessages.emailInvalid;
  }

  if (!details) {
    errors.details = validationMessages.detailsRequired;
  } else if (details.length < 10) {
    errors.details = validationMessages.detailsShort;
  }

  return errors;
}

/**
 * Composes the inquiry as a mail draft to the studio address. The website
 * itself never sends or stores anything — the visitor reviews and sends the
 * email from their own mail app, so no fake success state is possible.
 */
function buildInquiryMailto(
  values: InquiryValues,
  serviceLabel: string | null,
): string {
  const name = values.name.trim();
  const email = values.email.trim();
  const details = values.details.trim();

  const subject = `Project inquiry — ${name}`;

  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    serviceLabel ? `Service: ${serviceLabel}` : null,
    "",
    "Project details:",
    details,
  ]
    .filter((line) => line !== null)
    .join("\n");

  return `mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

/**
 * Section 06 — project inquiry form.
 *
 * No form-delivery backend is configured (no provider credentials, no API
 * route), so per the approved section spec this is an honest email-draft
 * fallback: validated inputs prefill a mail draft to vercuno.studio@gmail.com
 * and the visitor sends it themselves. Labels, error messages, focus handling
 * and the live status region are all accessible; the honeypot and server-side
 * validation belong to the future delivery integration, not to this fallback.
 */
export function ContactForm() {
  const [state, setState] = useState<{
    values: InquiryValues;
    errors: InquiryErrors;
  }>({ values: EMPTY_VALUES, errors: {} });
  const [status, setStatus] = useState<DispatchStatus>("idle");
  const [dispatching, setDispatching] = useState(false);

  // The mailto handoff hands focus to the OS mail app (or a webmail tab).
  // Whenever the visitor returns — or after a short fallback interval — the
  // submit action becomes available again. Nothing pretends to have "sent".
  useEffect(() => {
    if (!dispatching) {
      return;
    }

    const release = () => setDispatching(false);
    const timer = window.setTimeout(release, 4000);

    window.addEventListener("focus", release);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("focus", release);
    };
  }, [dispatching]);

  const setField = (field: keyof InquiryValues, value: string) => {
    setState((current) => {
      const values = { ...current.values, [field]: value };

      // Once a field is marked invalid, clear its error as soon as the
      // visitor fixes it instead of waiting for the next submit.
      const errors = current.errors[field as keyof InquiryErrors]
        ? { ...current.errors, [field]: validateValues(values)[field as keyof InquiryErrors] }
        : current.errors;

      return { values, errors };
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (dispatching) {
      return;
    }

    const errors = validateValues(state.values);
    setState((current) => ({ ...current, errors }));

    const firstInvalid = FIELD_ORDER.find((field) => errors[field]);

    if (firstInvalid) {
      setStatus("idle");
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    const serviceLabel =
      serviceOptions.find((option) => option.value === state.values.service)
        ?.label ?? null;

    setDispatching(true);

    const link = document.createElement("a");
    link.href = buildInquiryMailto(state.values, serviceLabel);
    link.rel = "noopener";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    link.remove();

    setStatus("draft");
  };

  return (
    <form
      className="contact__form"
      data-cmotion="form"
      noValidate
      onSubmit={handleSubmit}
    >
      <p className="contact__form-legend">{formStrings.legend}</p>

      <div className="contact__field">
        <label className="contact__label" htmlFor="contact-name">
          {formStrings.name.label}
        </label>
        <input
          aria-describedby={state.errors.name ? "contact-name-error" : undefined}
          aria-invalid={state.errors.name ? true : undefined}
          autoComplete="name"
          className="contact__input"
          id="contact-name"
          name="name"
          onChange={(event) => setField("name", event.target.value)}
          placeholder={formStrings.name.placeholder}
          type="text"
          value={state.values.name}
        />
        {state.errors.name && (
          <p className="contact__error" id="contact-name-error" role="alert">
            {state.errors.name}
          </p>
        )}
      </div>

      <div className="contact__field">
        <label className="contact__label" htmlFor="contact-email">
          {formStrings.email.label}
        </label>
        <input
          aria-describedby={state.errors.email ? "contact-email-error" : undefined}
          aria-invalid={state.errors.email ? true : undefined}
          autoComplete="email"
          className="contact__input"
          id="contact-email"
          inputMode="email"
          name="email"
          onChange={(event) => setField("email", event.target.value)}
          placeholder={formStrings.email.placeholder}
          type="email"
          value={state.values.email}
        />
        {state.errors.email && (
          <p className="contact__error" id="contact-email-error" role="alert">
            {state.errors.email}
          </p>
        )}
      </div>

      <div className="contact__field">
        <label className="contact__label" htmlFor="contact-service">
          {formStrings.service.label}
          <span className="contact__label-hint">
            {" "}
            — {formStrings.service.hint}
          </span>
        </label>
        <select
          className="contact__input contact__select"
          id="contact-service"
          name="service"
          onChange={(event) => setField("service", event.target.value)}
          value={state.values.service}
        >
          <option value="">{servicePlaceholder}</option>
          {serviceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="contact__field">
        <label className="contact__label" htmlFor="contact-details">
          {formStrings.details.label}
        </label>
        <textarea
          aria-describedby={
            state.errors.details ? "contact-details-error" : undefined
          }
          aria-invalid={state.errors.details ? true : undefined}
          className="contact__input contact__textarea"
          id="contact-details"
          name="details"
          onChange={(event) => setField("details", event.target.value)}
          placeholder={formStrings.details.placeholder}
          rows={5}
          value={state.values.details}
        />
        {state.errors.details && (
          <p className="contact__error" id="contact-details-error" role="alert">
            {state.errors.details}
          </p>
        )}
      </div>

      <button
        aria-busy={dispatching}
        className="button button--primary contact__submit"
        disabled={dispatching}
        type="submit"
      >
        <span>
          {dispatching ? formStrings.submitDispatching : formStrings.submit}
        </span>
        <ArrowUpRight className="button__icon" />
      </button>

      <p className="contact__hint">{formStrings.hint}</p>

      <p aria-live="polite" className="contact__status" role="status">
        {status === "draft" ? (
          <>
            {formStrings.statusDraft}{" "}
            <a href={`mailto:${STUDIO_EMAIL}`}>{STUDIO_EMAIL}</a>
          </>
        ) : null}
      </p>
    </form>
  );
}
