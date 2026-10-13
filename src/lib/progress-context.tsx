"use client";

import { createContext, useContext, useEffect, useSyncExternalStore } from "react";
import { TOTAL_LEVELS } from "@/data/levels";
import {
  acknowledgeUnlock,
  completeLevel,
  currentLevelId,
  getServerSnapshot,
  getSnapshot,
  levelStatus,
  localDay,
  markWatched,
  recordVisit,
  resetProgress,
  subscribe,
  totalXp,
  updateProgress,
  type LevelStatus,
} from "./progress";
import { useHydrated } from "./use-hydrated";

type ProgressContextValue = {
  /** False until saved progress has been read in the browser. Show a skeleton until then. */
  ready: boolean;
  completedCount: number;
  /** The level the student is on, or null once every level is finished. */
  currentId: number | null;
  allComplete: boolean;
  xp: number;
  streak: number;
  /** Highest level whose unlock animation has already played on the path map. */
  unlockSeen: number;
  statusOf: (id: number) => LevelStatus;
  isWatched: (id: number) => boolean;
  markWatched: (id: number) => void;
  completeLevel: (id: number) => void;
  acknowledgeUnlock: (id: number) => void;
  reset: () => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const progress = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ready = useHydrated();

  // Count a visit when the app opens and whenever the tab comes back into view,
  // so a tab left open overnight still extends the streak.
  useEffect(() => {
    const visit = () => {
      if (document.visibilityState !== "visible") return;
      updateProgress((current) => recordVisit(current, localDay(new Date())));
    };
    visit();
    document.addEventListener("visibilitychange", visit);
    return () => document.removeEventListener("visibilitychange", visit);
  }, []);

  const value: ProgressContextValue = {
    ready,
    completedCount: progress.completed.length,
    currentId: currentLevelId(progress),
    allComplete: progress.completed.length === TOTAL_LEVELS,
    xp: totalXp(progress),
    streak: progress.streak,
    unlockSeen: progress.unlockSeen,
    statusOf: (id) => levelStatus(progress, id),
    isWatched: (id) => progress.watched.includes(id),
    markWatched: (id) => updateProgress((current) => markWatched(current, id)),
    completeLevel: (id) => updateProgress((current) => completeLevel(current, id)),
    acknowledgeUnlock: (id) => updateProgress((current) => acknowledgeUnlock(current, id)),
    reset: resetProgress,
  };

  return <ProgressContext value={value}>{children}</ProgressContext>;
}

export function useProgress() {
  const value = useContext(ProgressContext);
  if (!value) throw new Error("useProgress must be used inside <ProgressProvider>");
  return value;
}
