import { getYouTubeId } from "./youtube";

export type VideoSource =
  | { kind: "file"; src: string; poster: string }
  | { kind: "youtube"; id: string };

/**
 * A clip's still image, shown before it plays. It sits next to the clip under
 * the same name: /videos/level-1-community.mp4 → /videos/posters/level-1-community.jpg
 */
export function posterFor(src: string) {
  const name = src.slice("/videos/".length).replace(/\.[^./]+$/, "");
  return `/videos/posters/${name}.jpg`;
}

/**
 * What a level's `videoUrl` points at: a clip stored in public/videos
 * ("/videos/name.mp4"), a YouTube video (ID or link), or nothing.
 */
export function getVideoSource(videoUrl: string): VideoSource | null {
  const value = videoUrl.trim();
  if (value.startsWith("/videos/")) return { kind: "file", src: value, poster: posterFor(value) };
  const id = getYouTubeId(value);
  return id ? { kind: "youtube", id } : null;
}
