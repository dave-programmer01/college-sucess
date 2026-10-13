/**
 * Fires one confetti burst on the given canvas and returns a function that
 * clears it. The library is only downloaded when a level is actually finished,
 * and it does nothing for people who asked their device for reduced motion.
 */
export async function burstConfetti(canvas: HTMLCanvasElement) {
  const { default: confetti } = await import("canvas-confetti");
  const fire = confetti.create(canvas, { resize: true, disableForReducedMotion: true });
  const colors = ["#0f766e", "#14b8a6", "#f59e0b", "#fbbf24", "#f97316", "#ffffff"];

  fire({ particleCount: 70, spread: 75, startVelocity: 38, origin: { x: 0.5, y: 0.42 }, colors });
  fire({ particleCount: 30, spread: 110, startVelocity: 26, scalar: 0.8, origin: { x: 0.5, y: 0.4 }, colors });

  return () => fire.reset();
}
