/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import ServiceSidebar from "./ServiceSidebar";
import ServiceGrid from "./ServiceGrid";
import { Product } from "./ServiceCard";
import { useApi } from "@/hooks/use-api-data";
import { useDebounce } from "@/hooks/use-debounce";
import { useAuth } from "@/context/auth-context";

interface ServicePageProps {
  initialProducts?: Product[];
}

export default function ServicePage({
  initialProducts = [],
}: ServicePageProps) {
  const { isAuthenticated } = useAuth();
  const { data: categoryData, isLoading: isCategoriesLoading } = useApi(
    "/category",
    ["categories"],
  );
  const categoriesList = categoryData?.data || [];
  const categories = [
    "All Categories",
    ...categoriesList.map((c: any) => c.categoryName),
  ];

  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get("category");
  const selectedCategory = categoryParam || "All Categories";
  const searchParam = searchParams.get("search") || "";

  const handleSelectCategory = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "All Categories") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    router.push(`/service?${params.toString()}`);
  };

  const [searchTerm, setSearchTerm] = useState<string>(searchParam);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    setSearchTerm(searchParam);
  }, [searchParam]);

  const baseEndpoint = isAuthenticated
    ? "/product&catelog/customer-type"
    : "/product&catelog";

  let apiUrl = baseEndpoint;
  let shouldFetch = true;

  if (selectedCategory !== "All Categories") {
    // Wait for categories to load before fetching products to avoid premature requests
    if (isCategoriesLoading) {
      shouldFetch = false;
    } else {
      apiUrl += `?category=${encodeURIComponent(selectedCategory)}`;
    }
  } else if (debouncedSearchTerm) {
    apiUrl += `?search=${encodeURIComponent(debouncedSearchTerm)}`;
  }

  const { data: productsData, isLoading } = useApi(
    apiUrl,
    ["products", selectedCategory, debouncedSearchTerm],
    {
      enabled: shouldFetch,
    },
  );
  const products: Product[] = productsData?.data?.data || [];

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
              const params = new URLSearchParams(searchParams.toString());
              if (searchTerm.trim()) {
                params.set("search", searchTerm.trim());
              } else {
                params.delete("search");
              }
              router.push(`/service?${params.toString()}`);
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
            onSelectCategory={handleSelectCategory}
          />
          {isLoading || !shouldFetch ? (
            <div className="w-full flex justify-center py-20">
              Loading products...
            </div>
          ) : (
            <ServiceGrid products={products} />
          )}
        </div>
      </div>
    </section>
  );
}
