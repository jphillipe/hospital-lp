import { AssistantBand } from "@/components/sections/assistant-band";
import { EmergencyBlock } from "@/components/sections/emergency-block";
import { Hero } from "@/components/sections/hero";
import { QuickAccess } from "@/components/sections/quick-access";
import { SpecialtiesSection } from "@/components/sections/specialties-section";
import { assistant } from "@/content/assistant";
import { emergencyBlock } from "@/content/emergency";
import { hero } from "@/content/hero";
import {
  getAdditionalSpecialties,
  getFeaturedSpecialties,
} from "@/content/queries";
import { quickAccess } from "@/content/quick-access";
import { specialtiesSection } from "@/content/specialties";

/**
 * The single place that reads the content modules and calls `queries.ts`.
 * Sections stay presentational and receive typed props.
 */
export default async function HomePage() {
  const [featuredSpecialties, additionalSpecialties] = await Promise.all([
    getFeaturedSpecialties(),
    getAdditionalSpecialties(),
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
    </>
  );
}
