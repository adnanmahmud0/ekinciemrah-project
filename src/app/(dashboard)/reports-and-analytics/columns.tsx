"use client";

import { ColumnDef } from "@tanstack/react-table";

export type CustomerInsight = {
  id: string;
  customer: string;
  totalSpent: string;
  orderCount: number;
  avgOrderValue: string;
  creditUsed: string;
};

export const columns: ColumnDef<CustomerInsight>[] = [
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => (
      <div className="text-center font-medium">{row.getValue("customer")}</div>
    ),
  },
  {
    accessorKey: "totalSpent",
    header: "Total Spent",
    cell: ({ row }) => (
      <div className="text-center text-gray-500">{row.getValue("totalSpent")}</div>
    ),
  },
  {
    accessorKey: "orderCount",
    header: "Order Count",
    cell: ({ row }) => (
      <div className="text-center text-gray-500">{row.getValue("orderCount")}</div>
    ),
  },
  {
    accessorKey: "avgOrderValue",
    header: "AVG Order Value",
    cell: ({ row }) => (
      <div className="text-center text-gray-500">{row.getValue("avgOrderValue")}</div>
    ),
  },
  {
    accessorKey: "creditUsed",
    header: "Credit Used",
    cell: ({ row }) => (
      <div className="text-center text-gray-500">{row.getValue("creditUsed")}</div>
    ),
  },
];
