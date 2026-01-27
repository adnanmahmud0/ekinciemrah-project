"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Minus, Plus } from "lucide-react";
import { Product } from "./ServiceCard";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const displayPrice = product.basePrice;
  // Mock original price logic for now if not provided by API
  const originalPrice = displayPrice * 1.4;
  const savings = originalPrice - displayPrice;

  const getImageUrl = (path: string | undefined) => {
    if (!path) return "/placeholder.png";
    if (path.startsWith("http")) return path;
    if (path.startsWith("/"))
      return `${process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "")}${path}`;
    return `${process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "")}/${path}`;
  };

  return (
    <div className="bg-[#E6F4F1] rounded-3xl p-8 lg:p-12">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left: Product Image */}
        <div className="lg:w-1/2">
          <div className="relative w-full aspect-square bg-white rounded-2xl p-8 flex items-center justify-center">
            <Image
              src={getImageUrl(product.image)}
              alt={product.productName}
              fill
              unoptimized
              className="object-contain p-8"
            />
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="lg:w-1/2 flex flex-col">
          <h1 className="text-3xl lg:text-4xl font-bold text-[#0D1E32] mb-4">
            {product.productName}
          </h1>

          <p className="text-gray-600 leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Rating - using mock rating if not in API */}
          <div className="flex items-center gap-2 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(product.rating || 5)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <a href="#reviews" className="text-[#146041] underline ml-2">
              Ratings {product.reviewCount || 0}
            </a>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-4xl font-bold text-[#146041]">
                $ {displayPrice.toFixed(2)}
              </span>
              <span className="text-gray-400">/{product.unit}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 line-through">
                $ {originalPrice.toFixed(2)}
              </span>
              <span className="text-green-600 font-semibold">
                -$ {savings.toFixed(2)} (save)
              </span>
            </div>

            {/* Status Badge */}
            <div
              className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mt-2 ${
                product.status === "Available"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.status === "Available" ? "In Stock" : "Stock Out"}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Quantity
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="w-10 h-10 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center text-[#146041] font-bold transition-colors"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="text-2xl font-bold text-[#0D1E32] min-w-[3rem] text-center">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="w-10 h-10 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center text-[#146041] font-bold transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={`/purchase/${product._id}`} className="flex-1">
              <button
                className="w-full py-4 bg-[#146041] hover:bg-[#0e4b32] text-white rounded-xl font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={product.status !== "Available"}
              >
                Buy Now
              </button>
            </Link>
            <button
              className="flex-1 py-4 bg-white hover:bg-gray-50 text-[#146041] border-2 border-[#146041] rounded-xl font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={product.status !== "Available"}
            >
              + Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
