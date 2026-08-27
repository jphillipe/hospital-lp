import { AssistantBand } from "@/components/sections/assistant-band";
import { DoctorsSection } from "@/components/sections/doctors-section";
import { EmergencyBlock } from "@/components/sections/emergency-block";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { InsuranceSection } from "@/components/sections/insurance-section";
import { QuickAccess } from "@/components/sections/quick-access";
import { SpecialtiesSection } from "@/components/sections/specialties-section";
import { StatsSection } from "@/components/sections/stats-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { assistant } from "@/content/assistant";
import { doctorsSection } from "@/content/doctors";
import { emergencyBlock } from "@/content/emergency";
import { hero } from "@/content/hero";
import { howItWorks } from "@/content/how-it-works";
import { insuranceSection } from "@/content/insurance";
import {
  getAdditionalDoctors,
  getAdditionalSpecialties,
  getFeaturedDoctors,
  getFeaturedSpecialties,
  getSpecialtyNames,
} from "@/content/queries";
import { quickAccess } from "@/content/quick-access";
import { specialtiesSection } from "@/content/specialties";
import { statsSection } from "@/content/stats";
import { testimonialsSection } from "@/content/testimonials";

/**
 * The single place that reads the content modules and calls `queries.ts`.
 * Sections stay presentational and receive typed props.
 */
export default async function HomePage() {
  const [
    featuredSpecialties,
    additionalSpecialties,
    featuredDoctors,
    additionalDoctors,
    specialtyNames,
  ] = await Promise.all([
    getFeaturedSpecialties(),
    getAdditionalSpecialties(),
    getFeaturedDoctors(),
    getAdditionalDoctors(),
    getSpecialtyNames(),
  ]);

  return (
    <>
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
    </>
  );
}
