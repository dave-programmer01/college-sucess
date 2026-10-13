import type { Metadata } from "next";
import { PageTransition } from "@/components/PageTransition";
import { PathOverview } from "@/components/PathOverview";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Your Path",
  "See how far you are through the levels, check your streak and XP, and pick up where you left off.",
);

export default function PathPage() {
  return (
    <PageTransition className="flex flex-col gap-4">
      <h1 className="sr-only">Your path</h1>
      <PathOverview />
    </PageTransition>
  );
}
