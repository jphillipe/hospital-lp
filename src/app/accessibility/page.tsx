import type { Metadata } from "next";

import { InfoPageDetail } from "@/components/sections/info-page-detail";
import { accessibilityPage } from "@/content/info-pages";
import { getFaqs } from "@/content/queries";
import { site } from "@/content/site";
import { buildInfoPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildInfoPageMetadata(accessibilityPage);

export default async function AccessibilityPage() {
  const faqs = await getFaqs();

  return (
    <InfoPageDetail
      page={accessibilityPage}
      faqs={faqs}
      phone={site.phones.main}
    />
  );
}
