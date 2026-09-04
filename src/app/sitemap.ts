import type { MetadataRoute } from "next";

import { getDoctors, getSpecialties } from "@/content/queries";
import { env } from "@/lib/env";

/**
 * PLAN.md §2 listed this file and it was never written, so nothing but the
 * home page was discoverable without a crawler following links.
 *
 * Every route is enumerated from `queries.ts` rather than listed by hand: a
 * fifth service or a new clinician appears here on the same edit that creates
 * the page, which is the whole point of the access seam.
 *
 * `/book` is not in it. It is the destination of a CTA, it is server-rendered
 * on demand, and a request form is not a page anyone should arrive at from a
 * search result — `/new-patients` is, and it links to it. The legal placeholders
 * are excluded for the reason their own `robots` says: there is no document
 * behind them yet.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, "");
  const lastModified = new Date();

  const [specialties, doctors] = await Promise.all([
    getSpecialties(),
    getDoctors(),
  ]);

  return [
    { url: base, lastModified, changeFrequency: "monthly", priority: 1 },
    ...specialties.map((specialty) => ({
      url: `${base}/specialties/${specialty.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${base}/doctors`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    ...doctors.map((doctor) => ({
      url: `${base}/doctors/${doctor.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...["new-patients", "insurance", "accessibility"].map((slug) => ({
      url: `${base}/${slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
