import type { MetadataRoute } from "next";

import { env } from "@/lib/env";

/**
 * PLAN.md §2 listed this file and it was never written, so the site served no
 * `/robots.txt` and pointed at no sitemap.
 *
 * `/api/` is disallowed because the chat endpoint is POST-only and has nothing
 * a crawler can read; `/legal/` because those three pages are placeholders and
 * must not be indexed ahead of the real documents — their own `robots` metadata
 * says the same thing, and saying it twice costs nothing.
 */
export default function robots(): MetadataRoute.Robots {
  const base = env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/legal/"],
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
