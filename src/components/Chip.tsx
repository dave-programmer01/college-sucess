import { Tag } from "lucide-react";

/** Small green label, used for a resource's category. */
export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 self-start rounded-full border border-brand/30 bg-primary-soft px-2.5 py-0.5 text-caption font-medium text-brand">
      <Tag className="size-3" aria-hidden="true" />
      {children}
    </span>
  );
}
