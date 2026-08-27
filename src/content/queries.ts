import type { Specialty } from "@/types/content";
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
