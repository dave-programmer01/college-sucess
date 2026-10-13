"use client";

import { TOTAL_LEVELS } from "@/data/levels";
import { useProgress } from "@/lib/progress-context";
import { ProgressBar } from "./ProgressBar";
import { Skeleton } from "./Skeleton";
import { StatsRow } from "./StatsRow";

/** "Your Progress" bar with the streak and XP row underneath. */
export function ProgressSummary() {
  const { ready, completedCount } = useProgress();

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-small font-semibold text-fg">Your Progress</h2>
        <span className="text-small text-muted">
          {ready ? `${completedCount} / ${TOTAL_LEVELS}` : <Skeleton className="h-4 w-9" />}
        </span>
      </div>
      <ProgressBar value={ready ? completedCount : 0} max={TOTAL_LEVELS} label="Levels completed" />
      <StatsRow />
    </section>
  );
}
