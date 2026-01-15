"use client";

import { type ColumnDef } from "@tanstack/react-table";

export type DailyProductRow = {
  id: number;
  product: string;
  date: string;
  totalOrders: number;
  totalQuantity: string;
};

export const columns: ColumnDef<DailyProductRow>[] = [
  {
    accessorKey: "product",
    header: "Product",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "totalOrders",
    header: "Total Orders",
  },
  {
    accessorKey: "totalQuantity",
    header: "Total Quantity",
  },
];

