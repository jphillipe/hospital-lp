import { AssistantBand } from "@/components/sections/assistant-band";
import { CaregiverBand } from "@/components/sections/caregiver-band";
import { CareFinderSection } from "@/components/sections/care-finder-section";
import { CtaBand } from "@/components/sections/cta-band";
import { DoctorsSection } from "@/components/sections/doctors-section";
import { EmergencyBlock } from "@/components/sections/emergency-block";
import { FaqSection } from "@/components/sections/faq-section";
import { Hero } from "@/components/sections/hero";
import { LocationsSection } from "@/components/sections/locations-section";
import { QuickAccess } from "@/components/sections/quick-access";
import { SpecialtiesSection } from "@/components/sections/specialties-section";
import { VirtualCare } from "@/components/sections/virtual-care";
import { JsonLd } from "@/components/shared/json-ld";
import { assistant } from "@/content/assistant";
import { careFinder } from "@/content/care-finder";
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
import { quickAccess } from "@/content/quick-access";
import { specialtiesSection } from "@/content/specialties";
import { virtualCare } from "@/content/virtual-care";
import { env } from "@/lib/env";
import { buildFaqPageSchema, buildHospitalSchema } from "@/lib/schema-org";

/**
 * The single place that reads the content modules and calls `queries.ts`.
 * Sections stay presentational and receive typed props.
 *
 * The `Hospital` node is built here rather than inside `LocationsSection`
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
 * `AssistantBand` submits to nothing in v1 (see `AssistantPrompt`), so at this
 * height it is a promise the site cannot keep until `/api/chat` lands.
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
          data={buildHospitalSchema({
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
      <AssistantBand content={assistant} />
      <EmergencyBlock content={emergencyBlock} />

      <SpecialtiesSection
        content={specialtiesSection}
        featured={featuredSpecialties}
        additional={additionalSpecialties}
      />
      <CaregiverBand content={caregiverBand} phone={site.phones.appointments} />
      <CareFinderSection
        content={careFinder}
        specialtyNames={specialtyNames}
        phone={site.phones.appointments}
      />

      <QuickAccess content={quickAccess} />
      <VirtualCare content={virtualCare} phone={site.phones.appointments} />
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
