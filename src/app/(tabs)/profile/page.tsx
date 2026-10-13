import type { Metadata } from "next";
import { PageTransition } from "@/components/PageTransition";
import { ProfileStats } from "@/components/ProfileStats";
import { ResetProgress } from "@/components/ResetProgress";
import { ThemeToggle } from "@/components/ThemeToggle";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Profile",
  "Your finished levels, XP and streak, the light or dark theme, and the option to start over.",
);

export default function ProfilePage() {
  return (
    <PageTransition className="flex flex-col gap-6">
      <h1 className="text-h2 text-fg">Profile</h1>

      <ProfileStats />

      <section className="flex items-center justify-between rounded-card border border-line bg-surface py-1 pr-1 pl-4 shadow-card">
        <h2 className="text-body text-fg">Appearance</h2>
        <ThemeToggle />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-h4 text-fg">Start over</h2>
        <p className="text-small text-muted">
          Progress is saved in this browser only. Resetting locks every level after the first.
        </p>
        <ResetProgress />
      </section>
    </PageTransition>
  );
}
