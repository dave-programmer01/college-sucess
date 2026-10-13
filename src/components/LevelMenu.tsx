"use client";

import { motion } from "framer-motion";
import { EllipsisVertical, Landmark, Route } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { pressable } from "@/lib/motion";

const item =
  "flex w-full items-center gap-3 rounded-control px-3 py-2.5 text-left text-small text-fg transition-colors hover:bg-surface-muted";

type LevelMenuProps = {
  onOpenResource: () => void;
  /** The ⋮ button, so focus can be handed back to it after the drawer closes. */
  buttonRef: React.RefObject<HTMLButtonElement | null>;
};

/** The ⋮ menu in a level's header. */
export function LevelMenu({ onOpenResource, buttonRef }: LevelMenuProps) {
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);
  const menuId = useId();

  // While open: a tap anywhere else or Escape closes it.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapper.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, buttonRef]);

  return (
    <div ref={wrapper} className="relative">
      <motion.button
        ref={buttonRef}
        type="button"
        aria-label="More options"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen(!open)}
        {...pressable}
        className="-mr-2 grid size-10 place-items-center rounded-full text-fg transition-colors hover:bg-surface-muted"
      >
        <EllipsisVertical className="size-5" aria-hidden="true" />
      </motion.button>

      {open && (
        <motion.div
          id={menuId}
          initial={{ opacity: 0, scale: 0.95, y: -4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="absolute top-full right-0 z-20 mt-1 w-72 origin-top-right rounded-card border border-line bg-surface p-1 shadow-raised"
        >
          <button
            type="button"
            className={item}
            onClick={() => {
              setOpen(false);
              onOpenResource();
            }}
          >
            <Landmark className="size-4 text-brand" aria-hidden="true" />
            Lehman resource for this level
          </button>
          <Link href="/path" className={item}>
            <Route className="size-4 text-brand" aria-hidden="true" />
            Back to your path
          </Link>
        </motion.div>
      )}
    </div>
  );
}
