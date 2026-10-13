import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-2 bg-canvas/90 pr-2 pl-4 backdrop-blur">
      <Logo />
      <ThemeToggle />
    </header>
  );
}
