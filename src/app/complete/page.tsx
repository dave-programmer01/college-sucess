import type { Metadata } from "next";
import { AppColumn } from "@/components/AppColumn";
import { BottomNav } from "@/components/BottomNav";
import { CompleteGate } from "@/components/CompleteGate";
import { CompletionChecklist } from "@/components/CompletionChecklist";
import { DownloadChecklistButton } from "@/components/DownloadChecklistButton";
import { Campus } from "@/components/illustrations/Campus";
import { PageTransition } from "@/components/PageTransition";
import { TOTAL_LEVELS } from "@/data/levels";

export const metadata: Metadata = { title: "Your checklist" };

// As in the mockup, the final screen has the bottom nav but no app header.
export default function CompletePage() {
  return (
    <AppColumn>
      <main className="flex flex-1 flex-col px-4 pt-6 pb-6">
        <CompleteGate>
          <PageTransition className="flex flex-col gap-5">
            <div className="flex flex-col items-center text-center">
              <Campus className="h-auto w-64 max-w-full" />
              <h1 className="mt-2 text-h1 text-fg">You did it!</h1>
              <p className="mt-1 text-body text-muted">You completed all {TOTAL_LEVELS} levels.</p>
            </div>
            <CompletionChecklist />
            <DownloadChecklistButton />
            <p className="text-center text-small text-muted italic">Next chapter: your Lehman story.</p>
          </PageTransition>
        </CompleteGate>
      </main>
      <BottomNav />
    </AppColumn>
  );
}
