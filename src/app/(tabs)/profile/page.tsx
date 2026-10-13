import type { Metadata } from "next";
import { PhaseStub } from "@/components/PhaseStub";

export const metadata: Metadata = { title: "Profile" };

export default function ProfilePage() {
  return <PhaseStub title="Profile" phase={3} />;
}
