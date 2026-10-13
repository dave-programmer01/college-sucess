import type { Metadata } from "next";
import { TOTAL_LEVELS } from "@/data/levels";

export const SITE_NAME = "First Year, Level by Level";

export const SITE_DESCRIPTION = `Your first year at Lehman College, step by step: ${TOTAL_LEVELS} short levels, each with a video, key takeaways, a quick check and a campus resource.`;

/**
 * Title, description and the matching link-preview tags for one page.
 * The preview tags are repeated here because a page's `openGraph` replaces
 * the layout's instead of adding to it.
 */
export function pageMetadata(title: string, description: string): Metadata {
  return {
    title,
    description,
    openGraph: {
      title: `${title} · ${SITE_NAME}`,
      description,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
    },
  };
}
