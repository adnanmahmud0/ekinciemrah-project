"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { privateApi } from "@/lib/api-client";

export type Review = {
  _id: string;
  productId: {
    _id: string;
    productName: string;
  };
  userId: {
    _id: string;
    name: string;
    email: string;
    image: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const handleDelete = async (id: string) => {
  if (!confirm("Are you sure you want to delete this review?")) return;
  try {
    const res = await privateApi.delete(`review/${id}`);
    if (res.data.success) {
      window.location.reload();
    }
  } catch (error) {
    console.error("Failed to delete review:", error);
    alert("Failed to delete review");
  }
};

export const columns: ColumnDef<Review>[] = [
  {
    accessorKey: "userId.name",
    id: "customer",
    header: "Customer",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100 shrink-0">
            {row.original.userId?.image ? (
              <img
                src={row.original.userId.image}
                alt={row.original.userId.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-gray-400">
                <User className="h-5 w-5" />
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-medium">
              {row.original.userId?.name || "Unknown"}
            </span>
            <span className="text-sm text-gray-500">
              {row.original.userId?.email}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "productId._id",
    header: "Product ID",
    cell: ({ row }) => row.original.productId?._id,
  },
  {
    accessorKey: "productId.productName",
    header: "Product",
    cell: ({ row }) => row.original.productId?.productName,
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
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="text-red-600 cursor-pointer"
              onClick={() => handleDelete(row.original._id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
