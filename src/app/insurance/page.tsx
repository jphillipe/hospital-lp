import type { Metadata } from "next";

import { InfoPageDetail } from "@/components/sections/info-page-detail";
import { insurancePage } from "@/content/info-pages";
import { getFaqs } from "@/content/queries";
import { site } from "@/content/site";
import { buildInfoPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildInfoPageMetadata(insurancePage);

export default async function InsurancePage() {
  const faqs = await getFaqs();

  return (
    <InfoPageDetail
      page={insurancePage}
      faqs={faqs}
      phone={site.phones.appointments}
    />
  );
}
