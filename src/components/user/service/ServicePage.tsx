"use client";
import React, { useState, useMemo } from "react";
import ServiceSidebar from "./ServiceSidebar";
import ServiceGrid from "./ServiceGrid";
import { Product } from "./ServiceCard";

// Mock data - Replace with API call
const MOCK_PRODUCTS: Product[] = [
    // Vegetables
    { id: "v1", name: "Red Tomatoes", category: "Vegetables", image: "/red-tomatoes.png", rating: 4.5, reviewCount: 120, price: 2.50, unit: "Pound", description: "Fresh, vine-ripened organic red tomatoes.", priceHigh: 3.50, priceMedium: 2.50, priceLow: 1.50 },
    { id: "v2", name: "Carrots", category: "Vegetables", image: "/carrots.png", rating: 4.8, reviewCount: 85, price: 1.80, unit: "Pound", description: "Fresh, crunchy organic carrots with tops.", priceHigh: 2.80, priceMedium: 1.80, priceLow: 0.80 },
    { id: "v3", name: "Fresh Broccoli", category: "Vegetables", image: "/broccoli.png", rating: 4.7, reviewCount: 92, price: 3.20, unit: "Pound", description: "Nutritious organic broccoli florets.", priceHigh: 4.20, priceMedium: 3.20, priceLow: 2.20 },
    { id: "v4", name: "Bell Peppers", category: "Vegetables", image: "/bell-peppers.png", rating: 4.6, reviewCount: 78, price: 2.80, unit: "Pound", description: "Colorful organic bell peppers.", priceHigh: 3.80, priceMedium: 2.80, priceLow: 1.80 },
    { id: "v5", name: "Cucumbers", category: "Vegetables", image: "/cucumbers.png", rating: 4.4, reviewCount: 64, price: 1.50, unit: "Pound", description: "Fresh and crisp organic cucumbers.", priceHigh: 2.50, priceMedium: 1.50, priceLow: 0.50 },
    { id: "v6", name: "Zucchini", category: "Vegetables", image: "/zucchini.png", rating: 4.3, reviewCount: 52, price: 2.20, unit: "Pound", description: "Tender organic zucchini.", priceHigh: 3.20, priceMedium: 2.20, priceLow: 1.20 },
    { id: "v7", name: "Red Onions", category: "Vegetables", image: "/category-1.png", rating: 4.5, reviewCount: 110, price: 1.20, unit: "Pound", description: "Sharp and sweet red onions.", priceHigh: 2.20, priceMedium: 1.20, priceLow: 0.60 },
    { id: "v8", name: "Potatoes", category: "Vegetables", image: "/category-1.png", rating: 4.9, reviewCount: 230, price: 0.80, unit: "Pound", description: "Versatile organic russet potatoes.", priceHigh: 1.80, priceMedium: 0.80, priceLow: 0.40 },
    { id: "v9", name: "Garlic", category: "Vegetables", image: "/category-1.png", rating: 4.7, reviewCount: 145, price: 3.50, unit: "Pound", description: "Aromatic organic garlic bulbs.", priceHigh: 4.50, priceMedium: 3.50, priceLow: 2.50 },
    { id: "v10", name: "Eggplant", category: "Vegetables", image: "/category-1.png", rating: 4.2, reviewCount: 41, price: 2.90, unit: "Pound", description: "Glossy organic purple eggplant.", priceHigh: 3.90, priceMedium: 2.90, priceLow: 1.90 },

    // Fruits
    { id: "f1", name: "Fresh Apples", category: "Fruits", image: "/category-2.png", rating: 4.8, reviewCount: 156, price: 3.00, unit: "Pound", description: "Crisp and sweet organic apples.", priceHigh: 4.00, priceMedium: 3.00, priceLow: 2.00 },
    { id: "f2", name: "Bananas", category: "Fruits", image: "/category-2.png", rating: 4.9, reviewCount: 312, price: 0.60, unit: "Pound", description: "Ripe organic yellow bananas.", priceHigh: 1.60, priceMedium: 0.60, priceLow: 0.30 },
    { id: "f3", name: "Strawberries", category: "Fruits", image: "/category-2.png", rating: 4.7, reviewCount: 89, price: 4.50, unit: "Box", description: "Sweet fresh strawberries.", priceHigh: 5.50, priceMedium: 4.50, priceLow: 3.50 },
    { id: "f4", name: "Oranges", category: "Fruits", image: "/category-2.png", rating: 4.6, reviewCount: 124, price: 2.20, unit: "Pound", description: "Juicy organic oranges.", priceHigh: 3.20, priceMedium: 2.20, priceLow: 1.20 },
    { id: "f5", name: "Grapes", category: "Fruits", image: "/category-2.png", rating: 4.5, reviewCount: 98, price: 3.80, unit: "Pound", description: "Seedless sweet organic grapes.", priceHigh: 4.80, priceMedium: 3.80, priceLow: 2.80 },
    { id: "f6", name: "Mangoes", category: "Fruits", image: "/category-2.png", rating: 4.9, reviewCount: 175, price: 1.50, unit: "Each", description: "Sweet tropical mangoes.", priceHigh: 2.50, priceMedium: 1.50, priceLow: 0.80 },
    { id: "f7", name: "Pineapple", category: "Fruits", image: "/category-2.png", rating: 4.8, reviewCount: 63, price: 4.00, unit: "Each", description: "Fresh golden pineapple.", priceHigh: 5.00, priceMedium: 4.00, priceLow: 3.00 },
    { id: "f8", name: "Blueberries", category: "Fruits", image: "/category-2.png", rating: 4.7, reviewCount: 82, price: 5.20, unit: "Box", description: "Antioxidant-rich blueberries.", priceHigh: 6.20, priceMedium: 5.20, priceLow: 4.20 },
    { id: "f9", name: "Watermelon", category: "Fruits", image: "/category-2.png", rating: 4.6, reviewCount: 45, price: 6.00, unit: "Each", description: "Large sweet watermelon.", priceHigh: 8.00, priceMedium: 6.00, priceLow: 4.00 },
    { id: "f10", name: "Pears", category: "Fruits", image: "/category-2.png", rating: 4.4, reviewCount: 57, price: 2.80, unit: "Pound", description: "Juicy organic pears.", priceHigh: 3.80, priceMedium: 2.80, priceLow: 1.80 },

    // Greens
    { id: "g1", name: "Spinach", category: "Greens", image: "/category-3.png", rating: 4.6, reviewCount: 74, price: 1.80, unit: "Pound", description: "Fresh organic spinach leaves.", priceHigh: 2.80, priceMedium: 1.80, priceLow: 0.80 },
    { id: "g2", name: "Kale", category: "Greens", image: "/category-3.png", rating: 4.7, reviewCount: 58, price: 2.50, unit: "Bunch", description: "Nutritious organic curly kale.", priceHigh: 3.50, priceMedium: 2.50, priceLow: 1.50 },
    { id: "g3", name: "Lettuce", category: "Greens", image: "/category-3.png", rating: 4.5, reviewCount: 112, price: 1.50, unit: "Each", description: "Crisp romaine lettuce.", priceHigh: 2.50, priceMedium: 1.50, priceLow: 0.75 },
    { id: "g4", name: "Arugula", category: "Greens", image: "/category-3.png", rating: 4.4, reviewCount: 42, price: 3.00, unit: "Pack", description: "Peppery organic arugula.", priceHigh: 4.00, priceMedium: 3.00, priceLow: 2.00 },
    { id: "g5", name: "Swiss Chard", category: "Greens", image: "/category-3.png", rating: 4.6, reviewCount: 31, price: 2.80, unit: "Bunch", description: "Fresh organic swiss chard.", priceHigh: 3.80, priceMedium: 2.80, priceLow: 1.80 },
    { id: "g6", name: "Collard Greens", category: "Greens", image: "/category-3.png", rating: 4.3, reviewCount: 25, price: 2.20, unit: "Bunch", description: "Organic collard greens.", priceHigh: 3.20, priceMedium: 2.20, priceLow: 1.20 },
    { id: "g7", name: "Bok Choy", category: "Greens", image: "/category-3.png", rating: 4.7, reviewCount: 39, price: 3.50, unit: "Pound", description: "Baby organic bok choy.", priceHigh: 4.50, priceMedium: 3.50, priceLow: 2.50 },
    { id: "g8", name: "Cabbage", category: "Greens", image: "/category-3.png", rating: 4.8, reviewCount: 88, price: 1.20, unit: "Each", description: "Fresh green cabbage.", priceHigh: 2.20, priceMedium: 1.20, priceLow: 0.60 },
    { id: "g9", name: "Parsley", category: "Greens", image: "/category-3.png", rating: 4.9, reviewCount: 65, price: 1.00, unit: "Bunch", description: "Fresh organic parsley.", priceHigh: 2.00, priceMedium: 1.00, priceLow: 0.50 },
    { id: "g10", name: "Cilantro", category: "Greens", image: "/category-3.png", rating: 4.8, reviewCount: 125, price: 1.00, unit: "Bunch", description: "Fresh organic cilantro.", priceHigh: 2.00, priceMedium: 1.00, priceLow: 0.50 },

    // Dairy
    { id: "d1", name: "Whole Milk", category: "Dairy", image: "/category-4.png", rating: 4.7, reviewCount: 245, price: 4.50, unit: "Gallon", description: "Fresh whole milk from local farms.", priceHigh: 5.50, priceMedium: 4.50, priceLow: 3.50 },
    { id: "d2", name: "Greek Yogurt", category: "Dairy", image: "/category-4.png", rating: 4.8, reviewCount: 156, price: 5.50, unit: "Tub", description: "Creamy organic greek yogurt.", priceHigh: 6.50, priceMedium: 5.50, priceLow: 4.50 },
    { id: "d3", name: "Butter", category: "Dairy", image: "/category-4.png", rating: 4.9, reviewCount: 189, price: 3.80, unit: "Pack", description: "Farm fresh salted butter.", priceHigh: 4.80, priceMedium: 3.80, priceLow: 2.80 },
    { id: "d4", name: "Heavy Cream", category: "Dairy", image: "/category-4.png", rating: 4.7, reviewCount: 67, price: 4.20, unit: "Quart", description: "Rich organic heavy cream.", priceHigh: 5.20, priceMedium: 4.20, priceLow: 3.20 },
    { id: "d5", name: "Sour Cream", category: "Dairy", image: "/category-4.png", rating: 4.6, reviewCount: 82, price: 2.50, unit: "Tub", description: "Fresh organic sour cream.", priceHigh: 3.50, priceMedium: 2.50, priceLow: 1.50 },
    { id: "d6", name: "Cottage Cheese", category: "Dairy", image: "/category-4.png", rating: 4.5, reviewCount: 54, price: 3.90, unit: "Tub", description: "High-protein cottage cheese.", priceHigh: 4.90, priceMedium: 3.90, priceLow: 2.90 },
    { id: "d7", name: "Almond Milk", category: "Dairy", image: "/category-4.png", rating: 4.7, reviewCount: 128, price: 4.00, unit: "Carton", description: "Unsweetened organic almond milk.", priceHigh: 5.00, priceMedium: 4.00, priceLow: 3.00 },
    { id: "d8", name: "Soy Milk", category: "Dairy", image: "/category-4.png", rating: 4.6, reviewCount: 91, price: 3.80, unit: "Carton", description: "Organic vanilla soy milk.", priceHigh: 4.80, priceMedium: 3.80, priceLow: 2.80 },
    { id: "d9", name: "Chocolate Milk", category: "Dairy", image: "/category-4.png", rating: 4.9, reviewCount: 73, price: 2.80, unit: "Bottle", description: "Rich chocolate dairy milk.", priceHigh: 3.80, priceMedium: 2.80, priceLow: 1.80 },
    { id: "d10", name: "Whipped Cream", category: "Dairy", image: "/category-4.png", rating: 4.8, reviewCount: 42, price: 3.50, unit: "Can", description: "Real dairy whipped cream.", priceHigh: 4.50, priceMedium: 3.50, priceLow: 2.50 },

    // Dry Groceries
    { id: "dg1", name: "Basmati Rice", category: "Dry Groceries", image: "/category-5.png", rating: 4.9, reviewCount: 142, price: 12.00, unit: "5lb Bag", description: "Premium aged basmati rice.", priceHigh: 13.00, priceMedium: 12.00, priceLow: 11.00 },
    { id: "dg2", name: "Red Lentils", category: "Dry Groceries", image: "/category-5.png", rating: 4.8, reviewCount: 88, price: 3.50, unit: "2lb Bag", description: "Organic split red lentils.", priceHigh: 4.50, priceMedium: 3.50, priceLow: 2.50 },
    { id: "dg3", name: "Chickpeas", category: "Dry Groceries", image: "/category-5.png", rating: 4.7, reviewCount: 76, price: 2.80, unit: "2lb Bag", description: "Dried organic chickpeas.", priceHigh: 3.80, priceMedium: 2.80, priceLow: 1.80 },
    { id: "dg4", name: "Quinoa", category: "Dry Groceries", image: "/category-5.png", rating: 4.8, reviewCount: 65, price: 8.50, unit: "2lb Bag", description: "Organic white quinoa.", priceHigh: 9.50, priceMedium: 8.50, priceLow: 7.50 },
    { id: "dg5", name: "Rolled Oats", category: "Dry Groceries", image: "/category-5.png", rating: 4.7, reviewCount: 124, price: 4.20, unit: "Bag", description: "Old fashioned rolled oats.", priceHigh: 5.20, priceMedium: 4.20, priceLow: 3.20 },
    { id: "dg6", name: "Brown Sugar", category: "Dry Groceries", image: "/category-5.png", rating: 4.6, reviewCount: 53, price: 2.50, unit: "Bag", description: "Organic light brown sugar.", priceHigh: 3.50, priceMedium: 2.50, priceLow: 1.50 },
    { id: "dg7", name: "All-Purpose Flour", category: "Dry Groceries", image: "/category-5.png", rating: 4.8, reviewCount: 210, price: 5.00, unit: "5lb Bag", description: "Organic unbleached flour.", priceHigh: 6.00, priceMedium: 5.00, priceLow: 4.00 },
    { id: "dg8", name: "Sea Salt", category: "Dry Groceries", image: "/category-5.png", rating: 4.9, reviewCount: 145, price: 4.80, unit: "Jar", description: "Fine grain mediterranean sea salt.", priceHigh: 5.80, priceMedium: 4.80, priceLow: 3.80 },
    { id: "dg9", name: "Black Pepper", category: "Dry Groceries", image: "/category-5.png", rating: 4.8, reviewCount: 82, price: 6.50, unit: "Jar", description: "Whole black peppercorns.", priceHigh: 7.50, priceMedium: 6.50, priceLow: 5.50 },
    { id: "dg10", name: "Spice Mix", category: "Dry Groceries", image: "/category-5.png", rating: 4.7, reviewCount: 34, price: 5.80, unit: "Jar", description: "Organic italian herb seasoning.", priceHigh: 6.80, priceMedium: 5.80, priceLow: 4.80 },

    // Pantry
    { id: "p1", name: "Organic Pasta", category: "Pantry", image: "/category-5.png", rating: 4.5, reviewCount: 142, price: 3.50, unit: "Box", description: "Artisan durum wheat pasta.", priceHigh: 4.50, priceMedium: 3.50, priceLow: 2.50 },
    { id: "p2", name: "Tomato Sauce", category: "Pantry", image: "/category-5.png", rating: 4.6, reviewCount: 96, price: 4.20, unit: "Jar", description: "Organic basil tomato sauce.", priceHigh: 5.20, priceMedium: 4.20, priceLow: 3.20 },
    { id: "p3", name: "Olive Oil", category: "Pantry", image: "/category-5.png", rating: 4.9, reviewCount: 187, price: 15.00, unit: "Bottle", description: "Extra virgin cold pressed olive oil.", priceHigh: 16.00, priceMedium: 15.00, priceLow: 14.00 },
    { id: "p4", name: "Raw Honey", category: "Pantry", image: "/category-5.png", rating: 4.9, reviewCount: 124, price: 12.50, unit: "Jar", description: "Unfiltered organic raw honey.", priceHigh: 13.50, priceMedium: 12.50, priceLow: 11.50 },
    { id: "p5", name: "Peanut Butter", category: "Pantry", image: "/category-5.png", rating: 4.7, reviewCount: 156, price: 6.80, unit: "Jar", description: "Creamy organic peanut butter.", priceHigh: 7.80, priceMedium: 6.80, priceLow: 5.80 },
    { id: "p6", name: "Strawberry Jam", category: "Pantry", image: "/category-5.png", rating: 4.6, reviewCount: 78, price: 5.20, unit: "Jar", description: "Organic strawberry preserves.", priceHigh: 6.20, priceMedium: 5.20, priceLow: 4.20 },
    { id: "p7", name: "Crackers", category: "Pantry", image: "/category-5.png", rating: 4.4, reviewCount: 63, price: 3.90, unit: "Box", description: "Whole grain organic crackers.", priceHigh: 4.90, priceMedium: 3.90, priceLow: 2.90 },
    { id: "p8", name: "Canned Beans", category: "Pantry", image: "/category-5.png", rating: 4.5, reviewCount: 231, price: 1.50, unit: "Can", description: "Organic black beans.", priceHigh: 2.50, priceMedium: 1.50, priceLow: 0.75 },
    { id: "p9", name: "Canned Tuna", category: "Pantry", image: "/category-5.png", rating: 4.3, reviewCount: 89, price: 2.80, unit: "Can", description: "Wild caught albacore tuna.", priceHigh: 3.80, priceMedium: 2.80, priceLow: 1.80 },
    { id: "p10", name: "Vegetable Soup", category: "Pantry", image: "/category-5.png", rating: 4.2, reviewCount: 45, price: 3.50, unit: "Can", description: "Organic hearty vegetable soup.", priceHigh: 4.50, priceMedium: 3.50, priceLow: 2.50 },

    // Cheese
    { id: "c1", name: "Cheddar Cheese", category: "Cheese", image: "/category-4.png", rating: 4.8, reviewCount: 165, price: 6.00, unit: "8oz", description: "Aged sharp cheddar cheese.", priceHigh: 7.00, priceMedium: 6.00, priceLow: 5.00 },
    { id: "c2", name: "Mozzarella", category: "Cheese", image: "/category-4.png", rating: 4.9, reviewCount: 212, price: 5.50, unit: "8oz", description: "Fresh organic mozzarella ball.", priceHigh: 6.50, priceMedium: 5.50, priceLow: 4.50 },
    { id: "c3", name: "Parmesan", category: "Cheese", image: "/category-4.png", rating: 4.9, reviewCount: 145, price: 8.50, unit: "8oz", description: "Aged italian parmesan wedge.", priceHigh: 9.50, priceMedium: 8.50, priceLow: 7.50 },
    { id: "c4", name: "Feta Cheese", category: "Cheese", image: "/category-4.png", rating: 4.7, reviewCount: 98, price: 4.80, unit: "8oz", description: "Creamy organic sheep feta.", priceHigh: 5.80, priceMedium: 4.80, priceLow: 3.80 },
    { id: "c5", name: "Brie Cheese", category: "Cheese", image: "/category-4.png", rating: 4.8, reviewCount: 76, price: 7.20, unit: "8oz", description: "Double cream organic brie.", priceHigh: 8.20, priceMedium: 7.20, priceLow: 6.20 },
    { id: "c6", name: "Gouda", category: "Cheese", image: "/category-4.png", rating: 4.7, reviewCount: 54, price: 6.50, unit: "8oz", description: "Mild smoked organic gouda.", priceHigh: 7.50, priceMedium: 6.50, priceLow: 5.50 },
    { id: "c7", name: "Blue Cheese", category: "Cheese", image: "/category-4.png", rating: 4.4, reviewCount: 42, price: 5.90, unit: "4oz", description: "Crumble blue cheese wedge.", priceHigh: 6.90, priceMedium: 5.90, priceLow: 4.90 },
    { id: "c8", name: "Swiss Cheese", category: "Cheese", image: "/category-4.png", rating: 4.6, reviewCount: 67, price: 5.20, unit: "8oz", description: "Organic swiss cheese slices.", priceHigh: 6.20, priceMedium: 5.20, priceLow: 4.20 },
    { id: "c9", name: "Goat Cheese", category: "Cheese", image: "/category-4.png", rating: 4.8, reviewCount: 83, price: 6.80, unit: "4oz", description: "Fresh organic goat cheese log.", priceHigh: 7.80, priceMedium: 6.80, priceLow: 5.80 },
    { id: "c10", name: "Provolone", category: "Cheese", image: "/category-4.png", rating: 4.5, reviewCount: 51, price: 4.50, unit: "8oz", description: "Mild organic provolone slices.", priceHigh: 5.50, priceMedium: 4.50, priceLow: 3.50 },
];

const PRICE_TIERS = ["Category 1", "Category 2", "Category 3"];
const PRODUCT_CATEGORIES = ["Vegetables", "Fruits", "Greens", "Dairy", "Dry Groceries", "Pantry", "Cheese"];

interface ServicePageProps {
    initialProducts?: Product[];
}

export default function ServicePage({ initialProducts = MOCK_PRODUCTS }: ServicePageProps) {
    const [selectedPriceTier, setSelectedPriceTier] = useState<string>("Category 1");
    const [selectedCategory, setSelectedCategory] = useState<string>("Vegetables");

    const filteredProducts = useMemo(() => {
        return initialProducts.filter((product) => product.category === selectedCategory);
    }, [selectedCategory, initialProducts]);

    const activeTier = selectedPriceTier === "Category 1"
        ? "high"
        : selectedPriceTier === "Category 2"
            ? "medium"
            : "low";

    return (
        <section className="py-12 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-8">
                    <ServiceSidebar
                        priceTiers={PRICE_TIERS}
                        selectedPriceTier={selectedPriceTier}
                        onSelectPriceTier={setSelectedPriceTier}
                        productCategories={PRODUCT_CATEGORIES}
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                    />
                    <ServiceGrid products={filteredProducts} activeTier={activeTier} />
                </div>
            </div>
        </section>
    );
}
