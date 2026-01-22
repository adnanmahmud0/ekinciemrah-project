"use client";

import { Pin } from "lucide-react";
import Image from "next/image";

const categories = [
  { id: 1, title: "Vegetables", image: "/category-1.png" },
  { id: 2, title: "Fruits", image: "/category-2.png" },
  { id: 3, title: "Greens", image: "/category-3.png" },
  { id: 4, title: "Dairy", image: "/category-4.png" },
  { id: 5, title: "Dry Groceries", image: "/category-5.png" },
  { id: 6, title: "Greens", image: "/category-3.png" }, // Duplicate as per design
];

export default function Categories() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D1E32] flex items-center gap-2">
            <span className="text-[#146041] text-xl uppercase tracking-wider font-bold mb-2 flex items-center gap-2">
              <Pin className="w-5 h-5" />
              Servify
            </span>
          </h2>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0D1E32]">
            Categories
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-8 justify-center">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({
  category,
}: {
  category: { id: number; title: string; image: string };
}) {
  return (
    <div className="group relative h-[180px] md:h-[300px] rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url('/category-bg.png')` }}
      />

      {/* Content */}
      <div className="relative z-10 h-full border-2 border-[#E6F4F1] rounded-3xl flex flex-col items-center justify-center p-2 md:p-6">
        <div className="relative w-24 h-24 md:w-48 md:h-48 mb-2 md:mb-4 transition-transform duration-300 group-hover:scale-100">
          <Image
            src={category.image}
            alt={category.title}
            fill
            className="object-contain drop-shadow-lg"
          />
        </div>
        <h3 className="text-xs md:text-xl font-bold text-[#0D1E32] mt-auto text-center">
          {category.title}
        </h3>
      </div>
    </div>
  );
}
