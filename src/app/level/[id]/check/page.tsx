import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AppColumn } from "@/components/AppColumn";
import { LevelGate } from "@/components/LevelGate";
import { LevelSkeleton } from "@/components/LevelSkeleton";
import { PageTransition } from "@/components/PageTransition";
import { QuizRunner } from "@/components/QuizRunner";
import { levelFromParam, levelStaticParams } from "@/lib/level-route";
import { pageMetadata } from "@/lib/metadata";

export const ensureStatic = "navigation";

export const generateStaticParams = levelStaticParams;

type Params = PageProps<"/level/[id]/check">["params"];

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const level = levelFromParam((await params).id);
  if (!level) return { title: "Level not found" };
  return pageMetadata(
    `Quick Check: ${level.title}`,
    `A quick check on what you learned in level ${level.id}, "${level.title}".`,
  );
}

export default function CheckPage({ params }: { params: Params }) {
  return (
    <AppColumn>
      <Suspense fallback={<LevelSkeleton />}>
        <CheckContent params={params} />
      </Suspense>
    </AppColumn>
  );
}

async function CheckContent({ params }: { params: Params }) {
  const level = levelFromParam((await params).id);
  if (!level) notFound();

  // The quiz opens only for an unlocked level whose video has been watched.
  return (
    <LevelGate levelId={level.id} requireWatched>
      <PageTransition className="flex flex-col gap-4 px-4 pt-2 pb-6">
        <QuizRunner level={level} />
      </PageTransition>
    </LevelGate>
  );
}
