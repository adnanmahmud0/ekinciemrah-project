/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Product } from "@/types/product";
import { useApi } from "@/hooks/use-api-data";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Helper to get image URL (assuming this logic is needed as per previous tasks)
const getImageUrl = (path: string | undefined) => {
  if (!path) return "/placeholder.png";
  if (path.startsWith("http")) return path;
  if (path.startsWith("/"))
    return `${process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "")}${path}`;
  return `${process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "")}/${path}`;
};

const Switch = ({
  checked,
  onCheckedChange,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={(e) => {
        e.stopPropagation();
        onCheckedChange(!checked);
      }}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004F3B] ${
        checked ? "bg-[#004F3B]" : "bg-gray-200"
      }`}
    >
      <span
        className={`${
          checked ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
      />
    </button>
  );
};

const ToggleCell = ({ row }: { row: any }) => {
  const { data: featureData, post } = useApi("/feature-product", [
    "feature-products",
  ]);

  // Check if the current product is in the featured list
  // The API returns { data: [...] } where each item has a productId field
  const isChecked =
    featureData?.data?.some(
      (item: any) => item.productId === row.original._id,
    ) ?? false;

  const handleToggle = async (checked: boolean) => {
    try {
      // The API endpoint is /feature-product and expects { productId: ... }
      await post("/feature-product", { productId: row.original._id });
      toast.success(
        checked
          ? "Added to featured products"
          : "Removed from featured products",
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to update featured status");
    }
  };

  return <Switch checked={isChecked} onCheckedChange={handleToggle} />;
};

export const columns: ColumnDef<Product>[] = [
  {
    id: "toggle",
    header: "",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <ToggleCell row={row} />
      </div>
    ),
  },
  {
    accessorKey: "productName",
    header: () => <div className="text-left">Product</div>,
    cell: ({ row }) => {
      const imageUrl = getImageUrl(row.original.image);
      return (
        <div className="flex items-center gap-3 text-left">
          <img
            src={imageUrl}
            alt={row.getValue("productName")}
            className="h-10 w-10 rounded-lg object-cover bg-gray-100"
          />
          <span className="font-medium">{row.getValue("productName")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: () => <div className="text-left">Category</div>,
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("category")}</div>
    ),
  },
  {
    accessorKey: "basePrice",
    header: "Price",
    cell: ({ row }) => `$${row.original.basePrice}`,
  },
  {
    id: "priceTier",
    header: "Price Tier",
    enableHiding: true,
    filterFn: () => true, // Always match so we don't filter rows
  },
  {
    id: "categoryPrice",
    header: ({ table }) => {
      const filterValue = table
        .getColumn("priceTier")
        ?.getFilterValue() as string;
      const targetCategory = filterValue || "Category A";
      return `${targetCategory} Price`;
    },
    cell: ({ row, table }) => {
      // Get the filter value from the table state
      const filterValue = table
        .getColumn("priceTier")
        ?.getFilterValue() as string;
      // Default to "Category A" if no filter is set
      const targetCategory = filterValue || "Category A";

      // Check if customerTypePrice exists
      if (!row.original.customerTypePrice) return "-";

      // Find the price for the selected category
      const categoryPrice = row.original.customerTypePrice.find(
        (cp) => cp.categoryName === targetCategory,
      );

      return categoryPrice ? `$${categoryPrice.price}` : "-";
    },
  },
  {
    accessorKey: "stock",
    header: () => <div className="text-center">Stock</div>,
    cell: ({ row }) => <div className="text-center">{row.original.stock}</div>,
  },
  {
    id: "actions",
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex justify-center">
          <ActionCell product={product} />
        </div>
      );
    },
  },
];

const ActionCell = ({ product }: { product: Product }) => {
  const { del } = useApi();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await del(`/product&catelog/${product._id}`);
      toast.success("Product deleted successfully");
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product");
    }
  };

  return (
    <>
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
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setOpen(true);
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              product.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
