"use client";
import React, { useState } from "react";
import CheckoutCartItem from "./CheckoutCartItem";
import { CartItem as UICartItem } from "../cart/CartItem";
import { useCart } from "@/hooks/use-cart";
import { useApi } from "@/hooks/use-api-data";
import { useAuth } from "@/context/auth-context";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";
import type { AxiosError } from "axios";

export default function CheckoutPage() {
  const { cartItems, isLoading, addToCart, removeFromCart, clearCart } =
    useCart();
  const { user } = useAuth();
  const { post, isCreating } = useApi();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState({
    recipientName: (user?.name as string) || "",
    phoneNumber: (user?.contact as string) || "",
    shippingAddress: {
      line1: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    billingAddress: {
      line1: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    deliveryDate: "",
    notes: "",
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
      sku: item.product.sku,
      name: item.product.productName,
      description: item.product.description,
      image: getImageUrl(item.product.image),
      price: item.product.basePrice,
      unit: item.product.unit,
      quantity: item.quantity,
      quickbooksItemId: item.product.quickbooksItemId,
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
  const tax = 0;
  const shippingCost = 0;
  const totalAmount = merchandiseSubtotal + tax + shippingCost;
  const totalKg = uiCartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login before placing an order");
      return;
    }

    if (uiCartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const orderPayload = {
      items: uiCartItems.map((item) => ({
        productId: item.productId,
        name: item.name,
        sku: item.sku,
        quantity: item.quantity,
        unitPrice: item.price,
        totalPrice: item.price * item.quantity,
        quickbooksItemId: item.quickbooksItemId,
      })),
      subtotal: merchandiseSubtotal,
      tax,
      shippingCost,
      totalAmount,
      shippingAddress: deliveryDetails.shippingAddress,
      billingAddress: deliveryDetails.billingAddress,
      notes: deliveryDetails.notes,
      deliveryDate: deliveryDetails.deliveryDate,
    };

    try {
      const response = await post("/orders", orderPayload);
      if (response?.success) {
        const paymentLinkRaw = response.data?.paymentLink as string | undefined;
        const paymentLink = paymentLinkRaw
          ? paymentLinkRaw.replace(/`/g, "").trim()
          : undefined;

        toast.success(response.message || "Order created successfully.");

        if (paymentLink) {
          window.open(paymentLink, "_blank");
        }

        await clearCart();
        setIsSuccessModalOpen(true);
      } else {
        toast.error(
          response?.message || "Failed to create order. Please try again.",
        );
      }
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      const message =
        axiosError.response?.data?.message ||
        "Failed to create order. Please try again.";
      toast.error(message);
    }
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

  if (uiCartItems.length === 0 && !isSuccessModalOpen) {
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
    <>
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
                          readOnly
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
                          readOnly
                        />
                      </div>

                      <div className="border-t border-gray-200 pt-4">
                        <h3 className="text-sm font-semibold text-[#0D1E32] mb-2">
                          Shipping Address
                        </h3>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Address Line 1
                        </label>
                        <input
                          type="text"
                          required
                          value={deliveryDetails.shippingAddress.line1}
                          onChange={(e) =>
                            setDeliveryDetails((prev) => ({
                              ...prev,
                              shippingAddress: {
                                ...prev.shippingAddress,
                                line1: e.target.value,
                              },
                            }))
                          }
                          placeholder="123 Main Street"
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#146041] focus:border-transparent"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            City
                          </label>
                          <input
                            type="text"
                            required
                            value={deliveryDetails.shippingAddress.city}
                            onChange={(e) =>
                              setDeliveryDetails((prev) => ({
                                ...prev,
                                shippingAddress: {
                                  ...prev.shippingAddress,
                                  city: e.target.value,
                                },
                              }))
                            }
                            placeholder="New York"
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#146041] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            State
                          </label>
                          <input
                            type="text"
                            required
                            value={deliveryDetails.shippingAddress.state}
                            onChange={(e) =>
                              setDeliveryDetails((prev) => ({
                                ...prev,
                                shippingAddress: {
                                  ...prev.shippingAddress,
                                  state: e.target.value,
                                },
                              }))
                            }
                            placeholder="NY"
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#146041] focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Postal Code
                          </label>
                          <input
                            type="text"
                            required
                            value={deliveryDetails.shippingAddress.postalCode}
                            onChange={(e) =>
                              setDeliveryDetails((prev) => ({
                                ...prev,
                                shippingAddress: {
                                  ...prev.shippingAddress,
                                  postalCode: e.target.value,
                                },
                              }))
                            }
                            placeholder="10001"
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#146041] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Country
                          </label>
                          <input
                            type="text"
                            required
                            value={deliveryDetails.shippingAddress.country}
                            onChange={(e) =>
                              setDeliveryDetails((prev) => ({
                                ...prev,
                                shippingAddress: {
                                  ...prev.shippingAddress,
                                  country: e.target.value,
                                },
                              }))
                            }
                            placeholder="US"
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#146041] focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-4">
                        <h3 className="text-sm font-semibold text-[#0D1E32] mb-2">
                          Billing Address
                        </h3>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Address Line 1
                        </label>
                        <input
                          type="text"
                          required
                          value={deliveryDetails.billingAddress.line1}
                          onChange={(e) =>
                            setDeliveryDetails((prev) => ({
                              ...prev,
                              billingAddress: {
                                ...prev.billingAddress,
                                line1: e.target.value,
                              },
                            }))
                          }
                          placeholder="123 Main Street"
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#146041] focus:border-transparent"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            City
                          </label>
                          <input
                            type="text"
                            required
                            value={deliveryDetails.billingAddress.city}
                            onChange={(e) =>
                              setDeliveryDetails((prev) => ({
                                ...prev,
                                billingAddress: {
                                  ...prev.billingAddress,
                                  city: e.target.value,
                                },
                              }))
                            }
                            placeholder="New York"
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#146041] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            State
                          </label>
                          <input
                            type="text"
                            required
                            value={deliveryDetails.billingAddress.state}
                            onChange={(e) =>
                              setDeliveryDetails((prev) => ({
                                ...prev,
                                billingAddress: {
                                  ...prev.billingAddress,
                                  state: e.target.value,
                                },
                              }))
                            }
                            placeholder="NY"
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#146041] focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Postal Code
                          </label>
                          <input
                            type="text"
                            required
                            value={deliveryDetails.billingAddress.postalCode}
                            onChange={(e) =>
                              setDeliveryDetails((prev) => ({
                                ...prev,
                                billingAddress: {
                                  ...prev.billingAddress,
                                  postalCode: e.target.value,
                                },
                              }))
                            }
                            placeholder="10001"
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#146041] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Country
                          </label>
                          <input
                            type="text"
                            required
                            value={deliveryDetails.billingAddress.country}
                            onChange={(e) =>
                              setDeliveryDetails((prev) => ({
                                ...prev,
                                billingAddress: {
                                  ...prev.billingAddress,
                                  country: e.target.value,
                                },
                              }))
                            }
                            placeholder="US"
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#146041] focus:border-transparent"
                          />
                        </div>
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
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#146041] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Notes
                        </label>
                        <textarea
                          rows={3}
                          value={deliveryDetails.notes}
                          onChange={(e) =>
                            setDeliveryDetails({
                              ...deliveryDetails,
                              notes: e.target.value,
                            })
                          }
                          placeholder="Please deliver during business hours"
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#146041] focus:border-transparent resize-none"
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
                      <div className="border-t border-gray-200 pt-2 mt-2">
                        <div className="flex justify-between">
                          <span className="font-semibold text-gray-900">
                            Total :
                          </span>
                          <span className="font-bold text-lg">
                            ${totalAmount.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#146041] hover:bg-[#0e4b32] text-white rounded-xl font-bold transition-colors"
                    disabled={isCreating}
                  >
                    {isCreating ? "Placing Order..." : "Confirm Order"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <DialogContent className="max-w-md text-center">
          <DialogHeader className="items-center">
            <CheckCircle2 className="w-12 h-12 text-[#146041] mb-2" />
            <DialogTitle className="text-2xl font-bold text-[#0D1E32]">
              Payment Successful
            </DialogTitle>
            <DialogDescription className="text-base text-gray-600">
              Thank you for your purchase. Your order has been placed
              successfully and a confirmation has been sent to your email.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
