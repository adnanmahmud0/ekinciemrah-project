"use client";
import React, { useEffect, useState } from "react";
import { Star, User, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Holland Canals",
    role: "Regular Customer",
    image: "/category-1.png",
    review:
      "The quality of produce here is unmatched. I've been a regular for months now, and every delivery is as fresh as the first one. Truly a premium experience.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Local Chef",
    image: "/category-2.png",
    review:
      "As a chef, freshness is everything. Unified Produce has consistently provided the best greens and vegetables for my kitchen. Highly reliable and efficient.",
    rating: 5,
  },
  {
    id: 3,
    name: "Mike Ross",
    role: "Verified Buyer",
    image: "/category-3.png",
    review:
      "The selection is incredible. I love how I can find everything from exotic fruits to daily dairy essentials in one place. The service is top-notch!",
    rating: 5,
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    role: "Health Enthusiast",
    image: "/category-4.png",
    review:
      "I'm very particular about organic food, and this platform has never disappointed me. The convenience of fresh delivery right to my door is life-changing.",
    rating: 5,
  },
];

const extendedReviews = [...reviews, ...reviews, ...reviews];

export default function Review() {
  const [currentIndex, setCurrentIndex] = useState(reviews.length);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentIndex >= reviews.length * 2) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(reviews.length);
      }, 700);
    }
    if (currentIndex <= reviews.length - 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(reviews.length * 2 - 1);
      }, 700);
    }
  }, [currentIndex]);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6 text-center md:text-left">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold tracking-wider uppercase mb-4">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1A2D42] leading-[1.1] tracking-tight">
              What Our <span className="text-primary italic font-brand">Community</span> Says
            </h2>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handlePrev}
              className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-primary hover:text-primary transition-all group"
            >
              <ChevronLeft className="w-6 h-6 group-active:scale-90 transition-transform" />
            </button>
            <button
              onClick={handleNext}
              className="p-4 rounded-2xl bg-primary text-white shadow-lg shadow-primary/20 hover:bg-[#0e4b32] transition-all group"
            >
              <ChevronRight className="w-6 h-6 group-active:scale-90 transition-transform" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-visible">
            <div
              className={`flex gap-6 md:gap-8 ${isTransitioning ? 'transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1)' : ''}`}
              style={{
                transform: `translateX(calc(-${currentIndex} * (100% / 3 + 24px/3)))`,
              } as React.CSSProperties}
            >
              <style jsx>{`
                div {
                  --slide-width: 100%;
                }
                @media (max-width: 768px) {
                  div {
                    transform: translateX(calc(-${currentIndex} * 100%)) !important;
                  }
                }
              `}</style>
              {extendedReviews.map((review, idx) => (
                <div
                  key={`${review.id}-${idx}`}
                  className="flex-shrink-0 w-full md:w-[calc(33.333%-16px)]"
                >
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-16">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsTransitioning(true);
                setCurrentIndex(idx + reviews.length);
              }}
              className={`h-2 rounded-full transition-all duration-500 ${idx === (currentIndex % reviews.length)
                ? "w-12 bg-primary shadow-[0_0_15px_rgba(20,96,65,0.4)]"
                : "w-2 bg-gray-200 hover:bg-gray-300"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: typeof reviews[0] }) {
  return (
    <div className="group relative bg-white/80 backdrop-blur-sm p-10 rounded-[2.5rem] border border-gray-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 flex flex-col h-full overflow-hidden">
      {/* Quote Icon Accent */}
      <div className="absolute top-8 right-10 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500">
        <Quote className="w-24 h-24 rotate-12" />
      </div>

      {/* Stars */}
      <div className="flex gap-1.5 mb-8">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
        ))}
      </div>

      {/* Review Text */}
      <p className="text-lg text-gray-600 leading-[1.7] mb-10 flex-grow font-medium">
        "{review.review}"
      </p>

      {/* User profile */}
      <div className="flex items-center gap-5 pt-8 border-t border-gray-50">
        <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-md ring-4 ring-primary/5">
          {review.image ? (
            <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-primary/10 flex items-center justify-center">
              <User className="w-8 h-8 text-primary/40" />
            </div>
          )}
        </div>
        <div>
          <h4 className="text-xl font-bold text-[#1A2D42] tracking-tight">{review.name}</h4>
          <p className="text-sm font-semibold text-primary/70">{review.role}</p>
        </div>
      </div>
    </div>
  );
}
