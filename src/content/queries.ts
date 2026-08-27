import type { Doctor, Faq, Location, Specialty } from "@/types/content";
import { doctors } from "@/content/doctors";
import { faqs } from "@/content/faqs";
import { locations } from "@/content/locations";
import { specialties } from "@/content/specialties";

/**
 * The access seam — PLAN.md §4.5 and §5 item 2. Every accessor reads the
 * in-memory array today; when a CMS, a database or live availability arrives,
 * this is the one file that changes. It is also the module the v2 chat's tools
 * will call.
 *
 * Only `src/app/page.tsx` calls these. Sections receive typed props.
 *
 * TODO: `import "server-only"` belongs at the top of this file so that a Client
 * Component importing it fails the build instead of quietly bundling the whole
 * content layer. The package is not installed and CLAUDE.md forbids adding a
 * dependency without asking first.
 */

const byOrder = (a: Specialty, b: Specialty): number => a.order - b.order;

export async function getSpecialties(): Promise<readonly Specialty[]> {
  return [...specialties].sort(byOrder);
}

export async function getFeaturedSpecialties(
  limit = 6,
): Promise<readonly Specialty[]> {
  const all = await getSpecialties();
  return all.filter((specialty) => specialty.featured).slice(0, limit);
}

/**
 * Everything the grid does not show, in the same order. Derived from what
 * `getFeaturedSpecialties` actually returned, so a specialty can never fall
 * between the two lists when `limit` changes.
 */
export async function getAdditionalSpecialties(
  limit = 6,
): Promise<readonly Specialty[]> {
  const [all, featured] = await Promise.all([
    getSpecialties(),
    getFeaturedSpecialties(limit),
  ]);
  const shown = new Set(featured.map((specialty) => specialty.slug));

  return all.filter((specialty) => !shown.has(specialty.slug));
}

export async function getSpecialtyBySlug(
  slug: string,
): Promise<Specialty | undefined> {
  return specialties.find((specialty) => specialty.slug === slug);
}

/**
 * Slug to display name, so a card can label a doctor's specialty without any
 * section reaching into `specialties.ts` itself.
 */
export async function getSpecialtyNames(): Promise<
  Readonly<Record<string, string>>
> {
  return Object.fromEntries(
    specialties.map((specialty) => [specialty.slug, specialty.name]),
  );
}

const byDoctorOrder = (a: Doctor, b: Doctor): number => a.order - b.order;

export async function getDoctors(): Promise<readonly Doctor[]> {
  return [...doctors].sort(byDoctorOrder);
}

export async function getFeaturedDoctors(
  limit = 4,
): Promise<readonly Doctor[]> {
  const all = await getDoctors();
  return all.filter((doctor) => doctor.featured).slice(0, limit);
}

/** Everything the grid does not show, derived from what it actually showed. */
export async function getAdditionalDoctors(
  limit = 4,
): Promise<readonly Doctor[]> {
  const [all, featured] = await Promise.all([
    getDoctors(),
    getFeaturedDoctors(limit),
  ]);
  const shown = new Set(featured.map((doctor) => doctor.slug));

  return all.filter((doctor) => !shown.has(doctor.slug));
}

export async function getDoctorsBySpecialty(
  slug: string,
): Promise<readonly Doctor[]> {
  const all = await getDoctors();
  return all.filter((doctor) => doctor.specialtySlugs.includes(slug));
}

export async function getDoctorBySlug(
  slug: string,
): Promise<Doctor | undefined> {
  return doctors.find((doctor) => doctor.slug === slug);
}

const byLocationOrder = (a: Location, b: Location): number => a.order - b.order;

export async function getLocations(): Promise<readonly Location[]> {
  return [...locations].sort(byLocationOrder);
}

export async function getLocationBySlug(
  slug: string,
): Promise<Location | undefined> {
  return locations.find((location) => location.slug === slug);
}

const byFaqOrder = (a: Faq, b: Faq): number => a.order - b.order;

export async function getFaqs(): Promise<readonly Faq[]> {
  return [...faqs].sort(byFaqOrder);
}

export async function getFaqBySlug(slug: string): Promise<Faq | undefined> {
  return faqs.find((faq) => faq.slug === slug);
}
