"use client";

import { useProgress } from "@/lib/progress-context";
import { PathMap } from "./PathMap";
import { ProgressSummary } from "./ProgressSummary";

/**
 * Everything on the path screen that depends on progress.
 *
 * Keyed on the number of finished levels so it is rebuilt whenever that
 * changes. Levels are finished on other screens, while this one is kept
 * mounted but hidden, and Framer Motion doesn't pick up animation targets
 * that change while hidden: without the key the bar and nodes would show the
 * progress from before you left.
 */
export function PathOverview() {
  const { completedCount } = useProgress();

  return (
    <div key={completedCount} className="flex flex-col gap-4">
      <ProgressSummary />
      <PathMap />
    </div>
  );
}
