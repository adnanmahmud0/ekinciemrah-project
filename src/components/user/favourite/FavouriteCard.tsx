"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useFlyAnimation } from "@/context/fly-animation-context";

export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
  price: number;
  unit: string; // e.g., "Pound", "Kg"
  description: string;
  availability?: "in-stock" | "stock-out";
}

interface FavouriteCardProps {
  product: Product;
  onRemove?: (id: string) => void;
}

export default function FavouriteCard({
  product,
  onRemove,
}: FavouriteCardProps) {
  const { addToCart } = useCart();
  const { triggerFlyAnimation } = useFlyAnimation();

  return (
    <Link href={`/service/${product.id}`} className="block">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group cursor-pointer">
        <div className="relative h-48 w-full bg-[#FAFAFA] flex items-center justify-center p-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRemove?.(product.id);
            }}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-white/50 hover:bg-white text-red-500 transition-colors z-10"
          >
            <Heart className="w-5 h-5 fill-current" />
          </button>

          <div className="relative w-full h-full">
            <Image
              src={product.image}
              // src={`${process.env.NEXT_PUBLIC_IMAGE_API}${product.image}`}
              alt={product.name}
              fill
              unoptimized
              className="object-contain"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-[#0D1E32] line-clamp-1">
              {product.name}
            </h3>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-green-500 text-green-500" />
              <span className="text-xs text-gray-500 font-medium">
                {product.rating} ({product.reviewCount})
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-500 line-clamp-2 mb-4 h-10">
            {product.description}
          </p>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1">
              <span className="text-lg font-bold text-[#146041]">
                $ {product?.price?.toFixed(2) || 0}
              </span>
              <span className="text-gray-400 text-sm">/{product.unit}</span>
            </div>
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                (product.availability ?? "in-stock") === "in-stock"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {(product.availability ?? "in-stock") === "in-stock"
                ? "In stock"
                : "Stock out"}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault(); // Prevent navigation when clicking add to cart
              addToCart(product.id, 1, { validateDuplicate: true });

              // Trigger fly animation
              const rect = (
                e.currentTarget as HTMLElement
              ).getBoundingClientRect();
              triggerFlyAnimation(rect);
            }}
            className="w-full py-2.5 bg-[#146041] hover:bg-[#0e4b32] text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}
