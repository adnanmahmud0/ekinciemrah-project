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

  const isLocalImage = (url: string) => url.includes("localhost");

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

  const rightBanner1 = webBanners[2]
    ? getImageUrl(webBanners[2].image)
    : "/promotion-2.png";
  const rightBanner2 = webBanners[3]
    ? getImageUrl(webBanners[3].image)
    : "/promotion-3.png";

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
    <section className="bg-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Main Carousel Banner */}
          <div
            className="relative h-[250px] lg:h-[500px] rounded-2xl overflow-hidden shadow-lg touch-pan-y"
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
                  fill
                  className="object-cover"
                  unoptimized={isLocalImage(carouselSlides[currentSlide].image)}
                />
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all z-20"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all z-20"
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

          {/* Right Side - Two Vertical Banners (Side-by-Side) */}
          <div className="flex gap-4 h-[250px] lg:h-[500px]">
            {/* Side Banner 1 */}
            <div className="relative flex-1 rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
              <Image
                src={rightBanner1}
                alt="Promotion 2"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                unoptimized={isLocalImage(rightBanner1)}
              />
            </div>

            {/* Side Banner 2 */}
            <div className="relative flex-1 rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
              <Image
                src={rightBanner2}
                alt="Promotion 3"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                unoptimized={isLocalImage(rightBanner2)}
              />
            </div>
          </div>
        </div>

        {/* Bottom Features Marquee - Redesigned UI */}
        <div className="overflow-hidden mt-8 relative py-6 rounded-3xl bg-gradient-to-r from-emerald-50/50 via-white to-emerald-50/50 border border-emerald-100/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="flex w-fit items-center animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
            {/* First set of features */}
            <div className="flex gap-16 items-center shrink-0 pr-16">
              <div className="flex items-center gap-4 bg-white/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-emerald-50 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-emerald-600 font-bold">
                    Free Delivery
                  </p>
                  <p className="text-sm font-bold text-gray-800">
                    Orders from £30
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-emerald-50 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-green-600 font-bold">
                    Freshness
                  </p>
                  <p className="text-sm font-bold text-gray-800">
                    Fresh Products Every Day
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-emerald-50 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-blue-600 font-bold">
                    Safe Payment
                  </p>
                  <p className="text-sm font-bold text-gray-800">
                    With Any Bank Card
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-emerald-50 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-purple-600 font-bold">
                    24/7 Support
                  </p>
                  <p className="text-sm font-bold text-gray-800">
                    Always Be There for You
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-emerald-50 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-700">
                  <TrendingDown className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-orange-600 font-bold">
                    Best Price
                  </p>
                  <p className="text-sm font-bold text-gray-800">
                    Lowest Prices Guaranteed
                  </p>
                </div>
              </div>
            </div>

            {/* Duplicate for seamless loop */}
            <div className="flex gap-16 items-center shrink-0 pr-16">
              <div className="flex items-center gap-4 bg-white/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-emerald-50 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-emerald-600 font-bold">
                    Free Delivery
                  </p>
                  <p className="text-sm font-bold text-gray-800">
                    Orders from £30
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-emerald-50 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-green-600 font-bold">
                    Freshness
                  </p>
                  <p className="text-sm font-bold text-gray-800">
                    Fresh Products Every Day
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-emerald-50 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-blue-600 font-bold">
                    Safe Payment
                  </p>
                  <p className="text-sm font-bold text-gray-800">
                    With Any Bank Card
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-emerald-50 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-purple-600 font-bold">
                    24/7 Support
                  </p>
                  <p className="text-sm font-bold text-gray-800">
                    Always Be There for You
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-emerald-50 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-700">
                  <TrendingDown className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-orange-600 font-bold">
                    Best Price
                  </p>
                  <p className="text-sm font-bold text-gray-800">
                    Lowest Prices Guaranteed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
