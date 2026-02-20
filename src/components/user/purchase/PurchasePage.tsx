"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Star, Minus, Plus, MapPin, Truck, Tag } from "lucide-react";
import { toast } from "sonner";
import { Product } from "../service/ServiceCard";
import LocationModal, { PurchaseDetails } from "./LocationModal";
import { useAuth } from "@/context/auth-context";

interface PurchasePageProps {
  product: Product;
}

export default function PurchasePage({ product }: PurchasePageProps) {
  const [quantity, setQuantity] = useState(2);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [purchaseDetails, setPurchaseDetails] =
    useState<PurchaseDetails | null>(null);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0); // Store as percentage
  const { isAuthenticated } = useAuth();

  const handleApplyPromo = () => {
    const code = promoCode.toUpperCase().trim();
    if (code === "FRESH25") {
      setDiscount(25);
      toast.success("Promo code applied! 25% discount added.");
    } else if (code === "UNIFIED10") {
      setDiscount(10);
      toast.success("Promo code applied! 10% discount added.");
    } else {
      setDiscount(0);
      toast.error("Invalid promo code. Please try again.");
    }
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const merchandiseSubtotal = product.basePrice * quantity;
  const shippingCost = 5.0;
  const discountAmount = (merchandiseSubtotal * discount) / 100;
  const total = merchandiseSubtotal + shippingCost - discountAmount;

  // Calculate delivery date (10-13 days from now)
  const deliveryStartDate = new Date();
  deliveryStartDate.setDate(deliveryStartDate.getDate() + 10);
  const deliveryEndDate = new Date();
  deliveryEndDate.setDate(deliveryEndDate.getDate() + 13);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <>
      <section className="py-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="bg-[#E6F4F1] rounded-3xl p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* Left: Product Image */}
              <div className="lg:w-1/2">
                <div className="relative w-full aspect-square bg-white rounded-2xl p-8 flex items-center justify-center">
                  <Image
                    src={product.image}
                    alt={product.productName}
                    fill
                    className="object-contain p-8"
                  />
                </div>
              </div>

              {/* Right: Purchase Details */}
              <div className="lg:w-1/2 flex flex-col">
                <h1 className="text-3xl lg:text-4xl font-bold text-[#0D1E32] mb-4">
                  {product.productName}
                </h1>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating || 0)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <a href="#" className="text-[#146041] underline ml-2">
                    Ratings {product.reviewCount || 0}
                  </a>
                </div>

                {isAuthenticated && (
                  <div className="mb-6">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-4xl font-bold text-[#146041]">
                        $ {(product.price ?? product.basePrice).toFixed(2)}
                      </span>
                      <span className="text-gray-400">/{product.unit}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 line-through">
                        $ {((product.price ?? product.basePrice) * 1.4).toFixed(
                          2,
                        )}
                      </span>
                      <span className="text-green-600 font-semibold">
                        -$
                        {(
                          (product.price ?? product.basePrice) * 0.4
                        ).toFixed(2)}{" "}
                        (save)
                      </span>
                    </div>
                  </div>
                )}

                {/* Quantity Selector */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-gray-700 font-semibold">Quantity</span>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="w-10 h-10 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center text-[#146041] font-bold transition-colors"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="text-2xl font-bold text-[#0D1E32] min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="w-10 h-10 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center text-[#146041] font-bold transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Select Location Button */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-4 bg-[#146041] hover:bg-[#0e4b32] text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2 mb-6"
                >
                  <MapPin className="w-5 h-5" />
                  Select Location
                </button>

                {/* Delivery or pickup */}
                <div className="bg-white rounded-xl p-4 mb-6">
                  <h3 className="font-semibold text-gray-700 mb-3">
                    Delivery or pickup
                  </h3>

                  <div className="flex items-start gap-3 mb-3">
                    <div className="text-[#146041]">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <span className="font-medium text-gray-700">
                          Standard Delivery
                        </span>
                        <span className="font-semibold text-gray-900">
                          ${shippingCost.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                        <Truck className="w-4 h-4" />
                        Guaranteed by {formatDate(deliveryStartDate)}-
                        {formatDate(deliveryEndDate)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mb-6 p-6 bg-white rounded-2xl border-2 border-dashed border-[#146041]/20">
                  <h3 className="text-sm font-bold text-[#0D1E32] mb-3 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#146041]" />
                    Have a Promo Code?
                  </h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter your code"
                      className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#146041] focus:border-transparent uppercase font-bold text-sm"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-6 py-3 bg-[#146041] text-white rounded-xl font-bold hover:bg-[#0e4b32] transition-colors text-sm"
                    >
                      Apply
                    </button>
                  </div>
                  {discount > 0 && (
                    <p className="mt-2 text-xs font-medium text-[#146041]">
                      🎉 {discount}% discount applied!
                    </p>
                  )}
                </div>

                {isAuthenticated && (
                  <>
                    <div className="bg-white rounded-xl p-4 mb-6 space-y-3">
                      <div className="flex justify-between text-gray-700">
                        <span>Merchandise Subtotal ({quantity} kg)</span>
                        <span className="font-semibold">
                          ${merchandiseSubtotal.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-700">
                        <span>Shipping Subtotal</span>
                        <span className="font-semibold">
                          ${shippingCost.toFixed(2)}
                        </span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-[#146041]">
                          <span className="font-medium">
                            Promo Discount ({discount}%)
                          </span>
                          <span className="font-bold">
                            -${discountAmount.toFixed(2)}
                          </span>
                        </div>
                      )}
                      <div className="border-t border-gray-200 pt-3">
                        <div className="flex justify-between text-gray-900">
                          <span className="font-semibold">Total :</span>
                          <span className="font-bold text-xl">
                            ${total.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button className="w-full py-4 bg-[#146041] hover:bg-[#0e4b32] text-white rounded-xl font-bold transition-colors">
                      Payment
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <LocationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={setPurchaseDetails}
        initialDetails={purchaseDetails || undefined}
      />
    </>
  );
}
