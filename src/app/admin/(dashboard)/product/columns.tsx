/* eslint-disable @next/next/no-img-element */
"use client";

import { IconDotsVertical } from "@tabler/icons-react";
import { type ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AddProductDialog } from "@/components/dialog/add-product-dialog";
import { ViewProductDialog } from "@/components/dialog/view-product-dialog";

export type Product = {
  id: number;
  product: string;
  image: string;
  category: string;
  price: string;
  priceHigh?: string;
  priceMedium?: string;
  priceLow?: string;
  stock: string;
  status: string;
  description?: string;
  unit?: string;
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <img
            src={row.original.image}
            alt={row.getValue("product")}
            className="h-10 w-10 rounded-lg object-cover bg-gray-100"
          />
          <span className="font-medium">{row.getValue("product")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <IconDotsVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <ViewProductDialog
              product={product}
              trigger={
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  View
                </DropdownMenuItem>
              }
            />
            <AddProductDialog
              product={product}
              trigger={
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  Edit
                </DropdownMenuItem>
              }
            />
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
