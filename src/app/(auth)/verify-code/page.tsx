import type { Metadata } from "next";
import { VerifyCodeForm } from "@/components/auth/VerifyCodeForm";

export const metadata: Metadata = {
  title: "Verify Code",
  description:
    "Enter the verification code sent to your email to confirm your identity and continue with your Unified Produce account.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <VerifyCodeForm />;
}
