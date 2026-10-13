"use client";

import { motion } from "framer-motion";
import { arrive } from "@/lib/motion";
import { CheckBadge, CrossBadge } from "./CheckBadge";

/** The "Correct!" / "Not quite" panel with the explanation. Announced by screen readers. */
export function QuizFeedback({ correct, explanation }: { correct: boolean; explanation: string }) {
  return (
    <motion.div
      role="status"
      initial={arrive.initial}
      animate={arrive.animate}
      transition={arrive.transition}
      className={`flex items-start gap-3 rounded-card border p-4 ${
        correct ? "border-brand/30 bg-primary-soft" : "border-error/40 bg-error-soft"
      }`}
    >
      {correct ? <CheckBadge size="lg" /> : <CrossBadge size="lg" />}
      <div className="flex flex-col gap-1">
        <p className={`text-h4 ${correct ? "text-brand" : "text-error-strong"}`}>
          {correct ? "Correct!" : "Not quite"}
        </p>
        <p className="text-small text-fg">{explanation}</p>
      </div>
    </motion.div>
  );
}
