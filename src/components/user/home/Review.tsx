/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { publicApi } from "@/lib/api-client";
import { ChevronLeft, ChevronRight, Quote, Star, User } from "lucide-react";
import React, { useEffect, useState } from "react";

type ReviewType = {
  id: string;
  name: string;
  role: string;
  image: string;
  review: string;
  rating: number;
};

export default function Review() {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await publicApi.get("/review");
        if (res.data.success) {
          const mappedReviews = res.data.data.map((r: any) => ({
            id: r._id,
            name: r.userId.name,
            role: "Customer", // Static role or derived if available
            image: r.userId.image || "/placeholder-user.jpg",
            review: r.comment,
            rating: r.rating,
          }));
          setReviews(mappedReviews);
          // Initialize index to the start of the first set of duplicated reviews
          setCurrentIndex(mappedReviews.length);
        }
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const extendedReviews =
    reviews.length > 0 ? [...reviews, ...reviews, ...reviews] : [];

  const handleNext = () => {
    if (reviews.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (reviews.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  useEffect(() => {
    if (reviews.length === 0) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [reviews]);

  useEffect(() => {
    if (reviews.length === 0) return;
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
  }, [currentIndex, reviews]);

  return (
    <section className="py-16 bg-linear-to-b from-white  to-emerald-100/70 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6 text-center md:text-left">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-x-1 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold tracking-wider uppercase mb-4">
              Reviews
              <Star className="w-4 h-4" />
              <Star className="w-4 h-4" />
              <Star className="w-4 h-4" />
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1A2D42] leading-[1.1] tracking-tight">
              What Our{" "}
              <span className="text-primary italic font-brand">Community</span>{" "}
              Says
            </h2>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handlePrev}
              disabled={loading || reviews.length === 0}
              className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-primary hover:text-primary transition-all group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6 group-active:scale-90 transition-transform" />
            </button>
            <button
              onClick={handleNext}
              disabled={loading || reviews.length === 0}
              className="p-4 rounded-2xl bg-primary text-white shadow-lg shadow-primary/20 hover:bg-[#0e4b32] transition-all group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight className="w-6 h-6 group-active:scale-90 transition-transform" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-visible">
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : reviews.length > 0 ? (
              <div
                className={`flex gap-6 md:gap-8 [--slide-step:100%] md:[--slide-step:calc(100%_/_3_+_8px)] ${
                  isTransitioning
                    ? "transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1)"
                    : ""
                }`}
                style={
                  {
                    transform: `translateX(calc(-${currentIndex} * var(--slide-step)))`,
                  } as React.CSSProperties
                }
              >
                {extendedReviews.map((review, idx) => (
                  <div
                    key={`${review.id}-${idx}`}
                    className="flex-shrink-0 w-full md:w-[calc(33.333%-16px)]"
                  >
                    <ReviewCard review={review} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-gray-500">
                No reviews available at the moment.
              </div>
            )}
          </div>
        </div>

        {reviews.length > 0 && (
          <div className="flex justify-center gap-3 mt-16">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsTransitioning(true);
                  setCurrentIndex(idx + reviews.length);
                }}
                className={`h-2 rounded-full transition-all duration-500 ${
                  idx === currentIndex % reviews.length
                    ? "w-12 bg-primary shadow-[0_0_15px_rgba(20,96,65,0.4)]"
                    : "w-2 bg-gray-200 hover:bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: ReviewType }) {
  return (
    <div className="group relative bg-white/80 backdrop-blur-sm p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 flex flex-col h-full overflow-hidden">
      {/* Quote Icon Accent */}
      <div className="absolute top-4 right-6 md:top-8 md:right-10 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500">
        <Quote className="w-16 h-16 md:w-24 md:h-24 rotate-12" />
      </div>

      {/* Stars */}
      <div className="flex gap-1.5 mb-4 md:mb-8">
        {[...Array(review.rating)].map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400 drop-shadow-sm"
          />
        ))}
      </div>

      {/* Review Text */}
      <p className="text-base md:text-lg text-gray-600 leading-[1.6] md:leading-[1.7] mb-6 md:mb-10 flex-grow font-medium">
        {review.review}
      </p>

      {/* User profile */}
      <div className="flex items-center gap-3 md:gap-5 pt-4 md:pt-8 border-t border-gray-50">
        <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-2xl overflow-hidden shadow-md ring-4 ring-primary/5">
          {review.image ? (
            <img
              src={review.image}
              alt={review.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-primary/10 flex items-center justify-center">
              <User className="w-6 h-6 md:w-8 md:h-8 text-primary/40" />
            </div>
          )}
        </div>
        <div>
          <h4 className="text-lg md:text-xl font-bold text-[#1A2D42] tracking-tight">
            {review.name}
          </h4>
          <p className="text-xs md:text-sm font-semibold text-primary/70">
            {review.role}
          </p>
        </div>
      </div>
    </div>
  );
}
