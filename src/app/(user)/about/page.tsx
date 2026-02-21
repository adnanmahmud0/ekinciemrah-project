import type { Metadata } from "next";
import AboutPage from "@/components/user/about/AboutPage";
import React from "react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Unified Produce — our story, our mission, and our commitment to delivering fresh, high-quality wholesale produce to businesses across the region.",
  alternates: { canonical: "/about" },
};

export default function Page() {
  return (
    <div>
      <AboutPage />
    </div>
  );
}
