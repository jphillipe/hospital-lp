/**
 * Chrome copy (header, footer, emergency bar, action bar, a11y affordances).
 * Section copy lives in its own content module — never in JSX.
 */
export const labels = {
  common: {
    skipToContent: "Skip to main content",
    openMenu: "Open menu",
    homeLink: "Go to the home page",
  },
  emergencyBar: {
    headline: "Medical emergency? Call 911",
    nurseLine: "24/7 Nurse Line",
    patientPortal: "Patient Portal",
  },
  header: {
    primaryNavLabel: "Primary",
    mobileNavLabel: "Site navigation",
    appointmentsLabel: "Appointments",
    locationEyebrow: "Dighton, Massachusetts",
    patientPortal: "Patient Portal",
    submenuHint: "has a submenu",
  },
  /**
   * The three actions the client asked to keep visible at all times. They are
   * one list rendered twice — in the header from `lg` up, and in the fixed bar
   * at the bottom of every small screen — so the wording cannot drift between
   * the two.
   */
  actions: {
    barLabel: "Quick actions",
    call: "Call Us",
    book: "Book Appointment",
    virtualCare: "Virtual Care",
  },
  footer: {
    navLabel: "Footer",
    legalNavLabel: "Legal",
    contactHeading: "Contact",
    addressHeading: "Our practice",
  },
} as const;
