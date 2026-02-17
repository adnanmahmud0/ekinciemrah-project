"use client";

import { IconDotsVertical } from "@tabler/icons-react";
import { type ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  OrderDetailsDialog,
  type Order,
} from "@/components/dialog/order-details-dialog";
import { useApi } from "@/hooks/use-api-data";
import { toast } from "sonner";

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function OrderActionsCell({ order }: { order: Order }) {
  const { patch } = useApi("/orders", ["orders"]);

  const updateStatus = async (status: "ACCEPTED" | "CANCELLED") => {
    try {
      await patch(`/orders/${order.id}`, { status });
      toast.success(
        status === "ACCEPTED"
          ? "Order accepted successfully"
          : "Order cancelled successfully",
      );
    } catch {
      toast.error("Failed to update order status. Please try again.");
    }
  };

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
        <DropdownMenuItem
          onSelect={async (e) => {
            e.preventDefault();
            await updateStatus("ACCEPTED");
          }}
        >
          Accept Order
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={async (e) => {
            e.preventDefault();
            await updateStatus("CANCELLED");
          }}
        >
          Cancel Order
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "orderId",
    header: "Order ID",
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
  },
  {
    accessorKey: "customerEmail",
    header: "Customer Email",
  },
  {
    accessorKey: "orderDate",
    header: "Order Date",
  },
  {
    accessorKey: "itemsCount",
    header: "Items",
  },
  {
    accessorKey: "totalAmount",
    header: "Total",
    cell: ({ row }) => {
      const total = row.getValue("totalAmount") as number;
      return <span>{formatMoney(total)}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <div className="flex justify-center">
          <Badge
            variant="outline"
            className={
              status === "Pending"
                ? "border-yellow-500 text-yellow-600 bg-yellow-50"
                : status === "ACCEPTED"
                  ? "border-green-500 text-green-600 bg-green-50"
                  : status === "CANCELLED"
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
      return <OrderActionsCell order={order} />;
    },
  },
];
