// components/main-header.tsx  (optional – you can even inline this if you want)
import { SidebarTrigger } from "@/components/ui/sidebar";

export function MainHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b bg-background px-4">
      <SidebarTrigger />
      {/* Nothing else – no separator, no breadcrumb */}
    </header>
  );
}
