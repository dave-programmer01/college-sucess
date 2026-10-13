"use client";

import { motion } from "framer-motion";
import { progressFill } from "@/lib/motion";

type ProgressBarProps = {
  value: number;
  max: number;
  /** What the bar measures, for screen readers. */
  label: string;
};

export function ProgressBar({ value, max, label }: ProgressBarProps) {
  const percent = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      className="h-2 w-full overflow-hidden rounded-full bg-line"
    >
      {/* Slides in from the left instead of growing, so the rounded end keeps its shape. */}
      <motion.div
        className="h-full w-full rounded-full bg-brand"
        initial={{ x: "-100%" }}
        animate={{ x: `${percent - 100}%` }}
        transition={progressFill}
      />
    </div>
  );
}
