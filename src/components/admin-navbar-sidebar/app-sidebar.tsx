"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChartArea,
  User,
  Package,
  Layers,
  ShoppingCart,
  CreditCard,
  Star,
  Settings,
  Bell,
  CalendarArrowDown,
  UserCog,
  Flag,
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

const menuItems = [
  { title: "Reporting & Analytics", icon: ChartArea, url: "/admin" },
  { title: "User Management", icon: User, url: "/admin/users" },
  { title: "Customer Types", icon: UserCog, url: "/admin/customer-types" },
  { title: "Product Management", icon: Package, url: "/admin/product" },
  {
    title: "Daily Product Orders",
    icon: CalendarArrowDown,
    url: "/admin/daily-product-orders",
  },
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
  { title: "Banner Management", icon: Flag, url: "/admin/banner-management" },
  { title: "Reviews", icon: Star, url: "/admin/reviews" },
  { title: "Settings", icon: Settings, url: "/admin/settings" },
  { title: "Notifications", icon: Bell, url: "/admin/notifications" },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

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
                isActive={pathname === item.url}
                className="w-full px-5 py-5 my-1 justify-start text-bas text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
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

      <SidebarRail />
    </Sidebar>
  );
}
