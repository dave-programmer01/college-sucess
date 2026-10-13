"use client";

import { useId, useLayoutEffect, useState } from "react";
import { useProgress } from "@/lib/progress-context";
import { Button } from "./Button";

export function ResetProgress() {
  const { reset } = useProgress();
  const [confirming, setConfirming] = useState(false);
  const titleId = useId();

  // Next keeps this page alive when you navigate away; don't come back to an open confirmation.
  useLayoutEffect(() => () => setConfirming(false), []);

  if (!confirming) {
    return (
      <Button variant="outline" onClick={() => setConfirming(true)} className="self-start">
        Reset progress
      </Button>
    );
  }

  return (
    <div
      role="alertdialog"
      aria-labelledby={titleId}
      className="flex flex-col gap-3 rounded-card border border-error/40 bg-error-soft p-4"
    >
      <p id={titleId} className="text-body text-fg">
        Clear your levels, XP and streak on this device? This can&apos;t be undone.
      </p>
      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setConfirming(false)}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            reset();
            setConfirming(false);
          }}
        >
          Yes, reset
        </Button>
      </div>
    </div>
  );
}
