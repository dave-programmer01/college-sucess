import { ArrowRight, KeyRound, MonitorPlay, Rocket, Target, type LucideIcon } from "lucide-react";
import { ButtonLink } from "@/components/Button";
import { HeroPath } from "@/components/illustrations/HeroPath";
import { Logo } from "@/components/Logo";
import { PageTransition } from "@/components/PageTransition";
import { ThemeToggle } from "@/components/ThemeToggle";

const features: { title: string; text: string; icon: LucideIcon }[] = [
  { title: "Learn", text: "Quick, focused video guides", icon: MonitorPlay },
  { title: "Practice", text: "Short checks to build confidence", icon: Target },
  { title: "Access", text: "Lehman resources when you need them", icon: KeyRound },
  { title: "Grow", text: "One step at a time", icon: Rocket },
];

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col bg-canvas">
      <header className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-2 pr-2 pl-4 sm:px-6">
        <Logo />
        <ThemeToggle />
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-10 sm:px-6">
        <PageTransition className="flex flex-col gap-8 md:gap-10">
          <section className="grid items-center gap-8 pt-4 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:pt-8">
            <div className="flex flex-col items-start gap-4">
              <h1 className="text-h1 text-fg md:text-[2.5rem] md:leading-[3rem]">
                Your first year at Lehman, step by step.
              </h1>
              <p className="max-w-xs text-body text-muted">
                Short videos. Key takeaways. Real resources. You got this.
              </p>
              <ButtonLink href="/path" className="mt-2">
                Start your path
                <ArrowRight className="size-4" aria-hidden="true" />
              </ButtonLink>
            </div>
            <HeroPath className="h-auto w-full rounded-card" />
          </section>

          <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-0 md:rounded-card md:border md:border-line md:bg-surface md:shadow-card">
            {features.map(({ title, text, icon: Icon }) => (
              <li
                key={title}
                className="flex flex-col items-center gap-2 rounded-card border border-line bg-surface px-3 py-5 text-center md:rounded-none md:border-0 md:border-r md:bg-transparent md:px-4 md:py-6 md:last:border-r-0"
              >
                <span className="grid size-11 place-items-center rounded-control bg-primary-soft text-brand">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h2 className="text-h4 text-fg">{title}</h2>
                <p className="text-small text-muted">{text}</p>
              </li>
            ))}
          </ul>
        </PageTransition>
      </main>
    </div>
  );
}
