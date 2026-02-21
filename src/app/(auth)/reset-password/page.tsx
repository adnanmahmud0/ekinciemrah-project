import type { Metadata } from "next";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password",
  description:
    "Forgot your password? Enter your email address and we will send you instructions to reset your Unified Produce account password.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ResetPasswordForm />;
}
