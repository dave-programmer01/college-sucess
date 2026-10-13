"use client";

import { motion } from "framer-motion";
import { useLayoutEffect, useRef } from "react";

type ModalProps = {
  /** Id of the element that titles the dialog. */
  labelledBy: string;
  describedBy?: string;
  /** Escape key (or the back gesture on some devices). */
  onEscape: () => void;
  /** A tap on the dimmed area outside the content. Leave out to ignore those taps. */
  onBackdropClick?: () => void;
  /** Fades the dimmed background out; set while a closing animation plays. */
  closing?: boolean;
  /** Centred card, or a sheet that rises from the bottom on phones. */
  placement?: "center" | "sheet";
  /**
   * Where keyboard focus goes when this closes. By default it returns to
   * whatever was focused before; pass this when that element will be gone.
   */
  returnFocus?: React.RefObject<HTMLElement | null>;
  children: React.ReactNode;
};

const layouts = {
  center: "items-center justify-center gap-6 px-6 py-10",
  sheet: "items-center justify-end sm:justify-center sm:p-6",
};

/**
 * Shell for anything shown over the page. It is a native modal dialog, so the
 * browser traps keyboard focus inside it and makes the page behind it inert.
 */
export function Modal({
  labelledBy,
  describedBy,
  onEscape,
  onBackdropClick,
  closing = false,
  placement = "center",
  returnFocus,
  children,
}: ModalProps) {
  const dialog = useRef<HTMLDialogElement>(null);

  // A layout effect, so the dialog is closed while it is still in the page:
  // only then is the rest of the page focusable again and focus can be handed back.
  useLayoutEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const focusTarget = returnFocus?.current ?? document.activeElement;
    if (!element.open) element.showModal();

    return () => {
      element.close();
      if (focusTarget instanceof HTMLElement && focusTarget.isConnected) focusTarget.focus();
    };
  }, [returnFocus]);

  return (
    <dialog
      ref={dialog}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      onCancel={(event) => {
        event.preventDefault();
        onEscape();
      }}
      className="fixed inset-0 m-0 size-full max-h-none max-w-none overflow-y-auto bg-transparent p-0 backdrop:bg-transparent"
    >
      <motion.div
        className="fixed inset-0 bg-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: closing ? 0 : 1 }}
        transition={{ duration: 0.25 }}
      />
      <div
        className={`relative flex min-h-full flex-col ${layouts[placement]}`}
        // Only a tap on the empty area counts, not one that started inside the content.
        onClick={(event) => {
          if (event.target === event.currentTarget) onBackdropClick?.();
        }}
      >
        {children}
      </div>
    </dialog>
  );
}
