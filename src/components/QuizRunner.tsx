"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Level } from "@/data/levels";
import { useProgress } from "@/lib/progress-context";
import { Button } from "./Button";
import { LevelCompleteModal } from "./LevelCompleteModal";
import { LevelHeader } from "./LevelHeader";
import { QuizCard } from "./QuizCard";
import { QuizFeedback } from "./QuizFeedback";

/**
 * Runs a level's quick check one question at a time. A wrong answer shows the
 * explanation and lets the student try again; "Next" appears once they are
 * right. Passing the last question finishes the level.
 */
export function QuizRunner({ level }: { level: Level }) {
  const { statusOf, completeLevel } = useProgress();
  const router = useRouter();

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [ruledOut, setRuledOut] = useState<number[]>([]);
  const [celebrating, setCelebrating] = useState(false);
  // Bumped when the options should take keyboard focus back (new question, try again).
  const [focusOptions, setFocusOptions] = useState(0);
  // Someone retaking a finished level is reviewing: no second celebration.
  const [reviewing] = useState(() => statusOf(level.id) === "completed");

  const total = level.quiz.length;
  const question = level.quiz[index];
  const answered = selected !== null;
  const correct = selected === question.correctIndex;
  const passed = index + (answered && correct ? 1 : 0);

  function tryAgain() {
    if (selected !== null) setRuledOut([...ruledOut, selected]);
    setSelected(null);
    setFocusOptions(focusOptions + 1);
  }

  function next() {
    if (index < total - 1) {
      setIndex(index + 1);
      setSelected(null);
      setRuledOut([]);
      setFocusOptions(focusOptions + 1);
    } else if (reviewing) {
      router.push("/path");
    } else {
      completeLevel(level.id);
      setCelebrating(true);
    }
  }

  return (
    <>
      <h1 className="sr-only">{level.title}: quick check</h1>

      {/* Opening the level and watching the video were the first two thirds. */}
      <LevelHeader
        backHref={`/level/${level.id}`}
        backLabel="Back to the level"
        title={`Level ${level.id} · Interactive Check`}
        progress={2 / 3 + passed / total / 3}
      />

      <QuizCard
        key={index}
        question={question}
        selected={selected}
        ruledOut={ruledOut}
        onSelect={setSelected}
        focusOptions={focusOptions}
        counter={total > 1 ? `Question ${index + 1} of ${total}` : undefined}
      />

      {answered && (
        <>
          <QuizFeedback correct={correct} explanation={question.explanation} />
          {/* autoFocus: the option that was tapped is now disabled, so the next action takes focus. */}
          {correct ? (
            <Button key="next" fullWidth autoFocus onClick={next}>
              Next
            </Button>
          ) : (
            <Button key="retry" variant="outline" fullWidth autoFocus onClick={tryAgain}>
              Try again
            </Button>
          )}
        </>
      )}

      {celebrating && <LevelCompleteModal level={level} />}
    </>
  );
}
