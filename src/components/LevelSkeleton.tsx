import { Skeleton } from "./Skeleton";

/** Outline of a level screen, shown while the level or saved progress is loading. */
export function LevelSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading level" className="flex flex-col gap-4 px-4 py-4">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-2 w-full" />
      <Skeleton className="h-8 w-56" />
      <Skeleton className="aspect-video w-full rounded-card" />
    </div>
  );
}
