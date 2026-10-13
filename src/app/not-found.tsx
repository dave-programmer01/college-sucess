import type { Metadata } from "next";
import { AppColumn } from "@/components/AppColumn";
import { AppHeader } from "@/components/AppHeader";
import { ButtonLink } from "@/components/Button";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <AppColumn>
      <AppHeader />
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 pb-16 text-center">
        <h1 className="text-h2 text-fg">We couldn&apos;t find that page</h1>
        <p className="text-body text-muted">The link may be old, or the level doesn&apos;t exist.</p>
        <ButtonLink href="/path">Back to your path</ButtonLink>
      </main>
    </AppColumn>
  );
}
