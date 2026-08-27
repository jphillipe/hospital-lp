"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Faq } from "@/types/content";

/**
 * The only Client leaf in the FAQ — `FaqSection` stays Server and passes
 * `faqs` down as a serializable prop (PLAN.md §3).
 *
 * `type="single" collapsible` rather than `multiple`: eleven answers open at
 * once is a wall of text, and one-at-a-time is what a reader scanning for
 * their own question expects.
 *
 * The item value is the FAQ slug, not an index, so `#faq-<slug>` in the
 * `FAQPage` structured data addresses the same node the accordion opens — a
 * deep link and a citation anchor stay the same string.
 */
export function FaqAccordion({ faqs }: { readonly faqs: readonly Faq[] }) {
  return (
    <Accordion type="single" collapsible className="gap-0">
      {faqs.map((faq) => (
        <AccordionItem
          key={faq.slug}
          value={faq.slug}
          id={`faq-${faq.slug}`}
          className="border-b border-border"
        >
          <AccordionTrigger className="gap-5 py-5 text-base font-semibold text-foreground">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="pb-5 text-sm text-body-foreground">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
