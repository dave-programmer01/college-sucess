import type { Metadata } from "next";
import { PhaseStub } from "@/components/PhaseStub";

export const metadata: Metadata = { title: "Resources" };

export default function ResourcesPage() {
  return <PhaseStub title="Resources" phase={5} />;
}
