"use client";

import type { LucideIcon } from "lucide-react";
import {
  ClipboardListIcon,
  ClockIcon,
  ReceiptTextIcon,
  SendHorizontalIcon,
  StethoscopeIcon,
} from "lucide-react";
import { useState } from "react";

import type {
  AssistantContent,
  AssistantShortcutIcon,
} from "@/types/content";

const shortcutIcons: Record<AssistantShortcutIcon, LucideIcon> = {
  specialist: StethoscopeIcon,
  visit: ClipboardListIcon,
  billing: ReceiptTextIcon,
  hours: ClockIcon,
};

/**
 * The doorway into the assistant. It owns the draft question and nothing else:
 * `AssistantExperience` above it owns the panel and the transcript, so a
 * shortcut and a typed question take the same path out of here.
 *
 * A shortcut sends immediately rather than filling the field. Loading a label
 * into an input the user then has to submit is a second step for no gain now
 * that there is somewhere for the question to go.
 */
export function AssistantPrompt({
  content,
  onAsk,
}: {
  readonly content: AssistantContent;
  readonly onAsk: (question: string) => void;
}) {
  const [question, setQuestion] = useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onAsk(question);
        setQuestion("");
      }}
      className="flex flex-col gap-5"
    >
      {/*
        Stacked below `sm`: at 390px the four labels wrap 1 / 1 / 2 and read as
        an accident. Full width they read as what they are — a short list of
        starters — and each one clears the 44px touch target.
      */}
      <ul className="grid gap-2 sm:flex sm:flex-wrap">
        {content.shortcuts.map((shortcut) => {
          const Icon = shortcutIcons[shortcut.icon];

          return (
            <li key={shortcut.label}>
              <button
                type="button"
                onClick={() => onAsk(shortcut.label)}
                className="group flex h-11 w-full cursor-pointer items-center justify-start gap-2 rounded-full border border-input px-4 text-sm text-body-foreground transition-colors hover:border-ai hover:bg-ai-soft hover:text-ai sm:h-auto sm:w-auto sm:py-2"
              >
                <Icon
                  aria-hidden
                  className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-ai"
                />
                {shortcut.label}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="assistant-question" className="sr-only">
          {content.inputLabel}
        </label>
        <input
          id="assistant-question"
          name="question"
          type="text"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder={content.inputPlaceholder}
          autoComplete="off"
          /*
           * `w-full sm:flex-1`, never a bare `flex-1`: in the stacked layout the
           * main axis is vertical, so `flex-basis: 0%` would beat `h-11` and
           * collapse the field.
           */
          className="h-11 w-full rounded-full border border-input bg-muted px-5 text-base text-foreground placeholder:text-muted-foreground sm:flex-1"
        />
        <button
          type="submit"
          className="inline-flex h-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-ai px-5 text-button font-semibold text-card transition-opacity hover:opacity-90"
        >
          {content.submitLabel}
          <SendHorizontalIcon aria-hidden className="size-4" />
        </button>
      </div>
    </form>
  );
}
