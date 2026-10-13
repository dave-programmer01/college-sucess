const ID = /^[\w-]{11}$/;

/**
 * Reads the video ID out of whatever was pasted into `videoUrl`: a bare ID, or
 * a watch, share (youtu.be), embed, shorts or live link. Returns null when
 * there is no video or the text isn't a YouTube link.
 */
export function getYouTubeId(input: string): string | null {
  const value = input.trim();
  if (!value) return null;
  if (ID.test(value)) return value;

  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^(www|m|music)\./, "");
  let id: string | null | undefined;
  if (host === "youtu.be") {
    id = url.pathname.split("/")[1];
  } else if (host === "youtube.com" || host === "youtube-nocookie.com") {
    id =
      url.pathname === "/watch"
        ? url.searchParams.get("v")
        : url.pathname.match(/^\/(?:embed|shorts|live|v)\/([^/]+)/)?.[1];
  }

  return id && ID.test(id) ? id : null;
}
