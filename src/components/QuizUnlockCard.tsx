"use client";

import { motion } from "framer-motion";
import { ArrowRight, Lock } from "lucide-react";
import Link from "next/link";
import { pressable, unlock } from "@/lib/motion";

const MotionLink = motion.create(Link);

type QuizUnlockCardProps = {
  levelId: number;
  /** True once the video has been marked as watched. */
  unlocked: boolean;
  questionCount: number;
  /** Lets the level screen move keyboard focus here once the quiz unlocks. */
  linkRef?: React.Ref<HTMLAnchorElement>;
};

const shown = { opacity: 1, scale: 1 };
const gone = { opacity: 0, scale: 0.6 };

/**
 * "Next: Take the quick check". Locked and inert until the video is watched;
 * then the lock leaves, the tile fills with colour and the card becomes a link.
 */
export function QuizUnlockCard({ levelId, unlocked, questionCount, linkRef }: QuizUnlockCardProps) {
  const content = (
    <>
      <span className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-control bg-locked">
        <motion.span
          className="absolute inset-0 bg-primary"
          initial={false}
          animate={unlocked ? shown : { opacity: 0, scale: 0 }}
          transition={unlock.fill}
        />
        <motion.span
          className="col-start-1 row-start-1 text-locked-fg"
          initial={false}
          animate={unlocked ? gone : shown}
          transition={unlock.swap}
        >
          <Lock className="size-5" aria-hidden="true" />
        </motion.span>
        <motion.span
          className="relative col-start-1 row-start-1 text-on-primary"
          initial={false}
          animate={unlocked ? shown : gone}
          transition={{ ...unlock.swap, delay: unlocked ? unlock.swap.duration : 0 }}
        >
          <ArrowRight className="size-5" aria-hidden="true" />
        </motion.span>
      </span>
      <span className="flex min-w-0 flex-col">
        <span className={`text-small ${unlocked ? "text-fg" : "text-muted"}`}>
          <span className="font-semibold">Next:</span> Take the quick check
        </span>
        <span className="text-caption text-muted">
          {unlocked
            ? `${questionCount} quick ${questionCount === 1 ? "question" : "questions"}`
            : "Watch the video to unlock the quiz."}
        </span>
      </span>
    </>
  );

  const classes =
    "flex items-center gap-3 rounded-card border p-4 transition-colors duration-300";

  if (!unlocked) {
    return (
      <div aria-disabled="true" className={`${classes} border-line bg-surface-muted`}>
        {content}
      </div>
    );
  }

  return (
    <MotionLink
      ref={linkRef}
      href={`/level/${levelId}/check`}
      {...pressable}
      className={`${classes} border-brand/30 bg-primary-soft hover:shadow-raised`}
    >
      {content}
    </MotionLink>
  );
}
