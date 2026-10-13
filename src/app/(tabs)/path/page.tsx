import type { Metadata } from "next";
import { PageTransition } from "@/components/PageTransition";
import { PathOverview } from "@/components/PathOverview";

export const metadata: Metadata = { title: "Your Path" };

export default function PathPage() {
  return (
    <PageTransition className="flex flex-col gap-4">
      <h1 className="sr-only">Your path</h1>
      <PathOverview />
    </PageTransition>
  );
}
