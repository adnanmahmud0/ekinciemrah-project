"use client";
import React, { useState } from "react";
import {
    ChevronDown,
    Leaf,
    Apple,
    Sprout,
    Milk,
    Package,
    ShoppingBag,
    CircleDot,
    Filter,
    ArrowRight
} from "lucide-react";

interface ServiceSidebarProps {
    categories: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
    "Vegetables": <Leaf className="w-5 h-5" />,
    "Fruits": <Apple className="w-5 h-5" />,
    "Greens": <Sprout className="w-5 h-5" />,
    "Dairy": <Milk className="w-5 h-5" />,
    "Dry Groceries": <Package className="w-5 h-5" />,
    "Pantry": <ShoppingBag className="w-5 h-5" />,
    "Cheese": <CircleDot className="w-5 h-5" />,
};

export default function ServiceSidebar({
    categories,
    selectedCategory,
    onSelectCategory,
}: ServiceSidebarProps) {
    return (
        <div className="w-full lg:w-72 flex-shrink-0 bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-7 rounded-[2rem] lg:h-fit sticky top-24">
            {/* Header section */}
            <div className="flex items-center gap-3 mb-8 shrink-0">
                <div className="p-2.5 bg-primary/10 rounded-xl">
                    <Filter className="w-5 h-5 text-primary" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-[#1A2D42] tracking-tight">Filters</h3>
                    <p className="text-xs text-gray-400 font-medium">Narrow your search</p>
                </div>
            </div>

            {/* Categories list - No internal scrollbar */}
            <div className="space-y-3">
                {categories.map((category) => {
                    const isActive = selectedCategory === category;
                    return (
                        <button
                            key={category}
                            onClick={() => onSelectCategory(category)}
                            className={`group w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 font-semibold text-[15px] cursor-pointer ${isActive
                                ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]"
                                : "text-gray-500 hover:bg-gray-50 hover:text-primary hover:translate-x-1"
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <span className={`${isActive ? "text-white" : "text-gray-400 group-hover:text-primary"} transition-colors`}>
                                    {CATEGORY_ICONS[category] || <Package className="w-5 h-5" />}
                                </span>
                                <span>{category}</span>
                            </div>
                            {isActive && (
                                <ArrowRight className="w-4 h-4 text-white/70" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
