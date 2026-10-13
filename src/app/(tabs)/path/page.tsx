import type { Metadata } from "next";
import { PhaseStub } from "@/components/PhaseStub";

export const metadata: Metadata = { title: "Your Path" };

export default function PathPage() {
  return <PhaseStub title="Your Path" phase={3} />;
}
