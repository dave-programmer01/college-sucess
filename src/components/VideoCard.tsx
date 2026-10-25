"use client";

import { motion } from "framer-motion";
import { Clapperboard, Play } from "lucide-react";
import { useState } from "react";
import { usePressable } from "@/lib/use-pressable";
import { getVideoSource } from "@/lib/video";
import { MediaPlaceholder } from "./illustrations/MediaPlaceholder";

const frame = "relative aspect-video w-full overflow-hidden rounded-card shadow-card";

type VideoCardProps = {
  /** videoUrl from levels.ts: a clip in public/videos, a YouTube ID or link, or "" for "Video coming soon". */
  videoUrl: string;
  title: string;
  /** Called when a clip stored with the app plays to the end. */
  onEnded?: () => void;
};

export function VideoCard({ videoUrl, title, onEnded }: VideoCardProps) {
  const [playing, setPlaying] = useState(false);
  // A clip that can't be loaded, such as a missing file, falls back to "Video coming soon".
  const [broken, setBroken] = useState(false);
  const source = getVideoSource(videoUrl);
  const tap = usePressable("row");

  if (!source || broken) {
    return (
      <div className={`${frame} grid place-items-center border border-line bg-surface-muted`}>
        <MediaPlaceholder building={false} className="absolute inset-0 size-full" />
        <p className="relative flex items-center gap-2 rounded-full bg-surface py-2 pr-5 pl-2 text-h4 text-fg shadow-card">
          <span className="grid size-9 place-items-center rounded-full bg-primary-soft text-brand">
            <Clapperboard className="size-5" aria-hidden="true" />
          </span>
          Video coming soon
        </p>
      </div>
    );
  }

  // A clip in public/videos plays in the browser's own player. Until the student
  // presses play it shows the clip's still image and loads only its length.
  if (source.kind === "file") {
    return (
      <div className={`${frame} bg-black`}>
        <video
          className="size-full object-contain"
          src={source.src}
          poster={source.poster}
          controls
          playsInline
          preload="metadata"
          aria-label={`Video: ${title}`}
          onEnded={onEnded}
          onError={() => setBroken(true)}
        />
      </div>
    );
  }

  // The YouTube player is only loaded once the student presses play. Until
  // then this is a still image, which is lighter and shares nothing with YouTube.
  if (!playing) {
    return (
      <motion.button
        type="button"
        onClick={() => setPlaying(true)}
        aria-label={`Play video: ${title}`}
        {...tap}
        className={`${frame} block bg-surface-muted bg-cover bg-center`}
        style={{ backgroundImage: `url(https://i.ytimg.com/vi/${source.id}/hqdefault.jpg)` }}
      >
        <span className="absolute inset-0 bg-black/20" />
        <span className="absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-primary shadow-raised">
          <Play className="size-6 translate-x-0.5 fill-current" aria-hidden="true" />
        </span>
      </motion.button>
    );
  }

  return (
    <div className={`${frame} bg-black`}>
      <iframe
        className="size-full"
        src={`https://www.youtube-nocookie.com/embed/${source.id}?autoplay=1&rel=0&playsinline=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}
