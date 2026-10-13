"use client";

import { Flame, Star } from "lucide-react";
import { useProgress } from "@/lib/progress-context";
import { Skeleton } from "./Skeleton";

/** Streak on the left, XP on the right. */
export function StatsRow() {
  const { ready, streak, xp } = useProgress();

  return (
    <div className="flex items-center justify-between text-small text-fg">
      <span className="flex items-center gap-1.5">
        <Flame className="size-4 fill-flame text-flame" aria-hidden="true" />
        {ready ? `${streak} day streak` : <Skeleton className="h-4 w-20" />}
      </span>
      <span className="flex items-center gap-1.5">
        <Star className="size-4 fill-star text-star" aria-hidden="true" />
        {ready ? `${xp} XP` : <Skeleton className="h-4 w-12" />}
      </span>
    </div>
  );
}
