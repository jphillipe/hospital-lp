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
    /**
     * The scheduling route. Read only by `BookCta`, which appends
     * `?specialty=` / `?doctor=` — never anything a visitor typed.
     */
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

/**
 * Everything the conversation panel says on its own behalf. Kept apart from
 * the band's copy because the band is a doorway and the panel is the room.
 */
export interface AssistantPanelContent {
  readonly title: string;
  readonly description: string;
  readonly closeLabel: string;
  readonly inputLabel: string;
  readonly inputPlaceholder: string;
  readonly sendLabel: string;
  readonly thinkingLabel: string;
  /** Names the chip row under an answer that points at a service. */
  readonly relatedLabel: string;
  /**
   * The action beside those chips. The assistant routes; this is the only place
   * it can hand someone over to something that actually books, which is what
   * turns an answer into a visit.
   */
  readonly bookLabel: string;
  /** Shown when the transcript cannot be recovered at all. */
  readonly errorMessage: string;
  /**
   * Returned verbatim, without calling the model, whenever `detectEmergency`
   * fires. PLAN.md §5 item 11 — the emergency route is not the model's to
   * phrase differently each time.
   */
  readonly emergencyReply: string;
  /** Returned on HTTP 429, in place of a raw status code. */
  readonly rateLimitReply: string;
  /** The HIPAA line, repeated inside the panel where people type. */
  readonly privacyNotice: string;
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
  readonly panel: AssistantPanelContent;
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

/*
 * `QuickAccessContent`, `QuickAccessItem`, `QuickAccessIcon` and
 * `QuickAccessTone` were removed with the section, the way `StatsSection` and
 * the other three hospital-era sections were. Git holds them if the strip comes
 * back; see `content/care-model.ts` for why it went.
 */

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
  /**
   * Whether the practice has signed off on `conditions` and `services`.
   *
   * `false` means the two lists are a drafted starting point, not a claim the
   * practice has made. It is not cosmetic: the detail page prints a provisional
   * note beside the lists, and `lib/assistant/knowledge.ts` labels them as
   * unconfirmed in the chat corpus so the assistant hedges instead of promising
   * a service. Flip to `true` per specialty as the practice confirms each one.
   */
  readonly listsConfirmed: boolean;
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
  /** Sits under the lists while `listsConfirmed` is `false`. */
  readonly listsProvisionalNotice: string;
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
  /** Sends the home page's strip of cards to the full directory. */
  readonly directoryLabel: string;
  /**
   * Rendered whenever a specialty has no named clinician yet. The roster is
   * the client's to supply; inventing one is what `CLAUDE.md` forbids.
   */
  readonly pendingNotice: string;
  readonly languageNames: Readonly<Record<LanguageCode, string>>;
}

/**
 * Chrome for `/doctors` and `/doctors/[slug]`. One module serves both, so a
 * label cannot drift between the directory and a profile, and nothing here is
 * clinician-specific — that all comes off the `Doctor` record.
 */
export interface DoctorPageContent {
  readonly eyebrow: string;
  readonly homeLabel: string;
  readonly breadcrumbLabel: string;

  readonly directoryTitle: string;
  readonly directoryLead: string;
  /** Beside each group heading, pointing at `/specialties/<slug>`. */
  readonly serviceLinkLabel: string;
  /** Heads the group of services that have nobody listed yet. */
  readonly unstaffedLabel: string;
  readonly unstaffedBody: string;

  readonly aboutLabel: string;
  readonly educationLabel: string;
  readonly certificationsLabel: string;
  readonly languagesLabel: string;
  /** `"%n years in practice"` — the placeholder is substituted. */
  readonly experienceLabel: string;
  readonly specialtiesLabel: string;
  readonly locationLabel: string;
  readonly locationLinkLabel: string;

  readonly bookingLabel: string;
  readonly bookingLead: string;
  readonly phoneLabel: string;
  readonly acceptingLabel: string;
  readonly notAcceptingLabel: string;
  /** Said out loud rather than leaving a disabled button to be interpreted. */
  readonly notAcceptingBody: string;

  readonly otherCliniciansLabel: string;
  readonly seoDescriptionSuffix: string;
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

export interface InfoPageSection {
  readonly id: string;
  readonly heading: string;
  /** Prose written for this page. Optional — a section may be pure reuse. */
  readonly body?: string;
  /**
   * `Faq.slug`s whose answers become the body of this section. This is the
   * point of the type: the practical pages are a re-composition of what
   * `faqs.ts` already says, so a page and the FAQ cannot answer the same
   * question two different ways — and the chat corpus keeps one source.
   */
  readonly faqSlugs: readonly string[];
  readonly points?: readonly string[];
}

/**
 * A practical page — new patients, insurance, accessibility. One component
 * renders all three.
 *
 * `pendingNotice` is `null` when everything on the page is already asserted
 * somewhere else on the site, and a sentence when it is not. It is not
 * optional: a page about what the practice accepts has to state plainly which
 * parts of it nobody has confirmed.
 */
export interface InfoPage {
  readonly slug: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly lead: string;
  readonly sections: readonly InfoPageSection[];
  readonly pendingNotice: string | null;
  readonly closingLabel: string;
  readonly closingBody: string;
  readonly phoneLabel: string;
  readonly homeLabel: string;
  readonly breadcrumbLabel: string;
  readonly seo: { readonly title: string; readonly description: string };
}

/**
 * A legal document the practice has to publish and that this project does not
 * write. `pendingNotice` is required, not optional: an unwritten privacy policy
 * rendered without one reads as a policy.
 */
export interface LegalPage {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  /** What the document will cover — a placeholder with nothing in it is worse. */
  readonly covers: readonly string[];
  readonly seoDescription: string;
}

/** Chrome shared by every legal page, so a label cannot drift between them. */
export interface LegalPageContent {
  readonly eyebrow: string;
  readonly homeLabel: string;
  readonly breadcrumbLabel: string;
  readonly coversLabel: string;
  readonly pendingNotice: string;
  readonly contactLabel: string;
  readonly contactBody: string;
  readonly phoneLabel: string;
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

export interface CareModelStep {
  readonly id: string;
  readonly title: string;
  readonly body: string;
  /** FK to `Specialty.slug`; `null` for a step that is not one service. */
  readonly specialtySlug: string | null;
}

/**
 * How the four services work as one team rather than four front doors.
 *
 * The rule this content has to keep: **every step describes how starting works,
 * never a programme, a protocol or a clinical pathway.** The practice has not
 * described one, and a numbered diagram is exactly the kind of thing that reads
 * as a claim. Each step below has to be traceable to something already asserted
 * in `faqs.ts`, `locations.ts` or `doctors.ts`.
 */
export interface CareModelContent {
  readonly eyebrow: string;
  readonly heading: string;
  readonly lead: string;
  readonly steps: readonly CareModelStep[];
  readonly closingLabel: string;
  readonly closingBody: string;
  readonly action: NavItem;
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

/*
 * `VirtualCareContent` was removed with its section, on the owner's
 * instruction. It described video visits the practice has not set up, and it
 * existed largely so the third persistent action had somewhere to point.
 * `faqs.ts` still answers "do you offer video visits?" with "not yet", which is
 * the right home for a question about a service we do not have. Git holds the
 * type and the section if the service is ever built.
 */

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

/**
 * When the practice may call back. Ids are the wire values, so they are the
 * one part of this the schema and the form both have to agree on.
 */
export type CallbackWindowId = "morning" | "afternoon" | "any";

export interface CallbackWindow {
  readonly id: CallbackWindowId;
  readonly label: string;
  readonly detail: string;
}

/** Validation copy, so `server/schemas/appointment.ts` holds no strings. */
export interface BookingErrorMessages {
  readonly service: string;
  readonly fullName: string;
  readonly phone: string;
  readonly email: string;
  readonly callback: string;
  readonly notes: string;
  /** Heads the list of errors above the form after a rejected submit. */
  readonly summaryHeading: string;
  /** Anything the schema did not catch. */
  readonly generic: string;
}

/**
 * The confirmation screen, separate from the form for the same reason
 * `AssistantPanelContent` is separate from the band: one is the doorway, the
 * other is what is said once it has been used.
 */
export interface BookingConfirmationContent {
  readonly eyebrow: string;
  readonly heading: string;
  readonly body: string;
  readonly phoneLabel: string;
  readonly restartLabel: string;
  /**
   * Required by the type, not by memory. Nothing is transmitted anywhere: the
   * request would reach a scheduler the practice has not chosen, and a
   * confirmation implying otherwise is worse than having no form.
   */
  readonly pendingNotice: string;
}

/**
 * Everything `/book` says. The service options themselves are **not** here —
 * they are `Specialty` records resolved by the page, so adding a fifth service
 * stays a `specialties.ts` edit. Only the option that is not a service lives in
 * this module.
 *
 * Nothing in this interface asks what is wrong with anyone. `site.legal
 * .hipaaNotice` promises the site collects no protected health information and
 * PLAN.md §5 item 5 makes that structural: there is no symptom field, no date
 * of birth, no insurance member number, and only `specialty` and `doctor` ever
 * reach the query string.
 */
export interface BookingContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly lead: string;
  readonly homeLabel: string;
  readonly breadcrumbLabel: string;

  readonly serviceLegend: string;
  readonly serviceHelp: string;
  /** The option that is not a specialty — the review's "I'm not sure". */
  readonly unsureLabel: string;
  readonly unsureDescription: string;
  /** Revealed by that option. It offers help; it never blocks the submit. */
  readonly unsureHelpHeading: string;
  readonly unsureHelpBody: string;
  readonly unsureFinderLabel: string;

  /** Names the clinician carried in from a profile or a card. */
  readonly clinicianLabel: string;
  readonly clearClinicianLabel: string;

  readonly detailsLegend: string;
  readonly fullNameLabel: string;
  readonly phoneLabel: string;
  readonly phoneHelp: string;
  readonly emailLabel: string;
  readonly emailHelp: string;
  readonly optionalSuffix: string;

  readonly callbackLegend: string;
  readonly callbackHelp: string;
  readonly callbackWindows: readonly CallbackWindow[];

  readonly notesLabel: string;
  /** Says in plain words that health details do not belong in the box. */
  readonly notesHelp: string;
  readonly notesPlaceholder: string;

  readonly submitLabel: string;
  readonly submittingLabel: string;

  /** The HIPAA line, repeated where people type — PLAN.md §5 item 11. */
  readonly privacyNotice: string;
  readonly emergencyNote: string;

  readonly errors: BookingErrorMessages;
  readonly confirmation: BookingConfirmationContent;
}

export interface CtaBandContent {
  readonly heading: string;
  readonly body: string;
  readonly phoneLabel: string;
  /** The last thing on the page before the footer. It says 911. */
  readonly emergencyNote: string;
}

/**
 * The error boundary. Kept separate from `NotFoundContent` because the two say
 * different things: a 404 knows the visitor is in the wrong place, an error page
 * knows only that we are.
 */
export interface ErrorPageContent {
  readonly eyebrow: string;
  readonly heading: string;
  readonly lead: string;
  readonly retryLabel: string;
  readonly homeLabel: string;
  readonly phoneLabel: string;
  /** Whatever broke, the practice is still reachable and 911 still exists. */
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
