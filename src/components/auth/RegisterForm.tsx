/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useState } from "react";
import { useAuth } from "@/context/auth-context";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const pathname = usePathname();
  const router = useRouter();
  const { register } = useAuth();
  const isAdminRoute = pathname?.startsWith("/admin");
  const baseAuthPath = isAdminRoute ? "/admin" : "";

  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    businessAddress: "",
    contact: "",
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await register(formData);
      if (response.success) {
        // Redirect to login or verification page
        // User didn't specify, but usually login or verify-email
        // Let's assume login for now or verify-code if that page exists
        router.push(`${baseAuthPath}/login`);
      } else {
        setError(response.message || "Registration failed");
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
      className={cn("mx-auto flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <FieldGroup className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-1 text-center md:mb-2">
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your details below to create your account
          </p>
        </div>
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}
        <div className="grid gap-4 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="businessName">Business Name</FieldLabel>
            <Input
              id="businessName"
              type="text"
              placeholder="Acme Corporation"
              required
              value={formData.businessName}
              onChange={handleChange}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="businessType">Business Type</FieldLabel>
            <Input
              id="businessType"
              type="text"
              placeholder="Restaurant, Retail, Services..."
              required
              value={formData.businessType}
              onChange={handleChange}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="businessAddress">Business Address</FieldLabel>
            <Input
              id="businessAddress"
              type="text"
              placeholder="123 Main St, City"
              required
              value={formData.businessAddress}
              onChange={handleChange}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="contact">Phone</FieldLabel>
            <Input
              id="contact"
              type="tel"
              placeholder="+1 (555) 000-0000"
              required
              value={formData.contact}
              onChange={handleChange}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </Field>
          <Field className="md:col-span-2">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </Field>
        </div>
        <div className="mt-4 flex flex-col gap-3">
          <Field>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing Up..." : "Sign Up"}
            </Button>
          </Field>
          <Field>
            <FieldDescription className="text-center">
              Already have an account?{" "}
              <a
                href={`${baseAuthPath}/login`}
                className="underline underline-offset-4"
              >
                Login
              </a>
            </FieldDescription>
          </Field>
        </div>
      </FieldGroup>
    </form>
  );
}
