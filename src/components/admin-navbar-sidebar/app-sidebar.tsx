"use client";

import {
  CreditCard,
  Flag,
  Home,
  Layers,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  ShieldCheck,
  Star,
  User,
  UserCog,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Overview", icon: LayoutDashboard, url: "/admin" },

  { title: "User Management", icon: User, url: "/admin/users" },
  { title: "Customer Types", icon: UserCog, url: "/admin/customer-types" },
  { title: "Product Management", icon: Package, url: "/admin/product" },
  // {
  //   title: "Daily Product Orders",
  //   icon: CalendarArrowDown,
  //   url: "/admin/daily-product-orders",
  // },
  { title: "Category Management", icon: Layers, url: "/admin/category" },
  {
    title: "Orders & Invoicing",
    icon: ShoppingCart,
    url: "/admin/orders-and-invoicing",
  },
  {
    title: "Payment & Credits",
    icon: CreditCard,
    url: "/admin/payment-and-credit",
  },
  { title: "Admin Access", icon: ShieldCheck, url: "/admin/admin-access" },
  { title: "Banner Management", icon: Flag, url: "/admin/banner-management" },
  { title: "Reviews", icon: Star, url: "/admin/reviews" },
  { title: "Settings", icon: Settings, url: "/admin/settings" },
  // { title: "Notifications", icon: Bell, url: "/admin/notifications" },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar
      {...props}
      className="bg-[#004F3B] text-white"
      style={
        {
          "--sidebar-background": "#004F3B",
          "--sidebar-foreground": "#ffffff",
        } as React.CSSProperties
      }
    >
      <SidebarHeader className="text-white">
        {/* Optional: Keep version switcher or replace with your logo */}
        {/* <VersionSwitcher versions={["1.0.0"]} defaultVersion="1.0.0" /> */}
        {/* Or just a logo/title */}
        <div className="flex items-center justify-center gap-3 px-4 py-4 border-b border-white/10">
          <span className="font-semibold text-3xl font-brand">
            Unified Produce
          </span>
        </div>

        {/* Optional search – remove if not needed */}
        {/* <SearchForm className="px-4 pb-4" /> */}
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu className="px-2 py-2 ">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.url}
                className="w-full px-5 py-5 my-1 justify-start text-sm text-white  hover:bg-[#A99522] hover:text-black data-[active=true]:bg-[#A99522] data-[active=true]:text-white"
              >
                <Link href={item.url}>
                  <item.icon className="size-6" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      {/* Go Home — plain div to avoid SidebarFooter's default light bg */}
      <div className="p-3 border-t border-white/10 bg-[#004F3B]">
        <Link href="/">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 hover:bg-[#A99522] hover:text-black text-white transition-all duration-200 cursor-pointer group">
            <Home className="size-5" />
            <span className="text-sm font-semibold">Go Home</span>
          </div>
        </Link>
      </div>
      <SidebarRail />
    </Sidebar>
  );
}
