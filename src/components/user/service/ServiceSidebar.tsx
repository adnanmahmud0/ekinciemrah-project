"use client";
import React, { useState } from "react";
import {
    ChevronDown,
    Tag,
    Filter,
    ArrowRight,
    Leaf,
    Apple,
    Sprout,
    Milk,
    Package,
    ShoppingBag,
    CircleDot
} from "lucide-react";

interface ServiceSidebarProps {
    priceTiers: string[];
    selectedPriceTier: string;
    onSelectPriceTier: (tier: string) => void;
    productCategories: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
    "Vegetables": <Leaf className="w-4 h-4" />,
    "Fruits": <Apple className="w-4 h-4" />,
    "Greens": <Sprout className="w-4 h-4" />,
    "Dairy": <Milk className="w-4 h-4" />,
    "Dry Groceries": <Package className="w-4 h-4" />,
    "Pantry": <ShoppingBag className="w-4 h-4" />,
    "Cheese": <CircleDot className="w-4 h-4" />,
};

export default function ServiceSidebar({
    priceTiers,
    selectedPriceTier,
    onSelectPriceTier,
    productCategories,
    selectedCategory,
    onSelectCategory,
}: ServiceSidebarProps) {
    return (
        <div className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-6">
            {/* Price Tiers Card */}
            <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 rounded-[2rem] sticky top-24">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-[#004F3B]/10 rounded-xl">
                        <Tag className="w-4 h-4 text-[#004F3B]" />
                    </div>
                    <h3 className="text-sm font-black text-[#1A2D42] uppercase tracking-widest">Pricing Category</h3>
                </div>

                <div className="grid grid-cols-1 gap-2">
                    {priceTiers.map((tier) => {
                        const isActive = selectedPriceTier === tier;
                        return (
                            <button
                                key={tier}
                                onClick={() => onSelectPriceTier(tier)}
                                className={`flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 font-bold text-xs ${isActive
                                    ? "bg-[#004F3B] text-white shadow-lg shadow-primary/20 scale-[1.02]"
                                    : "bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-[#1A2D42]"
                                    }`}
                            >
                                <span className="tracking-wide">{tier}</span>
                                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                            </button>
                        );
                    })}
                </div>

                <p className="mt-4 text-[10px] text-gray-400 font-medium leading-relaxed px-1">
                    Select a category to swap all product prices globally.
                </p>
            </div>

            {/* Product Filter Card */}
            <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 rounded-[2rem] sticky top-[420px]">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-[#004F3B]/10 rounded-xl">
                        <Filter className="w-4 h-4 text-[#004F3B]" />
                    </div>
                    <h3 className="text-sm font-black text-[#1A2D42] uppercase tracking-widest">Filter Items</h3>
                </div>

                <div className="space-y-2">
                    {productCategories.map((category) => {
                        const isActive = selectedCategory === category;
                        return (
                            <button
                                key={category}
                                onClick={() => onSelectCategory(category)}
                                className={`group w-full flex items-center justify-between px-5 py-3.5 rounded-2xl transition-all duration-300 font-bold text-[13px] ${isActive
                                    ? "bg-[#004F3B]/5 text-[#004F3B] border border-[#004F3B]/20 shadow-sm"
                                    : "text-gray-500 hover:bg-white hover:text-[#004F3B] border border-transparent"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className={`${isActive ? "text-[#004F3B]" : "text-gray-300 group-hover:text-[#004F3B]"} transition-colors`}>
                                        {CATEGORY_ICONS[category] || <Package className="w-4 h-4" />}
                                    </span>
                                    <span>{category}</span>
                                </div>
                                {isActive && <ArrowRight className="w-3.5 h-3.5 text-[#004F3B]" />}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
