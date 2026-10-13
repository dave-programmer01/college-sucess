"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, ChevronRight, Lock } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { levels, TOTAL_LEVELS, type Level } from "@/data/levels";
import { staggerItem, staggerList, unlock } from "@/lib/motion";
import type { LevelStatus } from "@/lib/progress";
import { useProgress } from "@/lib/progress-context";
import { usePressable } from "@/lib/use-pressable";
import { ButtonLink } from "./Button";
import { LevelNode } from "./LevelNode";

// Geometry of the winding track, in px. Nodes alternate left and right of the
// track's centre and an S-curve joins each one to the next.
const ROW = 72;
const TRACK = 72;
const NODE = 40;
const nodeX = (index: number) => (index % 2 === 0 ? 24 : 48);
const nodeY = (index: number) => index * ROW + ROW / 2;

function connector(index: number) {
  const [x1, y1, x2, y2] = [nodeX(index), nodeY(index), nodeX(index + 1), nodeY(index + 1)];
  return `M ${x1} ${y1} C ${x1} ${y1 + ROW / 2}, ${x2} ${y2 - ROW / 2}, ${x2} ${y2}`;
}

const rowClasses = "grid h-[72px] grid-cols-[72px_1fr] items-center rounded-control";

export function PathMap() {
  const { ready, currentId, unlockSeen, allComplete, completedCount, statusOf } = useProgress();

  if (!ready) return <PathSkeleton />;

  // A level that opened since the path was last seen plays its unlock animation once.
  const unlockingId = currentId !== null && currentId > unlockSeen ? currentId : null;

  return (
    <div className="flex flex-col gap-4">
      <div className="relative rounded-card border border-line bg-surface p-3 shadow-card">
        <motion.svg
          aria-hidden="true"
          width={TRACK}
          height={ROW * TOTAL_LEVELS}
          className="pointer-events-none absolute top-3 left-3"
          fill="none"
          strokeWidth={3}
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {levels.slice(0, -1).map((level, index) => (
            <path
              key={level.id}
              d={connector(index)}
              className={`transition-[stroke] duration-500 ${
                index < completedCount ? "stroke-brand" : "stroke-line"
              }`}
            />
          ))}
        </motion.svg>

        <motion.ol variants={staggerList} initial="hidden" animate="visible" className="relative">
          {levels.map((level, index) => (
            <motion.li key={level.id} variants={staggerItem}>
              <LevelRow
                level={level}
                index={index}
                status={statusOf(level.id)}
                unlocking={level.id === unlockingId}
              />
            </motion.li>
          ))}
        </motion.ol>
      </div>

      {allComplete && (
        <div className="flex flex-col items-start gap-3 rounded-card border border-line bg-primary-soft p-4">
          <p className="text-body text-fg">You finished all {TOTAL_LEVELS} levels.</p>
          <ButtonLink href="/complete">
            See your results
            <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
        </div>
      )}
    </div>
  );
}

type LevelRowProps = {
  level: Level;
  index: number;
  status: LevelStatus;
  /** True for a newly opened level: show it locked first, then play the unlock. */
  unlocking: boolean;
};

function LevelRow({ level, index, status, unlocking }: LevelRowProps) {
  const { acknowledgeUnlock } = useProgress();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!unlocking) return;
    const reveal = setTimeout(() => setRevealed(true), unlock.delayMs);
    const finish = setTimeout(
      () => acknowledgeUnlock(level.id),
      unlock.delayMs + unlock.durationMs + 100,
    );
    return () => {
      clearTimeout(reveal);
      clearTimeout(finish);
    };
  }, [unlocking, level.id, acknowledgeUnlock]);

  const shown: LevelStatus = unlocking && !revealed ? "locked" : status;
  const open = shown !== "locked";
  const tap = usePressable("row");

  const title = (
    <>
      <span className="sr-only">Level {level.id}: </span>
      {level.title}
    </>
  );
  const titleClasses = "line-clamp-2 text-small font-semibold";

  // The row is the same element whether the level is locked or open, so the
  // node and status line inside it stay in place and can animate when the
  // level unlocks. Only the title turns into a link, stretched over the row.
  return (
    <motion.div
      {...(open ? tap : {})}
      className={`${rowClasses} relative ${
        open
          ? "transition-colors hover:bg-surface-muted has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-primary-light"
          : ""
      }`}
    >
      <span className="relative h-full">
        <span
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ left: nodeX(index), width: NODE, height: NODE }}
        >
          <LevelNode number={level.id} status={shown} />
        </span>
      </span>
      <span
        className={`flex min-h-[58px] min-w-0 items-center justify-between gap-2 rounded-control px-3 py-1 transition-colors duration-300 ${
          shown === "current" ? "bg-primary-soft" : ""
        }`}
      >
        <span className="flex min-w-0 flex-col gap-0.5">
          {open ? (
            <Link
              href={`/level/${level.id}`}
              className={`${titleClasses} text-fg after:absolute after:inset-0 after:rounded-control focus-visible:outline-none`}
            >
              {title}
            </Link>
          ) : (
            <span className={`${titleClasses} text-muted`}>{title}</span>
          )}
          <StatusLine status={shown} />
        </span>
        {shown === "current" && (
          <ChevronRight className="size-4 shrink-0 text-brand" aria-hidden="true" />
        )}
      </span>
    </motion.div>
  );
}

function StatusLine({ status }: { status: LevelStatus }) {
  const locked = status === "locked";
  // Only a row that started out locked can play the unlock: its lock label
  // stays in place and fades out while "Current" fades in over it.
  const [startedLocked] = useState(locked);

  return (
    <span className="grid h-5 items-center justify-items-start text-caption">
      {(startedLocked || locked) && (
        <motion.span
          aria-hidden={!locked}
          className="col-start-1 row-start-1 flex items-center gap-1 text-muted"
          initial={false}
          animate={locked ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
          transition={unlock.swap}
        >
          Locked
          <Lock className="size-3" aria-hidden="true" />
        </motion.span>
      )}
      {status === "current" && (
        <motion.span
          className="col-start-1 row-start-1 rounded-full bg-primary px-2 py-0.5 font-medium text-on-primary"
          initial={startedLocked ? { opacity: 0, scale: 0.8 } : false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...unlock.swap, delay: unlock.swap.duration }}
        >
          Current
        </motion.span>
      )}
      {status === "completed" && (
        <span className="col-start-1 row-start-1 flex items-center gap-1 font-medium text-brand">
          Completed
          <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
        </span>
      )}
    </span>
  );
}

function PathSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading your path"
      className="rounded-card border border-line bg-surface p-3 shadow-card"
    >
      {levels.map((level, index) => (
        <div key={level.id} className={rowClasses}>
          <span className="relative h-full">
            <span
              className="absolute top-1/2 size-10 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-surface-muted"
              style={{ left: nodeX(index) }}
            />
          </span>
          <span className="flex flex-col gap-2 px-3">
            <span className="h-4 w-40 animate-pulse rounded bg-surface-muted" />
            <span className="h-3 w-16 animate-pulse rounded bg-surface-muted" />
          </span>
        </div>
      ))}
    </div>
  );
}
