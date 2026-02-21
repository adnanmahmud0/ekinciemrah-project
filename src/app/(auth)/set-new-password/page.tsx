import type { Metadata } from "next";
import { SetNewPasswordForm } from "@/components/auth/SetNewPasswordForm";

export const metadata: Metadata = {
  title: "Set New Password",
  description:
    "Create a new secure password for your Unified Produce account. Make sure it is strong and unique.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <SetNewPasswordForm />;
}
