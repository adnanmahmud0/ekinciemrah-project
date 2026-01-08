"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export type PaymentCredit = {
  id: string;
  business: string;
  owner: string;
  creditLimit: string;
  creditUsed: string;
  available: string;
  paymentTerms: string;
  outstanding: string;
  status: "Near Limit" | "Blocked" | "Good Standing";
};

export const columns: ColumnDef<PaymentCredit>[] = [
  {
    accessorKey: "business",
    header: "Business",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col text-left">
          <span className="font-medium text-gray-900">{row.original.business}</span>
          <span className="text-sm text-gray-500">{row.original.owner}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "creditLimit",
    header: "Credit Limit",
  },
  {
    accessorKey: "creditUsed",
    header: "Credit Used",
  },
  {
    accessorKey: "available",
    header: "Available",
  },
  {
    accessorKey: "paymentTerms",
    header: "Payment Terms",
  },
  {
    accessorKey: "outstanding",
    header: "Outstanding",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      let badgeClass = "";
      
      switch (status) {
        case "Near Limit":
          badgeClass = "border-green-500 text-green-600 bg-green-50";
          break;
        case "Good Standing":
           badgeClass = "border-green-500 text-green-600 bg-green-50";
           break;
        case "Blocked":
          badgeClass = "border-transparent bg-gray-600 text-white hover:bg-gray-700";
          break;
        default:
          badgeClass = "border-gray-500 text-gray-500 bg-gray-50";
      }

      return (
        <div className="flex justify-center">
          <Badge
            variant="outline"
            className={badgeClass}
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
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
