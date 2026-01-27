"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";

export interface Product {
  _id: string;
  productName: string;
  description: string;
  basePrice: number;
  image: string;
  status: "Available" | "Unavailable";
  category: string;
  unit: string;
  stock: number;
  // Optional legacy fields if needed elsewhere, but mainly using API fields now
  rating?: number;
  reviewCount?: number;
}

interface ServiceCardProps {
  product: Product;
}

export default function ServiceCard({ product }: ServiceCardProps) {
  const displayPrice = product.basePrice;

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
            className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full hover:bg-white text-gray-400 hover:text-red-500 transition-colors shadow-sm z-10"
            onClick={(e) => {
              e.preventDefault();
              // Handle favourite logic
            }}
          >
            <Heart className="w-4 h-4" />
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
                product.status === "Available"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.status === "Available" ? "In Stock" : "Stock Out"}
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            className="w-full bg-[#004F3B] hover:bg-[#003d2e] text-white text-xs font-bold py-6 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-primary/20"
            size="sm"
            disabled={product.status !== "Available"}
            onClick={(e) => {
              e.preventDefault();
              // Handle add to cart logic
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
