import { AppColumn } from "@/components/AppColumn";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";

export default function TabsLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppColumn>
      <AppHeader />
      <main className="flex flex-1 flex-col px-4 pt-2 pb-6">{children}</main>
      <BottomNav />
    </AppColumn>
  );
}
