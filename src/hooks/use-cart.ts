/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useApi } from "@/hooks/use-api-data";
import { toast } from "sonner";
import { useAuth } from "@/context/auth-context";
import { privateApi } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface CartItemProduct {
  _id: string;
  productName: string;
  image: string;
  basePrice: number;
  unit: string;
  description: string;
  stock: number;
  sku?: string;
  quickbooksItemId?: string;
}

export interface CartItem {
  product: CartItemProduct;
  quantity: number;
  _id: string;
}

export interface CartData {
  _id: string;
  user: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

interface CartResponse {
  success: boolean;
  message: string;
  data: CartData;
}

export function useCart() {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  // 1. Get Cart
  const {
    data: response,
    isLoading,
    refetch,
    post,
    del, // This is for clear cart (DELETE without body)
  } = useApi<CartResponse>(
    isAuthenticated ? "cart/" : undefined,
    isAuthenticated ? ["cart"] : undefined,
  );

  const cart = response?.data;
  const cartItems = cart?.items || [];
  // Use length instead of sum of quantities to show unique item count
  const cartCount = cartItems.length;

  // 2. Add to Cart
  const addToCart = async (
    productId: string,
    quantity: number = 1,
    options?: { validateDuplicate?: boolean; suppressToast?: boolean },
  ) => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart", {
        description: "You need to be logged in to add items to your cart.",
      });
      return;
    }

    if (options?.validateDuplicate) {
      const exists = cartItems.some(
        (item) => item.product?._id === productId || item._id === productId,
      );
      if (exists) {
        toast.error("Already added to the cart");
        return;
      }
    }

    try {
      await post(
        "cart/add",
        { productId, quantity },
        {
          onSuccess: () => {
            if (!options?.suppressToast) {
              toast.success("Product added to cart");
            }
            refetch(); // Refresh cart data
          },
          onError: (err: any) => {
            toast.error(err.response?.data?.message || "Failed to add to cart");
          },
        },
      );
    } catch (error) {
      // Error handled in onError
    }
  };

  // 3. Remove Item (DELETE with body)
  // Since useApi's 'del' doesn't support body, we use a custom mutation with privateApi
  const removeItemMutation = useMutation({
    mutationFn: async (productId: string) => {
      const res = await privateApi.delete("cart/item", {
        data: { productId },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Item removed from cart");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to remove item");
    },
  });

  const removeFromCart = (productId: string) => {
    if (!isAuthenticated) return;
    removeItemMutation.mutate(productId);
  };

  // 4. Clear Cart
  const clearCart = async () => {
    if (!isAuthenticated) return;

    try {
      await del("cart/clear", {
        onSuccess: () => {
          toast.success("Cart cleared");
          refetch();
        },
        onError: (err: any) => {
          toast.error(err.response?.data?.message || "Failed to clear cart");
        },
      });
    } catch (error) {
      // Error handled in onError
    }
  };

  // 5. Update Quantity (Re-use Add to Cart for positive, or custom logic if backend supports it)
  // The backend "cart/add" usually increments or updates.
  // If the backend only supports "add" (increment) and "remove" (delete item),
  // setting specific quantity might require a different endpoint or logic.
  // Based on the prompt, we only have "add" (which implies adding to existing or creating new) and "remove item".
  // Usually "add" with existing product increments quantity.
  // If we want to decrement, we might need a different logic or the backend might handle negative numbers?
  // User didn't provide "update quantity" endpoint.
  // I'll assume for now we can only "add" more.
  // But CartPage needs update quantity.
  // If I add 1, it adds 1.
  // If I want to set quantity to 5 from 3, I add 2.
  // If I want to set quantity to 2 from 3, I need to remove 1? Or remove item and add 2?
  // Let's assume for now we only support "Add" (+ button) and "Remove Item".
  // I will check if I can use addToCart for updating quantity if I just add difference.

  return {
    cart,
    cartItems,
    cartCount,
    isLoading,
    addToCart,
    removeFromCart,
    clearCart,
    isRemoving: removeItemMutation.isPending,
  };
}
