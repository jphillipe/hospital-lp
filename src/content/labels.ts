/**
 * Chrome copy (header, footer, emergency bar, a11y affordances).
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
    emergencyDepartment: "Emergency Department",
    nurseLine: "24/7 Nurse Line",
    patientPortal: "Patient Portal",
  },
  header: {
    primaryNavLabel: "Primary",
    mobileNavLabel: "Site navigation",
    appointmentsLabel: "Appointments",
    locationEyebrow: "Dighton, Massachusetts",
    patientPortal: "Patient Portal",
    search: "Search the site",
    submenuHint: "has a submenu",
  },
  footer: {
    navLabel: "Footer",
    legalNavLabel: "Legal",
    contactHeading: "Contact",
    addressHeading: "Main campus",
  },
} as const;
