"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useProgress } from "@/lib/progress-context";
import { LevelSkeleton } from "./LevelSkeleton";

/**
 * Keeps locked levels closed, including when their URL is typed in directly.
 * Nothing inside is rendered until saved progress has been read, and a locked
 * level sends the student back to the path. With `requireQuizOpen` (the quiz),
 * a level whose video hasn't been watched sends them back to the level; a level
 * without a video has nothing to watch, so its quiz opens straight away.
 *
 * Progress lives in this browser's storage, so this stops skipping ahead by
 * URL; it is not protection against someone editing their own storage.
 */
type LevelGateProps = {
  levelId: number;
  requireQuizOpen?: boolean;
  children: React.ReactNode;
};

export function LevelGate({ levelId, requireQuizOpen = false, children }: LevelGateProps) {
  const { ready, statusOf, quizOpen } = useProgress();
  const router = useRouter();

  let redirectTo: string | null = null;
  if (ready && statusOf(levelId) === "locked") redirectTo = "/path";
  else if (ready && requireQuizOpen && !quizOpen(levelId)) redirectTo = `/level/${levelId}`;

  useEffect(() => {
    if (redirectTo) router.replace(redirectTo);
  }, [redirectTo, router]);

  if (!ready || redirectTo) return <LevelSkeleton />;

  return children;
}
