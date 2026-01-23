"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Review = {
  id: string;
  customer: string;
  email: string;
  product: string;
  productId: string;
  rating: number;
  date: string;
  comment: string;
};

export const columns: ColumnDef<Review>[] = [
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          <span className="font-medium">{row.original.customer}</span>
          <span className="text-sm text-gray-500">{row.original.email}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "productId",
    header: "Product ID",
  },
  {
    accessorKey: "product",
    header: "Product",
  },
  {
    accessorKey: "comment",
    header: "Comment",
    cell: ({ row }) => (
      <div className="flex justify-center">
        <div
          className="max-w-[300px] truncate text-center"
          title={row.original.comment}
        >
          {row.original.comment}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => {
      const rating = row.getValue("rating") as number;
      return (
        <div className="flex items-center justify-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={`h-4 w-4 ${
                index < rating
                  ? "fill-green-500 text-green-500"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-2 text-sm font-medium text-green-500">
            ({rating.toFixed(1)})
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    id: "actions",
    header: "Action",
    cell: ({}) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
