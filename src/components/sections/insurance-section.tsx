import type { LucideIcon } from "lucide-react";
import {
  CheckIcon,
  ClipboardListIcon,
  HeartHandshakeIcon,
  ReceiptTextIcon,
} from "lucide-react";

import { Container } from "@/components/shared/container";
import { PhoneLink } from "@/components/shared/phone-link";
import { SectionHeading } from "@/components/shared/section-heading";
import type {
  InsuranceNoteIcon,
  InsuranceSectionContent,
} from "@/types/content";

const noteIcons: Record<InsuranceNoteIcon, LucideIcon> = {
  "before-visit": ClipboardListIcon,
  assistance: HeartHandshakeIcon,
  billing: ReceiptTextIcon,
};

/**
 * Two anchors land here. `#patient-info` is the primary nav item and takes the
 * section, so it lands on the heading; `#insurance` is the footer's link and
 * takes the coverage panel, which is what that link is actually about.
 *
 * `verifyNotice` sits inside the panel, under the same rule as the list it
 * qualifies — a caveat placed after the next heading is a caveat nobody reads.
 */
export function InsuranceSection({
  content,
}: {
  readonly content: InsuranceSectionContent;
}) {
  return (
    <section
      id="patient-info"
      aria-labelledby="insurance-heading"
      className="py-8x lg:py-9x"
    >
      <Container className="flex flex-col gap-7x">
        <SectionHeading
          id="insurance-heading"
          eyebrow={content.eyebrow}
          title={content.heading}
          lead={content.lead}
        />

        <div
          id="insurance"
          className="flex flex-col gap-6x rounded-card border border-border bg-card p-6x"
        >
          <h3 className="font-sans text-eyebrow font-semibold tracking-eyebrow text-muted-foreground uppercase">
            {content.coverageLabel}
          </h3>

          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {content.coverage.map((item) => (
              <li key={item.id} className="flex gap-3">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CheckIcon aria-hidden className="size-3" />
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-button font-semibold text-foreground">
                    {item.label}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {item.detail}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <p className="border-t border-border pt-4 text-sm text-body-foreground">
            {content.verifyNotice}
          </p>
        </div>

        <ul className="grid gap-6x md:grid-cols-3">
          {content.notes.map((note) => {
            const Glyph = noteIcons[note.icon];

            return (
              <li
                key={note.id}
                className="row-span-3 grid grid-rows-subgrid gap-y-3"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Glyph aria-hidden className="size-5" />
                </span>
                <h3 className="text-lg">{note.title}</h3>
                <p className="text-sm text-body-foreground">
                  {note.body}
                  {note.phone === undefined ? null : (
                    <>
                      {" "}
                      <PhoneLink
                        phone={note.phone}
                        className="font-semibold text-primary underline-offset-4"
                      />
                    </>
                  )}
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
