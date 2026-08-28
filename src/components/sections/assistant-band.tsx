import { SparklesIcon } from "lucide-react";

import { AssistantExperience } from "@/components/chat/assistant-experience";
import { Container } from "@/components/shared/container";
import type { AssistantContent } from "@/types/content";

/**
 * Lifts into the hero by `--spacing-overlap`. Violet is the assistant's colour
 * and only the assistant's — the brand green never appears here, so nothing
 * the model says can be mistaken for the practice speaking.
 *
 * The band stays a Server Component: `AssistantExperience` is the client
 * boundary, and `specialtyNames` is passed down rather than looked up, because
 * a section that reads the content layer is a section fetching its own data.
 */
export function AssistantBand({
  content,
  specialtyNames,
}: {
  readonly content: AssistantContent;
  readonly specialtyNames: Readonly<Record<string, string>>;
}) {
  return (
    /* The card floats: `shadow-float` needs room to fall before the next band. */
    <div className="relative z-10 -mt-overlap mb-8x">
      <Container>
        <section
          aria-labelledby="assistant-heading"
          className="rounded-card border border-border bg-card p-5 shadow-float sm:p-6x"
        >
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <h2
                id="assistant-heading"
                className="flex items-center gap-3 text-xl"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ai-soft text-ai">
                  <SparklesIcon aria-hidden className="size-4" />
                </span>
                {content.heading}
              </h2>
              <p className="text-sm text-muted-foreground">{content.intro}</p>
            </div>

            <AssistantExperience
              content={content}
              specialtyNames={specialtyNames}
            />

            <p className="text-xs text-muted-foreground">
              {content.disclaimer}
            </p>
          </div>
        </section>
      </Container>
    </div>
  );
}
