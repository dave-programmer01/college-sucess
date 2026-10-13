import type { Transition, Variants } from "framer-motion";

/** Shared Framer Motion settings so every screen moves the same way. */

export const pressable = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.15, ease: "easeOut" },
} as const;

export const pageTransition = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
  transition: { duration: 0.25, ease: "easeOut" },
} as const;

/** Parent of a list whose children appear one after another. */
export const staggerList: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

/** Gentle breathing on the current level node. */
export const pulse = {
  animate: { scale: [1, 1.06, 1] },
  transition: { duration: 1.5, ease: "easeInOut", repeat: Infinity } satisfies Transition,
};

export const progressFill: Transition = { duration: 0.6, ease: "easeOut" };

/** Quiz: a right answer pops, a wrong one gives a small sideways shake. */
export const pop = {
  scale: [1, 1.04, 1],
  transition: { duration: 0.3, ease: "easeOut" } satisfies Transition,
};

export const shake = {
  x: [0, -6, 6, -4, 4, 0],
  transition: { duration: 0.35, ease: "easeInOut" } satisfies Transition,
};

/** A panel or card arriving: used by quiz feedback and the Level Complete card. */
export const arrive = {
  initial: { opacity: 0, scale: 0.92, y: 12 },
  animate: { opacity: 1, scale: 1, y: 0 },
  transition: { duration: 0.3, ease: "easeOut" } satisfies Transition,
};

export const starBounce = {
  initial: { scale: 0, rotate: -25 },
  animate: { scale: 1, rotate: 0 },
  transition: { type: "spring", stiffness: 260, damping: 9, delay: 0.15 } satisfies Transition,
};

/** A level unlocking: the lock leaves and the node fills with colour. */
export const unlock = {
  /** Wait for the path to finish staggering in before the unlock plays. */
  delayMs: 900,
  durationMs: 400,
  fill: { duration: 0.4, ease: "easeOut" } satisfies Transition,
  swap: { duration: 0.2, ease: "easeOut" } satisfies Transition,
};
