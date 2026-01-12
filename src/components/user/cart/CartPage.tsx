"use client";
import React, { useState } from "react";
import CartItemComponent, { CartItem } from "./CartItem";
import CartSummary from "./CartSummary";

// Mock data - Replace with API call or state management
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

const SHIPPING_COST = 12.00;

interface CartPageProps {
    initialCartItems?: CartItem[];
}

export default function CartPage({ initialCartItems = MOCK_CART_ITEMS }: CartPageProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

    const handleUpdateQuantity = (id: string, quantity: number) => {
        setCartItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity } : item))
        );
    };

    const handleRemoveItem = (id: string) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    if (cartItems.length === 0) {
        return (
            <section className="py-12 bg-gray-50 min-h-screen">
                <div className="container mx-auto px-6 md:px-12 lg:px-24">
                    <div className="text-center py-20">
                        <h2 className="text-3xl font-bold text-[#0D1E32] mb-4">Your cart is empty</h2>
                        <p className="text-gray-600 mb-8">Add some products to get started!</p>
                        <a
                            href="/service"
                            className="inline-block px-8 py-3 bg-[#146041] hover:bg-[#0e4b32] text-white rounded-xl font-bold transition-colors"
                        >
                            Browse Products
                        </a>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-12 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-6 md:px-12 lg:px-24">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items */}
                    <div className="flex-1 space-y-4">
                        {cartItems.map((item) => (
                            <CartItemComponent
                                key={item.id}
                                item={item}
                                onUpdateQuantity={handleUpdateQuantity}
                                onRemove={handleRemoveItem}
                            />
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="lg:w-96">
                        <CartSummary items={cartItems} shipping={SHIPPING_COST} />
                    </div>
                </div>
            </div>
        </section>
    );
}
