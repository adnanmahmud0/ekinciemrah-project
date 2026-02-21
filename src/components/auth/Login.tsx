/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export function Login({
  className,
  showSignup = true,
  ...props
}: React.ComponentProps<"form"> & { showSignup?: boolean }) {
  const { login } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  const baseAuthPath = isAdminRoute ? "/admin" : "";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const response = await login({ email, password }, isAdminRoute || false);

      if (response.success) {
        if (isAdminRoute) {
          router.push("/admin");
        } else {
          router.push("/service");
        }
      } else {
        setError(response.message || "Login failed");
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
        <div>
          <Button className="cursor-pointer" onClick={() => router.push("/")}>
            <ArrowLeft /> Back
          </Button>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Login to your account</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Enter your email below to login to your account
            </p>
          </div>
        </div>
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a
              href={`${baseAuthPath}/reset-password`}
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="*******"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-700 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </Field>
        <Field>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </Field>
        {showSignup && (
          <Field>
            <FieldDescription className="text-center">
              Don&apos;t have an account?{" "}
              <Link
                href={`${baseAuthPath}/register`}
                className="underline underline-offset-4"
              >
                Sign up
              </Link>
            </FieldDescription>
          </Field>
        )}
      </FieldGroup>
    </form>
  );
}
