"use client";
import React, { use } from "react";
import { notFound } from "next/navigation";
import PurchasePage from "@/components/user/purchase/PurchasePage";
import { Product } from "@/components/user/service/ServiceCard";

// Mock data - Replace with API call
const MOCK_PRODUCTS: Product[] = [
    {
        id: "1",
        name: "Red Tomatoes",
        category: "Vegetables",
        image: "/category-1.png",
        rating: 4.5,
        reviewCount: 20,
        price: 2.5,
        priceHigh: 2.5,
        priceMedium: 2.5,
        priceLow: 2.5,
        unit: "Pound",
        description: "Fresh, vine-ripened organic red tomatoes grown without chemicals, harvested at peak ripeness for rich flavor, vibrant color, and juicy texture.",
    },
    {
        id: "2",
        name: "Carrots",
        category: "Vegetables",
        image: "/category-2.png",
        rating: 4.5,
        reviewCount: 20,
        price: 2.5,
        priceHigh: 2.5,
        priceMedium: 2.5,
        priceLow: 2.5,
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
        price: 3.2,
        priceHigh: 3.2,
        priceMedium: 3.2,
        priceLow: 3.2,
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
        price: 2.8,
        priceHigh: 2.8,
        priceMedium: 2.8,
        priceLow: 2.8,
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
        price: 1.9,
        priceHigh: 1.9,
        priceMedium: 1.9,
        priceLow: 1.9,
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
        price: 2.2,
        priceHigh: 2.2,
        priceMedium: 2.2,
        priceLow: 2.2,
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
        price: 3,
        priceHigh: 3,
        priceMedium: 3,
        priceLow: 3,
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
        price: 1.8,
        priceHigh: 1.8,
        priceMedium: 1.8,
        priceLow: 1.8,
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
        price: 4.5,
        priceHigh: 4.5,
        priceMedium: 4.5,
        priceLow: 4.5,
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
        price: 12,
        priceHigh: 12,
        priceMedium: 12,
        priceLow: 12,
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
        price: 3.5,
        priceHigh: 3.5,
        priceMedium: 3.5,
        priceLow: 3.5,
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
        price: 6,
        priceHigh: 6,
        priceMedium: 6,
        priceLow: 6,
        unit: "8oz",
        description: "Aged sharp cheddar cheese.",
    },
];

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
