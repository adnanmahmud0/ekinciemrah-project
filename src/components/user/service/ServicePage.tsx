"use client";
import React, { useState, useMemo } from "react";
import ServiceSidebar from "./ServiceSidebar";
import ServiceGrid from "./ServiceGrid";
import { Product } from "./ServiceCard";

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

const CATEGORIES = ["Vegetables", "Fruits", "Greens", "Dairy", "Dry Groceries", "Pantry", "Cheese"];

interface ServicePageProps {
    initialProducts?: Product[];
}

export default function ServicePage({ initialProducts = MOCK_PRODUCTS }: ServicePageProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>("Vegetables");

    const filteredProducts = useMemo(() => {
        return initialProducts.filter((product) => product.category === selectedCategory);
    }, [selectedCategory, initialProducts]);

    return (
        <section className="py-12 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-6 md:px-12 lg:px-24">
                <div className="flex flex-col lg:flex-row gap-8">
                    <ServiceSidebar
                        categories={CATEGORIES}
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                    />
                    <ServiceGrid products={filteredProducts} />
                </div>
            </div>
        </section>
    );
}
