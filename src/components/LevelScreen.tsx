"use client";

import { motion } from "framer-motion";
import { CircleCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { TOTAL_LEVELS, type Level } from "@/data/levels";
import { arrive } from "@/lib/motion";
import { useProgress } from "@/lib/progress-context";
import { getVideoSource } from "@/lib/video";
import { Button } from "./Button";
import { CheckBadge } from "./CheckBadge";
import { LevelHeader } from "./LevelHeader";
import { LevelMenu } from "./LevelMenu";
import { QuizUnlockCard } from "./QuizUnlockCard";
import { ResourceDrawer } from "./ResourceDrawer";
import { TakeawayCard } from "./TakeawayCard";
import { VideoCard } from "./VideoCard";

export function LevelScreen({ level }: { level: Level }) {
  const { isWatched, markWatched } = useProgress();
  const watched = isWatched(level.id);
  // Whether the video was already watched when this screen opened, so
  // "Watched" only animates in when the button is pressed now.
  const [startedWatched] = useState(watched);
  const [justMarked, setJustMarked] = useState(false);
  const quizLink = useRef<HTMLAnchorElement>(null);
  const [resourceOpen, setResourceOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  // The button that was pressed is replaced by "Watched", so hand keyboard
  // focus to the next step, the quiz that just unlocked.
  useEffect(() => {
    if (justMarked) quizLink.current?.focus();
  }, [justMarked]);

  const hasVideo = getVideoSource(level.videoUrl) !== null;
  const details = [
    level.chapter === null ? null : `Chapter ${level.chapter}`,
    hasVideo ? level.duration : null,
  ].filter(Boolean);

  return (
    <>
      {/* A level has three steps: open it, watch the video, pass the quick check. */}
      <LevelHeader
        backHref="/path"
        backLabel="Back to your path"
        title={`Level ${level.id} of ${TOTAL_LEVELS}`}
        progress={watched ? 2 / 3 : 1 / 3}
        menu={<LevelMenu onOpenResource={() => setResourceOpen(true)} buttonRef={menuButton} />}
      />

      <div>
        <h1 className="text-h2 text-fg">{level.title}</h1>
        {details.length > 0 && <p className="mt-1 text-small text-muted">{details.join(" · ")}</p>}
      </div>

      {/* Playing the clip to the end marks the level as watched, the same as the button.
          Focus stays on the player, so unlike the button it isn't moved to the quiz. */}
      <VideoCard videoUrl={level.videoUrl} title={level.title} onEnded={() => markWatched(level.id)} />
      <TakeawayCard takeaways={level.takeaways} />

      {watched ? (
        <motion.p
          role="status"
          initial={startedWatched ? false : arrive.initial}
          animate={arrive.animate}
          transition={arrive.transition}
          className="flex h-12 items-center justify-center gap-2 rounded-control border border-brand/30 bg-primary-soft text-small font-semibold text-brand"
        >
          <CheckBadge />
          Watched
        </motion.p>
      ) : (
        <Button
          variant="soft"
          fullWidth
          onClick={() => {
            markWatched(level.id);
            setJustMarked(true);
          }}
        >
          <CircleCheck className="size-5" aria-hidden="true" />
          Mark as watched
        </Button>
      )}

      <QuizUnlockCard
        levelId={level.id}
        unlocked={watched}
        questionCount={level.quiz.length}
        linkRef={quizLink}
      />

      {resourceOpen && (
        // The menu item that opened the drawer is gone by now, so focus returns to the ⋮ button.
        <ResourceDrawer
          resource={level.resource}
          onClose={() => setResourceOpen(false)}
          returnFocus={menuButton}
        />
      )}
    </>
  );
}
