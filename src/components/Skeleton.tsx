/** Grey placeholder shown while saved progress is being read. */
export function Skeleton({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block animate-pulse rounded bg-surface-muted align-middle ${className ?? ""}`}
    />
  );
}
