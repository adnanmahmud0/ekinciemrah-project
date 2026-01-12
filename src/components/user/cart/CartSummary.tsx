"use client";
import React from "react";
import { CartItem } from "./CartItem";

interface CartSummaryProps {
    items: CartItem[];
    shipping: number;
}

export default function CartSummary({ items, shipping }: CartSummaryProps) {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal + shipping;
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="bg-[#E6F4F1] rounded-2xl p-8 lg:sticky lg:top-24 h-fit">
            <h2 className="text-2xl font-bold text-[#0D1E32] mb-6">Summary</h2>

            <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                    <span>Sub-total</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span className="font-semibold">${shipping.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-300 pt-4">
                    <div className="flex justify-between text-gray-700 mb-2">
                        <span>Subtotal ({itemCount} items):</span>
                        <span className="font-semibold">${total.toFixed(2)} USD</span>
                    </div>
                </div>
            </div>

            <button className="w-full py-4 bg-[#146041] hover:bg-[#0e4b32] text-white rounded-xl font-bold transition-colors">
                Proceed to Checkout
            </button>
        </div>
    );
}
