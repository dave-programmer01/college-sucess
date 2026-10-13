import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AppColumn } from "@/components/AppColumn";
import { LevelGate } from "@/components/LevelGate";
import { LevelSkeleton } from "@/components/LevelSkeleton";
import { PageTransition } from "@/components/PageTransition";
import { TempCompleteLevel } from "@/components/TempCompleteLevel";
import { getLevel, levels, TOTAL_LEVELS } from "@/data/levels";

// Level pages never depend on the request, so each one is generated once and
// served as a file. An id that isn't a level then gets a real 404 response.
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return levels.map((level) => ({ id: String(level.id) }));
}

function findLevel(id: string) {
  return /^\d+$/.test(id) ? getLevel(Number(id)) : undefined;
}

export async function generateMetadata({ params }: PageProps<"/level/[id]">): Promise<Metadata> {
  const level = findLevel((await params).id);
  return { title: level ? level.title : "Level not found" };
}

type Params = PageProps<"/level/[id]">["params"];

// The frame around a level is the same for every level, so Next can show it the
// instant a link is tapped. Only the part that reads the id waits in <Suspense>.
export default function LevelPage({ params }: PageProps<"/level/[id]">) {
  return (
    <AppColumn>
      <Suspense fallback={<LevelSkeleton />}>
        <LevelContent params={params} />
      </Suspense>
    </AppColumn>
  );
}

// Temporary: the full level screen (video, takeaways, quiz unlock) is built in phase 4.
async function LevelContent({ params }: { params: Params }) {
  const level = findLevel((await params).id);
  if (!level) notFound();

  return (
    <LevelGate levelId={level.id}>
      <PageTransition className="flex flex-col gap-4 px-4 py-4">
        <Link href="/path" className="flex items-center gap-2 self-start rounded-control text-h4 text-fg">
          <ArrowLeft className="size-5" aria-hidden="true" />
          Level {level.id} of {TOTAL_LEVELS}
        </Link>
        <h1 className="text-h2 text-fg">{level.title}</h1>
        <p className="text-small text-muted">
          The video, takeaways and quiz for this level are built in phase 4.
        </p>
        <TempCompleteLevel levelId={level.id} />
      </PageTransition>
    </LevelGate>
  );
}
