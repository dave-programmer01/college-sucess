"use client";

import { motion } from "framer-motion";
import { ArrowRight, Lock } from "lucide-react";
import Link from "next/link";
import { unlock } from "@/lib/motion";
import { usePressable } from "@/lib/use-pressable";

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
 *
 * The card is the same element in both states so the tile can animate when it
 * unlocks; only the heading turns into a link, stretched over the whole card.
 */
export function QuizUnlockCard({ levelId, unlocked, questionCount, linkRef }: QuizUnlockCardProps) {
  const pressable = usePressable();

  const heading = (
    <>
      <span className="font-semibold">Next:</span> Take the quick check
    </>
  );

  return (
    <motion.div
      {...(unlocked ? pressable : {})}
      className={`relative flex items-center gap-3 rounded-card border p-4 transition-[background-color,border-color,box-shadow] duration-300 ${
        unlocked
          ? "border-brand/30 bg-primary-soft hover:shadow-raised has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-primary-light"
          : "border-line bg-surface-muted"
      }`}
    >
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
        {unlocked ? (
          <Link
            ref={linkRef}
            href={`/level/${levelId}/check`}
            className="text-small text-fg after:absolute after:inset-0 after:rounded-card focus-visible:outline-none"
          >
            {heading}
          </Link>
        ) : (
          <span className="text-small text-muted">{heading}</span>
        )}
        <span className="text-caption text-muted">
          {unlocked
            ? `${questionCount} quick ${questionCount === 1 ? "question" : "questions"}`
            : "Watch the video to unlock the quiz."}
        </span>
      </span>
    </motion.div>
  );
}
