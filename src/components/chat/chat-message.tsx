"use client";

import Link from "next/link";

import type { TranscriptMessage } from "@/components/chat/use-assistant-chat";
import { parseAnswer } from "@/lib/assistant/citations";
import { cn } from "@/lib/utils";

/**
 * One turn. The user's own words are printed as written; an answer goes
 * through `parseAnswer` first, which lifts the service markers out of the
 * prose so the chips below can be built from our content rather than the
 * model's.
 */
export function ChatMessage({
  message,
  specialtyNames,
  relatedLabel,
}: {
  readonly message: TranscriptMessage;
  readonly specialtyNames: Readonly<Record<string, string>>;
  readonly relatedLabel: string;
}) {
  const isUser = message.role === "user";
  const { text, slugs } = isUser
    ? { text: message.content, slugs: [] as readonly string[] }
    : parseAnswer(message.content, specialtyNames);

  return (
    <div className={cn("flex flex-col gap-2", isUser && "items-end")}>
      <p
        className={cn(
          "max-w-[85%] rounded-card px-4 py-3 text-sm whitespace-pre-wrap",
          /*
           * The user's bubble needs the border. In dark mode `--muted` and
           * `--popover` are a hair apart (#101614 against #131a18), so fill
           * alone leaves the question floating with no edge.
           */
          isUser
            ? "border border-border bg-muted text-foreground"
            : "bg-ai-soft text-body-foreground",
        )}
      >
        {text}
      </p>

      {slugs.length > 0 && (
        <div className="flex max-w-[85%] flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">{relatedLabel}</span>
          {slugs.map((slug) => (
            <Link
              key={slug}
              href={`/specialties/${slug}`}
              className="rounded-full border border-input px-3 py-1 text-xs text-ai transition-colors hover:border-ai hover:bg-ai-soft"
            >
              {specialtyNames[slug]}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
