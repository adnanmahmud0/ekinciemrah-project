"use client";

import { IconDotsVertical } from "@tabler/icons-react";
import { type ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AddCategoryDialog } from "@/components/dialog/add-category-dialog";
import { privateApi } from "@/lib/api-client";
import { toast } from "sonner";

export type Category = {
  _id: string;
  categoryName: string;
  image: string;
  productCount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const handleDelete = async (id: string) => {
  if (!confirm("Are you sure you want to delete this category?")) return;
  try {
    const res = await privateApi.delete(`category/${id}`);
    if (res.data.success) {
      toast.success("Category deleted successfully");
      window.location.reload();
    }
  } catch (error) {
    console.error("Failed to delete category:", error);
    toast.error("Failed to delete category");
  }
};

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <div className="flex justify-center">
          <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-muted">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_API}${category.image}`}
              alt={category.categoryName}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "categoryName",
    header: "Category Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("categoryName")}</div>
    ),
  },
  {
    accessorKey: "productCount",
    header: "Products",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("productCount")}</div>
    ),
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <IconDotsVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <AddCategoryDialog
              category={category}
              trigger={
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  Edit
                </DropdownMenuItem>
              }
            />
            <DropdownMenuItem onClick={() => handleDelete(category._id)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
