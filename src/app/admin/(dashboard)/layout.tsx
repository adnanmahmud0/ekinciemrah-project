// app/layout.tsx

import { AppSidebar } from "@/components/admin-navbar-sidebar/app-sidebar";
import { AdminHeader } from "@/components/admin-navbar-sidebar/admin-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AdminHeader />
        <main className="p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
