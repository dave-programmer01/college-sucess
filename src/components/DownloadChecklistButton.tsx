"use client";

import { Download } from "lucide-react";
import { useState } from "react";
import { Button } from "./Button";

export function DownloadChecklistButton() {
  const [state, setState] = useState<"idle" | "working" | "failed">("idle");

  async function download() {
    setState("working");
    try {
      // The PDF code is large, so it is fetched only when someone asks for the file.
      const { downloadChecklist } = await import("@/lib/checklist-pdf");
      downloadChecklist(new Date());
      setState("idle");
    } catch {
      setState("failed");
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Button fullWidth onClick={download} disabled={state === "working"}>
        <Download className="size-5" aria-hidden="true" />
        {state === "working" ? "Preparing your checklist…" : "Download Your Checklist"}
      </Button>
      {state === "failed" && (
        <p role="alert" className="text-center text-small text-error-strong">
          The checklist couldn&apos;t be created. Check your connection and try again.
        </p>
      )}
    </div>
  );
}
