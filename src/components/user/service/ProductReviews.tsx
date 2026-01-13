"use client";
import React from "react";
import { Star, User } from "lucide-react";

export interface Review {
    id: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    rating: number;
    comment: string;
    createdAt: string;
}

interface ProductReviewsProps {
    reviews: Review[];
}

export default function ProductReviews({ reviews }: ProductReviewsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
                <div
                    key={review.id}
                    className="bg-[#E6F4F1] rounded-2xl p-6 hover:shadow-md transition-shadow"
                >
                    <div className="flex items-start gap-4 mb-4">
                        {/* Avatar */}
                        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden flex-shrink-0">
                            {review.userAvatar ? (
                                <img src={review.userAvatar} alt={review.userName} className="w-full h-full object-cover" />
                            ) : (
                                <User className="w-6 h-6 text-white" />
                            )}
                        </div>

                        <div className="flex-1">
                            <h4 className="font-bold text-[#0D1E32] mb-1">{review.userName}</h4>
                            <div className="flex items-center gap-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < review.rating
                                                ? "fill-green-500 text-green-500"
                                                : "text-gray-300"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-3">{review.comment}</p>
                    <p className="text-sm text-gray-500">Posted {review.createdAt}</p>
                </div>
            ))}
        </div>
    );
}
