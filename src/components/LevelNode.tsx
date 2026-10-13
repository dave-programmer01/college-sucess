"use client";

import { motion } from "framer-motion";
import { pulse, unlock } from "@/lib/motion";
import type { LevelStatus } from "@/lib/progress";

const rings: Record<LevelStatus, string> = {
  completed: "ring-2 ring-brand ring-offset-2 ring-offset-surface",
  current: "ring-4 ring-primary-light/35",
  locked: "ring-0 ring-transparent",
};

/**
 * The numbered circle for one level.
 * Locked is grey; completed and current fill with green; current also pulses.
 * Going from locked to another state plays the fill animation.
 */
export function LevelNode({ number, status }: { number: number; status: LevelStatus }) {
  const filled = status !== "locked";

  return (
    <motion.span
      aria-hidden="true"
      className={`relative grid size-10 shrink-0 place-items-center rounded-full bg-locked transition-shadow duration-300 ${rings[status]}`}
      animate={status === "current" ? pulse.animate : { scale: 1 }}
      transition={status === "current" ? pulse.transition : { duration: 0.2 }}
    >
      <motion.span
        className="absolute inset-0 rounded-full bg-primary"
        initial={false}
        animate={filled ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={unlock.fill}
      />
      <span
        className={`relative text-small font-semibold transition-colors duration-300 ${
          filled ? "text-on-primary" : "text-locked-fg"
        }`}
      >
        {number}
      </span>
    </motion.span>
  );
}
