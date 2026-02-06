"use client";
import React from "react";
import Link from "next/link";
import CartItemComponent, { CartItem as UICartItem } from "./CartItem";
import CartSummary from "./CartSummary";
import { useCart } from "@/hooks/use-cart";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { cartItems, addToCart, removeFromCart, clearCart, isLoading } =
    useCart();

  const getImageUrl = (path: string | undefined) => {
    if (!path) return "/placeholder.png";
    if (path.startsWith("http")) return path;
    if (path.startsWith("/"))
      return `${process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "")}${path}`;
    return `${process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "")}/${path}`;
  };

  // Map API data to UI format
  const uiCartItems: UICartItem[] = cartItems
    .filter((item) => item && item.product) // Filter out items with null product
    .map((item) => ({
      id: item.product._id, // Map product ID to 'id' for removal
      productId: item.product._id,
      name: item.product.productName,
      description: item.product.description,
      image: getImageUrl(item.product.image),
      price: item.product.basePrice,
      unit: item.product.unit,
      quantity: item.quantity,
    }));

  const handleUpdateQuantity = (id: string, quantity: number) => {
    // Find current item to calculate delta
    const currentItem = cartItems.find((item) => item.product?._id === id);
    if (!currentItem) return;

    const delta = quantity - currentItem.quantity;
    if (delta === 0) return;

    // Use addToCart for both increase and decrease
    addToCart(id, delta);
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-[#146041]" />
      </div>
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
              Add some products to get started!
            </p>
            <Link
              href="/service"
              className="inline-block px-8 py-3 bg-[#146041] hover:bg-[#0e4b32] text-white rounded-xl font-bold transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#0D1E32]">Shopping Cart</h1>
          <Button
            variant="ghost"
            className="text-red-500 hover:text-red-700 hover:bg-red-50 gap-2"
            onClick={() => clearCart()}
          >
            <Trash2 className="w-4 h-4" />
            Clear Cart
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1 space-y-4">
            {uiCartItems.map((item) => (
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
            <CartSummary items={uiCartItems} shipping={12.0} />
          </div>
        </div>
      </div>
    </section>
  );
}
