import type { Metadata } from "next";

import { site } from "@/content/site";
import type { InfoPage } from "@/types/content";

/**
 * `buildMetadata()` was in PLAN.md §2 and never written. It exists now because
 * three practical pages would otherwise repeat the same eight lines, and a
 * canonical or an Open Graph URL missing from one of them is the kind of thing
 * nobody notices until a duplicate shows up in an index.
 *
 * The root layout's title template appends " — Dighton Medical Center", so
 * `seo.title` stays the bare page name.
 */
export function buildInfoPageMetadata(page: InfoPage): Metadata {
  const url = `/${page.slug}`;

  return {
    title: page.seo.title,
    description: page.seo.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${page.seo.title} — ${site.name}`,
      description: page.seo.description,
      url,
    },
  };
}
