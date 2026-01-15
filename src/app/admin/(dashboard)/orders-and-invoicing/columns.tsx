"use client";

import { IconDotsVertical, IconDownload } from "@tabler/icons-react";
import { type ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OrderDetailsDialog } from "@/components/dialog/order-details-dialog";

export type Order = {
  id: number;
  orderId: string;
  customer: string;
  date: string;
  items: number;
  total: string;
  invoice: string;
  status: string;
  orderItems?: {
    product: string;
    quantity: string;
    price: string;
    total: string;
  }[];
  userInfo?: {
    name: string;
    email: string;
    phone: string;
    address: string;
    deliveryDate: string;
  };
  paymentType?: "online pay" | "credit" | "cash on delevary" | string;
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "orderId",
    header: "Order Id",
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "paymentType",
    header: "Payment Type",
    cell: ({ row }) => {
        const type = row.getValue("paymentType") as string;
        return (
            <div className="capitalize">{type}</div>
        )
    }
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "items",
    header: "Items",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "invoice",
    header: "Invoice",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const rawStatus = row.getValue("status") as string;
      const status =
        rawStatus === "Generated" || rawStatus === "Not-Generated"
          ? "Pending"
          : rawStatus;
      return (
        <div className="flex justify-center">
          <Badge
            variant="outline"
            className={
              status === "Pending"
                ? "border-yellow-500 text-yellow-600 bg-yellow-50"
                : status === "Approved"
                ? "border-green-500 text-green-600 bg-green-50"
                : status === "Rejected"
                ? "border-red-500 text-red-600 bg-red-50"
                : "border-gray-300 text-gray-700 bg-gray-50"
            }
          >
            {status}
          </Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <IconDotsVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <OrderDetailsDialog
              order={order}
              trigger={
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  View Details
                </DropdownMenuItem>
              }
            />
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <div className="flex items-center gap-2">
                <IconDownload className="h-4 w-4" />
                <span>Download Invoice</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
