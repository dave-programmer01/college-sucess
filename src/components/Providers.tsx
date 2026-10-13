"use client";

import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { ProgressProvider } from "@/lib/progress-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {/* "user" drops movement and keeps fades when the OS asks for reduced motion. */}
      <MotionConfig reducedMotion="user">
        <ProgressProvider>{children}</ProgressProvider>
      </MotionConfig>
    </ThemeProvider>
  );
}
