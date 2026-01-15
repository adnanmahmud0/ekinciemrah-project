"use client";
import React, { use } from "react";
import { notFound } from "next/navigation";
import ProductDetails from "@/components/user/service/ProductDetails";
import ProductReviews, { Review } from "@/components/user/service/ProductReviews";
import ReviewForm from "@/components/user/service/ReviewForm";
import { Product } from "@/components/user/service/ServiceCard";
import { MOCK_PRODUCTS } from "@/data/mockProducts";


const MOCK_REVIEWS: Review[] = [
  {
    id: "1",
    userId: "user1",
    userName: "Rahim",
    rating: 5,
    comment: "Excellent tomatoes ! Very fresh & sweet.",
    createdAt: "2 days ago",
  },
  {
    id: "2",
    userId: "user2",
    userName: "Sadia",
    rating: 5,
    comment: "Excellent tomatoes ! Very fresh & sweet.",
    createdAt: "2 days ago",
  },
  {
    id: "3",
    userId: "user3",
    userName: "Sufiya",
    rating: 5,
    comment: "Excellent tomatoes ! Very fresh & sweet.",
    createdAt: "2 days ago",
  },
  {
    id: "4",
    userId: "user4",
    userName: "Rahim",
    rating: 5,
    comment: "Excellent tomatoes ! Very fresh & sweet.",
    createdAt: "2 days ago",
  },
  {
    id: "5",
    userId: "user5",
    userName: "Sadia",
    rating: 5,
    comment: "Excellent tomatoes ! Very fresh & sweet.",
    createdAt: "2 days ago",
  },
  {
    id: "6",
    userId: "user6",
    userName: "Sufiya",
    rating: 5,
    comment: "Excellent tomatoes ! Very fresh & sweet.",
    createdAt: "2 days ago",
  },
];

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  // Unwrap the params Promise using React.use() for Next.js 16
  const { id } = use(params);

  // In a real app, fetch product by id from API
  const product = MOCK_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const handleReviewSubmit = (rating: number, comment: string) => {
    console.log("New review:", { rating, comment });
    // In a real app, submit to API
  };

  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        {/* Product Details */}
        <ProductDetails product={product} />

        {/* Rate & Review Section */}
        <div className="mt-16" id="reviews">
          <div className="flex items-center gap-2 mb-8">
            <span className="text-yellow-400 text-2xl">⭐</span>
            <h2 className="text-3xl font-bold text-[#0D1E32]">Rate & Review</h2>
          </div>

          {/* Reviews Grid */}
          <ProductReviews reviews={MOCK_REVIEWS} />

          {/* Review Form */}
          <div className="mt-12">
            <ReviewForm onSubmit={handleReviewSubmit} />
          </div>
        </div>
      </div>
    </section>
  );
}
