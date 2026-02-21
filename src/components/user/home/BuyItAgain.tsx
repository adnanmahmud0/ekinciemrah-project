"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import Link from "next/link";
import { useApi } from "@/hooks/use-api-data";
import { useFavourite } from "@/hooks/use-favourite";
import { useFlyAnimation } from "@/context/fly-animation-context";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/context/auth-context";

interface Product {
  _id: string;
  productName: string;
  description: string;
  basePrice: number;
  price?: number;
  image: string;
  status: "Available" | "Unavailable";
  category: string;
  unit: string;
}

export default function BuyItAgain() {
  const { toggleFavourite, isFavourite } = useFavourite();
  const { addToCart } = useCart();
  const { triggerFlyAnimation } = useFlyAnimation();
  const { isAuthenticated } = useAuth();
  const [animatingIds, setAnimatingIds] = useState<Set<string>>(new Set());
  const baseEndpoint = isAuthenticated
    ? "/product&catelog/customer-type"
    : "/product&catelog";

  const { data: productsData } = useApi(
    baseEndpoint,
    ["products", "customer-type", isAuthenticated],
    {
      enabled: true,
    },
  );

  const allProducts: Product[] = productsData?.data?.data || [];
  const displayProducts = allProducts.slice(0, 16);

  const getImageUrl = (path: string | undefined) => {
    if (!path) return "/placeholder.png";
    if (path.startsWith("http")) return path;
    if (path.startsWith("/"))
      return `${process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "")}${path}`;
    return `${process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "")}/${path}`;
  };

  return (
    <section className="bg-white my-14">
      <div className="container mx-auto px-4">
        {/* Section Header with Button */}
        <div className="flex flex-col md:flex-row md:items-end items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">
              All Products
            </h2>
            <p className="text-sm md:text-base text-gray-600">
              Browse our complete selection of quality products
            </p>
          </div>
          <Link href="/service" className="hidden md:block">
            <Button
              className="text-white px-5 py-3 rounded-xl text-base font-semibold shadow-lg hover:shadow-xl transition-all cursor-pointer"
              style={{ backgroundColor: "#004F3B" }}
            >
              See More Products
            </Button>
          </Link>
        </div>

        {/* Products Grid - 2 rows x 8 columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {displayProducts.map((product) => (
            <div className="bg-white rounded-lg shadow-xl hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col">
              <div className="relative h-40 ">
                <Link
                  key={product._id}
                  href={`/service/${product._id}`}
                  className="block"
                >
                  <Image
                    src={getImageUrl(product.image)}
                    alt={product.productName}
                    fill
                    unoptimized
                    className="object-contain p-4"
                  />
                </Link>
                <button
                  className={`absolute top-2 right-2 p-1.5 rounded-full transition-colors shadow-sm ${
                    isFavourite(product._id)
                      ? "bg-red-50 text-red-500 hover:bg-red-100"
                      : "bg-white/80 text-gray-400 hover:bg-white hover:text-red-500"
                  } ${animatingIds.has(product._id) ? "animate-pop" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (!isFavourite(product._id)) {
                      setAnimatingIds((prev) => {
                        const next = new Set(prev);
                        next.add(product._id);
                        return next;
                      });

                      const rect = (
                        e.currentTarget as HTMLElement
                      ).getBoundingClientRect();
                      triggerFlyAnimation(rect);

                      setTimeout(() => {
                        setAnimatingIds((prev) => {
                          const next = new Set(prev);
                          next.delete(product._id);
                          return next;
                        });
                      }, 400);
                    }
                    toggleFavourite(product._id);
                  }}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isFavourite(product._id) ? "fill-current" : ""
                    }`}
                  />
                </button>
              </div>

              <div className="p-3 flex-1 flex flex-col">
                <h3 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-1">
                  {product.productName}
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
                        ${(product.price ?? product.basePrice).toFixed(2)}
                      </span>
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                          product.status === "Available"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {product.status === "Available"
                          ? "In stock"
                          : "Stock out"}
                      </span>
                    </div>

                    <Button
                      className="w-full text-white text-xs py-2 rounded-md flex items-center justify-center gap-1"
                      style={{ backgroundColor: "#004F3B" }}
                      size="sm"
                      disabled={product.status !== "Available"}
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product._id, 1, {
                          validateDuplicate: true,
                        });

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

        {/* Mobile "See More" Button */}
        <div className="mt-6 md:hidden flex justify-center">
          <Link href="/service">
            <Button
              className="text-white px-8 py-3 rounded-full text-base font-semibold shadow-lg hover:shadow-xl transition-all"
              style={{ backgroundColor: "#004F3B" }}
            >
              See More Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
