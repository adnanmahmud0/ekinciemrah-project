import type { Metadata } from "next";
import { Suspense } from "react";
import ServicePage from "@/components/user/service/ServicePage";

export const metadata: Metadata = {
  title: "Shop Products",
  description:
    "Browse and order fresh fruits, vegetables, and wholesale grocery products from Unified Produce. Filter by category, explore featured items, and place your business order today.",
  alternates: { canonical: "/service" },
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          Loading services...
        </div>
      }
    >
      <ServicePage />
    </Suspense>
  );
}
