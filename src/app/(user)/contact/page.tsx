import type { Metadata } from "next";
import ContactPage from "@/components/user/contact/ContactPage";
import React from "react";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Unified Produce team. Whether you have questions about orders, deliveries, or accounts, we are here to help.",
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return (
    <div>
      <ContactPage />
    </div>
  );
}
