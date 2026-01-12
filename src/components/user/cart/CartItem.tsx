"use client";
import React from "react";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

export interface CartItem {
    id: string;
    productId: string;
    name: string;
    description: string;
    image: string;
    price: number;
    unit: string;
    quantity: number;
}

interface CartItemProps {
    item: CartItem;
    onUpdateQuantity: (id: string, quantity: number) => void;
    onRemove: (id: string) => void;
}

export default function CartItemComponent({ item, onUpdateQuantity, onRemove }: CartItemProps) {
    const handleQuantityChange = (delta: number) => {
        const newQuantity = Math.max(1, item.quantity + delta);
        onUpdateQuantity(item.id, newQuantity);
    };

    const totalPrice = item.price * item.quantity;

    return (
        <div className="bg-[#E6F4F1] rounded-2xl p-6 flex gap-6 items-center hover:shadow-md transition-shadow">
            {/* Product Image */}
            <div className="relative w-24 h-24 bg-white rounded-xl flex-shrink-0 p-2">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain p-2"
                />
            </div>

            {/* Product Info */}
            <div className="flex-1">
                <h3 className="text-lg font-bold text-[#0D1E32] mb-1">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-1">{item.description}</p>

                <div className="flex items-center gap-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handleQuantityChange(-1)}
                            className="w-8 h-8 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center text-[#146041] transition-colors"
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-lg font-bold text-[#0D1E32] min-w-[2rem] text-center">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => handleQuantityChange(1)}
                            className="w-8 h-8 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center text-[#146041] transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Price & Delete */}
            <div className="flex flex-col items-end gap-4">
                <div className="text-right">
                    <div className="text-xl font-bold text-[#146041] mb-1">
                        $ {totalPrice.toFixed(2)} <span className="text-sm font-normal text-gray-500">/{item.unit}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                        ${item.price.toFixed(2)} each
                    </div>
                </div>

                <button
                    onClick={() => onRemove(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-white rounded-lg transition-colors"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
