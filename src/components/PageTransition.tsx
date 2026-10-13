"use client";

import { motion } from "framer-motion";
import { pageTransition } from "@/lib/motion";
import { useHydrated } from "@/lib/use-hydrated";

/**
 * Fades and slides a page in when you navigate to it.
 * The first page load is left alone so server-rendered content is visible
 * straight away instead of waiting for JavaScript.
 */
export function PageTransition({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const hydrated = useHydrated();

  return (
    <motion.div
      className={className}
      initial={hydrated ? pageTransition.hidden : false}
      animate={pageTransition.visible}
      transition={pageTransition.transition}
    >
      {children}
    </motion.div>
  );
}
