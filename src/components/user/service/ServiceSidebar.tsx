"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface ServiceSidebarProps {
    categories: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

export default function ServiceSidebar({
    categories,
    selectedCategory,
    onSelectCategory,
}: ServiceSidebarProps) {
    const [showAll, setShowAll] = useState(false);

    const visibleCategories = showAll ? categories : categories.slice(0, 5);
    const hasMore = categories.length > 5;

    return (
        <div className="w-full lg:w-64 flex-shrink-0 bg-white p-6 rounded-2xl lg:h-fit sticky top-24">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#0D1E32]">Filters</h3>
            </div>

            <div className="space-y-2">
                {visibleCategories.map((category) => (
                    <button
                        key={category}
                        onClick={() => onSelectCategory(category)}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-colors font-medium ${selectedCategory === category
                                ? "bg-[#E6F4F1] text-[#146041]"
                                : "text-gray-500 hover:bg-gray-50 hover:text-[#0D1E32]"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {hasMore && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="flex items-center gap-2 text-red-500 font-medium hover:opacity-80"
                    >
                        {showAll ? "Show less" : "Show more"}
                        <ChevronDown className={`w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`} />
                    </button>
                </div>
            )}
        </div>
    );
}
