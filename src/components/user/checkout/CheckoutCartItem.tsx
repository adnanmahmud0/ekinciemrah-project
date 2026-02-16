"use client";
import React from "react";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem } from "../cart/CartItem";

interface CheckoutCartItemProps {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export default function CheckoutCartItem({
  item,
  onUpdateQuantity,
  onRemove,
}: CheckoutCartItemProps) {
  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, item.quantity + delta);
    onUpdateQuantity(item.id, newQuantity);
  };

  return (
    <div className="bg-[#E6F4F1] rounded-xl p-4 flex gap-4 items-center">
      {/* Product Image */}
      <div className="relative w-20 h-20 bg-white rounded-lg flex-shrink-0 p-2">
        <Image
          src={item.image}
          alt={item.name}
          fill
          unoptimized
          className="object-contain p-1"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-xl text-[#0D1E32] mb-1 truncate">
          {item.name}
        </h3>
        {item.sku && (
          <div className="text-sm text-gray-500 mb-1">SKU: {item.sku}</div>
        )}
        <p className="text-base text-gray-600 mb-2 line-clamp-1">
          {item.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="text-base">
            <span className="font-bold text-[#146041]">
              $ {item.price.toFixed(2)}
            </span>
            <span className="text-gray-500"> /{item.unit}</span>
          </div>
          <div className="text-sm text-red-500">
            Total: ${(item.price * item.quantity).toFixed(2)}
          </div>
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleQuantityChange(-1)}
          className="w-7 h-7 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center text-[#146041] transition-colors"
        >
          <Minus className="w-3 h-3" />
        </button>
        <span className="text-lg font-bold text-[#0D1E32] min-w-[1.5rem] text-center">
          {item.quantity}
        </span>
        <button
          onClick={() => handleQuantityChange(1)}
          className="w-7 h-7 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center text-[#146041] transition-colors"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>

      {/* Delete Button */}
      <button
        onClick={() => onRemove(item.id)}
        className="p-2 text-gray-400 hover:text-red-500 hover:bg-white rounded-lg transition-colors"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
