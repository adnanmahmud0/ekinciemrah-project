"use client";

import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Truck,
  Leaf,
  ShieldCheck,
  Headphones,
  TrendingDown,
} from "lucide-react";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useApi } from "@/hooks/use-api-data";
import { BannerResponse } from "@/types/banner";

const getImageUrl = (path: string | undefined) => {
  if (!path) return "/promotion-1.png"; // Fallback to a default
  if (path.startsWith("http")) return path;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
  const baseUrl = apiUrl.includes("/api") ? new URL(apiUrl).origin : apiUrl;

  if (path.startsWith("/")) return `${baseUrl}${path}`;
  return `${baseUrl}/${path}`;
};

export default function PromotionalBanners() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const { data: bannerData } = useApi<BannerResponse>("/banner", ["banners"]);
  const webBanners = useMemo(
    () => bannerData?.data?.webBanners || [],
    [bannerData],
  );

  const carouselSlides = useMemo(
    () =>
      webBanners.length > 0
        ? webBanners.slice(0, 2).map((b, i) => ({
            id: i + 1,
            image: getImageUrl(b.image),
          }))
        : [
            { id: 1, image: "/promotion-1.png" },
            { id: 2, image: "/promotion-1.1.png" },
          ],
    [webBanners],
  );

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  }, [carouselSlides]);

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length,
    );
  };

  // Auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Swipe handlers
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <section className="bg-white mt-5">
      <div className="container mx-auto px-4">
        {/* Main Carousel Banner - Full Width */}
        <div
          className="relative h-[280px] md:h-[420px] lg:h-[640px] rounded-2xl overflow-hidden shadow-lg touch-pan-y"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="absolute inset-0 transition-all duration-700 ease-in-out">
            {/* Content */}
            <div className="relative h-full animate-fadeIn">
              <Image
                src={carouselSlides[currentSlide].image}
                alt="Promotional Banner"
                width={1505}
                height={620}
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all z-20 cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all z-20 cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {carouselSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide ? "bg-white w-6" : "bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
