"use client";
import React, { useEffect, useState } from "react";
import { Star, User } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Holand Canals",
    review:
      "I found my rental condo within two days of browsing EasyRent.sg. The inquiry process was so simple, and I got a response from the agent almost instantly!",
    rating: 5,
  },
  {
    id: 2,
    name: "Tolman Panels",
    review:
      "Listing my unit was incredibly easy. I received quality tenant inquiries without any hassle. Highly recommended for any landlord looking to rent fast.",
    rating: 5,
  },
  {
    id: 3,
    name: "kalian Sandals",
    review:
      "EasyRent.sg has helped me connect with serious tenants. The platform is well-organized, and I love receiving email inquiries from potential renters directly.",
    rating: 5,
  },
  {
    id: 4,
    name: "Sarah Jenkins",
    review:
      "The best platform for finding reliable services. The interface is intuitive and the support team is always helpful.",
    rating: 5,
  },
  {
    id: 5,
    name: "Mike Ross",
    review:
      "Simple, fast, and effective. I managed to rent out my property in record time thanks to the visibility this platform provides.",
    rating: 5,
  },
  {
    id: 6,
    name: "Mike Ross",
    review:
      "Simple, fast, and effective. I managed to rent out my property in record time thanks to the visibility this platform provides.",
    rating: 5,
  },
  {
    id: 7,
    name: "Mike Ross",
    review:
      "Simple, fast, and effective. I managed to rent out my property in record time thanks to the visibility this platform provides.",
    rating: 5,
  },
  {
    id: 8,
    name: "Mike Ross",
    review:
      "Simple, fast, and effective. I managed to rent out my property in record time thanks to the visibility this platform provides.",
    rating: 5,
  },
  {
    id: 9,
    name: "Mike Ross",
    review:
      "Simple, fast, and effective. I managed to rent out my property in record time thanks to the visibility this platform provides.",
    rating: 5,
  },
];
const extendedReviews = [...reviews, ...reviews.slice(0, 4)];
export default function Review() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const handleNext = () => {
    if (currentIndex >= reviews.length) {
      // If we somehow drifted, reset immediately
      setIsTransitioning(false);
      setCurrentIndex(0);
      return;
    }

    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex]); // Depend on currentIndex to handle the snap logic correctly

  useEffect(() => {
    if (currentIndex === reviews.length) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 700);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  return (
    <section className="py-36 border bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0D1E32] mb-4">
            Our Customers Reviews
          </h2>
          <p className="text-gray-500">
            Here are a few sample traveler reviews that you can feature on our website
          </p>
        </div>
        <div className="relative w-full overflow-hidden">
          <CarouselDisplay
            currentIndex={currentIndex}
            isTransitioning={isTransitioning}
            items={extendedReviews}
          />
        </div>
        <div className="flex justify-center gap-2 mt-12">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsTransitioning(true);
                setCurrentIndex(idx);
              }}
              className={`h-2.5 rounded-full transition-all duration-300 ${idx === (currentIndex % reviews.length)
                ? "w-8 bg-[#146041]"
                : "w-2.5 bg-[#146041]/20"
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

function CarouselDisplay({ currentIndex, isTransitioning, items }: { currentIndex: number, isTransitioning: boolean, items: typeof reviews }) {
  return (
    <div
      className={`flex gap-6 lg:gap-8 overflow-hidden`}
    >
      <div
        className={`flex w-full ease-in-out ${isTransitioning ? 'transition-transform duration-700' : ''}`}
        style={{
          transform: `translateX(calc(-${currentIndex} * var(--slide-width, 100%)))`,
        } as React.CSSProperties}
      >
        <style jsx>{`
             div {
                --slide-width: 100%;
             }
             @media (min-width: 1024px) {
                div {
                    --slide-width: 33.333%;
                }
             }
        `}</style>
        {items.map((review, idx) => (
          <div
            key={`${review.id}-${idx}`}
            className="flex-shrink-0 w-full lg:w-1/3 px-3"
          >
            <ReviewCard review={review} />
          </div>
        ))}
      </div>
    </div>
  )
}

function ReviewCard({ review }: { review: typeof reviews[0] }) {
  return (
    <div className="bg-[#E6F4F1] rounded-3xl p-8 h-[380px] flex flex-col items-center text-center transition-all hover:shadow-lg">
      <div className="w-20 h-20 bg-gray-300 rounded-full mb-6 flex items-center justify-center overflow-hidden">
        <User className="w-10 h-10 text-white" />
      </div>

      <h3 className="text-xl font-bold text-[#0D1E32] mb-3">{review.name}</h3>

      {/* Stars */}
      <div className="flex gap-1 mb-6">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-[#FFB800] text-[#FFB800]" />
        ))}
      </div>

      <p className="text-gray-600 leading-relaxed text-sm line-clamp-4">
        {review.review}
      </p>
    </div>
  );
}
