"use client";

import React, { use } from "react";
import { notFound } from "next/navigation";
import ProductDetails from "@/components/user/service/ProductDetails";
import { useApi } from "@/hooks/use-api-data";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  // Unwrap the params Promise using React.use() for Next.js 16
  const { id } = use(params);

  // Fetch product by id from API
  const { data: productData, isLoading } = useApi(`/product&catelog/${id}`, [
    "product",
    id,
  ]);
  const product = productData?.data;

  // While loading, we can show a loader or null
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading product details...</div>
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <ProductDetails product={product} />
      </div>
    </section>
  );
}
