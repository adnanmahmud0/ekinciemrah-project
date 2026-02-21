/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { useApi } from "@/hooks/use-api-data";
import { useFavourite } from "@/hooks/use-favourite";
import { useCart } from "@/hooks/use-cart";
import { useFlyAnimation } from "@/context/fly-animation-context";
import { useAuth } from "@/context/auth-context";

// Helper to get image URL
const getImageUrl = (path: string | undefined) => {
  if (!path) return "/placeholder.png";
  if (path.startsWith("http")) return path;
  if (path.startsWith("/"))
    return `${process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "")}${path}`;
  return `${process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "")}/${path}`;
};

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  availability: "in-stock" | "stock-out";
}

export default function FeaturedProducts() {
  const { user, isAuthenticated } = useAuth();
  const userCustomerType = (user?.customerType || user?.customer_type || "")
    .toString()
    .toLowerCase();

  const { data: featureData, isLoading } = useApi("/feature-product", [
    "feature-products",
  ]);

  const getUserPrice = (product: any): number => {
    const customerTypePrice = product.customerTypePrice as
      | { categoryName: string; price: string }[]
      | undefined;

    if (customerTypePrice && userCustomerType) {
      const match = customerTypePrice.find(
        (cp) => cp.categoryName.toLowerCase() === userCustomerType,
      );
      if (match) {
        const parsed = parseFloat(match.price);
        if (!Number.isNaN(parsed)) {
          return parsed;
        }
      }
    }

    if (typeof product.price === "number") {
      return product.price;
    }
    if (typeof product.price === "string" && product.price.trim() !== "") {
      const parsed = parseFloat(product.price);
      if (!Number.isNaN(parsed)) {
        return parsed;
      }
    }
    return product.basePrice;
  };
  const { toggleFavourite, isFavourite } = useFavourite();
  const { addToCart } = useCart();
  const { triggerFlyAnimation } = useFlyAnimation();

  const products: Product[] =
    featureData?.data
      ?.filter((item: any) => item.product)
      .map((item: any) => ({
        id: item.product._id,
        name: item.product.productName,
        description: item.product.description || "",
        price: getUserPrice(item.product),
        image: getImageUrl(item.product.image),
        availability: item.product.stock > 0 ? "in-stock" : "stock-out",
      })) || [];

  if (isLoading) {
    return (
      <section className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-10">Loading featured products...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 my-14">
      <div className="container mx-auto px-4 py-12">
        {/* Section Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Featured Products
          </h2>
          <p className="text-gray-600">
            Discover our handpicked selection of quality products
          </p>
        </div>

        {/* Products Grid - 2 rows x 8 columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {products.map((product) => (
            <div className="bg-white rounded-lg shadow-xl hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col">
              <div className="relative h-40 ">
                <Link
                  key={product.id}
                  href={`/service/${product.id}`}
                  className="block"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    unoptimized
                    className="object-contain p-4"
                  />
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavourite(product.id);
                  }}
                  className={`absolute top-2 right-2 p-1.5 rounded-full transition-colors shadow-sm ${
                    isFavourite(product.id)
                      ? "bg-red-50 text-red-500 hover:bg-red-100"
                      : "bg-white/80 text-gray-400 hover:bg-white hover:text-red-500"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isFavourite(product.id) ? "fill-current" : ""
                    }`}
                  />
                </button>
              </div>

              <div className="p-3 flex-1 flex flex-col">
                <h3 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-600 mb-2 line-clamp-2 flex-1">
                  {product.description}
                </p>

                {isAuthenticated && (
                  <>
                    <div className="mb-2 flex items-center justify-between">
                      <span
                        className="text-lg font-bold"
                        style={{ color: "#004F3B" }}
                      >
                        ${product.price.toFixed(2)}
                      </span>
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                          product.availability === "in-stock"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {product.availability === "in-stock"
                          ? "In stock"
                          : "Stock out"}
                      </span>
                    </div>

                    <Button
                      className="w-full text-white text-xs py-2 rounded-md flex items-center justify-center gap-1"
                      style={{ backgroundColor: "#004F3B" }}
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product.id, 1, { validateDuplicate: true });

                        const rect = (
                          e.currentTarget as HTMLElement
                        ).getBoundingClientRect();
                        triggerFlyAnimation(rect);
                      }}
                    >
                      <ShoppingCart className="w-3 h-3" />
                      Add to Cart
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
