"use client";

import { SendHorizontalIcon, XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { ChatMessage } from "@/components/chat/chat-message";
import type { TranscriptMessage } from "@/components/chat/use-assistant-chat";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { AssistantPanelContent } from "@/types/content";

/**
 * The conversation itself. Radix's Dialog under `Sheet` brings the focus trap,
 * `Esc`, the scrim and focus restoration to the band, so what is left to do
 * here is the part it cannot know about:
 *
 * - the transcript is a `role="log"` with `aria-live="polite"`, so a screen
 *   reader hears an answer arrive without losing the user's place;
 * - `aria-busy` marks the region while tokens are still streaming in;
 * - the scroll follows the stream, but only while the reader is already at the
 *   bottom — yanking someone back down mid-paragraph is worse than not
 *   following at all;
 * - the disclaimer and the privacy notice stay pinned in view, not scrolled
 *   away with the first answer (PLAN.md §5 item 11).
 */
export function ChatPanel({
  content,
  disclaimer,
  specialtyNames,
  messages,
  isStreaming,
  open,
  onOpenChange,
  onAsk,
  onRestoreFocus,
}: {
  readonly content: AssistantPanelContent;
  readonly disclaimer: string;
  readonly specialtyNames: Readonly<Record<string, string>>;
  readonly messages: readonly TranscriptMessage[];
  readonly isStreaming: boolean;
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
  readonly onAsk: (question: string) => void;
  /** Puts focus back where the panel was opened from — see `AssistantExperience`. */
  readonly onRestoreFocus: () => void;
}) {
  const [question, setQuestion] = useState("");
  const transcriptRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pinnedToBottom = useRef(true);

  useEffect(() => {
    const transcript = transcriptRef.current;
    if (transcript === null || !pinnedToBottom.current) return;

    transcript.scrollTop = transcript.scrollHeight;
  }, [messages]);

  const handleScroll = () => {
    const transcript = transcriptRef.current;
    if (transcript === null) return;

    const distanceFromBottom =
      transcript.scrollHeight - transcript.scrollTop - transcript.clientHeight;
    pinnedToBottom.current = distanceFromBottom < 40;
  };

  const lastMessage = messages[messages.length - 1];
  const isWaitingForFirstToken =
    isStreaming &&
    lastMessage?.role === "assistant" &&
    lastMessage.content === "";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        /*
         * Radix would otherwise land on the close button, which is the one
         * control in here nobody opens a chat to reach.
         */
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          inputRef.current?.focus();
        }}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          onRestoreFocus();
        }}
        className="w-full gap-0 sm:max-w-md"
      >
        <SheetHeader className="gap-1 border-b border-border p-5 pr-16">
          <SheetTitle className="text-lg">{content.title}</SheetTitle>
          <SheetDescription>{content.description}</SheetDescription>
        </SheetHeader>

        <SheetClose asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            className="absolute top-4 right-4"
          >
            <XIcon aria-hidden />
            <span className="sr-only">{content.closeLabel}</span>
          </Button>
        </SheetClose>

        <div
          ref={transcriptRef}
          onScroll={handleScroll}
          role="log"
          aria-live="polite"
          aria-busy={isStreaming}
          aria-label={content.title}
          className="flex flex-1 flex-col gap-5 overflow-y-auto p-5"
        >
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              specialtyNames={specialtyNames}
              relatedLabel={content.relatedLabel}
            />
          ))}

          {isWaitingForFirstToken && (
            <p className="text-sm text-muted-foreground">
              {content.thinkingLabel}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 border-t border-border p-5">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              onAsk(question);
              setQuestion("");
            }}
            className="flex gap-2"
          >
            <label htmlFor="assistant-panel-question" className="sr-only">
              {content.inputLabel}
            </label>
            <input
              ref={inputRef}
              id="assistant-panel-question"
              name="question"
              type="text"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder={content.inputPlaceholder}
              autoComplete="off"
              maxLength={1000}
              className="h-11 w-full min-w-0 rounded-full border border-input bg-muted px-5 text-base text-foreground placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              disabled={isStreaming || question.trim() === ""}
              className="inline-flex h-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-ai px-5 text-button font-semibold text-card transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="sr-only">{content.sendLabel}</span>
              <SendHorizontalIcon aria-hidden className="size-4" />
            </button>
          </form>

          <p className="text-xs text-muted-foreground">{disclaimer}</p>
          <p className="text-xs text-muted-foreground">
            {content.privacyNotice}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
