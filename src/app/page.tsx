import { AssistantBand } from "@/components/sections/assistant-band";
import { EmergencyBlock } from "@/components/sections/emergency-block";
import { Hero } from "@/components/sections/hero";
import { assistant } from "@/content/assistant";
import { emergencyBlock } from "@/content/emergency";
import { hero } from "@/content/hero";

/**
 * The single place that reads the content modules and passes typed props down.
 * Sections stay presentational.
 */
export default function HomePage() {
  return (
    <>
      <Hero content={hero} />
      <AssistantBand content={assistant} />
      <EmergencyBlock content={emergencyBlock} />
    </>
  );
}
