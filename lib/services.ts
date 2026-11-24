/**
 * Section 03 — Services data.
 *
 * Copy approved in docs/sections/03-SERVICES.md §4. Every capability here is
 * either part of the PRD service list or evidenced by a shipped founder
 * project (WORLD//ONE, VETO, AI Content Studio). No client names, metrics,
 * timelines, SLAs, certifications, guarantees, or pricing appear anywhere —
 * and none may be added without verified evidence.
 */

export type Service = {
  /** Tabular index numeral, e.g. "01". */
  index: string;
  /** Full service name. Always shown in the entry and at wide desktop. */
  title: string;
  /** Short label for the index at intermediate desktop widths. */
  shortLabel: string;
  /** In-page anchor for the entry. */
  id: string;
  /** One-line definition (Instrument Serif Italic). */
  definition: string;
  /** Scope paragraph — the commercial description. */
  scope: string;
  /** Capability list; rendered with middot separators. */
  capabilities: string[];
};

export const services: Service[] = [
  {
    index: "01",
    title: "Web Development",
    shortLabel: "Web",
    id: "services-web-development",
    definition: "Sites that carry a brand and convert.",
    scope:
      "Design and engineering for marketing sites, brand sites, and content-driven pages — built for fast loading, clean semantics, and straightforward editorial control.",
    capabilities: [
      "Design systems",
      "Responsive implementation",
      "Performance",
      "SEO foundations",
    ],
  },
  {
    index: "02",
    title: "Custom Software",
    shortLabel: "Software",
    id: "services-custom-software",
    definition: "Applications built around how your business runs.",
    scope:
      "Web applications where the interface is the product: dashboards, internal tools, and data-driven interfaces designed around real operational workflows.",
    capabilities: [
      "Product interface design",
      "Web application engineering",
      "Authentication and permissions",
      "Third-party integrations",
    ],
  },
  {
    index: "03",
    title: "AI & Workflow Automation",
    shortLabel: "Automation",
    id: "services-ai-automation",
    definition: "Repetitive work, handled by systems.",
    scope:
      "AI-assisted and rule-based pipelines that move content, data, and decisions through a defined process, with a human review point wherever the outcome matters.",
    capabilities: [
      "AI content pipelines",
      "API and data flow orchestration",
      "Human review checkpoints",
      "Prompt and logic documentation",
    ],
  },
  {
    index: "04",
    title: "Technical Maintenance & Support",
    shortLabel: "Support",
    id: "services-maintenance",
    definition: "Keep what ships healthy and current.",
    scope:
      "Ongoing technical care for live sites and applications: fixes, dependency and security updates, and incremental improvements.",
    capabilities: [
      "Bug fixes",
      "Dependency and security updates",
      "Monitoring checks",
      "Incremental improvements",
    ],
  },
];

export const servicesIndexId = "services-index";

/** Per-service CTA supporting note (spec §4.4). No promises, no timelines. */
export const servicesCtaNote =
  "Not sure which one you need? Describe the problem and the studio will scope the right shape.";

