// app/(user)/layout.tsx

import Footer from "@/components/user-navbar-fotter/footer";
import Navbar from "@/components/user-navbar-fotter/navbar";

import type { ReactNode } from "react";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}
