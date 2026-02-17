/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
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

type OrdersCache =
  | {
      data?: { _id: string; status: string }[];
      [key: string]: unknown;
    }
  | undefined;

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function OrderActionsCell({ order }: { order: Order }) {
  const { patch } = useApi(undefined, ["orders"], { enabled: false });
  const queryClient = useQueryClient();
  const [isUpdating, setIsUpdating] = useState(false);

  const updateStatus = async (status: "accepted" | "cancelled") => {
    if (isUpdating) return;
    setIsUpdating(true);

    const previousData = queryClient.getQueryData<OrdersCache>(["orders"]);

    queryClient.setQueryData<OrdersCache>(["orders"], (oldData) => {
      if (!oldData || !oldData.data) return oldData;

      return {
        ...oldData,
        data: oldData.data.map((o: any) =>
          o._id === order.id ? { ...o, status } : o,
        ),
      };
    });

    try {
      await patch(`/orders/admin/${order.id}/status`, { status });
      toast.success(
        status === "accepted"
          ? "Order accepted successfully"
          : "Order cancelled successfully",
      );
    } catch {
      if (previousData) {
        queryClient.setQueryData(["orders"], previousData);
      }
      toast.error("Failed to update order status. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0" disabled={isUpdating}>
          <span className="sr-only">Open menu</span>
          <IconDotsVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <OrderDetailsDialog
          order={order}
          trigger={
            <DropdownMenuItem
              disabled={isUpdating}
              onSelect={(e) => e.preventDefault()}
            >
              View Details
            </DropdownMenuItem>
          }
        />
        <DropdownMenuItem
          disabled={isUpdating}
          onSelect={async (e) => {
            e.preventDefault();
            await updateStatus("accepted");
          }}
        >
          {isUpdating ? "Updating..." : "Accept Order"}
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={isUpdating}
          onSelect={async (e) => {
            e.preventDefault();
            await updateStatus("cancelled");
          }}
        >
          {isUpdating ? "Updating..." : "Cancel Order"}
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
    accessorKey: "deliveryDate",
    header: "Delivery Date",
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
      const rawStatus = (row.getValue("status") as string) || "";
      const normalizedStatus = rawStatus.toLowerCase();
      const displayStatus =
        normalizedStatus === "accepted"
          ? "ACCEPTED"
          : normalizedStatus === "cancelled"
            ? "CANCELLED"
            : normalizedStatus === "pending"
              ? "Pending"
              : rawStatus || "Unknown";
      return (
        <div className="flex justify-center">
          <Badge
            variant="outline"
            className={
              displayStatus === "Pending"
                ? "border-yellow-500 text-yellow-600 bg-yellow-50"
                : displayStatus === "ACCEPTED"
                  ? "border-green-500 text-green-600 bg-green-50"
                  : displayStatus === "CANCELLED"
                    ? "border-red-500 text-red-600 bg-red-50"
                    : "border-gray-300 text-gray-700 bg-gray-50"
            }
          >
            {displayStatus}
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
