"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import type { QuizQuestion } from "@/data/levels";
import { pop, shake } from "@/lib/motion";
import { usePressable } from "@/lib/use-pressable";
import { CheckBadge, CrossBadge } from "./CheckBadge";

const LETTERS = "ABCDEFGH";

type QuizCardProps = {
  question: QuizQuestion;
  /** The option the student just picked, or null while they are choosing. */
  selected: number | null;
  /** Options already tried and found wrong; they stay crossed out. */
  ruledOut: number[];
  onSelect: (index: number) => void;
  /** Changes when keyboard focus should return to the first open option. 0 leaves focus alone. */
  focusOptions: number;
  /** "Question 1 of 2", shown only when a level has more than one. */
  counter?: string;
};

export function QuizCard({
  question,
  selected,
  ruledOut,
  onSelect,
  focusOptions,
  counter,
}: QuizCardProps) {
  const answered = selected !== null;
  const list = useRef<HTMLUListElement>(null);
  const tap = usePressable("row");

  // "Next" and "Try again" disappear when pressed; put focus back on the answers.
  useEffect(() => {
    if (focusOptions > 0) {
      list.current?.querySelector<HTMLButtonElement>("button:not(:disabled)")?.focus();
    }
  }, [focusOptions]);

  return (
    <section className="rounded-card border border-line bg-surface p-4 shadow-card">
      {counter && <p className="mb-1 text-caption text-muted">{counter}</p>}
      <h2 className="text-h4 text-fg">{question.question}</h2>

      <ul ref={list} className="mt-4 flex flex-col gap-3">
        {question.options.map((option, index) => {
          const picked = selected === index;
          const correct = picked && index === question.correctIndex;
          const wrong = picked && !correct;
          const crossedOut = ruledOut.includes(index);

          let look = "border-line bg-surface text-fg hover:border-brand/50";
          if (correct) look = "border-brand bg-primary-soft text-fg";
          else if (wrong) look = "border-error bg-error-soft text-fg";
          else if (crossedOut) look = "border-line bg-surface-muted text-muted";
          else if (answered) look = "border-line bg-surface text-muted";

          return (
            <li key={index}>
              <motion.button
                type="button"
                disabled={answered || crossedOut}
                aria-pressed={picked}
                onClick={() => onSelect(index)}
                animate={correct ? pop : wrong ? shake : { x: 0, scale: 1 }}
                {...(answered || crossedOut ? {} : tap)}
                className={`flex min-h-12 w-full items-center gap-3 rounded-control border px-4 py-3 text-left text-small transition-colors ${look}`}
              >
                <span className="w-5 shrink-0 font-medium text-muted">{LETTERS[index]}.</span>
                <span className={`flex-1 ${crossedOut ? "line-through" : ""}`}>{option}</span>
                {correct && <CheckBadge />}
                {(wrong || crossedOut) && <CrossBadge className={crossedOut ? "opacity-50" : ""} />}
                {correct && <span className="sr-only">Correct</span>}
                {(wrong || crossedOut) && <span className="sr-only">Incorrect</span>}
              </motion.button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
