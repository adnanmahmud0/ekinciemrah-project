import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Your Account",
  description:
    "Verify your new Unified Produce account by entering the code sent to your registered email address.",
  robots: { index: false, follow: false },
};

export default function VerifyCodePage() {
  return <div>Verify Code Page</div>;
}
