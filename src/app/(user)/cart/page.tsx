import type { Metadata } from "next";
import CartPage from "@/components/user/cart/CartPage";

export const metadata: Metadata = {
  title: "My Cart",
  description:
    "Review the items in your Unified Produce cart, update quantities, and proceed to checkout to complete your wholesale order.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <CartPage />;
}
