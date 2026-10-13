"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useProgress } from "@/lib/progress-context";
import { LevelSkeleton } from "./LevelSkeleton";

/**
 * Keeps locked levels closed, including when their URL is typed in directly.
 * Nothing inside is rendered until saved progress has been read, and a locked
 * level sends the student back to the path.
 *
 * Progress lives in this browser's storage, so this stops skipping ahead by
 * URL; it is not protection against someone editing their own storage.
 */
export function LevelGate({ levelId, children }: { levelId: number; children: React.ReactNode }) {
  const { ready, statusOf } = useProgress();
  const router = useRouter();
  const locked = ready && statusOf(levelId) === "locked";

  useEffect(() => {
    if (locked) router.replace("/path");
  }, [locked, router]);

  if (!ready || locked) return <LevelSkeleton />;

  return children;
}
