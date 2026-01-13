"use client";
import React from "react";
import FavouriteGrid from "./FavouriteGrid";
import { Product } from "./FavouriteCard";

// Mock data - Replace with API call
const MOCK_PRODUCTS: Product[] = [
    {
        id: "1",
        name: "Red Tomatoes",
        category: "Vegetables",
        image: "/category-1.png",
        rating: 4.5,
        reviewCount: 20,
        price: 2.50,
        unit: "Pound",
        description: "Fresh, vine-ripened organic red tomatoes.",
    },
    {
        id: "2",
        name: "Carrots",
        category: "Vegetables",
        image: "/category-2.png",
        rating: 4.5,
        reviewCount: 20,
        price: 2.50,
        unit: "Pound",
        description: "Fresh, vine-ripened organic carrots.",
    },
    {
        id: "2a",
        name: "Fresh Broccoli",
        category: "Vegetables",
        image: "/category-3.png",
        rating: 4.7,
        reviewCount: 18,
        price: 3.20,
        unit: "Pound",
        description: "Crisp and nutritious organic broccoli florets.",
    },
    {
        id: "2b",
        name: "Bell Peppers",
        category: "Vegetables",
        image: "/category-4.png",
        rating: 4.6,
        reviewCount: 25,
        price: 2.80,
        unit: "Pound",
        description: "Colorful organic bell peppers, perfect for salads.",
    },
    {
        id: "2c",
        name: "Cucumbers",
        category: "Vegetables",
        image: "/category-5.png",
        rating: 4.4,
        reviewCount: 12,
        price: 1.90,
        unit: "Pound",
        description: "Fresh and crunchy organic cucumbers.",
    },
    {
        id: "2d",
        name: "Zucchini",
        category: "Vegetables",
        image: "/category-1.png",
        rating: 4.3,
        reviewCount: 14,
        price: 2.20,
        unit: "Pound",
        description: "Tender organic zucchini, great for grilling.",
    },
    {
        id: "3",
        name: "Fresh Apples",
        category: "Fruits",
        image: "/category-2.png",
        rating: 4.8,
        reviewCount: 35,
        price: 3.00,
        unit: "Pound",
        description: "Crisp and sweet organic apples.",
    },
    {
        id: "4",
        name: "Spinach",
        category: "Greens",
        image: "/category-3.png",
        rating: 4.6,
        reviewCount: 15,
        price: 1.80,
        unit: "Pound",
        description: "Fresh organic spinach leaves.",
    },
    {
        id: "5",
        name: "Whole Milk",
        category: "Dairy",
        image: "/category-4.png",
        rating: 4.7,
        reviewCount: 42,
        price: 4.50,
        unit: "Gallon",
        description: "Fresh whole milk from local farms.",
    },
    {
        id: "6",
        name: "Rice",
        category: "Dry Groceries",
        image: "/category-5.png",
        rating: 4.9,
        reviewCount: 58,
        price: 12.00,
        unit: "5lb Bag",
        description: "Premium long-grain white rice.",
    },
    {
        id: "7",
        name: "Organic Pasta",
        category: "Pantry",
        image: "/category-1.png",
        rating: 4.5,
        reviewCount: 22,
        price: 3.50,
        unit: "Box",
        description: "Artisan organic pasta made from durum wheat.",
    },
    {
        id: "8",
        name: "Cheddar Cheese",
        category: "Cheese",
        image: "/category-2.png",
        rating: 4.8,
        reviewCount: 31,
        price: 6.00,
        unit: "8oz",
        description: "Aged sharp cheddar cheese.",
    },
];

interface FavouritePageProps {
    initialProducts?: Product[];
}

export default function FavouritePage({ initialProducts = MOCK_PRODUCTS }: FavouritePageProps) {
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
