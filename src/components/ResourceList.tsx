"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { levels } from "@/data/levels";
import { staggerItem, staggerList } from "@/lib/motion";
import { ResourceCard } from "./ResourceCard";
import { ResourceDrawer } from "./ResourceDrawer";

/** Every level's resource, each opening the drawer with its details. */
export function ResourceList() {
  const [openId, setOpenId] = useState<number | null>(null);
  const open = levels.find((level) => level.id === openId);

  return (
    <>
      <motion.ul variants={staggerList} initial="hidden" animate="visible" className="flex flex-col gap-3">
        {levels.map((level) => (
          <motion.li key={level.id} variants={staggerItem}>
            <ResourceCard
              resource={level.resource}
              caption={`Level ${level.id} · ${level.title}`}
              onOpen={() => setOpenId(level.id)}
            />
          </motion.li>
        ))}
      </motion.ul>

      {open && <ResourceDrawer resource={open.resource} onClose={() => setOpenId(null)} />}
    </>
  );
}
