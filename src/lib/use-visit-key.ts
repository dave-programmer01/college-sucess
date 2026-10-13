import { useLayoutEffect, useState } from "react";

/**
 * A number that changes each time the page is hidden by navigation. Use it as
 * a React `key` on content that should start fresh when the page is shown again.
 *
 * Next keeps recently visited pages mounted but hidden instead of unmounting
 * them. An animation cut off by that hiding never finishes, so without a fresh
 * start a half-faded page or a missing list row would still be there on return.
 * It also clears in-page state such as an open dialog or a half-answered quiz.
 */
export function useVisitKey() {
  const [visit, setVisit] = useState(0);
  // The cleanup runs when the page is hidden, as well as on unmount.
  useLayoutEffect(() => () => setVisit((count) => count + 1), []);
  return visit;
}
