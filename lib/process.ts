/**
 * Section 05 — Process data ("The Operator's Index").
 *
 * Copy approved verbatim in docs/sections/05-PROCESS.md §3–4. The workflow
 * describes a proposed approach only — no timelines, guarantees, or outcomes
 * are claimed anywhere, and none may be added without owner approval.
 */

export type ProcessStage = {
  /** Tabular letter-spaced index, e.g. "01". */
  index: string;
  /** Stage name, e.g. "Discovery". */
  title: string;
  /** Single Instrument Serif Italic accent verb, e.g. "listen". */
  accent: string;
  /** Two-to-three sentence description. */
  description: string;
};

export const processHeading = {
  eyebrowIndex: "05",
  eyebrowLabel: "Our Process",
  /** "How We" — Manrope ExtraBold. */
  lead: "How We",
  /** "Work." — Instrument Serif Italic, Electric Blue. */
  accent: "Work.",
} as const;

export const processStages: ProcessStage[] = [
  {
    index: "01",
    title: "Discovery",
    accent: "listen",
    description:
      "We begin by understanding your business, goals, challenges, and project requirements.",
  },
  {
    index: "02",
    title: "Planning & Design",
    accent: "shape",
    description:
      "We define the solution, establish scope, and develop a design direction aligned with your needs.",
  },
  {
    index: "03",
    title: "Development",
    accent: "build",
    description:
      "We turn the agreed plan into a functional digital product, focusing on usability, maintainability, and implementation quality.",
  },
  {
    index: "04",
    title: "Testing & Refinement",
    accent: "refine",
    description:
      "We review functionality, responsiveness, and usability, then address issues identified during testing.",
  },
  {
    index: "05",
    title: "Launch & Handover",
    accent: "deliver",
    description:
      "We prepare the agreed deliverables for launch or handover and provide the relevant information needed for continued use.",
  },
];

/** Ending CTA copy — docs/sections/05-PROCESS.md §8. */
export const processCta = {
  title: "Have something in mind?",
  label: "Let's Talk.",
} as const;
