import { Check, X } from "lucide-react";

const sizes = {
  sm: { badge: "size-5", icon: "size-3" },
  md: { badge: "size-6", icon: "size-3.5" },
  lg: { badge: "size-9", icon: "size-5" },
};

type BadgeProps = { size?: keyof typeof sizes; className?: string };

/** Solid green circle with a check: takeaways, right answers, finished items. */
export function CheckBadge({ size = "sm", className = "" }: BadgeProps) {
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-full bg-brand text-canvas ${sizes[size].badge} ${className}`}
    >
      <Check className={sizes[size].icon} strokeWidth={3} />
    </span>
  );
}

/** Solid red circle with a cross: wrong answers. */
export function CrossBadge({ size = "sm", className = "" }: BadgeProps) {
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-full bg-danger text-white ${sizes[size].badge} ${className}`}
    >
      <X className={sizes[size].icon} strokeWidth={3} />
    </span>
  );
}
