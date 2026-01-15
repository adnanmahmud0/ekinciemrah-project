"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  availability: "in-stock" | "stock-out";
}

const featuredProducts: Product[] = [
  // Row 1
  {
    id: 1,
    name: "Fresh Tomatoes",
    description: "Organic red tomatoes, locally grown",
    price: 3.99,
    image: "/category-1.png",
    availability: "in-stock",
  },
  {
    id: 2,
    name: "Green Apples",
    description: "Crisp and sweet green apples",
    price: 4.49,
    image: "/category-2.png",
    availability: "in-stock",
  },
  {
    id: 3,
    name: "Whole Wheat Bread",
    description: "Freshly baked whole grain bread",
    price: 2.99,
    image: "/category-3.png",
    availability: "stock-out",
  },
  {
    id: 4,
    name: "Fresh Milk",
    description: "Organic whole milk, 1 gallon",
    price: 5.99,
    image: "/category-4.png",
    availability: "in-stock",
  },
  {
    id: 5,
    name: "Orange Juice",
    description: "100% pure orange juice",
    price: 6.49,
    image: "/category-5.png",
    availability: "in-stock",
  },
  {
    id: 6,
    name: "Carrots",
    description: "Fresh organic carrots bundle",
    price: 2.49,
    image: "/category-1.png",
    availability: "in-stock",
  },
  {
    id: 7,
    name: "Bananas",
    description: "Ripe yellow bananas",
    price: 1.99,
    image: "/category-2.png",
    availability: "in-stock",
  },
  {
    id: 8,
    name: "Pasta",
    description: "Premium Italian pasta",
    price: 3.49,
    image: "/category-3.png",
    availability: "stock-out",
  },

  // Row 2
  {
    id: 9,
    name: "Cheddar Cheese",
    description: "Aged cheddar cheese block",
    price: 7.99,
    image: "/category-4.png",
    availability: "in-stock",
  },
  {
    id: 10,
    name: "Sparkling Water",
    description: "Refreshing sparkling water",
    price: 4.99,
    image: "/category-5.png",
    availability: "in-stock",
  },
  {
    id: 11,
    name: "Bell Peppers",
    description: "Mixed color bell peppers",
    price: 5.49,
    image: "/category-1.png",
    availability: "in-stock",
  },
  {
    id: 12,
    name: "Strawberries",
    description: "Sweet fresh strawberries",
    price: 6.99,
    image: "/category-2.png",
    availability: "stock-out",
  },
  {
    id: 13,
    name: "Rice",
    description: "Premium long grain rice",
    price: 8.99,
    image: "/category-3.png",
    availability: "in-stock",
  },
  {
    id: 14,
    name: "Greek Yogurt",
    description: "Creamy Greek yogurt",
    price: 4.49,
    image: "/category-4.png",
    availability: "in-stock",
  },
  {
    id: 15,
    name: "Coffee",
    description: "Premium roasted coffee beans",
    price: 12.99,
    image: "/category-5.png",
    availability: "in-stock",
  },
  {
    id: 16,
    name: "Spinach",
    description: "Fresh organic spinach",
    price: 3.99,
    image: "/category-1.png",
    availability: "in-stock",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Featured Products
          </h2>
          <p className="text-gray-600">
            Discover our handpicked selection of quality products
          </p>
        </div>

        {/* Products Grid - 2 rows x 8 columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              {/* Product Image */}
              <div className="relative h-40 bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                />
              </div>

              {/* Product Info */}
              <div className="p-3 flex-1 flex flex-col">
                <h3 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-600 mb-2 line-clamp-2 flex-1">
                  {product.description}
                </p>

                {/* Price & Availability */}
                <div className="mb-2 flex items-center justify-between">
                  <span
                    className="text-lg font-bold"
                    style={{ color: "#004F3B" }}
                  >
                    ${product.price.toFixed(2)}
                  </span>
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      product.availability === "in-stock"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {product.availability === "in-stock"
                      ? "In stock"
                      : "Stock out"}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <Button
                  className="w-full text-white text-xs py-2 rounded-md flex items-center justify-center gap-1"
                  style={{ backgroundColor: "#004F3B" }}
                  size="sm"
                >
                  <ShoppingCart className="w-3 h-3" />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
