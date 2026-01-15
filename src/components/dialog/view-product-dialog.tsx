"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import customerTypes from "@/app/admin/(dashboard)/customer-types/data.json";

export interface Product {
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
}

interface ViewProductDialogProps {
  product: Product;
  trigger?: React.ReactNode;
}

export function ViewProductDialog({
  product,
  trigger,
}: ViewProductDialogProps) {
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
              src={product.image}
              alt={product.product}
              className="h-24 w-24 rounded-lg object-cover bg-gray-100 border"
            />
            <div className="space-y-1">
              <h3 className="font-semibold text-lg">{product.product}</h3>
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
                  {product.status}
                </span>
              </div>
            </div>

            <div className="grid gap-1">
              <span className="font-medium text-muted-foreground">
                Base Price
              </span>
              <span className="text-foreground">{product.price}</span>
            </div>
          </div>

          {/* Tiered Pricing */}
          <div className="space-y-3 border-t pt-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Customer Type Pricing
            </p>
            <div className="grid grid-cols-3 gap-3">
              {customerTypes
                .filter((type) => type.id !== 0)
                .map((type) => {
                  let price = "-";
                  if (type.name === "Catagory A")
                    price = product.priceHigh || "-";
                  else if (type.name === "Catagory B")
                    price = product.priceMedium || "-";
                  else if (type.name === "Catagory C")
                    price = product.priceLow || "-";

                  return (
                    <div
                      key={type.id}
                      className="bg-gray-50 p-2 rounded border"
                    >
                      <p className="text-xs text-muted-foreground mb-1">
                        {type.name}
                      </p>
                      <p className="font-medium text-sm">{price}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
