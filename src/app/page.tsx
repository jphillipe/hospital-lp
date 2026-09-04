import { AssistantBand } from "@/components/sections/assistant-band";
import { CaregiverBand } from "@/components/sections/caregiver-band";
import { CareFinderSection } from "@/components/sections/care-finder-section";
import { CareModelSection } from "@/components/sections/care-model";
import { CtaBand } from "@/components/sections/cta-band";
import { DoctorsSection } from "@/components/sections/doctors-section";
import { EmergencyBlock } from "@/components/sections/emergency-block";
import { FaqSection } from "@/components/sections/faq-section";
import { Hero } from "@/components/sections/hero";
import { LocationsSection } from "@/components/sections/locations-section";
import { SpecialtiesSection } from "@/components/sections/specialties-section";
import { JsonLd } from "@/components/shared/json-ld";
import { assistant } from "@/content/assistant";
import { careFinder } from "@/content/care-finder";
import { careModel } from "@/content/care-model";
import { caregiverBand } from "@/content/caregiver";
import { ctaBand } from "@/content/cta";
import { doctorsSection } from "@/content/doctors";
import { emergencyBlock } from "@/content/emergency";
import { faqSection } from "@/content/faqs";
import { hero } from "@/content/hero";
import { locationsSection } from "@/content/locations";
import { site } from "@/content/site";
import {
  getAdditionalDoctors,
  getAdditionalSpecialties,
  getFaqs,
  getFeaturedDoctors,
  getFeaturedSpecialties,
  getLocations,
  getSpecialtyNames,
} from "@/content/queries";
import { specialtiesSection } from "@/content/specialties";
import { env } from "@/lib/env";
import { buildFaqPageSchema, buildMedicalClinicSchema } from "@/lib/schema-org";
import type { Metadata } from "next";

/**
 * The home page was the only route without a canonical. Every other page has
 * carried one since it was written; this closes the gap so `/?utm_source=…` and
 * the bare origin cannot both be indexed.
 */
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * The single place that reads the content modules and calls `queries.ts`.
 * Sections stay presentational and receive typed props.
 *
 * The `MedicalClinic` node is built here rather than inside `LocationsSection`
 * because it needs the canonical origin, and a section that reads `env` is a
 * section fetching its own data.
 *
 * ## Order
 *
 * The top of the page is the owner's call: hero, assistant band lifted into
 * it, then emergency. The assistant is the first thing offered after the hero
 * asks "how can we help you?", and the emergency block answers the one case
 * where nothing else on the page matters.
 *
 * That puts three bands ahead of the specialties grid, so the four services
 * land roughly two screens down on a 375px phone rather than just under the
 * fold. The caregiver band and the finder still follow the grid: the first
 * catches the adult child who has just read "Geriatric Care", the second
 * catches everyone who still does not know which of the four they need.
 *
 * `CareModelSection` sits directly under the grid because that is where the
 * four cards have just been read as four separate practices. It took the slot
 * `QuickAccess` held — Call and Book are pinned to every screen by
 * `MobileActionBar` and repeated in the header, so the strip was largely saying
 * them a third time, and PLAN.md's second pass had already named it as the next
 * cut. Patient Portal, the one door it carried that nothing else did, is still
 * in the emergency bar and the footer.
 *
 * `VirtualCare` was removed on the owner's instruction. It described a service
 * the practice has not set up, and it existed largely to give the third
 * persistent action a destination; that action is gone with it. The FAQ still
 * answers "do you offer video visits?" with "not yet", which is where a
 * question about a service we do not have belongs.
 *
 * `AssistantBand` posts to `/api/chat`, and takes `specialtyNames` so the
 * panel can turn a service the model points at into a real link.
 */
export default async function HomePage() {
  const [
    featuredSpecialties,
    additionalSpecialties,
    featuredDoctors,
    additionalDoctors,
    specialtyNames,
    allLocations,
    allFaqs,
  ] = await Promise.all([
    getFeaturedSpecialties(),
    getAdditionalSpecialties(),
    getFeaturedDoctors(),
    getAdditionalDoctors(),
    getSpecialtyNames(),
    getLocations(),
    getFaqs(),
  ]);

  const [mainCampus] = allLocations;

  return (
    <>
      {mainCampus === undefined ? null : (
        <JsonLd
          data={buildMedicalClinicSchema({
            location: mainCampus,
            origin: env.NEXT_PUBLIC_SITE_URL,
            specialties: Object.values(specialtyNames),
          })}
        />
      )}
      <JsonLd
        data={buildFaqPageSchema({
          faqs: allFaqs,
          origin: env.NEXT_PUBLIC_SITE_URL,
        })}
      />

      <Hero content={hero} />
      <AssistantBand content={assistant} specialtyNames={specialtyNames} />
      <EmergencyBlock content={emergencyBlock} />

      <SpecialtiesSection
        content={specialtiesSection}
        featured={featuredSpecialties}
        additional={additionalSpecialties}
      />
      <CareModelSection content={careModel} specialtyNames={specialtyNames} />
      <CaregiverBand content={caregiverBand} phone={site.phones.appointments} />
      <CareFinderSection
        content={careFinder}
        specialtyNames={specialtyNames}
        phone={site.phones.appointments}
      />

      <DoctorsSection
        content={doctorsSection}
        featured={featuredDoctors}
        additional={additionalDoctors}
        specialtyNames={specialtyNames}
      />
      <LocationsSection content={locationsSection} locations={allLocations} />

      <FaqSection
        content={faqSection}
        faqs={allFaqs}
        phone={site.phones.main}
      />
      <CtaBand content={ctaBand} phone={site.phones.appointments} />
    </>
  );
}
