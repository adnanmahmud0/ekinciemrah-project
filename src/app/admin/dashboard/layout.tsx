// app/layout.tsx

import { AppSidebar } from "@/components/admin-navbar-sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b bg-background px-4">
          <SidebarTrigger />
          <div className="ml-auto flex items-center gap-4">
            <Link href="/notifications">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-full overflow-hidden bg-muted">
                <img
                  src="https://i.pravatar.cc/40?img=12"
                  alt="User avatar"
                  className="h-8 w-8 object-cover"
                />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-medium">Jhon doe</div>
                <div className="text-xs text-muted-foreground">Admin</div>
              </div>
            </div>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
