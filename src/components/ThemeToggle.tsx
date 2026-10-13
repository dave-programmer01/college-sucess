"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { pressable } from "@/lib/motion";
import { useHydrated } from "@/lib/use-hydrated";

const base =
  "grid size-10 place-items-center rounded-full transition-colors hover:bg-surface-muted";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // The theme is only known in the browser. Until then the active icon is
  // picked by CSS alone, so server and client markup match.
  const hydrated = useHydrated();

  return (
    <div className="flex items-center" role="group" aria-label="Theme">
      <motion.button
        type="button"
        {...pressable}
        onClick={() => setTheme("light")}
        aria-label="Light theme"
        aria-pressed={hydrated ? resolvedTheme === "light" : undefined}
        className={`${base} text-brand dark:text-muted`}
      >
        <Sun className="size-5" aria-hidden="true" />
      </motion.button>
      <motion.button
        type="button"
        {...pressable}
        onClick={() => setTheme("dark")}
        aria-label="Dark theme"
        aria-pressed={hydrated ? resolvedTheme === "dark" : undefined}
        className={`${base} text-muted dark:text-brand`}
      >
        <Moon className="size-5" aria-hidden="true" />
      </motion.button>
    </div>
  );
}
