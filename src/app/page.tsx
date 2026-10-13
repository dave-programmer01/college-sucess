import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { PageTransition } from "@/components/PageTransition";
import { ThemeToggle } from "@/components/ThemeToggle";

// Temporary: the full landing page (illustration and feature tiles) is built in phase 3.
export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col bg-canvas">
      <header className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-2 pr-2 pl-4 sm:px-6">
        <Logo />
        <ThemeToggle />
      </header>
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-12 sm:px-6">
        <PageTransition className="flex max-w-md flex-col items-start gap-4">
          <h1 className="text-h1 text-fg">
            Your first year at Lehman, <span className="text-brand">step by step.</span>
          </h1>
          <p className="text-body text-muted">
            Short videos. Key takeaways. Real resources. You got this.
          </p>
          <ButtonLink href="/path" className="mt-2">
            Start your path
            <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
        </PageTransition>
      </main>
    </div>
  );
}
