import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SpecialtyDetail } from "@/components/sections/specialty-detail";
import { doctorsSection } from "@/content/doctors";
import {
  getDoctorsBySpecialty,
  getOtherSpecialties,
  getSpecialties,
  getSpecialtyBySlug,
  getSpecialtyNames,
} from "@/content/queries";
import { site } from "@/content/site";
import { specialtyPage } from "@/content/specialty-page";

/**
 * The detail page PLAN.md §1 reserved for v2, brought forward because the
 * caregiver band's "Learn about Geriatric Care" had nowhere to go: it pointed
 * at `/#specialties`, which scrolled a reader *back up* to the one-line card
 * they had just left.
 *
 * All four services get the page, not just geriatrics. Every specialty-specific
 * word is read off the `Specialty` record — including `seo`, which has been
 * sitting unused in the type since it was written — so a fifth service needs no
 * edit here.
 *
 * Static at build time via `generateStaticParams`, and `dynamicParams = false`
 * so an unknown slug is a 404 rather than an on-demand render of nothing.
 */
export const dynamicParams = false;

export async function generateStaticParams() {
  const specialties = await getSpecialties();

  return specialties.map((specialty) => ({ slug: specialty.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/specialties/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const specialty = await getSpecialtyBySlug(slug);

  if (specialty === undefined) return {};

  return {
    // The root layout's template appends " — Dighton Medical Center".
    title: specialty.seo.title,
    description: specialty.seo.description,
    alternates: { canonical: `/specialties/${specialty.slug}` },
    openGraph: {
      type: "article",
      title: `${specialty.seo.title} — ${site.name}`,
      description: specialty.seo.description,
      url: `/specialties/${specialty.slug}`,
    },
  };
}

export default async function SpecialtyPage({
  params,
}: PageProps<"/specialties/[slug]">) {
  const { slug } = await params;
  const specialty = await getSpecialtyBySlug(slug);

  if (specialty === undefined) notFound();

  const [clinicians, others, specialtyNames] = await Promise.all([
    getDoctorsBySpecialty(specialty.slug),
    getOtherSpecialties(specialty.slug),
    getSpecialtyNames(),
  ]);

  return (
    <SpecialtyDetail
      content={specialtyPage}
      specialty={specialty}
      clinicians={clinicians}
      doctorsContent={doctorsSection}
      specialtyNames={specialtyNames}
      others={others}
      emergencyNote={site.emergencyNotice}
    />
  );
}
