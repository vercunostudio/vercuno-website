export const STUDIO_EMAIL = "vercuno.studio@gmail.com";

export const projectMailto = `mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent(
  "Project inquiry — VERCUNO",
)}`;

export const helloMailto = `mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent(
  "Hello VERCUNO",
)}`;

export type NavItem = {
  label: string;
  href: string;
};

/**
 * In-page anchors. #work resolves to the Selected Work section and
 * #services to the Services section; #about stays reserved for the section
 * that ships next so no unfinished pages are linked.
 */
export const primaryNav: NavItem[] = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
];

export type ProjectImage = {
  /** AVIF source served by <picture> when the browser accepts it. */
  avif: string;
  /** WebP fallback, byte-exact from public/assets/projects/. */
  webp: string;
  width: number;
  height: number;
  alt: string;
};

export type SelectedProject = {
  index: string;
  title: string;
  category: string;
  /** Capability descriptor, not a result claim. */
  descriptor: string;
  /** Verified live destination, or null when none exists (never fabricated). */
  url: string | null;
  /** Short, factual scope note shown in the metadata column (optional). */
  note?: string;
  /** Authentic capture from the live site, or null for the typographic entry. */
  image: ProjectImage | null;
};

const PROJECT_ASSETS = "/assets/projects";

/**
 * Founder Projects — built and shipped by the studio, not paid client work.
 * Descriptions are verified against the live projects; no metrics,
 * testimonials, clients, or results are claimed anywhere.
 */
export const selectedProjects: SelectedProject[] = [
  {
    index: "01",
    title: "WORLD//ONE",
    category: "Web Development",
    descriptor: "A world built from curiosity.",
    url: "https://world-one-lilac.vercel.app",
    image: {
      avif: `${PROJECT_ASSETS}/world-one/world-one-desktop-01.avif`,
      webp: `${PROJECT_ASSETS}/world-one/world-one-desktop-01.webp`,
      width: 1440,
      height: 900,
      alt: "WORLD//ONE homepage — “Curiosity built this world.” hero over a portrait framed by crystal artwork.",
    },
  },
  {
    index: "02",
    title: "VETO",
    category: "Blockchain Web Application",
    descriptor: "Permissions, under control.",
    url: "https://veto-opal.vercel.app",
    image: {
      avif: `${PROJECT_ASSETS}/veto/veto-desktop-01.avif`,
      webp: `${PROJECT_ASSETS}/veto/veto-desktop-01.webp`,
      width: 1440,
      height: 900,
      alt: "VETO landing page — “Your wallet. Your permissions.” headline between glowing abstract forms.",
    },
  },
  {
    index: "03",
    title: "SOVRA",
    category: "Independent Project / Zecathon Prototype",
    descriptor: "Humanitarian aid accountability prototype.",
    url: "https://sovra-preview.vercel.app/",
    note: "Frontend-only · fictional data",
    image: {
      avif: `${PROJECT_ASSETS}/sovra/sovra-desktop-01.avif`,
      webp: `${PROJECT_ASSETS}/sovra/sovra-desktop-01.webp`,
      width: 1440,
      height: 900,
      alt: "SOVRA landing page — “A donation is not a delivery.” headline beside a sample delivery record comparing organisation, partner and beneficiary amounts.",
    },
  },
  {
    index: "04",
    title: "AI Content Studio",
    category: "AI Content Workflow",
    descriptor: "Content workflows, engineered.",
    url: null,
    image: null,
  },
];
