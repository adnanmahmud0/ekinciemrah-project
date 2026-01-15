"use client";
import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import ServiceSidebar from "./ServiceSidebar";
import ServiceGrid from "./ServiceGrid";
import { Product } from "./ServiceCard";
import { MOCK_PRODUCTS } from "@/data/mockProducts";

interface ServicePageProps {
  initialProducts?: Product[];
}

export default function ServicePage({
  initialProducts = MOCK_PRODUCTS,
}: ServicePageProps) {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const categories = ["All Categories", ...new Set(MOCK_PRODUCTS.map((p) => p.category))];

  const filteredProducts = useMemo(() => {
    const byCategory = initialProducts.filter(
      (product) =>
        selectedCategory === "All Categories" || product.category === selectedCategory
    );

    if (!searchTerm.trim()) {
      return byCategory;
    }

    const term = searchTerm.toLowerCase();
    return byCategory.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term)
    );
  }, [selectedCategory, initialProducts, searchTerm]);

  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col items-center gap-4 text-center">
          <div>
            <h1 className="text-2xl font-bold text-[#1A2D42] md:text-3xl">
              Browse fresh products
            </h1>
            <p className="text-sm text-gray-500">
              Filter by category, price tier, or search by name.
            </p>
          </div>
          <form
            className="w-full max-w-xl"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="relative flex w-full items-center gap-2">
              <div className="relative flex-1 w-full rounded-2xl border border-gray-200 bg-white/90 shadow-sm transition-all duration-500 ease-out focus-within:bg-white focus-within:shadow-lg focus-within:shadow-[#004F3B]/10 focus-within:border-[#004F3B]">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors duration-300 focus-within:text-[#004F3B]" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search fresh produce....."
                  className="w-full rounded-2xl bg-transparent py-2.5 pl-10 pr-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="whitespace-nowrap rounded-2xl bg-[#004F3B] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-[#003528] hover:shadow-md"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <ServiceSidebar
            productCategories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <ServiceGrid products={filteredProducts} />
        </div>
      </div>
    </section>
  );
}
