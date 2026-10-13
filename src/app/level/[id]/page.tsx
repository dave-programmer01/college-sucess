import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AppColumn } from "@/components/AppColumn";
import { LevelGate } from "@/components/LevelGate";
import { LevelScreen } from "@/components/LevelScreen";
import { LevelSkeleton } from "@/components/LevelSkeleton";
import { PageTransition } from "@/components/PageTransition";
import { levelFromParam, levelStaticParams } from "@/lib/level-route";

// Level pages never depend on the request, so each one is generated once and
// served as a file. An id that isn't a level then gets a real 404 response.
export const ensureStatic = "navigation";

export const generateStaticParams = levelStaticParams;

type Params = PageProps<"/level/[id]">["params"];

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const level = levelFromParam((await params).id);
  return { title: level ? level.title : "Level not found" };
}

// The frame around a level is the same for every level, so Next can show it the
// instant a link is tapped. Only the part that reads the id waits in <Suspense>.
export default function LevelPage({ params }: { params: Params }) {
  return (
    <AppColumn>
      <Suspense fallback={<LevelSkeleton />}>
        <LevelContent params={params} />
      </Suspense>
    </AppColumn>
  );
}

async function LevelContent({ params }: { params: Params }) {
  const level = levelFromParam((await params).id);
  if (!level) notFound();

  return (
    <LevelGate levelId={level.id}>
      <PageTransition className="flex flex-col gap-4 px-4 pt-2 pb-6">
        <LevelScreen level={level} />
      </PageTransition>
    </LevelGate>
  );
}
