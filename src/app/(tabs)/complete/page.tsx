import type { Metadata } from "next";
import { PhaseStub } from "@/components/PhaseStub";

export const metadata: Metadata = { title: "You did it!" };

export default function CompletePage() {
  return <PhaseStub title="You did it!" phase={5} />;
}
