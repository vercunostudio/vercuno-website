/**
 * Section 04 — About (Concept A+C "The Statement + Colophon").
 *
 * Copy is approved in docs/sections/04-ABOUT.md §4 and is limited to
 * verified truth: the PRD positioning, the Hero lede vocabulary, and the
 * three founder projects. No headcount, founding date, tenure, client
 * results, testimonials, awards, partnerships, or guarantees appear here,
 * and founder projects are never described as paid or commercially shipped.
 */

export type Belief = {
  index: string;
  title: string;
  definition: string;
};

/**
 * The statement is split for the masked line reveal only. The accessible
 * name is the `statementAriaLabel` below, so the split never leaks into the
 * heading's announced text.
 */
export const statementLines: Array<{
  /** Leading text of the line, rendered in Manrope ExtraBold. */
  lead: string;
  /** Instrument Serif Italic Electric Blue accent, when the line has one. */
  accent?: string;
  /** Trailing text after the accent. */
  trail?: string;
}> = [
  { lead: "We build" },
  { lead: "software that" },
  { lead: "", accent: "earns", trail: " its place" },
  { lead: "on the internet." },
];

export const statementAriaLabel =
  "We build software that earns its place on the internet.";

export const aboutPosition =
  "“Digital, Built Better.” is not a slogan. It is the standard we hold ourselves to on every project.";

export const aboutBody: string[] = [
  "VERCUNO is an independent software and AI studio, founder-led and deliberately small. Direct access, fewer handoffs, and one standard across design and engineering.",
  "We approach every engagement the same way: understand the business problem first, design the simplest thing that answers it, then engineer it to hold up after launch.",
];

export const beliefs: Belief[] = [
  {
    index: "01",
    title: "Clarity over cleverness",
    definition: "If a screen needs explaining, it needs redesigning.",
  },
  {
    index: "02",
    title: "Engineering is a design decision",
    definition: "How something is built shows up in how it feels.",
  },
  {
    index: "03",
    title: "Small studio, direct access",
    definition: "You talk to the people doing the work.",
  },
];

/**
 * Vercy colophon line. The mark is decorative; this sentence carries the
 * meaning. "It" is the interim pronoun until the owner states a preference
 * (04-ABOUT §16, decision 4).
 */
export const vercyLine =
  "Vercy is the studio's companion. It reviews everything we ship.";

/**
 * Vercy production assets.
 *
 * V1.1 replaces the opaque board crops with transparent busts keyed from the
 * eight authentic green-screen renders in docs/references/. The circular frame
 * now clips a real alpha cutout, so no field colour is baked into the raster
 * and the mark sits directly on the page.
 *
 * Each state is exported at a matched head scale (see scripts/vercy-export.mjs)
 * so an expression swap never resizes the character.
 *
 * `neutral` is the only state referenced by the server HTML. `happy` and
 * `surprised` load lazily on first interaction, so a no-JS visitor downloads
 * exactly one 7 KB image.
 */
export const vercyStates = {
  neutral: "/assets/mascot/neutral",
  happy: "/assets/mascot/happy",
  surprised: "/assets/mascot/surprised",
} as const;

export type VercyState = keyof typeof vercyStates;

/** Widths exported per state, largest first. */
export const vercyWidths = [320, 160, 96, 72] as const;

/** Source set string for one state at a given suffix. */
export function vercySrcSet(state: VercyState): string {
  return vercyWidths.map((w) => `${vercyStates[state]}-${w}.webp ${w}w`).join(", ");
}
