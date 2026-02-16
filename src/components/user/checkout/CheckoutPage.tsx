"use client";
import React, { useState } from "react";
import CheckoutCartItem from "./CheckoutCartItem";
import { CartItem as UICartItem } from "../cart/CartItem";
import { useCart } from "@/hooks/use-cart";

export default function CheckoutPage() {
  const { cartItems, isLoading, addToCart, removeFromCart } = useCart();
  const [deliveryDetails, setDeliveryDetails] = useState({
    recipientName: "",
    phoneNumber: "",
    address: "",
    region: "",
    deliveryDate: "",
  });

  const getImageUrl = (path: string | undefined) => {
    if (!path) return "/placeholder.png";
    if (path.startsWith("http")) return path;
    if (path.startsWith("/"))
      return `${process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "")}${path}`;
    return `${process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "")}/${path}`;
  };

  const uiCartItems: UICartItem[] = cartItems
    .filter((item) => item && item.product)
    .map((item) => ({
      id: item.product._id,
      productId: item.product._id,
      name: item.product.productName,
      description: item.product.description,
      image: getImageUrl(item.product.image),
      price: item.product.basePrice,
      unit: item.product.unit,
      quantity: item.quantity,
    }));

  const handleUpdateQuantity = (id: string, quantity: number) => {
    const currentItem = cartItems.find((item) => item.product?._id === id);
    if (!currentItem) return;

    const delta = quantity - currentItem.quantity;
    if (delta === 0) return;

    addToCart(id, delta, { suppressToast: true });
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  const merchandiseSubtotal = uiCartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const totalKg = uiCartItems.reduce((sum, item) => sum + item.quantity, 0);
  const shippingCost = 5.0;
  const total = merchandiseSubtotal + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Checkout:", { cartItems: uiCartItems, deliveryDetails });
    // Handle checkout logic
  };

  if (isLoading) {
    return (
      <section className="py-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center py-20">Loading checkout...</div>
        </div>
      </section>
    );
  }

  if (uiCartItems.length === 0) {
    return (
      <section className="py-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold text-[#0D1E32] mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Add some products to your cart before checkout.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="bg-white rounded-3xl p-8 lg:p-12">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left: Cart Items */}
              <div className="lg:w-1/2 space-y-4">
                {uiCartItems.map((item) => (
                  <CheckoutCartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </div>

              {/* Right: Delivery Form & Payment */}
              <div className="lg:w-1/2">
                {/* Delivery Form */}
                <div className="bg-[#E6F4F1] rounded-2xl p-6 mb-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Recipient&apos;s Name*
                      </label>
                      <input
                        type="text"
                        required
                        value={deliveryDetails.recipientName}
                        onChange={(e) =>
                          setDeliveryDetails({
                            ...deliveryDetails,
                            recipientName: e.target.value,
                          })
                        }
                        placeholder="Input the real name"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#146041] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number*
                      </label>
                      <input
                        type="tel"
                        required
                        value={deliveryDetails.phoneNumber}
                        onChange={(e) =>
                          setDeliveryDetails({
                            ...deliveryDetails,
                            phoneNumber: e.target.value,
                          })
                        }
                        placeholder="enter your number"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#146041] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Address*
                      </label>
                      <input
                        type="text"
                        required
                        value={deliveryDetails.address}
                        onChange={(e) =>
                          setDeliveryDetails({
                            ...deliveryDetails,
                            address: e.target.value,
                          })
                        }
                        placeholder="enter your Address"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#146041] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Region/City*
                      </label>
                      <input
                        type="text"
                        required
                        value={deliveryDetails.region}
                        onChange={(e) =>
                          setDeliveryDetails({
                            ...deliveryDetails,
                            region: e.target.value,
                          })
                        }
                        placeholder="enter your region/city name"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#146041] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Delivery Date*
                      </label>
                      <input
                        type="date"
                        required
                        value={deliveryDetails.deliveryDate}
                        onChange={(e) =>
                          setDeliveryDetails({
                            ...deliveryDetails,
                            deliveryDate: e.target.value,
                          })
                        }
                        placeholder="enter your delivery date"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#146041] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery or pickup */}
                <div className="bg-white rounded-xl p-4 mb-6">
                  <h3 className="font-semibold text-gray-700 mb-3">
                    Delivery or pickup
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Merchandise Subtotal ({totalKg} kg)
                      </span>
                      <span className="font-semibold">
                        ${merchandiseSubtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping Subtotal</span>
                      <span className="font-semibold">
                        ${shippingCost.toFixed(2)}
                      </span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-900">
                          Total :
                        </span>
                        <span className="font-bold text-lg">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-[#146041] hover:bg-[#0e4b32] text-white rounded-xl font-bold transition-colors"
                >
                  Confirm Order
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
