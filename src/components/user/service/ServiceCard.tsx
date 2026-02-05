"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { useFavourite } from "@/hooks/use-favourite";
import { useFlyAnimation } from "@/context/fly-animation-context";
import { useCart } from "@/hooks/use-cart";

export interface Product {
  _id: string;
  productName: string;
  description: string;
  basePrice: number;
  image: string;
  status?: "Available" | "Unavailable";
  category: string;
  unit: string;
  stock: number;
  // Optional legacy fields if needed elsewhere, but mainly using API fields now
  rating?: number;
  reviewCount?: number;
  stockStatus?: string;
}

interface ServiceCardProps {
  product: Product;
}

export default function ServiceCard({ product }: ServiceCardProps) {
  const { toggleFavourite, isFavourite } = useFavourite();
  const { addToCart } = useCart();
  const { triggerFlyAnimation } = useFlyAnimation();
  const [isAnimating, setIsAnimating] = React.useState(false);
  const isFav = isFavourite(product._id);
  const displayPrice = product.basePrice;
  const isAvailable = product.stock > 0;

  const getImageUrl = (path: string | undefined) => {
    if (!path) return "/placeholder.png";
    if (path.startsWith("http")) return path;
    if (path.startsWith("/"))
      return `${process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "")}${path}`;
    return `${process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "")}/${path}`;
  };

  return (
    <Link href={`/service/${product._id}`} className="block">
      <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden flex flex-col h-full border border-gray-100 group">
        {/* Product Image */}
        <div className="relative h-48 bg-gray-50/50 flex items-center justify-center overflow-hidden">
          <Image
            src={getImageUrl(product.image)}
            alt={product.productName}
            fill
            unoptimized
            className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
          />
          {/* Badge for Tier (Optional UI flair) */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-white/80 backdrop-blur-md border border-white/40 rounded-full text-[10px] font-bold text-gray-500 shadow-sm uppercase tracking-tighter">
              {product.category}
            </span>
          </div>
          {/* Favourite Button */}
          <button
            className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md transition-colors shadow-sm z-10 ${
              isFav
                ? "bg-red-50 text-red-500 hover:bg-red-100"
                : "bg-white/80 text-gray-400 hover:bg-white hover:text-red-500"
            } ${isAnimating ? "animate-pop" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              if (!isFav) {
                setIsAnimating(true);
                // Trigger fly animation
                const rect = (
                  e.currentTarget as HTMLElement
                ).getBoundingClientRect();
                triggerFlyAnimation(rect);

                setTimeout(() => setIsAnimating(false), 400);
              }
              toggleFavourite(product._id);
            }}
          >
            <Heart className={`w-4 h-4 ${isFav ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-[15px] text-[#1A2D42] leading-tight line-clamp-1">
              {product.productName}
            </h3>
          </div>

          <p className="text-xs text-gray-400 mb-4 line-clamp-2 flex-1 leading-relaxed">
            {product.description}
          </p>

          {/* Price Section */}
          <div className="flex items-end justify-between mb-4">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-0.5">
                Price
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-[#004F3B]">
                  ${displayPrice.toFixed(2)}
                </span>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  /{product.unit}
                </span>
              </div>
            </div>

            <div
              className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${
                isAvailable
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {isAvailable ? "In Stock" : "Stock Out"}
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            className="w-full bg-[#004F3B] hover:bg-[#003d2e] text-white text-xs font-bold py-6 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-primary/20"
            size="sm"
            disabled={!isAvailable}
            onClick={(e) => {
              e.preventDefault();
              addToCart(product._id, 1);

              // Trigger fly animation
              const rect = (
                e.currentTarget as HTMLElement
              ).getBoundingClientRect();
              const startPos = {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
              };
              triggerFlyAnimation(startPos);
            }}
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  );
}
