"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { authService } from "@/services/auth.service";
import Link from "next/link";

export function VerifyCodeForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const pathname = usePathname();
  const router = useRouter();
  const isAdminRoute = pathname?.startsWith("/admin");
  const baseAuthPath = isAdminRoute ? "/admin" : "";

  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("resetEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // If no email found, maybe redirect back to forgot password
      // router.push(`${baseAuthPath}/reset-password`);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      const response = await authService.verifyEmail({
        email,
        oneTimeCode: parseInt(code),
      });

      if (response.success) {
        setMessage(response.message || "Verification successful");
        // Store the reset token/data for the next step
        if (response.data) {
          // Assuming response.data is the token string or contains it
          const token =
            typeof response.data === "string"
              ? response.data
              : JSON.stringify(response.data);
          localStorage.setItem("resetToken", token);
        }
        setTimeout(() => {
          router.push(`${baseAuthPath}/set-new-password`);
        }, 1000);
      } else {
        setError(response.message || "Verification failed");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || "Something went wrong",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Verify Code</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter the verification code sent to your email ({email})
          </p>
        </div>
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}
        {message && (
          <div className="text-green-500 text-sm text-center">{message}</div>
        )}
        <Field>
          <FieldLabel htmlFor="code">Verification Code</FieldLabel>
          <Input
            id="code"
            type="text"
            placeholder="123456"
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </Field>
        <Field>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify"}
          </Button>
        </Field>
        <Field>
          <FieldDescription className="text-center">
            Didn&apos;t receive a code?{" "}
            <Link href="#" className="underline underline-offset-4">
              Resend
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
