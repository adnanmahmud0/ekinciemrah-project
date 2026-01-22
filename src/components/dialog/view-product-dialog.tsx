"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Product } from "@/types/product";

interface ViewProductDialogProps {
  product: Product;
  trigger?: React.ReactNode;
}

// Helper to get image URL
const getImageUrl = (path: string | undefined) => {
  if (!path) return "/placeholder.png";
  if (path.startsWith("http")) return path;
  if (path.startsWith("/"))
    return `${process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "")}${path}`;
  return `${process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "")}/${path}`;
};

export function ViewProductDialog({
  product,
  trigger,
}: ViewProductDialogProps) {
  const imageUrl = getImageUrl(product.image);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            View
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Image and Basic Info */}
          <div className="flex items-start gap-4">
            <img
              src={imageUrl}
              alt={product.productName}
              className="h-24 w-24 rounded-lg object-cover bg-gray-100 border"
            />
            <div className="space-y-1">
              <h3 className="font-semibold text-lg">{product.productName}</h3>
              <p className="text-sm text-muted-foreground">
                {product.category}
              </p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid gap-4 text-sm border-t pt-4">
            <div className="grid gap-1">
              <span className="font-medium text-muted-foreground">
                Description
              </span>
              <p className="text-foreground text-sm">
                {product.description || "No description available."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-1">
                <span className="font-medium text-muted-foreground">Unit</span>
                <span className="text-foreground">{product.unit || "N/A"}</span>
              </div>
              <div className="grid gap-1">
                <span className="font-medium text-muted-foreground">Stock</span>
                <span className="text-foreground">{product.stock}</span>
              </div>
              <div className="grid gap-1">
                <span className="font-medium text-muted-foreground">
                  Availability
                </span>
                <span className="text-foreground capitalize">
                  {product.status || "Available"}
                </span>
              </div>
            </div>

            <div className="grid gap-1">
              <span className="font-medium text-muted-foreground">
                Base Price
              </span>
              <span className="text-foreground">${product.basePrice}</span>
            </div>
          </div>

          {/* Tiered Pricing */}
          <div className="space-y-3 border-t pt-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Customer Type Pricing
            </p>
            <div className="grid grid-cols-3 gap-3">
              {product.customerTypePrice &&
              product.customerTypePrice.length > 0 ? (
                product.customerTypePrice.map((cp, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-2 rounded border"
                  >
                    <p className="text-xs text-muted-foreground mb-1">
                      {cp.categoryName}
                    </p>
                    <p className="font-medium text-sm">${cp.price}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground col-span-3">
                  No tiered pricing available.
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
