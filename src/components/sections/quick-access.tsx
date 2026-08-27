import { cva } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";
import {
  AmbulanceIcon,
  ArrowRightIcon,
  BriefcaseMedicalIcon,
  LockKeyholeIcon,
  SquareArrowOutUpRightIcon,
  UserSearchIcon,
} from "lucide-react";

import { Container } from "@/components/shared/container";
import type { QuickAccessContent, QuickAccessIcon } from "@/types/content";

const itemIcons: Record<QuickAccessIcon, LucideIcon> = {
  emergency: AmbulanceIcon,
  "urgent-care": BriefcaseMedicalIcon,
  "find-a-doctor": UserSearchIcon,
  "patient-portal": LockKeyholeIcon,
};

const card = cva(
  "group flex h-full flex-col gap-3 rounded-card border bg-card p-5 transition-colors",
  {
    variants: {
      tone: {
        default: "border-border hover:border-primary",
        alert: "border-alert/35 hover:border-alert",
      },
    },
    defaultVariants: { tone: "default" },
  },
);

const cardIcon = cva(
  "flex size-10 shrink-0 items-center justify-center rounded-full",
  {
    variants: {
      tone: {
        default: "bg-primary/10 text-primary",
        alert: "bg-alert/10 text-alert",
      },
    },
    defaultVariants: { tone: "default" },
  },
);

const cardAction = cva(
  "mt-auto flex items-center gap-2 pt-1 text-button font-semibold",
  {
    variants: {
      tone: { default: "text-primary", alert: "text-alert" },
    },
    defaultVariants: { tone: "default" },
  },
);

/**
 * Intent triage. People reach a hospital site in very different states of
 * urgency, so the four routes split before the first marketing scroll.
 *
 * The whole card is the target — 44px is the floor, not the ceiling — and the
 * link is named by its title alone, so tabbing through announces four short
 * destinations instead of four paragraphs.
 */
export function QuickAccess({
  content,
}: {
  readonly content: QuickAccessContent;
}) {
  return (
    <section
      id="quick-access"
      aria-labelledby="quick-access-heading"
      className="py-8x lg:py-9x"
    >
      <Container className="flex flex-col gap-6x">
        <h2 id="quick-access-heading" className="text-xl">
          {content.heading}
        </h2>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.items.map((item) => {
            const Icon = itemIcons[item.icon];
            const ActionIcon = item.external
              ? SquareArrowOutUpRightIcon
              : ArrowRightIcon;
            const titleId = `quick-access-${item.id}`;

            return (
              <li key={item.id}>
                <a
                  href={item.href}
                  aria-labelledby={titleId}
                  className={card({ tone: item.tone })}
                >
                  <span className={cardIcon({ tone: item.tone })}>
                    <Icon aria-hidden className="size-5" />
                  </span>

                  <div className="flex flex-col gap-1">
                    <h3 id={titleId} className="text-lg">
                      {item.title}
                    </h3>
                    <span className="text-xs font-semibold text-muted-foreground">
                      {item.meta}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>

                  <span className={cardAction({ tone: item.tone })}>
                    {item.actionLabel}
                    <ActionIcon
                      aria-hidden
                      className="size-4 shrink-0 transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
