"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { Resource } from "@/data/levels";
import { usePressable } from "@/lib/use-pressable";
import { Chip } from "./Chip";
import { ResourceImage } from "./ResourceImage";

type ResourceCardProps = {
  resource: Resource;
  /** Small line above the name, such as which level it belongs to. */
  caption?: string;
  /** Opens the drawer with the full details. */
  onOpen: () => void;
};

export function ResourceCard({ resource, caption, onOpen }: ResourceCardProps) {
  const pressable = usePressable();

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      {...pressable}
      className="flex w-full items-center gap-3 rounded-card border border-line bg-surface p-3 text-left shadow-card transition-shadow hover:shadow-raised"
    >
      <ResourceImage src={resource.image} sizes="64px" className="size-16 shrink-0 rounded-control" />
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        {caption && <span className="text-caption text-muted">{caption}</span>}
        <span className="text-h4 text-fg">{resource.name}</span>
        <Chip>{resource.tag}</Chip>
        <span className="line-clamp-2 text-small text-muted">{resource.description}</span>
      </span>
      <ChevronRight className="size-4 shrink-0 text-muted" aria-hidden="true" />
    </motion.button>
  );
}
