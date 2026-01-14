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
    price: number;
    unit: string; // e.g., "Pound", "Kg"
    description: string;
}

interface ServiceCardProps {
    product: Product;
}

export default function ServiceCard({ product }: ServiceCardProps) {
    return (
        <Link href={`/service/${product.id}`} className="block">
            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col h-full border border-gray-100">
                {/* Product Image */}
                <div className="relative h-40 bg-gray-100 flex items-center justify-center">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-4"
                    />
                </div>

                {/* Product Info */}
                <div className="p-3 flex-1 flex flex-col">
                    <h3 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-1">
                        {product.name}
                    </h3>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2 flex-1">
                        {product.description}
                    </p>

                    {/* Price */}
                    <div className="mb-2">
                        <span className="text-lg font-bold" style={{ color: '#004F3B' }}>
                            ${product.price.toFixed(2)}
                        </span>
                        <span className="text-[10px] text-gray-400 font-medium ml-1 inline-block uppercase tracking-wider">
                            /{product.unit}
                        </span>
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                        className="w-full text-white text-xs py-2 rounded-md flex items-center justify-center gap-1 h-9 transition-transform active:scale-95"
                        style={{ backgroundColor: '#004F3B' }}
                        size="sm"
                        onClick={(e) => {
                            e.preventDefault();
                            // Handle add to cart logic
                        }}
                    >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        Add to Cart
                    </Button>
                </div>
            </div>
        </Link>
    );
}
