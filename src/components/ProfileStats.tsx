"use client";

import { Flame, Flag, Star, type LucideIcon } from "lucide-react";
import { TOTAL_LEVELS } from "@/data/levels";
import { useProgress } from "@/lib/progress-context";
import { Skeleton } from "./Skeleton";

export function ProfileStats() {
  const { ready, completedCount, xp, streak } = useProgress();

  const stats: { label: string; value: string; icon: LucideIcon; tone: string }[] = [
    { label: "Levels done", value: `${completedCount} / ${TOTAL_LEVELS}`, icon: Flag, tone: "text-brand" },
    { label: "XP", value: String(xp), icon: Star, tone: "fill-star text-star" },
    { label: "Day streak", value: String(streak), icon: Flame, tone: "fill-flame text-flame" },
  ];

  return (
    <dl className="grid grid-cols-3 gap-3">
      {stats.map(({ label, value, icon: Icon, tone }) => (
        <div
          key={label}
          className="flex flex-col items-center gap-1 rounded-card border border-line bg-surface px-2 py-4 text-center shadow-card"
        >
          <Icon className={`size-5 ${tone}`} aria-hidden="true" />
          <dt className="order-last text-caption text-muted">{label}</dt>
          <dd className="text-h3 text-fg">{ready ? value : <Skeleton className="h-6 w-10" />}</dd>
        </div>
      ))}
    </dl>
  );
}
