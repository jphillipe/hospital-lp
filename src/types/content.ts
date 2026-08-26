export interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly description?: string;
  readonly external?: boolean;
}

export interface NavGroup {
  readonly title: string;
  readonly items: readonly NavItem[];
}

export interface PostalAddress {
  readonly street: string;
  readonly city: string;
  readonly region: string;
  readonly postalCode: string;
  readonly country: string;
}

export interface PhoneNumbers {
  /** E.164 — main switchboard. */
  readonly main: string;
  /** E.164 — appointment line, the v1 target of every Book CTA. */
  readonly appointments: string;
  /** E.164 — emergency department front desk (not a substitute for 911). */
  readonly emergencyDepartment: string;
  /** E.164 — 24/7 nurse advice line. */
  readonly nurseLine: string;
}

export interface SiteConfig {
  readonly name: string;
  readonly shortName: string;
  readonly tagline: string;
  readonly description: string;
  readonly locale: string;
  readonly address: PostalAddress;
  readonly phones: PhoneNumbers;
  readonly emergencyNumber: string;
  readonly emergencyNotice: string;
  readonly patientPortalUrl: string;
  readonly booking: {
    /** v1: a `tel:` href. v2: `/book?doctor=<slug>`. Read only by `BookCta`. */
    readonly ctaHref: string;
    readonly ctaLabel: string;
  };
  readonly legal: {
    readonly disclaimer: string;
    readonly hipaaNotice: string;
    readonly copyrightHolder: string;
  };
}
