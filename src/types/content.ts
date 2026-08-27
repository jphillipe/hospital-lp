export interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly description?: string;
  readonly external?: boolean;
  /** Renders a caret in the header nav. PLAN.md §1 gives this to Specialties only. */
  readonly hasSubmenu?: boolean;
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

export interface HeroMediaSource {
  /** `null` until the photograph exists — `HeroMedia` then renders a marked block. */
  readonly src: string | null;
  /** Doubles as the shot brief while `src` is `null`. */
  readonly alt: string;
  readonly credit?: string;
}

export interface HeroSlide {
  readonly id: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
  readonly cta: NavItem;
  readonly media: HeroMediaSource;
}

export interface HeroCarouselLabels {
  readonly previous: string;
  readonly next: string;
  readonly pause: string;
  readonly play: string;
  /** `"Slide %n of %total"` — both placeholders are substituted. */
  readonly slidePosition: string;
  readonly progressLabel: string;
}

export interface HeroContent {
  readonly carouselLabel: string;
  readonly slides: readonly HeroSlide[];
  readonly labels: HeroCarouselLabels;
}

/** Content stays data: a shortcut names its icon, the component resolves it. */
export type AssistantShortcutIcon =
  | "specialist"
  | "visit"
  | "billing"
  | "hours";

export interface AssistantShortcut {
  readonly label: string;
  readonly icon: AssistantShortcutIcon;
}

export interface AssistantContent {
  readonly heading: string;
  readonly intro: string;
  /** Four one-tap starters. */
  readonly shortcuts: readonly AssistantShortcut[];
  readonly inputLabel: string;
  readonly inputPlaceholder: string;
  readonly submitLabel: string;
  /** Required next to every chat entry point — see PLAN.md §5 item 11. */
  readonly disclaimer: string;
}

export interface EmergencyAction {
  /** E.164, or a short code such as `911`. */
  readonly phone: string;
  readonly label: string;
  readonly detail: string;
}

export interface EmergencyBlockContent {
  readonly heading: string;
  readonly body: string;
  readonly actions: readonly EmergencyAction[];
}
