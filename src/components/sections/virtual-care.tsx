import { InfoIcon, VideoIcon } from "lucide-react";

import { Container } from "@/components/shared/container";
import { PhoneLink } from "@/components/shared/phone-link";
import { SectionHeading } from "@/components/shared/section-heading";
import type { VirtualCareContent } from "@/types/content";

interface VirtualCareProps {
  readonly content: VirtualCareContent;
  /** E.164 — the appointment line, which is the whole "meanwhile". */
  readonly phone: string;
}

/**
 * Server, zero JS.
 *
 * The section exists because "Virtual Care" is one of the three actions the
 * client asked to keep permanently visible, and a permanently visible action
 * needs somewhere to land. **The service does not exist yet**, so the status
 * chip and `pendingNotice` are not decoration — they are the reason this
 * section is allowed to ship. There is deliberately no sign-up, no waitlist
 * and no date.
 */
export function VirtualCare({ content, phone }: VirtualCareProps) {
  return (
    <section
      id="virtual-care"
      aria-labelledby="virtual-care-heading"
      className="py-8x lg:py-9x"
    >
      <Container className="flex flex-col gap-6x">
        <div className="flex flex-col gap-4">
          <p className="flex flex-wrap items-center gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <VideoIcon aria-hidden className="size-4" />
            </span>
            <span className="text-eyebrow font-semibold tracking-eyebrow text-primary uppercase">
              {content.eyebrow}
            </span>
            <span className="rounded-full border border-input px-3 py-1 text-xs font-semibold text-body-foreground">
              {content.statusLabel}
            </span>
          </p>

          <SectionHeading
            id="virtual-care-heading"
            title={content.heading}
            lead={content.lead}
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <p className="rounded-card border border-border bg-card p-6x text-base text-body-foreground">
            {content.body}
          </p>

          <div className="flex flex-col gap-3 rounded-card border border-border bg-card p-6x">
            <h3 className="text-lg">{content.meanwhileLabel}</h3>
            <p className="text-base text-body-foreground">
              {content.meanwhileBody}
            </p>
            <p className="mt-auto flex flex-col gap-1 pt-2 text-sm">
              <span className="text-muted-foreground">
                {content.phoneLabel}
              </span>
              <PhoneLink
                phone={phone}
                className="text-lg font-semibold text-primary underline underline-offset-4"
              />
            </p>
          </div>
        </div>

        <p className="flex items-start gap-2 border-t border-border pt-5 text-sm text-body-foreground">
          <InfoIcon aria-hidden className="mt-1 size-4 shrink-0" />
          {content.pendingNotice}
        </p>
      </Container>
    </section>
  );
}
