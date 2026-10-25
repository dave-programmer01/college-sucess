"use client";

import { motion } from "framer-motion";
import { BookOpen, House, MapPin, User, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePressable } from "@/lib/use-pressable";
import { useVisitKey } from "@/lib/use-visit-key";

const MotionLink = motion.create(Link);

type Tab = {
  href: string;
  label: string;
  icon: LucideIcon;
  /** Other routes that keep this tab highlighted. */
  alsoActiveOn?: string[];
};

const tabs: Tab[] = [
  { href: "/", label: "Home", icon: House },
  { href: "/path", label: "Path", icon: MapPin, alsoActiveOn: ["/complete"] },
  { href: "/resources", label: "Resources", icon: BookOpen },
  { href: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();
  const visit = useVisitKey();
  // Tabs only press in on tap. Growing on hover would push the right-most tab
  // past the screen edge and make the page scroll sideways.
  const pressable = usePressable("row");

  return (
    <nav
      aria-label="Main"
      className="sticky bottom-0 z-30 border-t border-line bg-canvas/95 pb-[env(safe-area-inset-bottom)] backdrop-blur"
    >
      <ul key={visit} className="grid grid-cols-4">
        {tabs.map(({ href, label, icon: Icon, alsoActiveOn }) => {
          const active = pathname === href || alsoActiveOn?.includes(pathname);
          return (
            <li key={href}>
              <MotionLink
                href={href}
                {...pressable}
                aria-current={active ? "page" : undefined}
                className={`flex h-16 flex-col items-center justify-center gap-1 text-caption font-medium transition-colors ${
                  active ? "text-brand" : "text-muted hover:text-fg"
                }`}
              >
                <Icon
                  className="size-[22px]"
                  strokeWidth={active ? 2.25 : 1.75}
                  aria-hidden="true"
                />
                {label}
              </MotionLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
