"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { pressable } from "@/lib/motion";
import { ProgressBar } from "./ProgressBar";

const MotionLink = motion.create(Link);

type LevelHeaderProps = {
  backHref: string;
  /** What the back arrow does, for screen readers. */
  backLabel: string;
  title: string;
  /** How far through this level the student is, from 0 to 1. */
  progress: number;
  /** Optional control at the right of the header, such as the ⋮ menu. */
  menu?: React.ReactNode;
};

/** Back arrow, "Level N of 8" and the level's own progress bar. */
export function LevelHeader({ backHref, backLabel, title, progress, menu }: LevelHeaderProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex h-10 items-center gap-1">
        <MotionLink
          href={backHref}
          aria-label={backLabel}
          {...pressable}
          className="-ml-2 grid size-10 place-items-center rounded-full text-fg transition-colors hover:bg-surface-muted"
        >
          <ArrowLeft className="size-5" aria-hidden="true" />
        </MotionLink>
        <p className="flex-1 text-h4 text-fg">{title}</p>
        {menu}
      </div>
      <ProgressBar value={Math.round(progress * 100)} max={100} label="Progress through this level" />
    </div>
  );
}
