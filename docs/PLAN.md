# Dighton Medical Center — Landing Page (approved architecture plan)

> Status: approved. This document is the source of truth for the implementation.
> Referenced by `CLAUDE.md`.

## Context

New project (empty directory) for the landing page of a fictional hospital, **Dighton Medical Center**.
Stack: Next.js 16 (App Router), TypeScript strict, Tailwind v4, shadcn/ui, pnpm.
**The entire site and the entire codebase are in English.**

The goal is not just "a nice landing page": it is a base that survives, without a rewrite, the two
features that come later — **appointment scheduling** and an **AI chat**. That is why this plan treats
the boundaries (data identity, access layer, Server/Client boundary, booking route) as architectural
decisions rather than implementation details.

### Decisions locked with the user

| Decision | Choice |
|---|---|
| v1 scope | **Landing page only (`/`)**. Specialties and doctors are anchors on the home page; detail pages are v2 (the types already support them). |
| "Book an Appointment" CTA in v1 | **No form.** The CTA points to `tel:` and to the contact/locations anchor. The whole scheduling flow is v2. |
| Theme | **Clinical light + dark mode**, oklch tokens in `@theme` from the start. Dark mode follows the OS — no toggle, no `next-themes` (see §1 item 02). |
| Package manager | **pnpm**. |

### Reconciliation with `CLAUDE.md`

Two rules in `CLAUDE.md` refine this plan; the resolved version below is what to implement.

1. **"A section never fetches its own data."** Only `src/app/page.tsx` calls `src/content/queries.ts`
   and passes typed props down. Sections are pure presentational Server Components.
   The `<Suspense>` seam for v2 dynamic data (next available slot) therefore lives in a **leaf inside the
   card** (`<DoctorAvailability doctorSlug={…} />`), not in the section — which keeps the rule intact and
   still prevents the page from going fully dynamic.
2. **"Do not add a new dependency without asking."** See §8 for the list that needs approval before use.

---

## 1. Page sections, in order

| # | Section | Component | Purpose |
|---|---|---|---|
| 01 | **Emergency bar** (thin, top) | `EmergencyBar` | ER phone + 911 disclaimer + Patient Portal link. On a hospital site the emergency phone number is the highest-value conversion — it must never require a scroll. |
| 02 | **Header / Nav** (sticky) | `SiteHeader` | Navigation (Specialties, Find a Doctor, Patient Info, Locations, About) + persistent **Book an Appointment** CTA (v1: `tel:`). **No theme toggle** — see the note below. |

> **Amended 2026-08-26 — the theme toggle was cut from item 02.** Dark mode now follows the
> operating system through Tailwind v4's default `dark:` variant (`@media (prefers-color-scheme: dark)`);
> the `@custom-variant dark (&:is(.dark *))` that shadcn writes into `globals.css` was removed and the
> calibrated oklch dark tokens moved from `.dark { … }` into that media query.
> **Why:** a manual switch needs `next-themes` (or a hand-rolled blocking inline script) to avoid a flash
> of the wrong theme, and neither was approved. Following the OS costs zero JS, zero dependencies and has
> no flash by construction. The token layer is unchanged, so restoring a toggle later means re-adding the
> custom variant and a Client leaf — no component touches the palette directly.
| 03 | **Hero** | `Hero` | Positioning + trust proof above the fold (accreditation, years, "average ER wait: 12 min"). Primary CTA *Book an Appointment*, secondary *Find a Doctor*. |
| 04 | **Quick Access strip** | `QuickAccess` | Intent triage: Emergency 24/7 · Urgent Care · Find a Doctor · Patient Portal. People arrive at a hospital site in very different states of urgency; this strip splits the flows before any marketing scroll. |
| 05 | **Specialties / Centers of Excellence** | `SpecialtiesSection` | Breadth of care. It is the entry point for the future specialty-filtered booking and the main internal-SEO asset. |
| 06 | **Why Dighton / Stats** | `StatsSection` | Credibility in numbers (beds, physicians, patients/year, accreditations). |
| 07 | **Find a Doctor — featured physicians** | `DoctorsSection` | Personal trust. Second-largest conversion driver and the natural entry point for "book with Dr. X". |
| 08 | **How it works (3 steps)** | `HowItWorks` | Reduces process anxiety and **pre-sells the v2 scheduling flow**. In v1 step 3 reads "Call us and we'll confirm your time"; in v2 it becomes "Pick a time online" with no layout change. |
| 09 | **Patient stories** | `TestimonialsSection` | Social proof. Section footnote states the content is fictional. |
| 10 | **Insurance & Billing** | `InsuranceSection` | Removes the number-one patient objection ("do you take my plan?"). Without it the booking flow collects leads that cannot convert. |
| 11 | **Locations & Hours** | `LocationsSection` | Physical conversion + local SEO (`Hospital` schema with NAP, hours, parking). |
| 12 | **FAQ** | `FaqSection` | Objection handling + `FAQPage` schema. **It is also the first grounding corpus for the AI chat** — which is why it lives in `content/faqs.ts`, not in JSX. |
| 13 | **Final CTA band** | `CtaBand` | Last conversion: phone + Book. |
| 14 | **Footer** | `SiteFooter` | Secondary navigation, HIPAA notice, Privacy, Nondiscrimination, Accessibility statement, fictional-site disclaimer. |
| — | **Mobile sticky CTA** | `MobileCtaBar` | Call / Book pinned on mobile after the hero scrolls away. |
| — | **Chat launcher** (v1 placeholder) | `ChatLauncher` | Floating button already positioned, carrying the "not for medical emergencies" disclaimer. Reserving the space now avoids fighting `MobileCtaBar` later. |

**v1 (required):** 01–08, 10, 11, 13, 14.
**v1.5 (if time allows):** 09, 12, chat launcher.

> **Amended 2026-08-26 — direction G reshapes items 02, 03 and the chat entry point.**
> The visual direction now lives in `docs/DESIGN.md`; these four changes are structural,
> so they belong here.
>
> 1. **Item 03 Hero is a three-slide carousel**, not a static hero. Full-bleed media under
>    `--hero-scrim`, one eyebrow / title / paragraph / CTA per slide, progress bars at the
>    base and circular previous · pause · next controls bottom-right. It is a region with
>    `aria-roledescription="carousel"`; off-screen slides are `aria-hidden` and `inert`;
>    the pause control is visible and carries `aria-pressed`; and it **never autoplays under
>    `prefers-reduced-motion: reduce`** — it renders paused and the visitor starts it.
>    **Why the plan changes:** the client asked for the carousel directly. The trust proof
>    the old item 03 carried (accreditation, years, ER wait) has no home yet — it moves to
>    item 06 `StatsSection` when the figures exist.
> 2. **New: an assistant band directly below the hero**, overlapping it by 38px inside a
>    `--card` / `--radius-card` / `--shadow-float` card: heading, four shortcut chips, a
>    question field, and the mandatory notice *"Virtual assistant — not medical advice. In
>    an emergency, call 911."* UI only — no route, no model, no request. It **supersedes the
>    floating `ChatLauncher`** as the v1 chat entry point; `MobileCtaBar` therefore no longer
>    has anything to fight for the bottom-right corner.
> 3. **New: a fixed emergency block below the assistant band**, on `--alert-bg` with `--alert`
>    ink, carrying 911, the ED front desk and the nurse line. It sits **outside** the carousel
>    on purpose: an emergency route that rotates away is not an emergency route.
> 4. **Item 02 header, confirmed against direction G.** Two bands, and the top one stays the
>    red-ink `EmergencyBar` of item 01 — **not** a muted utility strip. **No language selector**
>    (§5 item 12: the site is English-only). The account entry point is **Patient Portal**, not
>    a "Sign In" of its own. The nav is exactly the five items in `content/navigation.ts`, with
>    a caret on Specialties alone. A circular search control is now rendered in the header but
>    **has no target yet** — there is no search route in v1.
>
> **Also changed:** `site.booking.ctaLabel` is now **"Make an Appointment"** (was "Book an
> Appointment"), which updates every call site through `BookCta` at once.

---

## 2. File tree

```
LP-hospital/
├─ CLAUDE.md
├─ docs/PLAN.md                        # this file
├─ components.json                     # shadcn/ui (style, aliases, cssVariables: true)
├─ next.config.ts
├─ postcss.config.mjs                  # @tailwindcss/postcss
├─ eslint.config.mjs                   # flat config (next lint was removed in 16)
├─ vitest.config.ts
├─ tsconfig.json                        # strict + noUncheckedIndexedAccess
├─ .env.example
├─ public/
│  ├─ images/
│  │  ├─ hero/hero-lobby.webp
│  │  ├─ doctors/<doctor-slug>.webp    # 600x800, fixed 3:4
│  │  └─ logos/insurers/<slug>.svg
│  └─ favicon.ico
└─ src/
   ├─ app/
   │  ├─ layout.tsx                    # Server — <html lang="en">, fonts, providers, header/footer
   │  ├─ page.tsx                      # Server — the ONLY place that awaits content/queries.ts
   │  ├─ globals.css                   # Tailwind v4: @import + @theme + shadcn tokens
   │  ├─ error.tsx                     # Client (Next requirement)
   │  ├─ not-found.tsx                 # Server
   │  ├─ opengraph-image.tsx           # Server
   │  ├─ robots.ts  ·  sitemap.ts      # Server
   │  ├─ specialties/[slug]/page.tsx   # v2
   │  ├─ doctors/[slug]/page.tsx       # v2
   │  ├─ @modal/                       # v2 — booking parallel route
   │  │  ├─ default.tsx
   │  │  └─ (.)book/page.tsx           # intercepting route
   │  ├─ book/page.tsx                 # v2 — real /book page (deep link, SEO, fallback)
   │  └─ api/
   │     └─ chat/route.ts              # v2 — streaming, nodejs runtime
   ├─ components/
   │  ├─ ui/                           # shadcn-generated primitives — DO NOT EDIT, compose on top
   │  │                                #  (button, card, dialog, sheet, accordion, form, input,
   │  │                                #   select, badge, separator…)
   │  ├─ layout/
   │  │  ├─ site-header.tsx            # Server
   │  │  ├─ main-nav.tsx               # Client
   │  │  ├─ mobile-nav.tsx             # Client
   │  │  ├─ emergency-bar.tsx          # Server
   │  │  ├─ site-footer.tsx            # Server
   │  │  └─ mobile-cta-bar.tsx         # Client
   │  ├─ sections/                     # all Server, all props-only
   │  │  ├─ hero.tsx
   │  │  ├─ quick-access.tsx
   │  │  ├─ specialties-section.tsx
   │  │  ├─ stats-section.tsx
   │  │  ├─ doctors-section.tsx
   │  │  ├─ how-it-works.tsx
   │  │  ├─ testimonials-section.tsx
   │  │  ├─ insurance-section.tsx
   │  │  ├─ locations-section.tsx
   │  │  ├─ faq-section.tsx
   │  │  └─ cta-band.tsx
   │  ├─ cards/
   │  │  ├─ specialty-card.tsx         # Server
   │  │  ├─ doctor-card.tsx            # Server
   │  │  └─ doctor-availability.tsx    # v2 — async leaf behind <Suspense>
   │  ├─ shared/
   │  │  ├─ container.tsx
   │  │  ├─ section.tsx                # <section> + spacing + anchor id, variants via cva
   │  │  ├─ section-heading.tsx        # eyebrow / h2 / lead
   │  │  ├─ icon.tsx                   # IconName -> LucideIcon registry
   │  │  ├─ phone-link.tsx             # tel: + formatting
   │  │  └─ json-ld.tsx                # Server
   │  ├─ booking/
   │  │  ├─ book-cta.tsx               # ★ Server in v1 — <Link>/<a href="tel:">, variants via cva.
   │  │  │                             #   TODO(v2): swap href for /book?doctor=<slug>
   │  │  ├─ book-appointment-dialog.tsx# Client (v2)
   │  │  └─ appointment-form.tsx       # Client (v2) — RHF + zodResolver
   │  ├─ chat/
   │  │  ├─ chat-launcher.tsx          # Client
   │  │  └─ chat-panel.tsx             # Client, next/dynamic ssr:false
   │  ├─ faq/faq-accordion.tsx         # Client (Radix)
   │  └─ providers/app-providers.tsx   # Client
   ├─ content/                         # ← single source of ALL copy
   │  ├─ site.ts                       # NAP, phones, hours, socials, legal
   │  ├─ navigation.ts
   │  ├─ specialties.ts
   │  ├─ doctors.ts
   │  ├─ locations.ts
   │  ├─ insurance.ts
   │  ├─ stats.ts
   │  ├─ testimonials.ts
   │  ├─ faqs.ts
   │  └─ queries.ts                    # ★ async access layer (the seam)
   ├─ lib/
   │  ├─ utils.ts                      # cn()
   │  ├─ format.ts                     # formatPhone, telHref, formatDoctorName
   │  ├─ schema-org.ts                 # Hospital / Physician / FAQPage / MedicalSpecialty
   │  ├─ seo.ts                        # buildMetadata()
   │  └─ env.ts                        # zod
   ├─ types/
   │  ├─ content.ts                    # Specialty, Doctor, Location, Faq…
   │  └─ booking.ts                    # AppointmentTypeSlug, etc.
   └─ server/                          # v2
      ├─ actions/appointments.ts       # "use server"
      └─ schemas/appointment.ts        # zod shared by client + server
```

Tests live next to the unit under test as `*.test.ts` / `*.test.tsx` (Vitest). v1 coverage target is
`lib/format.ts`, `lib/schema-org.ts` and `content/queries.ts` — pure functions, no DOM required.

---

## 3. Server vs Client

**Rule:** everything is a Server Component by default. Client only when there is an **event handler,
state, effect, context or browser API** — and always at the **leaf**, never at the container.

### Server Components

| Component | Why |
|---|---|
| `app/layout.tsx`, `app/page.tsx` | Composition + metadata. Must be Server for `generateMetadata` and to `await` the queries. `page.tsx` is the single data-fetching site. |
| All `sections/*` | Pure presentation over typed props. Zero interactivity of their own — anything interactive is delegated to a Client leaf. |
| `specialty-card.tsx`, `doctor-card.tsx` | **Critical point.** In v1 the CTA is a link (`tel:` / anchor), so the whole card is Server and ships **zero JS**. In v2, when the CTA becomes a dialog trigger, the card **stays Server** and only `BookCta` turns Client. Marking the card `"use client"` for one button drags the whole subtree (image, bio, badges) into the bundle and costs the section its streaming. |
| `book-cta.tsx` (v1) | Just a `<Link>` / `<a href="tel:…">` styled with `buttonVariants`. No JS needed. Every CTA on the page goes through it — it is the single file that changes in v2. |
| `site-header.tsx`, `emergency-bar.tsx`, `site-footer.tsx` | Static structure. The header is sticky via CSS (`sticky top-0`), with **no** scroll listener — that keeps the entire header out of the bundle. |
| `json-ld.tsx` | Serializes server data into a `<script type="application/ld+json">`. |
| `robots.ts`, `sitemap.ts`, `opengraph-image.tsx` | Server runtime by definition. |

### Client Components

| Component | Why |
|---|---|
| `main-nav.tsx` | Radix NavigationMenu (Specialties dropdown) + `usePathname()` for active state. |
| `mobile-nav.tsx` | `Sheet` with open/close state + focus trap. |
| `mobile-cta-bar.tsx` | `IntersectionObserver` on the hero so it appears only below the fold. |
| `faq-accordion.tsx` | Radix Accordion owns state and `aria-expanded`. Receives `faqs` as a serializable prop — `FaqSection` stays Server. |
| `book-cta.tsx` **(v2 only)** | Gains `"use client"` when the CTA starts opening the dialog. Server in v1. |
| `book-appointment-dialog.tsx`, `appointment-form.tsx` **(v2)** | Dialog + `react-hook-form` + live validation + submit state. |
| `chat-launcher.tsx`, `chat-panel.tsx` | Conversation state, streaming, scroll. Loaded via `next/dynamic` (`ssr: false`) to keep them off the first load. |
| `app-providers.tsx` | `ThemeProvider` and any global context. |
| `error.tsx` | Next requires `"use client"` on error boundaries. |
| `testimonials-carousel.tsx` *(only if a carousel is used)* | Embla needs JS. A static grid stays Server. |

**Two consequences worth enforcing in review:**
1. A Server Component **cannot be imported** inside a Client Component — but it **can be passed as
   `children`/prop**. If `ChatPanel` ever needs server-rendered content, it receives it as a prop.
2. Every prop crossing the boundary must be serializable. That is why **no icons, no components and no raw
   `Date` objects** go into `content/` — only strings, numbers, booleans and arrays of those.

---

## 4. Data format

### 4.1 Principles that apply to both files

- `slug` is the **stable identity**: URL, JSON-LD `@id`, scheduling FK, and the chat's citation anchor.
  Never derive a key from an array index or from a display name.
- The icon is a **string** (`IconName`) resolved through a registry — keeps the record serializable and
  JSON-able for when it comes from a CMS/API.
- Everything `readonly`; dates as ISO strings; phones in E.164.
- Every record is **self-sufficient prose** (`description`, `conditions`, `services`) because that same
  text becomes the grounding corpus for the chat.
- `export const … = [...] as const satisfies readonly Specialty[]` — keeps the literals **and** type-checks.

### 4.2 `src/types/content.ts`

```ts
export type IconName =
  | "heart-pulse" | "brain" | "bone" | "baby" | "stethoscope"
  | "activity" | "eye" | "scan" | "syringe" | "microscope";

export type LanguageCode = "en" | "es" | "pt" | "fr" | "zh" | "ar";

export type AppointmentTypeSlug =
  | "new-patient" | "follow-up" | "telehealth" | "second-opinion" | "annual-physical";

export interface Specialty {
  readonly slug: string;                 // stable id · URL · booking FK
  readonly name: string;                 // "Cardiology"
  readonly tagline: string;              // one line, for the card
  readonly description: string;          // 2–3 sentences: page + chat grounding
  readonly icon: IconName;
  readonly featured: boolean;            // appears on the home page
  readonly order: number;
  readonly conditions: readonly string[];
  readonly services: readonly string[];
  readonly locationSlug: string;
  readonly floor: string | null;
  readonly phone: string | null;         // E.164
  readonly acceptingNewPatients: boolean;
  readonly booking: {
    readonly enabled: boolean;           // gate for the future feature
    readonly requiresReferral: boolean;
    readonly appointmentTypes: readonly AppointmentTypeSlug[];
  };
  readonly seo: { readonly title: string; readonly description: string };
}

export interface Doctor {
  readonly slug: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly credentials: readonly string[];      // ["MD","FACC"] → "Amara Okafor, MD, FACC"
  readonly title: string;                       // "Chief of Cardiology"
  readonly primarySpecialtySlug: string;        // FK → Specialty.slug
  readonly specialtySlugs: readonly string[];   // physicians have more than one
  readonly photo: {
    readonly src: string;
    readonly alt: string;
    readonly width: number;                     // 600
    readonly height: number;                    // 800 — prevents CLS
    readonly blurDataURL?: string;
  };
  readonly bio: string;
  readonly education: readonly {
    readonly institution: string; readonly degree: string; readonly year: number;
  }[];
  readonly boardCertifications: readonly string[];
  readonly languages: readonly LanguageCode[];
  readonly yearsOfExperience: number;
  readonly locationSlugs: readonly string[];
  readonly acceptingNewPatients: boolean;
  readonly featured: boolean;
  readonly order: number;
  readonly booking: {
    readonly enabled: boolean;
    readonly providerId: string | null;         // EHR/scheduler id — null today, but the field exists
    readonly appointmentTypes: readonly AppointmentTypeSlug[];
  };
}
```

### 4.3 `src/content/specialties.ts` (shape)

```ts
import type { Specialty } from "@/types/content";

export const specialties = [
  {
    slug: "cardiology",
    name: "Cardiology",
    tagline: "Advanced heart care, from prevention to complex intervention.",
    description:
      "The Dighton Heart Institute treats the full range of cardiovascular disease…",
    icon: "heart-pulse",
    featured: true,
    order: 1,
    conditions: ["Coronary artery disease", "Atrial fibrillation", "Heart failure"],
    services: ["Echocardiography", "Cardiac catheterization", "Cardiac rehabilitation"],
    locationSlug: "main-campus",
    floor: "Level 3, Pavilion B",
    phone: "+15085550142",
    acceptingNewPatients: true,
    booking: {
      enabled: true,
      requiresReferral: false,
      appointmentTypes: ["new-patient", "follow-up", "telehealth"],
    },
    seo: { title: "Cardiology — Dighton Medical Center", description: "…" },
  },
  // …8–10 total, 6 with featured: true
] as const satisfies readonly Specialty[];
```

### 4.4 `src/content/doctors.ts` (shape)

```ts
import type { Doctor } from "@/types/content";

export const doctors = [
  {
    slug: "amara-okafor",
    firstName: "Amara",
    lastName: "Okafor",
    credentials: ["MD", "FACC"],
    title: "Chief of Cardiology",
    primarySpecialtySlug: "cardiology",
    specialtySlugs: ["cardiology", "internal-medicine"],
    photo: { src: "/images/doctors/amara-okafor.webp", alt: "Dr. Amara Okafor", width: 600, height: 800 },
    bio: "Dr. Okafor leads the interventional cardiology program…",
    education: [
      { institution: "Johns Hopkins University School of Medicine", degree: "MD", year: 2006 },
      { institution: "Massachusetts General Hospital", degree: "Residency, Internal Medicine", year: 2009 },
    ],
    boardCertifications: ["American Board of Internal Medicine — Cardiovascular Disease"],
    languages: ["en", "fr"],
    yearsOfExperience: 18,
    locationSlugs: ["main-campus"],
    acceptingNewPatients: true,
    featured: true,
    order: 1,
    booking: { enabled: true, providerId: null, appointmentTypes: ["new-patient", "follow-up"] },
  },
  // …10–12 physicians, 4 with featured: true
] as const satisfies readonly Doctor[];
```

All of the above is fictional content for a fictional hospital. Credentials, NPI-like identifiers and
clinical claims are invented and must be labelled as such in the footer. Where real medical detail would
be required and is not supplied, use an explicit placeholder and flag it rather than inventing it.

### 4.5 `src/content/queries.ts` — the layer that saves the project

```ts
import "server-only";

export async function getFeaturedSpecialties(limit = 6): Promise<readonly Specialty[]>;
export async function getSpecialtyBySlug(slug: string): Promise<Specialty | undefined>;
export async function getFeaturedDoctors(limit = 4): Promise<readonly Doctor[]>;
export async function getDoctorsBySpecialty(slug: string): Promise<readonly Doctor[]>;
export async function getDoctorBySlug(slug: string): Promise<Doctor | undefined>;
```

Today they read the in-memory array. **Only `src/app/page.tsx` calls them; sections receive typed props.**
When a CMS, a database or real-time availability arrives, **one file changes**. It is also the module the
AI chat's tools will call.

---

## 5. Decisions that get expensive if we get them wrong now

Ordered by cost of correction.

1. **The scheduling route (the most expensive).** The user chose not to build the flow in v1 — a legitimate
   call, but the risk is deferred, not removed: if in v2 "Book" becomes a `<Dialog>` driven by `useState`,
   scheduling is born without a URL — not shareable, not indexable, does not survive a refresh, cannot be
   resumed from an email/SMS ("finish your booking"), and Android's back button closes the page instead of
   the modal. **Cheap v1 mitigation:** every CTA on the page goes through a **single** `BookCta`
   (`components/booking/book-cta.tsx`) that today takes its `href` from `content/site.ts` and tomorrow
   switches to `/book?doctor=<slug>` with *parallel + intercepting routes* (`@modal/(.)book`).
   Rule: **no scheduling `<Link>` outside `BookCta`.** Reserve the `/book` entry in `content/navigation.ts`
   now. If that rule leaks and CTAs get scattered as loose links, v2 becomes an `href` hunt across 14 sections.

2. **The content access layer (`queries.ts`).** Importing `specialties` directly into eight sections couples
   every section to the module shape. Booking brings **dynamic** data ("next available: Tue 9:40 AM") and the
   chat needs the same functions as tools. Async accessors from day one cost nothing and turn the migration
   into an implementation swap.

3. **Server/Client boundary on the cards.** Marking `DoctorCard` `"use client"` for one button is the classic
   mistake: it loses streaming, ships image + bio + badges to the bundle, and once chat and booking land the
   whole page hydrates. **Client at the leaves only.** Fixing it later means refactoring the whole tree.

4. **`slug` as stable identity + a reserved `providerId`.** The slug is the URL, the JSON-LD `@id`, the
   scheduling FK and the chat's citation anchor. Changing it later breaks indexed URLs and the mapping to
   the scheduling system. Adding `booking.providerId: string | null` **now** gives the external id a home
   without a shape migration.

5. **PHI / HIPAA posture, starting at the contact form.** The moment scheduling or chat exists you collect
   name, date of birth and symptoms. Decide now: **no PHI in query strings** (this rules out keeping form
   state in `searchParams` — only `doctor`/`specialty` belong in the URL), no third-party script inside the
   booking/chat subtree, no analytics on form fields, explicit consent, and an audit-log seam in the Server
   Action. A leak found later is expensive and embarrassing.

6. **All copy in `content/`, zero text inside components.** This is the rule that later becomes the chat's
   RAG index for free. If FAQs and descriptions are born as JSX they cannot be indexed or translated — and
   re-extracting copy from 14 sections is pure manual work.

7. **Static vs dynamic, with a `<Suspense>` seam from the start.** The landing page must be 100% static
   today. When "next available appointment" lands in the doctor card, without a `<Suspense>` seam the whole
   page turns dynamic and the CDN HTML win is lost. Per the `CLAUDE.md` reconciliation, that seam is the
   `<DoctorAvailability />` leaf inside the card, not the section. Putting it in now is cheap.

8. **Theme tokens in Tailwind v4 `@theme`.** Since dark mode ships in v1 the rule is strict: **no literal
   color in a component** — only `bg-primary`, `text-muted-foreground`, `border-border` and friends. The
   oklch palette (deep teal/blue + warm neutrals), radius and type scale are defined once in `globals.css`,
   and the dark values are redefined under `@media (prefers-color-scheme: dark)` — Tailwind v4's default
   `dark:` variant, no custom variant and no `next-themes`. Every `bg-white` / `text-slate-900` that escapes
   becomes a dark mode bug found by accident months later.

9. **A shared validation schema (zod in `server/schemas/`).** One schema, used by `zodResolver` on the client
   and by the Server Action on the server. Validating only on the client now means a rewrite when the real
   API arrives — and a security hole in the meantime.

10. **Doctor images with fixed `width`/`height` and correct `sizes`.** It is the highest-trust section on the
    page; CLS there hurts LCP and ranking. Also decide **now** whether photos are local or remote
    (`images.remotePatterns` in `next.config.ts`), because a CMS later means a remote loader.

11. **Accessibility and the emergency path.** Skip link, real `h1`/`h2` hierarchy, visible focus, `tel:` on
    every phone number, and a mandatory "**not for medical emergencies — call 911**" disclaimer next to any
    chat entry point. The chat component should **require** that notice by type, not by discipline. This is
    real responsibility, not polish.

12. **i18n:** the site is English-only, but the data model already carries `languages` per doctor.
    Recommendation: do **not** introduce a `/[locale]/` segment now (it would move the whole route tree),
    but keep 100% of the copy in `content/` — which item 6 already guarantees — so the retrofit is mechanical.

---

## 6. Setup notes (Next.js 16)

- `create-next-app` with App Router + `src/` + `@/*` alias, using **pnpm**; Turbopack is the default bundler in 16.
- `next lint` was removed: configure ESLint flat config (`eslint.config.mjs`) directly.
- `params` / `searchParams` are **Promises** — always `await` them in `[slug]` pages.
- `middleware.ts` was renamed to `proxy.ts` — not needed in v1, but worth knowing before creating one.
- Tailwind v4: no `tailwind.config.js`; `@import "tailwindcss"` + `@theme` in `globals.css`, `@tailwindcss/postcss`.
- shadcn/ui: `components.json` with `cssVariables: true`; primitives in `src/components/ui` (never edited by hand).
- `tsconfig.json`: on top of `strict`, enable `noUncheckedIndexedAccess` and `verbatimModuleSyntax`.

---

## 7. Verification

1. `pnpm dev` — the home page renders every v1 section with no hydration error in the console.
2. `pnpm typecheck` clean with `strict` + `noUncheckedIndexedAccess`.
3. `pnpm lint` clean.
4. `pnpm test` — unit tests for `lib/format.ts`, `lib/schema-org.ts`, `content/queries.ts` pass.
5. `pnpm build` — confirm in the output that `/` is emitted as **Static**; no section marked dynamic.
6. Bundle audit: in DevTools, confirm that only `main-nav`, `mobile-nav`, `theme-toggle`, `mobile-cta-bar`
   and `faq-accordion` appear in client JS — the cards and sections **do not**.
7. Lighthouse (mobile): Performance ≥ 95, Accessibility = 100, hero LCP < 2.0s, CLS < 0.02.
   Run it in **both themes** and check contrast ≥ 4.5:1 in each.
8. Dark mode: reload with `prefers-color-scheme: dark` and confirm zero light-theme flash;
   `grep -rE "bg-white|text-(slate|gray|zinc)-[0-9]|#[0-9a-fA-F]{3,6}" src/components` returns nothing.
9. Validate the JSON-LD (`Hospital`, `Physician`, `FAQPage`) in the Rich Results Test.
10. Keyboard: `Tab` from the top to the footer — skip link works, focus is visible everywhere, the mobile nav
    traps focus and returns it to the trigger on `Esc`.
11. Seam smoke test: temporarily replace `getFeaturedDoctors` with a version that `await sleep(500)` and
    confirm only that section suspends — the rest of the page stays static.

---

## 8. Dependencies that need approval before use

`CLAUDE.md` forbids adding a dependency without asking. This plan assumes the following beyond what
`create-next-app` and `shadcn` install by default. Confirm before installing:

| Package | Needed for | Alternative if rejected |
|---|---|---|
| ~~`next-themes`~~ | ~~Dark mode without a flash of the wrong theme~~ | **Rejected** — dark mode follows `prefers-color-scheme` instead (§1 item 02). |
| `zod` | `lib/env.ts`, and shared form schemas in v2 | **Approved and installed** (v4). |
| `vitest` + `@vitest/coverage-v8` | `pnpm test` | — (`pnpm test` is already in `CLAUDE.md`) |
| `react-hook-form` + `@hookform/resolvers` | v2 booking form only | Not needed in v1 |

Already implied by shadcn/ui and therefore not new decisions: `class-variance-authority`, `clsx`,
`tailwind-merge`, `lucide-react`, `@radix-ui/*`.

---

## Amendment — 2026-08-28: repositioning to an outpatient practice

This plan was written for a full hospital: an emergency department, ten specialties, a 248-bed
campus. The client's brief replaced that with an **outpatient practice for older adults and their
families**. Everything above still describes the architecture correctly; what follows records where
the *content* and *page structure* now differ, and why. Where the two disagree, this amendment wins.

### Decisions taken with the client

| # | Question | Decision |
|---|---|---|
| 1 | Does the practice have its own emergency department? | **No.** Every emergency route now says "call 911 or go to the nearest emergency department". |
| 2 | Do the four new specialties replace the ten? | **Replace.** Primary Care, Geriatric Care, Psychology, Physical Therapy. |
| 3 | What is Virtual Care in v1? | **A marked placeholder.** No platform chosen, no date, nothing to sign up for. |
| 4 | Where does the care finder live? | **Inline on the home page** (`#care-finder`), not a route. |
| 5 | Does the AI assistant band stay? | **Yes**, alongside the finder. They are separated by the emergency block and the quick-access strip. |
| 6 | Rewrite the rest of the hospital-era content? | **No** — out of scope for this round. Only what decision 1 made *false* was corrected; the rest is flagged in the "Known inconsistencies" list below. |

### What changed against §1

- **Item 01 hero** — the three-slide carousel is gone (`hero-carousel.tsx` deleted, along with its
  keyframes and `--hero-slide-duration`). One static frame, zero client JS. A carousel moves the
  offer away from a slow reader, which is the opposite of what this audience needs.
- **Item 04 quick access** — the emergency and urgent-care doors are replaced by Book and Virtual
  Care, so the on-page strip names the same things as the persistent action bar.
- **New: caregiver band** (`#caregivers`) — addressed to the adult child, placed straight after the
  specialties grid.
- **New: care finder** (`#care-finder`) — a two-question router, `content/care-finder.ts` plus one
  client leaf. It routes; it does not triage and it does not diagnose. The three rules that keep it
  honest are written at the top of that file and apply to any new branch.
- **New: virtual care** (`#virtual-care`) — exists so the third persistent action has a destination.
- **Persistent actions** — Call / Book / Virtual Care, declared once in `layout/site-actions.ts` and
  rendered twice: in the header from `lg` up, and in `MobileActionBar` fixed to the bottom of every
  smaller screen. Before this, Book was `hidden sm:inline-flex` and a 390px phone had **no** way to
  book without opening the hamburger first.
- **Header search button removed** — it had no handler and no search to run.

### Known inconsistencies, deliberately left (decision 6)

These still argue the hospital-era positioning. They are recorded rather than guessed at:

1. `stats.ts` — heading and lead still lean on "one practice, not a chain of handoffs"; four figures
   are back to `null` because they counted beds, inpatients, emergency waits and accreditations.
2. `doctors.ts` — ten of twelve physicians were removed with the services they led. Geriatrics,
   psychology and physical therapy have **no named clinician**; `doctorsSection.pendingNotice` says
   so. Do not fill the gap by inventing three.
3. `specialties.ts` — `conditions` and `services` are `[]` on all four. They feed the v2 detail page
   and the chat corpus and cannot be filled without inventing clinical claims.
4. `insurance.ts` — coverage categories are unchanged and were never verified against this practice.
5. `testimonials.ts` — rewritten to match the new services, still invented, still disclaimed.

### Second pass — page order and length

The first pass added the client's sections to a page that still had the hospital's running order.
Measured on a 375x812 phone, the specialties were 3.6 screens down and the whole page was 22.2
screens. The brief says "and here the specialties would come" directly after "How can we help you?",
so the first pass met the letter and missed the point.

**New order.** Hero → Specialties → Caregiver band → Care finder → Emergency → Quick access →
Virtual care → Doctors → Locations → Assistant → FAQ → CTA.

- The first four sections are the brief, in the brief's order.
- **`EmergencyBlock` moved to fifth.** It was second, which is what pushed the services down. It is
  not hard to find where it is now: `EmergencyBar` carries 911 above the header on every page, and
  `#emergency` is in the footer nav.
- **`AssistantBand` moved down beside the FAQ** and lost its `-mt-overlap` lift into the hero
  (`--spacing-overlap` is deleted; DESIGN.md still documents it). It stays in v1 at the owner's
  request — the backend is coming — but until `/api/chat` exists it is a text field that swallows a
  question, and that does not belong between a visitor and the four services.

**Cut, on the owner's instruction:** `StatsSection`, `TestimonialsSection`, `InsuranceSection` and
`HowItWorks`, with their content modules and their types. All four were written for the 248-bed
hospital. Insurance is not lost — `faqs.ts` carries coverage, financial assistance and what to bring,
and the footer's billing links now point there.

Dead anchors that went with them (`#about`, `#patient-info`, `#insurance`, `#patient-stories`) are
repointed in `navigation.ts`, and the footer's "About" group is gone rather than pointing four links
at an anchor that no longer exists.

| Measure (375x812) | Before | After |
|---|---|---|
| Screens to Specialties | 3.6 | **0.8** |
| Screens to "Caring for an older adult?" | 5.2 | **2.4** |
| Screens to "Help me find care" | 6.3 | **3.5** |
| Whole page | 22.2 | **14.8** |

Next candidate if it needs to be shorter still: `QuickAccess` (1.5 screens) largely repeats the
persistent action bar now that Call / Book / Virtual Care are fixed to every screen.

### Third pass — `/specialties/[slug]`

PLAN.md §1 parked specialty detail pages in v2. They came forward because the caregiver band's
"Learn about Geriatric Care" had nowhere to go: it pointed at `/#specialties`, which scrolled the
reader *back up* to the one-line card they had just left.

All four services get the page, not just geriatrics, and every specialty-specific word is read off
the `Specialty` record — including `seo`, which had been sitting unused in the type since it was
written. Adding a fifth service is a `specialties.ts` edit and nothing else.

- `src/app/specialties/[slug]/page.tsx` — `generateStaticParams` over `getSpecialties()`,
  `generateMetadata` from `specialty.seo`, `dynamicParams = false` so an unknown slug is a 404
  rather than an on-demand render of nothing. All four prerender as SSG.
- `src/components/sections/specialty-detail.tsx` — presentational, Server, zero JS.
- `src/content/specialty-page.ts` — chrome for all four pages, so a label cannot drift between them.
- `getOtherSpecialties(slug)` added to the `queries.ts` seam.

Three links were closed off with it: the home-page specialty card is now a link (its own TODO), the
caregiver CTA points at `/specialties/geriatric-care`, and the care finder's result links the service
it names — a result that names a service and then makes you go and find it is half an answer.

`conditions` and `services` are still empty and three of the four services still have no clinician.
Both render a stated notice rather than an absent section: an absent section reads as "there is
nothing", which is a different claim from "we have not published it yet".

Checked in the browser, both themes: one `h1` per page, breadcrumb order, AA contrast throughout
(worst case 5.66:1), no horizontal overflow at 375px, and every tap target on the page at or above
44px — the breadcrumb links needed `min-h-11` to get there, since a breadcrumb is standalone
navigation and WCAG's inline-link exception does not cover it.

### Fourth pass — assistant back in the hero (owner's request)

The second pass moved `AssistantBand` down beside the FAQ. The owner asked for it back where it
started: lifted into the hero by `--spacing-overlap`, with the emergency block directly under it.
That is the top of the page now — Hero → Assistant → Emergency → Specialties → Caregiver band →
Care finder → Quick access → Virtual care → Doctors → Locations → FAQ → CTA.

- `--spacing-overlap: 38px` is restored to `globals.css` (DESIGN.md documented it throughout).
- `AssistantBand` gets its `relative z-10 -mt-overlap mb-8x` wrapper back.
- `EmergencyBlock` returns to third, ahead of the specialties.

The cost the second pass was avoiding is back with it: three bands stand between the hero and the
four services, and the assistant still posts nowhere, so the first interactive thing on the page
does nothing when used. Recorded here, not argued again — the owner has the measurement and made
the call. `/api/chat` is what settles it.

## Amendment — 2026-08-28: the assistant answers (v2, `/api/chat`)

The previous amendment ended on "`/api/chat` is what settles it". This is that. The band no longer
posts nowhere: asking a question opens a side panel and streams an answer back.

Three decisions were the owner's, taken before any code:

- **Provider: Google Gemini, free tier** (`gemini-3.5-flash`, no card). Google cut free quotas
  50–80% without notice in December 2025 and the allowance disappears the moment billing is enabled
  on the project, so the free tier is treated as unreliable by design rather than trusted.
- **Medical scope: explain generally, then route.** The assistant may describe a condition or a
  service at waiting-room-leaflet level. It may not assess the person asking.
- **Shape: a side panel**, on the `Sheet` primitive already in `ui/`.

### Safety is three layers, and the first one is not a prompt

1. `lib/assistant/safety.ts` — `detectEmergency()` runs on the incoming message **before** the
   corpus is built and before any request leaves the server. On a hit the route returns
   `assistant.panel.emergencyReply` verbatim and never calls the model. Chest pain, airway, stroke,
   bleeding, overdose, self-harm. Bias is toward false positives; negation is not modelled, because
   an unnecessary 911 notice costs a sentence and the inverse costs more. Bare "emergency" is not a
   pattern — "do you have an emergency room?" is a question about the practice, from `faqs.ts`.
2. `lib/assistant/prompt.ts` — the refusal rules: no diagnosis, no interpretation of the asker's own
   symptoms, no medication, no severity or prognosis, no invented clinician, hour, price or service,
   no asking for personal or health details. Where the corpus is silent, the answer is the main line.
3. `assistant.panel` keeps the disclaimer and the HIPAA notice pinned inside the panel, not just on
   the band — §5 item 11, by type.

### Grounding: no RAG, on purpose

`lib/assistant/knowledge.ts` serialises the whole content layer through `queries.ts` on each request
— roughly twelve thousand tokens, which fits. That removes an embedding step, a vector store, a
chunking strategy and every retrieval bug that comes with them. §5 item 6 said the content layer
becomes the chat's index for free; it did, literally.

It also means **filling in `conditions` and `services` is a content edit with no code change** —
`knowledge.test.ts` is the test that holds that open. `queries.ts` finally gets its
`import "server-only"` (§4.5's standing TODO), which cost `vitest.config.mts` an alias, since the
package throws under every export condition except `react-server` and Vitest does not set it.

### The route never returns an error

Missing key, rejected key, exhausted quota, a timeout, a throw mid-stream — every path ends in
`lib/assistant/fallback.ts`, which keyword-searches the published FAQ and answers from it. The
assistant works with no Google account at all; the key only makes it better.

One failure mode had to be found by testing rather than by reading: `streamText` does **not** reject
and does **not** throw on the stream. A rejected key is reported to `onError` and the text stream
simply ends empty, so the first version of the route answered a cheerful `200` with an empty body.
The route now pulls the first chunk before committing to a stream, and treats an empty stream as the
failure it is.

### Files

- `src/app/api/chat/route.ts` — nodejs runtime, `force-dynamic`. The home page stays static.
- `src/lib/env.server.ts` — the key, kept out of `env.ts` because that module reaches the browser,
  where a server variable is `undefined` and would fail the parse on every page load.
- `src/lib/assistant/{knowledge,prompt,safety,fallback,schema,rate-limit,citations}.ts`
- `src/components/chat/{assistant-experience,chat-panel,chat-message,use-assistant-chat}.tsx`

`ChatPanel` is `next/dynamic` with `ssr: false` per §3, and is not mounted until something is asked.
The transcript lives in `AssistantExperience` so closing the panel does not discard the conversation,
and is held in state only — nothing is persisted anywhere (§5 item 5). Requests are always `POST`,
so a question cannot reach a server log as a query string.

Rate limiting is a fixed window per IP in module memory: 10 a minute. On serverless that is per
instance, which is the wrong tool for billing and the right one for the job it has — stopping one
script from burning a daily free-tier quota that everyone shares.

**Citations without a markdown parser.** The prompt asks the model to mark a service as
`[primary-care]`; `citations.ts` lifts those markers out and the panel builds the link from
`specialtyNames`. A slug that is not ours is left as literal text and never becomes a link, so an
invented service cannot turn into a 404. §5 item 4 said the slug would be the citation anchor.

### Accessibility

Radix brings the focus trap, `Esc` and the scrim. What it could not know: there is no `SheetTrigger`
here — the panel opens because a question was asked — so `onCloseAutoFocus` had to be taken over to
put focus back on whatever was used to ask. Without it, closing dropped focus onto `<body>` and a
keyboard user restarted from the top of the document. `onOpenAutoFocus` is taken over for the same
kind of reason: Radix's default lands on the close button, the one control nobody opens a chat to
reach. The transcript is a `role="log"` with `aria-live="polite"` and `aria-busy` while streaming,
and it follows the stream only while the reader is already at the bottom.

### Verified against a live key

Emergency short-circuit returns in 0.02s without touching the model. A question about hours is
answered from both `hours` entries in `locations.ts` and routed to the appointment line. "What does
physical therapy treat?" gets general education plus a `[physical-therapy]` marker that the panel
renders as a chip to `/specialties/physical-therapy`, with the marker stripped from the prose.
"Should I take ibuprofen?" is refused and routed to the nurse line. "Do you have a cardiologist?"
says the service is not offered and gives the main line, inventing nothing. Warm latency is 5–8s a
question; it streams, so the first words arrive well before that.

Also exercised: the no-key fallback, the rejected-key fallback, the 429, the 400, and the focus cycle.

### Two things the first run got wrong

**Gemini 3.x counts reasoning against `maxOutputTokens`.** At 700 the thinking consumed the budget
and answers arrived cut off mid-sentence — a complete-looking reply that simply stopped. The ceiling
is now 2000 and `thinkingLevel: "minimal"` is set in `providerOptions.google.thinkingConfig`. Every
fact the assistant may state is already in the prompt, so extended reasoning bought nothing and cost
about ten seconds a question. Note `thinkingBudget` is the 2.5-series control and is rejected by 3.x.

**`.env.local` must be UTF-8.** Windows PowerShell 5.1's `>` writes UTF-16 LE with a BOM, which the
dotenv parser reads as UTF-8: the variable name comes back as `\xFF\xFEG\0O\0O\0...`, the key is
never seen, and the route quietly serves the FAQ fallback forever — the exact symptom of a working
site with a dead assistant. Write it with `Set-Content -Encoding utf8` or from a POSIX shell.

### A note on `pnpm format`

`prettier --write .` rewrites this file's tables into blockquotes and reformats forty source files
the change never touched. It was run once here and reverted. Format the files you edited, not the
repository.
