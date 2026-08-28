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

/**
 * One frame, no rotation. A carousel moves the offer away from someone who
 * reads slowly, which is the opposite of what this audience needs, so the hero
 * carries a single argument and hands over to the specialties below it.
 */
export interface HeroContent {
  /** Sits above the display line, in sand, over the photograph. */
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
  /** The question that hands the visitor to the specialties section. */
  readonly handoff: string;
  /**
   * The booking button beside it is `BookCta`, never a `NavItem` — every route
   * to scheduling on this site goes through that one component.
   */
  readonly secondaryAction: NavItem;
  readonly media: HeroMediaSource;
}

/** Content stays data: a shortcut names its icon, the component resolves it. */
export type AssistantShortcutIcon =
  "specialist" | "visit" | "billing" | "hours";

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

/** Serializable: the strip names its icon, the component resolves it. */
export type QuickAccessIcon =
  | "book"
  | "virtual-care"
  | "find-a-doctor"
  | "patient-portal";

/**
 * `alert` is the emergency route only. Direction G treats alert as a
 * wash-plus-ink pair, so it stays a card like the others — never a red block.
 */
export type QuickAccessTone = "default" | "alert";

export interface QuickAccessItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  /** A standing fact — hours or how the door works. Never a statistic. */
  readonly meta: string;
  readonly actionLabel: string;
  readonly href: string;
  readonly external?: boolean;
  readonly tone?: QuickAccessTone;
  readonly icon: QuickAccessIcon;
}

export interface QuickAccessContent {
  readonly heading: string;
  /** Four, one per arrival state. */
  readonly items: readonly QuickAccessItem[];
}

/** Resolved to a Lucide glyph by `components/shared/icon.tsx`. */
export type IconName =
  | "stethoscope"
  | "heart-handshake"
  | "brain"
  | "person-standing";

export type AppointmentTypeSlug =
  | "new-patient"
  | "follow-up"
  | "telehealth"
  | "second-opinion"
  | "annual-physical";

export interface Specialty {
  /** Stable identity: URL, JSON-LD `@id`, booking FK, chat citation anchor. */
  readonly slug: string;
  readonly name: string;
  /** One line, for the card. */
  readonly tagline: string;
  /** 2–3 sentences. Feeds the v2 detail page and the chat's grounding corpus. */
  readonly description: string;
  readonly icon: IconName;
  /** Appears in the home page grid. */
  readonly featured: boolean;
  readonly order: number;
  readonly conditions: readonly string[];
  readonly services: readonly string[];
  readonly locationSlug: string;
  readonly floor: string | null;
  /** E.164. */
  readonly phone: string | null;
  readonly acceptingNewPatients: boolean;
  readonly booking: {
    /** Gate for the v2 scheduling flow. */
    readonly enabled: boolean;
    readonly requiresReferral: boolean;
    readonly appointmentTypes: readonly AppointmentTypeSlug[];
  };
  readonly seo: {
    readonly title: string;
    readonly description: string;
  };
}

export interface SpecialtiesSectionContent {
  readonly eyebrow: string;
  readonly heading: string;
  readonly lead: string;
  /**
   * Introduces the specialties that are not featured in the grid. Nothing is
   * held back today, so the section drops the line rather than printing a
   * label with nothing after it.
   */
  readonly moreLabel: string;
  /** Stands under the grid while the service list is still being decided. */
  readonly pendingNotice: string;
}

/**
 * Chrome for `/specialties/[slug]`. One module serves all four pages, so a
 * label cannot drift between them, and nothing here is specialty-specific —
 * that all comes off the `Specialty` record.
 */
export interface SpecialtyPageContent {
  readonly eyebrow: string;
  readonly homeLabel: string;
  readonly breadcrumbLabel: string;
  /** The visible h2 over both lists — and over the notice that replaces them. */
  readonly coversLabel: string;
  readonly conditionsLabel: string;
  readonly servicesLabel: string;
  /** Stands in for both lists while they are empty. */
  readonly listsPendingNotice: string;
  readonly cliniciansLabel: string;
  /** Stands in for the roster when no clinician is assigned to this service. */
  readonly cliniciansPendingNotice: string;
  readonly bookingLabel: string;
  readonly bookingLead: string;
  readonly phoneLabel: string;
  readonly acceptingLabel: string;
  readonly notAcceptingLabel: string;
  readonly referralRequiredLabel: string;
  readonly referralNotRequiredLabel: string;
  readonly locationLabel: string;
  readonly locationLinkLabel: string;
  readonly otherServicesLabel: string;
}

export type LanguageCode = "en" | "es" | "pt" | "fr" | "zh" | "ar";

export interface DoctorPhoto {
  /**
   * `null` until the portrait exists — `DoctorCard` then renders a monogram.
   * Same contract as `HeroMediaSource.src`; no invented face stands in for a
   * physician who does not exist.
   */
  readonly src: string | null;
  readonly alt: string;
  /** Fixed 600x800 (3:4). Present even while `src` is null, so v2 cannot drift. */
  readonly width: number;
  readonly height: number;
  readonly blurDataURL?: string;
}

export interface DoctorEducation {
  readonly institution: string;
  readonly degree: string;
  readonly year: number;
}

export interface Doctor {
  /** Stable identity: URL, JSON-LD `@id`, booking FK, chat citation anchor. */
  readonly slug: string;
  readonly firstName: string;
  readonly lastName: string;
  /** `["MD", "FACC"]` renders as "Amara Okafor, MD, FACC". */
  readonly credentials: readonly string[];
  readonly title: string;
  /** FK to `Specialty.slug`. */
  readonly primarySpecialtySlug: string;
  readonly specialtySlugs: readonly string[];
  readonly photo: DoctorPhoto;
  readonly bio: string;
  readonly education: readonly DoctorEducation[];
  readonly boardCertifications: readonly string[];
  readonly languages: readonly LanguageCode[];
  readonly yearsOfExperience: number;
  readonly locationSlugs: readonly string[];
  readonly acceptingNewPatients: boolean;
  readonly featured: boolean;
  readonly order: number;
  readonly booking: {
    readonly enabled: boolean;
    /** The scheduler's own id. Null today, but the field has a home. */
    readonly providerId: string | null;
    readonly appointmentTypes: readonly AppointmentTypeSlug[];
  };
}

export interface DoctorsSectionContent {
  readonly eyebrow: string;
  readonly heading: string;
  readonly lead: string;
  /** Prefixes the surname on each card's CTA: "Book with Dr. Okafor". */
  readonly bookWithLabel: string;
  readonly languagesLabel: string;
  readonly acceptingLabel: string;
  readonly notAcceptingLabel: string;
  /** Introduces the physicians who are not featured in the grid. */
  readonly moreLabel: string;
  /**
   * Rendered whenever a specialty has no named clinician yet. The roster is
   * the client's to supply; inventing one is what `CLAUDE.md` forbids.
   */
  readonly pendingNotice: string;
  readonly languageNames: Readonly<Record<LanguageCode, string>>;
}

export type Weekday =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface OpeningHours {
  readonly id: string;
  /** What keeps these hours: "Emergency Department", "Urgent Care". */
  readonly label: string;
  readonly days: readonly Weekday[];
  /** 24-hour `HH:MM`. Both `null` means the service never closes. */
  readonly opens: string | null;
  readonly closes: string | null;
}

export interface GeoPoint {
  readonly latitude: number;
  readonly longitude: number;
}

export interface Location {
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  readonly address: PostalAddress;
  /** E.164. */
  readonly phone: string;
  /** `null` until real coordinates exist — see `content/locations.ts`. */
  readonly geo: GeoPoint | null;
  readonly hours: readonly OpeningHours[];
  readonly parking: string;
  readonly gettingHere: string;
  /** `null` while the address is not a place a map can find. */
  readonly directionsUrl: string | null;
  readonly order: number;
}

export interface LocationsSectionContent {
  readonly eyebrow: string;
  readonly heading: string;
  readonly lead: string;
  readonly hoursLabel: string;
  readonly parkingLabel: string;
  readonly gettingHereLabel: string;
  readonly addressLabel: string;
  readonly phoneLabel: string;
  /** Rendered for an `OpeningHours` with no `opens`/`closes`. */
  readonly allDayLabel: string;
  /** Joins a run of days: "Monday to Friday". */
  readonly dayRangeSeparator: string;
  readonly everyDayLabel: string;
}

export type FaqCategory = "booking" | "cost" | "visiting" | "care";

export interface Faq {
  /** Stable identity: the accordion value, the deep link, the chat's citation. */
  readonly slug: string;
  readonly question: string;
  /**
   * Self-sufficient prose. This is the chat's first grounding corpus, so an
   * answer must stand on its own without the question or the page around it.
   */
  readonly answer: string;
  readonly category: FaqCategory;
  readonly order: number;
}

export interface FaqSectionContent {
  readonly eyebrow: string;
  readonly heading: string;
  readonly lead: string;
  /** Closes the section with the number to call when the list does not answer it. */
  readonly fallbackLabel: string;
  readonly fallbackBody: string;
}

/**
 * The band aimed at the adult child rather than the patient. It is the one
 * section on the page written for someone acting on another person's behalf,
 * which is who most often arrives here on a phone.
 */
export interface CaregiverBandContent {
  readonly eyebrow: string;
  readonly heading: string;
  readonly lead: string;
  readonly body: string;
  /** Short reassurances about how starting works — never a clinical claim. */
  readonly points: readonly string[];
  readonly action: NavItem;
  readonly phoneLabel: string;
}

export interface VirtualCareContent {
  readonly eyebrow: string;
  readonly heading: string;
  readonly lead: string;
  /** Renders as a chip on the heading: "Coming soon". */
  readonly statusLabel: string;
  readonly body: string;
  /** What to do until it exists. */
  readonly meanwhileLabel: string;
  readonly meanwhileBody: string;
  readonly phoneLabel: string;
  /**
   * Required by the type, not by memory: this service does not exist yet and a
   * visitor must not leave the section thinking it does.
   */
  readonly pendingNotice: string;
}

/**
 * A router, not a triage tool. Every branch ends in "start here", never in a
 * condition, and the emergency line is visible at every step.
 */
export type CareFinderStep =
  | { readonly kind: "question"; readonly id: string }
  | { readonly kind: "outcome"; readonly id: string };

export interface CareFinderOption {
  readonly id: string;
  readonly label: string;
  readonly next: CareFinderStep;
}

export interface CareFinderQuestion {
  readonly id: string;
  readonly prompt: string;
  readonly help?: string;
  readonly options: readonly CareFinderOption[];
}

export interface CareFinderOutcome {
  readonly id: string;
  readonly title: string;
  readonly body: string;
  /** FK to `Specialty.slug`; `null` when the answer is "call and we'll help". */
  readonly specialtySlug: string | null;
}

export interface CareFinderLabels {
  readonly back: string;
  readonly restart: string;
  /** `"Step %n of %total"` — both placeholders are substituted. */
  readonly progress: string;
  readonly resultEyebrow: string;
  readonly startHereLabel: string;
  readonly callLabel: string;
  /** Sits under every result. Says in plain words that this is not a diagnosis. */
  readonly disclaimer: string;
  readonly emergencyNote: string;
}

export interface CareFinderContent {
  readonly eyebrow: string;
  readonly heading: string;
  readonly lead: string;
  readonly startLabel: string;
  /** Every path is this long, so the progress line can name a total. */
  readonly stepCount: number;
  readonly firstQuestionId: string;
  readonly questions: readonly CareFinderQuestion[];
  readonly outcomes: readonly CareFinderOutcome[];
  readonly labels: CareFinderLabels;
}

export interface CtaBandContent {
  readonly heading: string;
  readonly body: string;
  readonly phoneLabel: string;
  /** The last thing on the page before the footer. It says 911. */
  readonly emergencyNote: string;
}

export interface NotFoundContent {
  readonly eyebrow: string;
  readonly heading: string;
  readonly lead: string;
  readonly destinationsLabel: string;
  /** Reuses `NavItem`, so the 404 and the header cannot drift apart. */
  readonly destinations: readonly NavItem[];
  /** A 404 on a hospital site must not dead-end someone who is in a hurry. */
  readonly emergencyNote: string;
}
