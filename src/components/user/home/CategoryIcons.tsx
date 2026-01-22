"use client";

import Image from "next/image";

const categories = [
    { id: 1, name: "Vegetables", icon: "/category-1.png" },
    { id: 2, name: "Fruits", icon: "/category-2.png" },
    { id: 3, name: "Dry Groceries", icon: "/category-3.png" },
    { id: 4, name: "Dairy", icon: "/category-4.png" },
    { id: 5, name: "Dry Groceries", icon: "/category-5.png" },
    { id: 6, name: "Beverages", icon: "/category-1.png" },
];

export default function CategoryIcons() {
    return (
        <section className="bg-white border-b border-gray-200">
            <div className="container mx-auto px-4 py-4">
                {/* Categories Container */}
                <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide md:justify-center">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="flex flex-col items-center min-w-[90px] cursor-pointer group flex-shrink-0"
                        >
                            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-2 group-hover:bg-gray-200 transition-colors">
                                <div className="relative w-12 h-12">
                                    <Image
                                        src={category.icon}
                                        alt={category.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                            <p className="text-xs text-center text-gray-700 whitespace-pre-line leading-tight">
                                {category.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
