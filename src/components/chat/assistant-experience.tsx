"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";

import { useAssistantChat } from "@/components/chat/use-assistant-chat";
import { AssistantPrompt } from "@/components/sections/assistant-prompt";
import type { AssistantContent } from "@/types/content";

/**
 * The client boundary for the assistant: the band above it stays a Server
 * Component and this owns the two things that have to be shared — whether the
 * panel is open, and the transcript inside it.
 *
 * The transcript lives here rather than in `ChatPanel` so that closing the
 * panel does not throw the conversation away.
 *
 * PLAN.md §3: the panel is `next/dynamic` with `ssr: false`. It is only ever
 * reached by an interaction, so none of it belongs in the first load of a page
 * most visitors will read without asking anything.
 */
const ChatPanel = dynamic(
  () =>
    import("@/components/chat/chat-panel").then((module) => module.ChatPanel),
  { ssr: false },
);

export function AssistantExperience({
  content,
  specialtyNames,
}: {
  readonly content: AssistantContent;
  readonly specialtyNames: Readonly<Record<string, string>>;
}) {
  const [open, setOpen] = useState(false);
  const { messages, isStreaming, ask } = useAssistantChat(content.panel);

  /*
   * Radix returns focus to the `SheetTrigger` on close, and there is no
   * trigger here — the panel opens because a question was asked, from either
   * the input or a shortcut. Without this, closing drops focus onto `<body>`
   * and a keyboard user restarts from the top of the document.
   */
  const opener = useRef<HTMLElement | null>(null);

  const handleAsk = (question: string) => {
    if (question.trim() === "") return;

    if (document.activeElement instanceof HTMLElement) {
      opener.current = document.activeElement;
    }

    setOpen(true);
    void ask(question);
  };

  const restoreFocus = () => {
    opener.current?.focus();
  };

  return (
    <>
      <AssistantPrompt content={content} onAsk={handleAsk} />

      {/* Never mounted until something has been asked. */}
      {(open || messages.length > 0) && (
        <ChatPanel
          content={content.panel}
          disclaimer={content.disclaimer}
          specialtyNames={specialtyNames}
          messages={messages}
          isStreaming={isStreaming}
          open={open}
          onOpenChange={setOpen}
          onAsk={handleAsk}
          onRestoreFocus={restoreFocus}
        />
      )}
    </>
  );
}
