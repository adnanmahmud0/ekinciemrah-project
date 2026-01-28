"use client";
import React, { useState, useEffect } from "react";
import FavouriteGrid from "./FavouriteGrid";
import { Product } from "./FavouriteCard";
import { useFavourite } from "@/hooks/use-favourite";

interface FavouritePageProps {
  initialProducts?: Product[];
}

export default function FavouritePage({
  initialProducts = [],
}: FavouritePageProps) {
  const { favouriteList, toggleFavourite, isLoading } = useFavourite();

  const getImageUrl = (path: string | undefined) => {
    if (!path) return "/placeholder.png";
    if (path.startsWith("http")) return path;
    if (path.startsWith("/"))
      return `${process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "")}${path}`;
    return `${process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "")}/${path}`;
  };

  const products: Product[] = favouriteList.map((item) => ({
    id: item._id,
    name: item.productName,
    category: item.category,
    image: getImageUrl(item.image),
    rating: item.avgRating || 0,
    reviewCount: item.reviewCount || 0,
    price: item.basePrice,
    unit: item.unit,
    description: item.description,
    availability: item.stock > 0 ? "in-stock" : "stock-out",
  }));

  if (isLoading) {
    return (
      <section className="py-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center">Loading favourites...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0D1E32]">
            My Favourites
          </h1>
          <p className="text-gray-600 mt-2">Your saved products</p>
        </div>

        <FavouriteGrid products={products} onRemove={toggleFavourite} />
      </div>
    </section>
  );
}
