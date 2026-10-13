import Link from "next/link";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={className ?? "size-7"}
    >
      <path d="M16 29.5C8.6 26.4 4.5 20.6 4.5 12.4V5.5L16 10v19.5Z" fill="var(--primary)" />
      <path d="M16 29.5c7.4-3.1 11.5-8.9 11.5-17.1V5.5L16 10v19.5Z" fill="var(--primary-light)" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="flex min-w-0 items-center gap-2 rounded-control py-2">
      <LogoMark className="size-7 shrink-0" />
      <span className="text-[0.8125rem] font-semibold whitespace-nowrap text-fg min-[360px]:text-h4">
        <span className="text-brand">First Year,</span> Level by Level
      </span>
    </Link>
  );
}
