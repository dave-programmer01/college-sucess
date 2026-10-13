import { getLevel, levels } from "@/data/levels";
import { getYouTubeId } from "./youtube";

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
 * finished. A video link that can't be read only warns: the level still works
 * and shows the "Video coming soon" card.
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
    if (level.videoUrl.trim() && !getYouTubeId(level.videoUrl)) {
      console.warn(
        `${where}: videoUrl "${level.videoUrl}" isn't a YouTube ID or link, so "Video coming soon" is shown.`,
      );
    }
  });
}

checkLevels();
