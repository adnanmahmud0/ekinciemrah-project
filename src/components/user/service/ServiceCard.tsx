"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export interface Product {
    id: string;
    name: string;
    category: string;
    image: string;
    rating: number;
    reviewCount: number;
    price: number; // For backward compatibility or default
    priceHigh: number;
    priceMedium: number;
    priceLow: number;
    unit: string; // e.g., "Pound", "Kg"
    description: string;
}

interface ServiceCardProps {
    product: Product;
    activeTier?: "high" | "medium" | "low";
}

export default function ServiceCard({ product, activeTier = "high" }: ServiceCardProps) {
    const displayPrice = activeTier === "high"
        ? product.priceHigh
        : activeTier === "medium"
            ? product.priceMedium
            : product.priceLow;

    return (
        <Link href={`/service/${product.id}`} className="block">
            <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden flex flex-col h-full border border-gray-100 group">
                {/* Product Image */}
                <div className="relative h-48 bg-gray-50/50 flex items-center justify-center overflow-hidden">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Badge for Tier (Optional UI flair) */}
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/80 backdrop-blur-md border border-white/40 rounded-full text-[10px] font-bold text-gray-500 shadow-sm uppercase tracking-tighter">
                            {product.category}
                        </span>
                    </div>
                </div>

                {/* Product Info */}
                <div className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-[15px] text-[#1A2D42] leading-tight line-clamp-1">
                            {product.name}
                        </h3>
                    </div>

                    <p className="text-xs text-gray-400 mb-4 line-clamp-2 flex-1 leading-relaxed">
                        {product.description}
                    </p>

                    {/* Price Section */}
                    <div className="flex items-end justify-between mb-4">
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-0.5">Price</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-black text-[#004F3B]">
                                    ${displayPrice.toFixed(2)}
                                </span>
                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                                    /{product.unit}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                        className="w-full bg-[#004F3B] hover:bg-[#003d2e] text-white text-xs font-bold py-6 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-primary/20"
                        size="sm"
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
