import { useReducedMotion } from "framer-motion";
import { pressable } from "./motion";

const tapOnly = { whileTap: pressable.whileTap, transition: pressable.transition };

/**
 * Hover and press feedback to spread onto a motion element:
 * "button" grows slightly on hover and presses in on tap; "row" only presses in.
 *
 * Returns nothing for people who asked their device for reduced motion.
 * Framer Motion's own reduced-motion setting stops things animating, but it
 * would still snap a hovered button to its larger size.
 */
export function usePressable(kind: "button" | "row" = "button") {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return {};
  return kind === "button" ? pressable : tapOnly;
}
