"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Pin, Star } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  unit: string;
  rating: number;
  reviewCount: number;
  availability: "in-stock" | "stock-out";
}

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Red Tomatoes",
    description: "Fresh, vine-ripened organic red tomatoes.",
    image: "/category-1.png",
    price: 2.50,
    unit: "Pound",
    rating: 4.5,
    reviewCount: 201,
    availability: "in-stock",
  },
  {
    id: "3",
    name: "Apple",
    description: "Fresh, naturally ripened organic apples.",
    image: "/category-2.png",
    price: 2.50,
    unit: "Pound",
    rating: 4.5,
    reviewCount: 201,
    availability: "in-stock",
  },
  {
    id: "4",
    name: "Coriander",
    description: "Fresh, aromatic organic coriander.",
    image: "/category-3.png",
    price: 2.50,
    unit: "Piece",
    rating: 4.5,
    reviewCount: 201,
    availability: "in-stock",
  },
  {
    id: "8",
    name: "Cheese",
    description: "Fresh, vine-ripened organic Cheese.",
    image: "/category-4.png",
    price: 2.50,
    unit: "Pound",
    rating: 4.5,
    reviewCount: 201,
    availability: "stock-out",
  },
  {
    id: "7",
    name: "Flour",
    description: "Pure organic flour, perfect for baking",
    image: "/category-5.png",
    price: 2.50,
    unit: "Pound",
    rating: 4.5,
    reviewCount: 201,
    availability: "in-stock",
  },
  {
    id: "7b",
    name: "Flour",
    description: "Pure organic flour, perfect for baking",
    image: "/category-1.png",
    price: 2.50,
    unit: "Pound",
    rating: 4.5,
    reviewCount: 201,
    availability: "stock-out",
  },
];

export default function Products() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        {/* Header */}
        <div className="flex items-center gap-3 mb-12">
          <Pin className="w-6 h-6 text-[#146041]" />
          <h2 className="text-2xl md:text-2xl font-bold text-[#0D1E32]">
            <span className="text-[#146041]">SERVIFY</span>
          </h2>
        </div>

        <h3 className="text-2xl md:text-2xl font-bold text-[#0D1E32] mb-12">Products</h3>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <Link key={product.id} href={`/service/${product.id}`} className="block group">
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
                {/* Product Image */}
                <div className="relative h-64 w-full bg-gray-50 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-xl font-bold text-[#0D1E32]">{product.name}</h4>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-green-500 text-green-500" />
                      <span className="font-medium text-gray-700">{product.rating}</span>
                      <span className="text-gray-500">({product.reviewCount})</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-[#146041]">
                      $ {product.price.toFixed(2)}
                      <span className="text-sm font-normal text-gray-500"> /{product.unit}</span>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        product.availability === "in-stock"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {product.availability === "in-stock" ? "In stock" : "Stock out"}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      // Handle add to cart
                    }}
                    className="w-full mt-4 py-3 bg-[#146041] hover:bg-[#0e4b32] text-white rounded-xl font-semibold transition-colors"
                  >
                    + Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
