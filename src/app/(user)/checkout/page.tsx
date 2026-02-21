import type { Metadata } from "next";
import CheckoutPage from "@/components/user/checkout/CheckoutPage";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Complete your Unified Produce order. Review your items, confirm your delivery details, and place your wholesale produce order securely.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <CheckoutPage />;
}
