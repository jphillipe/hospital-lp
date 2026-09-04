import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DoctorDetail } from "@/components/sections/doctor-detail";
import { JsonLd } from "@/components/shared/json-ld";
import { doctorPage } from "@/content/doctor-page";
import { doctorsSection } from "@/content/doctors";
import {
  getDoctorBySlug,
  getDoctors,
  getLocations,
  getOtherDoctors,
  getSpecialtyNames,
} from "@/content/queries";
import { site } from "@/content/site";
import { env } from "@/lib/env";
import { formatDoctorName } from "@/lib/format";
import {
  buildBreadcrumbSchema,
  buildPhysicianSchema,
} from "@/lib/schema-org";

/**
 * The profile page PLAN.md §2 reserved and nothing was ever built against.
 * `getDoctorBySlug` has existed in the query seam since the first commit with
 * no caller; this is the caller.
 *
 * Same contract as `/specialties/[slug]`: static at build time,
 * `dynamicParams = false` so an unknown slug is a 404 rather than an on-demand
 * render of nothing, and every word specific to a clinician read off the record.
 *
 * There is no `seo` field on `Doctor` the way there is on `Specialty`, so the
 * metadata is composed from the name, the title and one shared suffix rather
 * than written per clinician — a roster is added to far more often than four
 * services are, and a description nobody has to write is a description that
 * cannot be forgotten.
 */
export const dynamicParams = false;

export async function generateStaticParams() {
  const doctors = await getDoctors();

  return doctors.map((doctor) => ({ slug: doctor.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/doctors/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const doctor = await getDoctorBySlug(slug);

  if (doctor === undefined) return {};

  const name = formatDoctorName(doctor);
  const description = `${name} is a ${doctor.title.toLowerCase()} ${doctorPage.seoDescriptionSuffix}`;

  return {
    title: name,
    description,
    alternates: { canonical: `/doctors/${doctor.slug}` },
    openGraph: {
      type: "profile",
      title: `${name} — ${site.name}`,
      description,
      url: `/doctors/${doctor.slug}`,
    },
  };
}

export default async function DoctorProfilePage({
  params,
}: PageProps<"/doctors/[slug]">) {
  const { slug } = await params;
  const doctor = await getDoctorBySlug(slug);

  if (doctor === undefined) notFound();

  const [others, specialtyNames, locations] = await Promise.all([
    getOtherDoctors(doctor.slug),
    getSpecialtyNames(),
    getLocations(),
  ]);

  const [mainCampus] = locations;
  const fullName = formatDoctorName(doctor);

  return (
    <>
      {/*
        `Physician` finally expresses the education, certifications and
        languages the record has carried since it was written. `worksFor` points
        at the `MedicalClinic` id the home page emits, so the two nodes are one
        graph rather than two unrelated blobs.
      */}
      {mainCampus === undefined ? null : (
        <JsonLd
          data={buildPhysicianSchema({
            doctor,
            origin: env.NEXT_PUBLIC_SITE_URL,
            location: mainCampus,
            specialtyNames,
            languageNames: doctorsSection.languageNames,
          })}
        />
      )}
      <JsonLd
        data={buildBreadcrumbSchema({
          origin: env.NEXT_PUBLIC_SITE_URL,
          trail: [
            { name: doctorPage.homeLabel, path: "/" },
            { name: doctorPage.eyebrow, path: "/doctors" },
            { name: fullName, path: `/doctors/${doctor.slug}` },
          ],
        })}
      />

      <DoctorDetail
        content={doctorPage}
        doctorsContent={doctorsSection}
        doctor={doctor}
        specialtyNames={specialtyNames}
        others={others}
        phone={site.phones.appointments}
        emergencyNote={site.emergencyNotice}
      />
    </>
  );
}
