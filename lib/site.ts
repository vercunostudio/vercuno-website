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
 * Targets point at the homepage sections that ship next. They are kept as
 * in-page anchors during Hero-only development so no unfinished pages are
 * linked.
 */
export const primaryNav: NavItem[] = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
];
