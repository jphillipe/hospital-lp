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
 * The client's brief is the running order, and the first four sections are it
 * almost verbatim: the hero asks "how can we help you?", the specialties grid
 * answers it, the caregiver band catches the adult child who has just read
 * "Geriatric Care", and the finder catches everyone who still does not know
 * which of the four they need.
 *
 * **The emergency block sits after that trio, not before it.** It used to be
 * the second thing on the page, which pushed the specialties to 3.6 screens of
 * scroll on a phone. It is not hard to find where it is now — `EmergencyBar`
 * carries 911 at the very top of every page, above the header, always.
 *
 * `AssistantBand` moved down beside the FAQ, which is the other place on the
 * page for a question. It stays in v1 at the owner's request while the backend
 * is built; until then it is a text field that does nothing, and that is not
 * something to put between a visitor and the four services.
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

      <EmergencyBlock content={emergencyBlock} />
      <QuickAccess content={quickAccess} />
      <VirtualCare content={virtualCare} phone={site.phones.appointments} />
      <DoctorsSection
        content={doctorsSection}
        featured={featuredDoctors}
        additional={additionalDoctors}
        specialtyNames={specialtyNames}
      />
      <LocationsSection content={locationsSection} locations={allLocations} />

      <AssistantBand content={assistant} />
      <FaqSection
        content={faqSection}
        faqs={allFaqs}
        phone={site.phones.main}
      />
      <CtaBand content={ctaBand} phone={site.phones.appointments} />
    </>
  );
}
