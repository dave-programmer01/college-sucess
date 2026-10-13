"use client";

import { motion } from "framer-motion";
import { Clock, ExternalLink, MapPin, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import type { Resource } from "@/data/levels";
import { sheet } from "@/lib/motion";
import { usePressable } from "@/lib/use-pressable";
import { Button, ButtonLink } from "./Button";
import { Chip } from "./Chip";
import { LogoMark } from "./Logo";
import { Modal } from "./Modal";
import { ResourceImage } from "./ResourceImage";

type ResourceDrawerProps = {
  resource: Resource;
  /** Called once the drawer has finished closing. */
  onClose: () => void;
  /** Where focus goes afterwards, when the control that opened the drawer no longer exists. */
  returnFocus?: React.RefObject<HTMLElement | null>;
};

/**
 * Full details for one Lehman resource. A sheet from the bottom on phones and
 * a centred card on wider screens.
 */
export function ResourceDrawer({ resource, onClose, returnFocus }: ResourceDrawerProps) {
  const [closing, setClosing] = useState(false);
  const titleId = useId();
  const textId = useId();
  const pressable = usePressable();

  // Let the drawer drop away before it is removed.
  useEffect(() => {
    if (!closing) return;
    const timer = setTimeout(onClose, sheet.exitMs);
    return () => clearTimeout(timer);
  }, [closing, onClose]);

  const close = () => setClosing(true);

  return (
    <Modal
      placement="sheet"
      labelledBy={titleId}
      describedBy={textId}
      onEscape={close}
      onBackdropClick={close}
      closing={closing}
      returnFocus={returnFocus}
    >
      <motion.div
        initial={sheet.hidden}
        animate={closing ? sheet.hidden : sheet.shown}
        transition={sheet.transition}
        className="flex max-h-[92dvh] w-full max-w-[480px] flex-col gap-4 overflow-y-auto rounded-t-card bg-surface p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-raised sm:max-w-md sm:rounded-card"
      >
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-2 text-h4 text-fg">
            <LogoMark className="size-6" />
            Lehman Resource
          </p>
          <motion.button
            type="button"
            onClick={close}
            aria-label="Close"
            {...pressable}
            className="-mr-3 grid size-11 place-items-center rounded-full text-muted transition-colors hover:bg-surface-muted"
          >
            <X className="size-5" aria-hidden="true" />
          </motion.button>
        </div>

        <ResourceImage
          src={resource.image}
          sizes="(min-width: 640px) 416px, 100vw"
          className="aspect-video w-full shrink-0 rounded-control"
        />

        <div className="flex flex-col gap-2">
          <h2 id={titleId} className="text-h3 text-fg">
            {resource.name}
          </h2>
          <Chip>{resource.tag}</Chip>
          <p id={textId} className="text-small text-muted">
            {resource.description}
          </p>
        </div>

        <dl className="flex flex-col gap-3 text-small text-fg">
          <div className="flex items-start gap-3">
            <dt>
              <MapPin className="size-5 text-muted" aria-hidden="true" />
              <span className="sr-only">Location</span>
            </dt>
            <dd>{resource.location}</dd>
          </div>
          <div className="flex items-start gap-3">
            <dt>
              <Clock className="size-5 text-muted" aria-hidden="true" />
              <span className="sr-only">Hours</span>
            </dt>
            <dd>{resource.hours}</dd>
          </div>
        </dl>

        <div className="flex flex-col gap-3">
          {resource.url && (
            <ButtonLink href={resource.url} external variant="outline" fullWidth>
              Visit website
              <ExternalLink className="size-4" aria-hidden="true" />
            </ButtonLink>
          )}
          <Button fullWidth onClick={close}>
            Close
          </Button>
        </div>
      </motion.div>
    </Modal>
  );
}
