import { PageTransition } from "./PageTransition";

/** Temporary stand-in for screens that are built in a later phase. */
export function PhaseStub({ title, phase }: { title: string; phase: number }) {
  return (
    <PageTransition className="flex flex-col gap-4">
      <h1 className="text-h2 text-fg">{title}</h1>
      <div className="rounded-card border border-line bg-surface p-4 shadow-card">
        <p className="text-body text-fg">This screen is built in phase {phase}.</p>
        <p className="mt-1 text-small text-muted">
          The header, theme toggle and bottom navigation around it are final.
        </p>
      </div>
    </PageTransition>
  );
}
