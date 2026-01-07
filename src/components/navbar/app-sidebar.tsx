// components/app-sidebar.tsx
import * as React from "react";
import {
  User,
  Package,
  ShoppingCart,
  CreditCard,
  BarChart3,
  Star,
  Settings,
  Bell,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { VersionSwitcher } from "./version-switcher"; // you can remove this if not needed
import { SearchForm } from "./search-form"; // optional – remove if you don't want search

const menuItems = [
  { title: "User Management", icon: User, active: true },
  { title: "Product & Catalog", icon: Package },
  { title: "Orders & Invoicing", icon: ShoppingCart },
  { title: "Payment & Credits", icon: CreditCard },
  { title: "Reports & Analytics", icon: BarChart3 },
  { title: "Reviews", icon: Star },
  { title: "Settings", icon: Settings },
  { title: "Notifications", icon: Bell },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="">
        {/* Optional: Keep version switcher or replace with your logo */}
        {/* <VersionSwitcher versions={["1.0.0"]} defaultVersion="1.0.0" /> */}
        {/* Or just a logo/title */}
        <div className="flex items-center gap-3 px-4">
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex size-10 items-center justify-center rounded-lg">
            <Package className="size-6" />
          </div>
          <span className="font-semibold text-lg">My App</span>
        </div>

        {/* Optional search – remove if not needed */}
        {/* <SearchForm className="px-4 pb-4" /> */}
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu className="px-2 py-2">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={item.active}
                className="w-full px-5 py-5 my-1 justify-start text-bas text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground"
              >
                <a href="#">
                  <item.icon className="size-6" />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
