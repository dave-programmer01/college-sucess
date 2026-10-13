import type { Metadata } from "next";
import { PageTransition } from "@/components/PageTransition";
import { ResourceList } from "@/components/ResourceList";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Resources",
  "The Lehman offices and services that go with each level: what they help with, where they are and when they are open.",
);

export default function ResourcesPage() {
  return (
    <PageTransition className="flex flex-col gap-4">
      <div>
        <h1 className="text-h2 text-fg">Resources</h1>
        <p className="mt-1 text-small text-muted">
          Lehman offices and services for each step of your first year.
        </p>
      </div>
      <ResourceList />
    </PageTransition>
  );
}
