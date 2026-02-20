/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useApi } from "@/hooks/use-api-data";
import { toast } from "sonner";
import { useAuth } from "@/context/auth-context";

// Define a minimal product interface for the Favourite list
export interface FavouriteProduct {
  _id: string;
  productName: string;
  description: string;
  categoryId: string;
  category: string;
  unit: string;
  basePrice: number;
  image: string;
  stock: number;
  stockStatus: string;
  avgRating: number;
  reviewCount: number;
  // Add other fields as needed
}

interface FavouriteListResponse {
  success: boolean;
  message: string;
  data: FavouriteProduct[];
}

export function useFavourite() {
  const { isAuthenticated } = useAuth();

  // Fetch Favourite list
  const {
    data: response,
    isLoading,
    refetch,
  } = useApi<FavouriteListResponse>(
    isAuthenticated ? "/Favourite" : undefined,
    isAuthenticated ? ["Favourites"] : undefined,
  );

  const FavouriteList = response?.data || [];
  // Create a Set of IDs for O(1) lookup
  // Handle both flat structure (if any) and nested structure (item.product._id)
  const FavouriteIds = new Set(
    FavouriteList.map((item: any) => item.product?._id || item._id),
  );

  // Get post method from useApi
  const { post } = useApi();

  const toggleFavourite = async (productId: string) => {
    if (!isAuthenticated) {
      toast.error("Please login to add Favourites", {
        description:
          "You need to be logged in to add products to your Favourites.",
      });
      return;
    }

    try {
      await post(
        "/Favourite",
        { productId },
        {
          onSuccess: (res) => {
            // Check the new state from response data
            const isFav = res.data?.isFavourite;
            if (isFav) {
              toast.success("Added to your Favourite list.");
            } else {
              toast.success("Removed from Favourite list.");
            }
            refetch(); // Reload the list to ensure sync
          },
          onError: (err: any) => {
            toast.error(
              err.response?.data?.message || "Failed to update Favourite",
            );
          },
        },
      );
    } catch (error) {
      // Error is handled in onError callback
    }
  };

  const isFavourite = (productId: string) => {
    return FavouriteIds.has(productId);
  };

  return {
    FavouriteList,
    isLoading,
    toggleFavourite,
    isFavourite,
  };
}
