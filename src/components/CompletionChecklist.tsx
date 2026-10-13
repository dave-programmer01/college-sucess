"use client";

import { motion } from "framer-motion";
import { levels } from "@/data/levels";
import { staggerItem, staggerList } from "@/lib/motion";
import { CheckBadge } from "./CheckBadge";

/** All levels, each ticked off. Shown on the final screen. */
export function CompletionChecklist() {
  return (
    <motion.ol
      variants={staggerList}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-3 rounded-card border border-line bg-surface p-4 shadow-card"
    >
      {levels.map((level) => (
        <motion.li key={level.id} variants={staggerItem} className="flex items-center gap-3 text-small text-fg">
          <CheckBadge />
          <span>
            <span className="sr-only">Completed: level </span>
            {level.id}. {level.title}
          </span>
        </motion.li>
      ))}
    </motion.ol>
  );
}
