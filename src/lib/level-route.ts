import { existsSync } from "node:fs";
import path from "node:path";
import { getLevel, levels } from "@/data/levels";
import { getVideoSource } from "./video";

/** Shared by the /level/[id] and /level/[id]/check pages. */

export function levelStaticParams() {
  return levels.map((level) => ({ id: String(level.id) }));
}

export function levelFromParam(id: string) {
  return /^\d+$/.test(id) ? getLevel(Number(id)) : undefined;
}

/**
 * Catches content mistakes in src/data/levels.ts while building or running
 * `next dev`, instead of leaving a student stuck on a level that can't be
 * finished. A video problem only warns: the level still works and shows the
 * "Video coming soon" card.
 */
function checkLevels() {
  levels.forEach((level, index) => {
    const where = `src/data/levels.ts, level ${level.id} ("${level.title}")`;

    if (level.id !== index) {
      throw new Error(`${where}: ids must count up from 0 in order; expected id ${index}.`);
    }
    if (level.quiz.length === 0) {
      throw new Error(`${where}: needs at least one quiz question.`);
    }
    level.quiz.forEach((question, number) => {
      const valid =
        Number.isInteger(question.correctIndex) &&
        question.correctIndex >= 0 &&
        question.correctIndex < question.options.length;
      if (question.options.length < 2 || !valid) {
        throw new Error(
          `${where}, question ${number + 1}: correctIndex is ${question.correctIndex} but there are ` +
            `${question.options.length} options. Use 0 for A, 1 for B, and so on.`,
        );
      }
    });
    const video = getVideoSource(level.videoUrl);
    if (level.videoUrl.trim() && !video) {
      console.warn(
        `${where}: videoUrl "${level.videoUrl}" isn't a file in public/videos or a YouTube ID or link, ` +
          `so "Video coming soon" is shown.`,
      );
    } else if (video?.kind === "file" && !existsSync(path.join(process.cwd(), "public", video.src))) {
      console.warn(
        `${where}: videoUrl "${video.src}" points to public${video.src}, which doesn't exist, ` +
          `so "Video coming soon" is shown. Check the file name.`,
      );
    } else if (video?.kind === "file" && !existsSync(path.join(process.cwd(), "public", video.poster))) {
      console.warn(
        `${where}: there is no still image at public${video.poster}, so the player may look ` +
          `black on iPhones until it is played. Make one with: ` +
          `ffmpeg -ss 1 -i public${video.src} -frames:v 1 -q:v 3 public${video.poster}`,
      );
    }
  });
}

checkLevels();
