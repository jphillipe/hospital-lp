"use client";

import { useCallback, useRef, useState } from "react";

import type { AssistantPanelContent } from "@/types/content";

export interface TranscriptMessage {
  readonly id: string;
  readonly role: "user" | "assistant";
  readonly content: string;
}

/**
 * The conversation, held in component state and nowhere else.
 *
 * Nothing is persisted — not to a database, not to `localStorage`. PLAN.md §5
 * item 5 keeps protected health information out of storage, and the cheapest
 * way to honour that is to have no storage. Closing the panel keeps the
 * transcript for the session; reloading the page ends it.
 *
 * The response is plain text rather than a framed protocol, so the reader here
 * is eight lines and the route stays free to answer without the model at all —
 * the emergency reply and the FAQ fallback arrive on exactly the same wire.
 */
export function useAssistantChat(content: AssistantPanelContent) {
  const [messages, setMessages] = useState<readonly TranscriptMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const nextId = useRef(0);
  const inFlight = useRef<AbortController | null>(null);

  const makeId = useCallback(() => {
    nextId.current += 1;
    return `m${nextId.current}`;
  }, []);

  const ask = useCallback(
    async (question: string) => {
      const trimmed = question.trim();
      if (trimmed === "" || isStreaming) return;

      inFlight.current?.abort();
      const controller = new AbortController();
      inFlight.current = controller;

      const userMessage: TranscriptMessage = {
        id: makeId(),
        role: "user",
        content: trimmed,
      };
      const answerId = makeId();

      /*
       * The transcript sent to the route is the one the user can see, built
       * here rather than read back from state — `setMessages` has not
       * committed yet at this point.
       */
      const history = [...messages, userMessage].map((message) => ({
        role: message.role,
        content: message.content,
      }));

      setMessages((current) => [
        ...current,
        userMessage,
        { id: answerId, role: "assistant", content: "" },
      ]);
      setIsStreaming(true);

      const appendToAnswer = (chunk: string) => {
        setMessages((current) =>
          current.map((message) =>
            message.id === answerId
              ? { ...message, content: message.content + chunk }
              : message,
          ),
        );
      };

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "content-type": "application/json" },
          /* Always POST: a question must never reach a server log as a query string. */
          body: JSON.stringify({ messages: history.slice(-12) }),
          signal: controller.signal,
        });

        if (response.body === null) {
          appendToAnswer(content.errorMessage);
          return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          appendToAnswer(decoder.decode(value, { stream: true }));
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError")
          return;
        appendToAnswer(content.errorMessage);
      } finally {
        if (inFlight.current === controller) {
          inFlight.current = null;
          setIsStreaming(false);
        }
      }
    },
    [content.errorMessage, isStreaming, makeId, messages],
  );

  return { messages, isStreaming, ask };
}
