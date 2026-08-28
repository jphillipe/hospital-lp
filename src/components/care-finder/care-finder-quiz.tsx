"use client";

import { ArrowLeftIcon, ArrowRightIcon, RotateCcwIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { BookCta } from "@/components/booking/book-cta";
import { PhoneLink } from "@/components/shared/phone-link";
import type {
  CareFinderContent,
  CareFinderOutcome,
  CareFinderQuestion,
  CareFinderStep,
} from "@/types/content";

interface CareFinderQuizProps {
  readonly content: CareFinderContent;
  /** Slug to display name, resolved by the page. Never read from content here. */
  readonly specialtyNames: Readonly<Record<string, string>>;
  /** E.164 — the appointment line. */
  readonly phone: string;
}

/**
 * The only part of the finder that ships JS, and the only client state on the
 * page besides the nav and the FAQ accordion.
 *
 * **The whole path lives in one array.** `path[0]` is the first question and
 * the last element is where the visitor is now, so "go back" is a pop and
 * "start over" is an empty array. No answer is stored anywhere else, nothing
 * is posted, and nothing survives a reload — which is what the lead under the
 * heading promises.
 *
 * Focus moves to the new step's heading on every advance rather than the step
 * being announced through `aria-live`. Both would announce it twice, and
 * moving focus is the one that also puts a keyboard user's next Tab in the
 * right place.
 */
export function CareFinderQuiz({
  content,
  specialtyNames,
  phone,
}: CareFinderQuizProps) {
  const [path, setPath] = useState<readonly CareFinderStep[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const startRef = useRef<HTMLButtonElement>(null);

  const current = path[path.length - 1];

  // Only after an advance, never on first paint — landing on the page must not
  // yank focus out of whatever the visitor was reading.
  const started = path.length > 0;
  useEffect(() => {
    if (started) headingRef.current?.focus();
  }, [started, path.length]);

  const start = () => {
    setPath([{ kind: "question", id: content.firstQuestionId }]);
  };

  const restart = () => {
    setPath([]);
    startRef.current?.focus();
  };

  const goBack = () => {
    setPath((previous) => previous.slice(0, -1));
  };

  if (current === undefined) {
    return (
      <button
        ref={startRef}
        type="button"
        onClick={start}
        className="inline-flex h-14 cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground transition-colors hover:bg-brand-hover"
      >
        {content.startLabel}
        <ArrowRightIcon aria-hidden className="size-4 shrink-0" />
      </button>
    );
  }

  const question: CareFinderQuestion | undefined =
    current.kind === "question"
      ? content.questions.find((item) => item.id === current.id)
      : undefined;

  const outcome: CareFinderOutcome | undefined =
    current.kind === "outcome"
      ? content.outcomes.find((item) => item.id === current.id)
      : undefined;

  const progress = content.labels.progress
    .replace("%n", String(path.length))
    .replace("%total", String(content.stepCount));

  return (
    <div className="flex flex-col gap-5 rounded-card border border-border bg-card p-6x">
      {question === undefined ? null : (
        <>
          <p className="text-eyebrow font-semibold tracking-eyebrow text-muted-foreground uppercase">
            {progress}
          </p>

          <div className="flex flex-col gap-2">
            <h3
              ref={headingRef}
              tabIndex={-1}
              className="text-xl outline-none"
            >
              {question.prompt}
            </h3>
            {question.help === undefined ? null : (
              <p className="text-sm text-muted-foreground">{question.help}</p>
            )}
          </div>

          {/*
            Buttons rather than radios: an answer here advances immediately, so
            there is nothing to confirm and no submit to find. 56px tall and
            full width — the target is the whole row, which is what a shaky
            hand on a phone needs.
          */}
          <ul className="flex flex-col gap-3">
            {question.options.map((option) => (
              <li key={option.id}>
                <button
                  type="button"
                  onClick={() =>
                    setPath((previous) => [...previous, option.next])
                  }
                  className="group flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 rounded-card border border-input px-5 py-3 text-left text-base text-body-foreground transition-colors hover:border-primary hover:bg-primary/5 hover:text-foreground"
                >
                  {option.label}
                  <ArrowRightIcon
                    aria-hidden
                    className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary"
                  />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      {outcome === undefined ? null : (
        <>
          <p className="text-eyebrow font-semibold tracking-eyebrow text-primary uppercase">
            {content.labels.resultEyebrow}
          </p>

          <h3 ref={headingRef} tabIndex={-1} className="text-xl outline-none">
            {outcome.title}
          </h3>

          <p className="text-base text-body-foreground">{outcome.body}</p>

          {outcome.specialtySlug === null ? null : (
            <p className="flex flex-col gap-1 rounded-card bg-muted px-5 py-4">
              <span className="text-eyebrow font-semibold tracking-eyebrow text-muted-foreground uppercase">
                {content.labels.startHereLabel}
              </span>
              <span className="font-heading text-lg text-foreground">
                {specialtyNames[outcome.specialtySlug] ?? outcome.title}
              </span>
            </p>
          )}

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <BookCta className="h-12 rounded-full px-6 text-base font-semibold" />
            <p className="flex flex-col gap-1 text-sm">
              <span className="text-muted-foreground">
                {content.labels.callLabel}
              </span>
              <PhoneLink
                phone={phone}
                className="text-lg font-semibold text-primary underline underline-offset-4"
              />
            </p>
          </div>

          <p className="text-sm text-body-foreground">
            {content.labels.disclaimer}
          </p>
        </>
      )}

      <div className="flex flex-wrap gap-4 border-t border-border pt-5 text-button font-semibold">
        {path.length > 1 ? (
          <button
            type="button"
            onClick={goBack}
            className="flex cursor-pointer items-center gap-2 rounded-sm text-body-foreground hover:text-primary"
          >
            <ArrowLeftIcon aria-hidden className="size-4 shrink-0" />
            {content.labels.back}
          </button>
        ) : null}

        <button
          type="button"
          onClick={restart}
          className="flex cursor-pointer items-center gap-2 rounded-sm text-body-foreground hover:text-primary"
        >
          <RotateCcwIcon aria-hidden className="size-4 shrink-0" />
          {content.labels.restart}
        </button>
      </div>
    </div>
  );
}
