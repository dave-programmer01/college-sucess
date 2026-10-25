import { levels, TOTAL_LEVELS } from "@/data/levels";

export type LevelStatus = "completed" | "current" | "locked";

export type Progress = {
  /** Ids of finished levels. Always 0..n-1, because levels unlock in order. */
  completed: number[];
  /** Ids of levels whose video has been marked as watched. */
  watched: number[];
  /** Days in a row the app has been opened, counting today. */
  streak: number;
  /** Local date of the last visit, as "YYYY-MM-DD". */
  lastVisit: string | null;
  /** Highest level whose unlock animation has already played on the path map. */
  unlockSeen: number;
};

export const EMPTY_PROGRESS: Progress = {
  completed: [],
  watched: [],
  streak: 0,
  lastVisit: null,
  unlockSeen: 0,
};

// ── Rules ──────────────────────────────────────────────────────────────────

/** The level the student is on, or null once every level is finished. */
export function currentLevelId(progress: Progress): number | null {
  return progress.completed.length < TOTAL_LEVELS ? progress.completed.length : null;
}

export function levelStatus(progress: Progress, id: number): LevelStatus {
  const done = progress.completed.length;
  if (id < done) return "completed";
  return id === done ? "current" : "locked";
}

export function totalXp(progress: Progress): number {
  return levels
    .filter((level) => progress.completed.includes(level.id))
    .reduce((sum, level) => sum + level.xp, 0);
}

export function markWatched(progress: Progress, id: number): Progress {
  if (levelStatus(progress, id) === "locked" || progress.watched.includes(id)) return progress;
  return { ...progress, watched: [...progress.watched, id] };
}

/** A level whose videoUrl is "" (like Finish) has nothing to watch. */
export function levelHasVideo(id: number): boolean {
  return (levels.find((level) => level.id === id)?.videoUrl.trim() ?? "") !== "";
}

/**
 * The quick check opens once the level's video has been watched, or as soon as
 * the level is unlocked when it has no video.
 */
export function quizOpen(progress: Progress, id: number): boolean {
  if (levelStatus(progress, id) === "locked") return false;
  return !levelHasVideo(id) || progress.watched.includes(id);
}

/** Finishes the current level. Any other level, or one whose quiz isn't open yet, is ignored. */
export function completeLevel(progress: Progress, id: number): Progress {
  if (id !== currentLevelId(progress) || !quizOpen(progress, id)) return progress;
  return { ...progress, completed: [...progress.completed, id] };
}

export function acknowledgeUnlock(progress: Progress, id: number): Progress {
  return id > progress.unlockSeen ? { ...progress, unlockSeen: id } : progress;
}

/** Counts today's visit: yesterday extends the streak, a longer gap restarts it. */
export function recordVisit(progress: Progress, today: string): Progress {
  if (progress.lastVisit === today) return progress;
  const gap = progress.lastVisit ? daysBetween(progress.lastVisit, today) : null;
  return { ...progress, lastVisit: today, streak: gap === 1 ? progress.streak + 1 : 1 };
}

export function localDay(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function daysBetween(from: string, to: string): number {
  const utc = (day: string) => {
    const [y, m, d] = day.split("-").map(Number);
    return Date.UTC(y, m - 1, d);
  };
  return Math.round((utc(to) - utc(from)) / 86_400_000);
}

// ── Storage ────────────────────────────────────────────────────────────────

const STORAGE_KEY = "first-year:progress";

/** Rebuilds a valid Progress from whatever is in storage, dropping anything unexpected. */
function sanitize(value: unknown): Progress {
  if (typeof value !== "object" || value === null) return EMPTY_PROGRESS;
  const raw = value as Record<string, unknown>;

  const levelIds = (list: unknown) =>
    Array.isArray(list)
      ? levels.map((level) => level.id).filter((id) => list.includes(id))
      : [];

  // Keep only the unbroken run from level 0, so editing storage can't skip a level.
  const done = levelIds(raw.completed);
  const completed = done.filter((id, index) => id === index);

  const count = (n: unknown) => (typeof n === "number" && Number.isInteger(n) && n > 0 ? n : 0);

  return {
    completed,
    watched: levelIds(raw.watched),
    streak: count(raw.streak),
    lastVisit:
      typeof raw.lastVisit === "string" && /^\d{4}-\d{2}-\d{2}$/.test(raw.lastVisit)
        ? raw.lastVisit
        : null,
    unlockSeen: Math.min(count(raw.unlockSeen), completed.length),
  };
}

function load(): Progress {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? sanitize(JSON.parse(stored)) : EMPTY_PROGRESS;
  } catch {
    return EMPTY_PROGRESS;
  }
}

function save(progress: Progress) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Storage is blocked or full: progress still works for this visit.
  }
}

// ── Store (read by React through useSyncExternalStore) ─────────────────────

let cached: Progress | undefined;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

// Another tab changed or cleared the saved progress.
function handleStorage(event: StorageEvent) {
  if (event.key !== null && event.key !== STORAGE_KEY) return;
  cached = load();
  notify();
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", handleStorage);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", handleStorage);
  };
}

export function getSnapshot(): Progress {
  cached ??= load();
  return cached;
}

/** The server can't see localStorage, so it always renders an empty start. */
export function getServerSnapshot(): Progress {
  return EMPTY_PROGRESS;
}

export function updateProgress(change: (progress: Progress) => Progress) {
  const current = getSnapshot();
  const next = change(current);
  if (next === current) return;
  cached = next;
  save(next);
  notify();
}

export function resetProgress() {
  updateProgress(() => recordVisit(EMPTY_PROGRESS, localDay(new Date())));
}
