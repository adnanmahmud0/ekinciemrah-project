/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { authService } from "@/services/auth.service";
import { Eye, EyeOff } from "lucide-react";

export function SetNewPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const pathname = usePathname();
  const router = useRouter();
  const isAdminRoute = pathname?.startsWith("/admin");
  const baseAuthPath = isAdminRoute ? "/admin" : "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("resetToken");
    if (storedToken) {
      try {
        const parsed = JSON.parse(storedToken);
        setToken(parsed.token || parsed);
      } catch (e) {
        setToken(storedToken);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.resetPassword(
        { newPassword, confirmPassword },
        token,
      );

      if (response.success) {
        setMessage(response.message || "Password reset successfully");
        localStorage.removeItem("resetEmail");
        localStorage.removeItem("resetToken");
        setTimeout(() => {
          router.push(`${baseAuthPath}/login`);
        }, 2000);
      } else {
        setError(response.message || "Failed to reset password");
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
          <h1 className="text-2xl font-bold">Set New Password</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your new password below
          </p>
        </div>
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}
        {message && (
          <div className="text-green-500 text-sm text-center">{message}</div>
        )}
        <Field>
          <FieldLabel htmlFor="password">New Password</FieldLabel>
          <div className="relative">
            <Input
              id="password"
              type={showNewPassword ? "text" : "password"}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-700 transition-colors"
            >
              {showNewPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-700 transition-colors"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </Field>
        <Field>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Setting Password..." : "Set Password"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
