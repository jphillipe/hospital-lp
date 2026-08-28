import { AssistantBand } from "@/components/sections/assistant-band";
import { CaregiverBand } from "@/components/sections/caregiver-band";
import { CareFinderSection } from "@/components/sections/care-finder-section";
import { CtaBand } from "@/components/sections/cta-band";
import { DoctorsSection } from "@/components/sections/doctors-section";
import { EmergencyBlock } from "@/components/sections/emergency-block";
import { FaqSection } from "@/components/sections/faq-section";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { InsuranceSection } from "@/components/sections/insurance-section";
import { LocationsSection } from "@/components/sections/locations-section";
import { QuickAccess } from "@/components/sections/quick-access";
import { SpecialtiesSection } from "@/components/sections/specialties-section";
import { StatsSection } from "@/components/sections/stats-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
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
import { howItWorks } from "@/content/how-it-works";
import { insuranceSection } from "@/content/insurance";
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
import { statsSection } from "@/content/stats";
import { testimonialsSection } from "@/content/testimonials";
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
 * Section order follows the client's brief: the hero asks "how can we help
 * you?", the specialties grid answers it, the caregiver band catches the adult
 * child who has just read "Geriatric Care", and the finder catches everyone
 * who still does not know which of the four they need.
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
      <QuickAccess content={quickAccess} />
      <SpecialtiesSection
        content={specialtiesSection}
        featured={featuredSpecialties}
        additional={additionalSpecialties}
      />
      <CaregiverBand
        content={caregiverBand}
        phone={site.phones.appointments}
      />
      <CareFinderSection
        content={careFinder}
        specialtyNames={specialtyNames}
        phone={site.phones.appointments}
      />
      <VirtualCare content={virtualCare} phone={site.phones.appointments} />
      <StatsSection content={statsSection} />
      <DoctorsSection
        content={doctorsSection}
        featured={featuredDoctors}
        additional={additionalDoctors}
        specialtyNames={specialtyNames}
      />
      <HowItWorks content={howItWorks} />
      <TestimonialsSection content={testimonialsSection} />
      <InsuranceSection content={insuranceSection} />
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
