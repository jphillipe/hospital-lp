import { Container } from "@/components/shared/container";
import { site } from "@/content/site";

/**
 * Skeleton only — no sections yet. This will be the single place that `await`s
 * the accessors in `content/queries.ts` and passes typed props to the sections.
 */
export default function HomePage() {
  return (
    <Container className="py-24">
      <h1 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {site.name}
      </h1>
      <p className="mt-4 max-w-prose text-muted-foreground">{site.tagline}</p>
    </Container>
  );
}
