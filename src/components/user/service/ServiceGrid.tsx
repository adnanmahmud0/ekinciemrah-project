"use client";
import React from "react";
import ServiceCard, { Product } from "./ServiceCard";

interface ServiceGridProps {
    products: Product[];
}

export default function ServiceGrid({ products }: ServiceGridProps) {
    if (products.length === 0) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] text-gray-500">
                <p className="text-lg font-medium">No products found in this category.</p>
                <p className="text-sm">Try selecting a different filter.</p>
            </div>
        )
    }

    return (
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {products.map((product) => (
                <ServiceCard key={product.id} product={product} />
            ))}
        </div>
    );
}
