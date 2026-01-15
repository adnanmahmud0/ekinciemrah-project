"use client";
import React, { use } from "react";
import { notFound } from "next/navigation";
import PurchasePage from "@/components/user/purchase/PurchasePage";
import { Product } from "@/components/user/service/ServiceCard";
import { MOCK_PRODUCTS } from "@/data/mockProducts";

// Mock data - Replace with API call (Now imported from @/data/mockProducts)

interface PurchaseRouteProps {
    params: Promise<{ id: string }>;
}

export default function PurchaseRoute({ params }: PurchaseRouteProps) {
    // Unwrap the params Promise using React.use() for Next.js 16
    const { id } = use(params);

    // In a real app, fetch product by id from API
    const product = MOCK_PRODUCTS.find((p) => p.id === id);

    if (!product) {
        notFound();
    }

    return <PurchasePage product={product} />;
}
