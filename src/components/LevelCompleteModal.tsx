"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { getLevel, type Level } from "@/data/levels";
import { burstConfetti } from "@/lib/confetti";
import { arrive, starBounce, unlock } from "@/lib/motion";
import { ButtonLink } from "./Button";
import { LevelNode } from "./LevelNode";
import { Modal } from "./Modal";

/**
 * Celebration shown when a level is finished: star, XP, confetti and the way
 * on to the next level, with a preview of that level unlocking underneath.
 * After the last level it leads to the final screen instead.
 */
export function LevelCompleteModal({ level }: { level: Level }) {
  const router = useRouter();
  const canvas = useRef<HTMLCanvasElement>(null);
  const titleId = useId();
  const textId = useId();
  const nextLevel = getLevel(level.id + 1);
  const [nextUnlocked, setNextUnlocked] = useState(false);

  useEffect(() => {
    if (!canvas.current) return;
    let clear: (() => void) | undefined;
    let cancelled = false;
    burstConfetti(canvas.current).then((reset) => {
      if (cancelled) reset();
      else clear = reset;
    });
    return () => {
      cancelled = true;
      clear?.();
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setNextUnlocked(true), unlock.delayMs);
    return () => clearTimeout(timer);
  }, []);

  return (
    // Escape leaves the celebration for the path rather than back to a finished quiz.
    <Modal labelledBy={titleId} describedBy={textId} onEscape={() => router.push("/path")}>
      <motion.div
        initial={arrive.initial}
        animate={arrive.animate}
        transition={arrive.transition}
        className="flex w-full max-w-sm flex-col items-center gap-3 rounded-card bg-surface px-6 pt-8 pb-6 text-center shadow-raised"
      >
        <motion.div
          initial={starBounce.initial}
          animate={starBounce.animate}
          transition={starBounce.transition}
        >
          <Star className="size-16 fill-star text-star" strokeWidth={1.5} aria-hidden="true" />
        </motion.div>

        <h2 id={titleId} className="text-h2 text-brand">
          Level {level.id} Complete!
        </h2>
        <p className="flex items-center gap-1.5 text-h4 text-fg">
          <Star className="size-5 fill-star text-star" aria-hidden="true" />+ {level.xp} XP
        </p>
        <p id={textId} className="text-small text-muted">
          {nextLevel
            ? "You're building good habits. Keep going!"
            : "That was the last level. You made it all the way!"}
        </p>

        <ButtonLink href={nextLevel ? `/level/${nextLevel.id}` : "/complete"} fullWidth className="mt-3">
          {nextLevel ? "Next level" : "See your results"}
          <ArrowRight className="size-4" aria-hidden="true" />
        </ButtonLink>
        <Link href="/path" className="rounded-control px-3 py-1 text-small font-medium text-brand">
          Back to your path
        </Link>
      </motion.div>

      {nextLevel && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.35 }}
          className="flex items-center gap-3 text-white"
        >
          <LevelNode number={nextLevel.id} status={nextUnlocked ? "current" : "locked"} />
          <span className="flex flex-col text-left">
            <span className="text-caption text-white/75">Next up:</span>
            <span className="text-small font-semibold">{nextLevel.title}</span>
          </span>
        </motion.div>
      )}

      {/* Confetti is drawn on top of everything, but lets taps through. */}
      <canvas ref={canvas} aria-hidden="true" className="pointer-events-none fixed inset-0 size-full" />
    </Modal>
  );
}
