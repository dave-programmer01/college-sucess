"use client";

import { useRouter } from "next/navigation";
import { useProgress } from "@/lib/progress-context";
import { Button, ButtonLink } from "./Button";

/**
 * Temporary, phase 3 only: finishes a level in one tap so the path map's
 * progress and unlock behaviour can be tried. Phase 4 replaces this with the
 * video, "Mark as watched" and the quiz.
 */
export function TempCompleteLevel({ levelId }: { levelId: number }) {
  const { statusOf, markWatched, completeLevel } = useProgress();
  const router = useRouter();

  if (statusOf(levelId) === "completed") {
    return (
      <div className="flex flex-col items-start gap-3">
        <p className="text-body text-muted">You already finished this level.</p>
        <ButtonLink href="/path" variant="outline">
          Back to your path
        </ButtonLink>
      </div>
    );
  }

  return (
    <Button
      onClick={() => {
        markWatched(levelId);
        completeLevel(levelId);
        router.push("/path");
      }}
    >
      Complete this level (temporary)
    </Button>
  );
}
