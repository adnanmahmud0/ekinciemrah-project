import type { Metadata } from "next";
import { Login } from "@/components/auth/Login";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Sign in to your Unified Produce account to manage orders, track deliveries, and browse our full catalogue of fresh wholesale products.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <Login showSignup={true} />;
}
