import { getYouTubeId } from "./youtube";

export type VideoSource = { kind: "file"; src: string } | { kind: "youtube"; id: string };

/**
 * What a level's `videoUrl` points at: a clip stored in public/videos
 * ("/videos/name.mp4"), a YouTube video (ID or link), or nothing.
 */
export function getVideoSource(videoUrl: string): VideoSource | null {
  const value = videoUrl.trim();
  if (value.startsWith("/videos/")) return { kind: "file", src: value };
  const id = getYouTubeId(value);
  return id ? { kind: "youtube", id } : null;
}
