"use client";
import React from "react";
import FavouriteGrid from "./FavouriteGrid";
import { Product } from "./FavouriteCard";
import { MOCK_PRODUCTS } from "@/data/mockProducts";

interface FavouritePageProps {
    initialProducts?: Product[];
}

export default function FavouritePage({ initialProducts = MOCK_PRODUCTS as unknown as Product[] }: FavouritePageProps) {
    return (
        <section className="py-12 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-6 md:px-12 lg:px-24">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#0D1E32]">My Favourites</h1>
                    <p className="text-gray-600 mt-2">Your saved products</p>
                </div>

                <FavouriteGrid products={initialProducts} />
            </div>
        </section>
    );
}
