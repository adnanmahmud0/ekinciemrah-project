"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { publicApi } from "@/lib/api-client";

interface Category {
  _id: string;
  categoryName: string;
  image: string;
}

export default function CategoryIcons() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await publicApi.get("/category");
        if (res.data.success) {
          setCategories(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch categories", error);
        // console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowRightArrow(scrollWidth > clientWidth);
    }
  }, [categories]);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      // Tolerance of 1px for float calculation differences
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth / 2;
      if (direction === "left") {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  if (categories.length === 0) return null;

  return (
    <section className="bg-white border-b border-gray-200 relative group">
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-center gap-4">
          {/* Left Arrow */}
          {showLeftArrow && (
            <button
              onClick={() => scroll("left")}
              className="flex-none z-10 bg-[#004F3B] shadow-md rounded-full p-2 hover:bg-[#003d2e] hidden md:flex border border-[#004F3B] transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
          )}

          {/* Categories Container */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-7 overflow-x-auto pb-5 pt-3 scrollbar-custom max-w-full"
          >
            {categories.map((category) => (
              <div
                key={category._id}
                onClick={() => {
                  console.log("Category clicked:", category);
                  router.push(
                    `/service?category=${encodeURIComponent(
                      category.categoryName,
                    )}`,
                  );
                }}
                className="flex flex-col items-center min-w-24 cursor-pointer group shrink-0"
              >
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3 group-hover:bg-green-50 transition-colors overflow-hidden border-2 border-transparent group-hover:border-green-500">
                  <div className="relative w-12 h-12">
                    <Image
                      src={
                        category.image
                          ? `${process.env.NEXT_PUBLIC_IMAGE_API}${category.image}`
                          : "/placeholder.png"
                      }
                      alt={category.categoryName}
                      fill
                      unoptimized
                      className="object-contain"
                    />
                  </div>
                </div>
                <p className="text-center font-medium text-gray-700 whitespace-pre-line leading-tight group-hover:text-[#004F3B] transition-colors text-sm">
                  {category.categoryName}
                </p>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          {showRightArrow && (
            <button
              onClick={() => scroll("right")}
              className="flex-none z-10 bg-[#004F3B] shadow-md rounded-full p-2 hover:bg-[#003d2e] hidden md:flex border border-[#004F3B] transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
