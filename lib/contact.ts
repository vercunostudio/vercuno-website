export const contactHeading = {
  eyebrowIndex: "06",
  eyebrowLabel: "Let's Talk",
  lead: "Start a",
  accent: "Project.",
};

export const contactCopy = {
  supportLead: "Tell us what you're building.",
  supportBody: "We'll explore how VERCUNO can help.",
  /** Verified direct address — the only contact channel besides the form. */
  directLabel: "Prefer email?",
};

export type ServiceOption = {
  /** Value stored/submitted with the inquiry. */
  value: string;
  /** Visible label in the select. */
  label: string;
};

export const serviceOptions: ServiceOption[] = [
  { value: "web-development", label: "Web Development" },
  { value: "custom-software", label: "Custom Software" },
  { value: "ai-workflow-automation", label: "AI & Workflow Automation" },
  { value: "maintenance-support", label: "Technical Maintenance & Support" },
  { value: "not-sure-yet", label: "Not sure yet" },
];

export const servicePlaceholder = "Select a service (optional)";

/**
 * Form strings. The studio has no form-delivery backend configured, so the
 * submit action honestly composes an email draft in the visitor's own mail
 * app — nothing is sent or stored by the website, and no success state is
 * ever claimed. See components/contact-form.tsx and the section notes.
 */
export const formStrings = {
  legend: "Project inquiry",
  name: { label: "Name", placeholder: "Your name" },
  email: { label: "Email", placeholder: "name@company.com" },
  service: { label: "Service", hint: "Optional" },
  details: {
    label: "Project details",
    placeholder:
      "What are you building, and what does success look like? Timelines and budget ranges help.",
  },
  submit: "Continue via Email",
  submitDispatching: "Opening your email app…",
  /** Always-visible honesty note directly under the submit action. */
  hint: "This opens your email app with your inquiry prefilled. You review and send it — nothing is stored or sent by this website.",
  /** Live-region message after the draft opens; the direct address is linked after it. */
  statusDraft:
    "Your email app should now open with your inquiry prefilled. Please press send there to deliver it — nothing was sent by this website. If nothing opened, email us directly:",
} as const;

export const validationMessages = {
  nameRequired: "Please enter your name.",
  nameShort: "Please enter your name (at least 2 characters).",
  emailRequired: "Please enter your email address.",
  emailInvalid: "Please enter a valid email address, like name@company.com.",
  detailsRequired: "Please tell us about your project.",
  detailsShort:
    "Please add a little more detail (at least 10 characters) so we can respond usefully.",
} as const;

/** Footer navigation — every homepage section, oldest to newest. */
export const footerNav = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
] as const;

export const footerStrings = {
  wordmark: "VERCUNO",
  taglineLead: "Digital,",
  taglineAccent: "Built Better.",
  note: "Independent software & AI studio.",
  navLabel: "Footer",
  navHeading: "Sections",
  copyright: (year: number) => `© ${year} VERCUNO. All rights reserved.`,
  backToTop: "Back to top",
} as const;
