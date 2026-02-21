import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Create Account",
  description:
    "Register a new business account on Unified Produce to start ordering fresh wholesale fruits, vegetables, and grocery products online.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <RegisterForm />;
}
