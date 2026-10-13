"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useProgress } from "@/lib/progress-context";
import { Skeleton } from "./Skeleton";

/** The final screen is only for students who finished every level; anyone else goes to the path. */
export function CompleteGate({ children }: { children: React.ReactNode }) {
  const { ready, allComplete } = useProgress();
  const router = useRouter();
  const turnAway = ready && !allComplete;

  useEffect(() => {
    if (turnAway) router.replace("/path");
  }, [turnAway, router]);

  if (!ready || turnAway) {
    return (
      <div aria-busy="true" aria-label="Loading" className="flex flex-col items-center gap-4">
        <Skeleton className="h-40 w-64 rounded-card" />
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-72 w-full rounded-card" />
      </div>
    );
  }

  return children;
}
