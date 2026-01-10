// app/(user)/layout.tsx

import Footer from "@/components/user-navbar-fotter/footer";
import Navbar from "@/components/user-navbar-fotter/navbar";

import type { ReactNode } from "react";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
