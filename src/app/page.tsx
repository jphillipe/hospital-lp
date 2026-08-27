import { AssistantBand } from "@/components/sections/assistant-band";
import { DoctorsSection } from "@/components/sections/doctors-section";
import { EmergencyBlock } from "@/components/sections/emergency-block";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { InsuranceSection } from "@/components/sections/insurance-section";
import { LocationsSection } from "@/components/sections/locations-section";
import { QuickAccess } from "@/components/sections/quick-access";
import { SpecialtiesSection } from "@/components/sections/specialties-section";
import { StatsSection } from "@/components/sections/stats-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { JsonLd } from "@/components/shared/json-ld";
import { assistant } from "@/content/assistant";
import { doctorsSection } from "@/content/doctors";
import { emergencyBlock } from "@/content/emergency";
import { hero } from "@/content/hero";
import { howItWorks } from "@/content/how-it-works";
import { insuranceSection } from "@/content/insurance";
import { locationsSection } from "@/content/locations";
import {
  getAdditionalDoctors,
  getAdditionalSpecialties,
  getFeaturedDoctors,
  getFeaturedSpecialties,
  getLocations,
  getSpecialtyNames,
} from "@/content/queries";
import { quickAccess } from "@/content/quick-access";
import { specialtiesSection } from "@/content/specialties";
import { statsSection } from "@/content/stats";
import { testimonialsSection } from "@/content/testimonials";
import { env } from "@/lib/env";
import { buildHospitalSchema } from "@/lib/schema-org";

/**
 * The single place that reads the content modules and calls `queries.ts`.
 * Sections stay presentational and receive typed props.
 *
 * The `Hospital` node is built here rather than inside `LocationsSection`
 * because it needs the canonical origin, and a section that reads `env` is a
 * section fetching its own data.
 */
export default async function HomePage() {
  const [
    featuredSpecialties,
    additionalSpecialties,
    featuredDoctors,
    additionalDoctors,
    specialtyNames,
    allLocations,
  ] = await Promise.all([
    getFeaturedSpecialties(),
    getAdditionalSpecialties(),
    getFeaturedDoctors(),
    getAdditionalDoctors(),
    getSpecialtyNames(),
    getLocations(),
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
      <Hero content={hero} />
      <AssistantBand content={assistant} />
      <EmergencyBlock content={emergencyBlock} />
      <QuickAccess content={quickAccess} />
      <SpecialtiesSection
        content={specialtiesSection}
        featured={featuredSpecialties}
        additional={additionalSpecialties}
      />
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
    </>
  );
}
