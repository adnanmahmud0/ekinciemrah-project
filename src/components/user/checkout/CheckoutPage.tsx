"use client";
import React, { useState } from "react";
import CheckoutCartItem from "./CheckoutCartItem";
import { CartItem } from "../cart/CartItem";
import { toast } from "sonner";
import { Tag } from "lucide-react";

// Mock data - Replace with cart state from context/redux
const MOCK_CART_ITEMS: CartItem[] = [
    {
        id: "cart-1",
        productId: "1",
        name: "Organic Red Tomatoes",
        description: "Fresh, vine-ripened organic red tomatoes.",
        image: "/category-1.png",
        price: 2.50,
        unit: "Pound",
        quantity: 1,
    },
    {
        id: "cart-2",
        productId: "1",
        name: "Organic Red Tomatoes",
        description: "Fresh, vine-ripened organic red tomatoes.",
        image: "/category-1.png",
        price: 2.50,
        unit: "Pound",
        quantity: 1,
    },
    {
        id: "cart-3",
        productId: "1",
        name: "Organic Red Tomatoes",
        description: "Fresh, vine-ripened organic red tomatoes.",
        image: "/category-1.png",
        price: 2.50,
        unit: "Pound",
        quantity: 1,
    },
];

type PaymentMethod = "quick-book" | "cash-on-delivery";

interface CheckoutPageProps {
    initialCartItems?: CartItem[];
}

export default function CheckoutPage({ initialCartItems = MOCK_CART_ITEMS }: CheckoutPageProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("quick-book");
    const [deliveryDetails, setDeliveryDetails] = useState({
        recipientName: "",
        phoneNumber: "",
        address: "",
        region: "",
        deliveryDate: "",
    });
    const [promoCode, setPromoCode] = useState("");
    const [discount, setDiscount] = useState(0); // Store as percentage

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

    const handleUpdateQuantity = (id: string, quantity: number) => {
        setCartItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity } : item))
        );
    };

    const handleRemoveItem = (id: string) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const merchandiseSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalKg = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const shippingCost = 5.00;
    const discountAmount = (merchandiseSubtotal * discount) / 100;
    const total = merchandiseSubtotal + shippingCost - discountAmount;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Checkout:", { cartItems, deliveryDetails, paymentMethod });
        // Handle checkout logic
    };

    return (
        <section className="py-12 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-6 md:px-12 lg:px-24">
                <div className="bg-white rounded-3xl p-8 lg:p-12">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Left: Cart Items */}
                            <div className="lg:w-1/2 space-y-4">
                                {cartItems.map((item) => (
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
                                                Recipient's Name*
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={deliveryDetails.recipientName}
                                                onChange={(e) => setDeliveryDetails({ ...deliveryDetails, recipientName: e.target.value })}
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
                                                onChange={(e) => setDeliveryDetails({ ...deliveryDetails, phoneNumber: e.target.value })}
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
                                                onChange={(e) => setDeliveryDetails({ ...deliveryDetails, address: e.target.value })}
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
                                                onChange={(e) => setDeliveryDetails({ ...deliveryDetails, region: e.target.value })}
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
                                                onChange={(e) => setDeliveryDetails({ ...deliveryDetails, deliveryDate: e.target.value })}
                                                placeholder="enter your delivery date"
                                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#146041] focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Method */}
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-[#0D1E32] mb-4">Payment</h3>
                                    <div className="flex gap-4">
                                        <label className="flex-1 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="quick-book"
                                                checked={paymentMethod === "quick-book"}
                                                onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                                                className="sr-only peer"
                                            />
                                            <div className="flex items-center justify-center gap-2 py-3 px-4 bg-white border-2 border-gray-300 rounded-xl peer-checked:border-[#146041] peer-checked:bg-[#E6F4F1] transition-colors">
                                                <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-[#146041] peer-checked:bg-[#146041] flex items-center justify-center">
                                                    {paymentMethod === "quick-book" && (
                                                        <div className="w-2 h-2 rounded-full bg-white"></div>
                                                    )}
                                                </div>
                                                <span className="font-medium text-gray-700">Quick Book</span>
                                            </div>
                                        </label>

                                        <label className="flex-1 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="cash-on-delivery"
                                                checked={paymentMethod === "cash-on-delivery"}
                                                onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                                                className="sr-only peer"
                                            />
                                            <div className="flex items-center justify-center gap-2 py-3 px-4 bg-white border-2 border-gray-300 rounded-xl peer-checked:border-[#146041] peer-checked:bg-[#E6F4F1] transition-colors">
                                                <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-[#146041] peer-checked:bg-[#146041] flex items-center justify-center">
                                                    {paymentMethod === "cash-on-delivery" && (
                                                        <div className="w-2 h-2 rounded-full bg-white"></div>
                                                    )}
                                                </div>
                                                <span className="font-medium text-gray-700">Cash On Delivery</span>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                {/* Promo Code */}
                                <div className="mb-6 p-6 bg-[#E6F4F1]/50 rounded-2xl border-2 border-dashed border-[#146041]/20">
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
                                            className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#146041] focus:border-transparent uppercase font-bold"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleApplyPromo}
                                            className="px-6 py-3 bg-[#146041] text-white rounded-xl font-bold hover:bg-[#0e4b32] transition-colors"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                    {discount > 0 && (
                                        <p className="mt-2 text-sm font-medium text-[#146041]">
                                            🎉 {discount}% discount applied!
                                        </p>
                                    )}
                                </div>

                                {/* Delivery or pickup */}
                                <div className="bg-white rounded-xl p-4 mb-6">
                                    <h3 className="font-semibold text-gray-700 mb-3">Delivery or pickup</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Merchandise Subtotal ({totalKg} kg)</span>
                                            <span className="font-semibold">${merchandiseSubtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Shipping Subtotal</span>
                                            <span className="font-semibold">${shippingCost.toFixed(2)}</span>
                                        </div>
                                        {discount > 0 && (
                                            <div className="flex justify-between text-[#146041]">
                                                <span className="font-medium font-brand">Promo Discount ({discount}%)</span>
                                                <span className="font-bold">-${discountAmount.toFixed(2)}</span>
                                            </div>
                                        )}
                                        <div className="border-t border-gray-200 pt-2 mt-2">
                                            <div className="flex justify-between">
                                                <span className="font-semibold text-gray-900">Total :</span>
                                                <span className="font-bold text-lg">${total.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full py-4 bg-[#146041] hover:bg-[#0e4b32] text-white rounded-xl font-bold transition-colors"
                                >
                                    {paymentMethod === "quick-book" ? "Payment" : "Purchase"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
