import type { Metadata } from "next";

import { InfoPageDetail } from "@/components/sections/info-page-detail";
import { newPatientsPage } from "@/content/info-pages";
import { getFaqs } from "@/content/queries";
import { site } from "@/content/site";
import { buildInfoPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildInfoPageMetadata(newPatientsPage);

export default async function NewPatientsPage() {
  const faqs = await getFaqs();

  return (
    <InfoPageDetail
      page={newPatientsPage}
      faqs={faqs}
      phone={site.phones.appointments}
    />
  );
}
