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
import { usePathname } from "next/navigation";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  const baseAuthPath = isAdminRoute ? "/admin" : "";

  return (
    <form className={cn("mx-auto flex-col gap-6", className)} {...props}>
      <FieldGroup className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-1 text-center md:mb-2">
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your details below to create your account
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="businessName">Business Name</FieldLabel>
            <Input
              id="businessName"
              type="text"
              placeholder="Acme Corporation"
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="businessType">Business Type</FieldLabel>
            <Input
              id="businessType"
              type="text"
              placeholder="Restaurant, Retail, Services..."
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="businessAddress">Business Address</FieldLabel>
            <Input
              id="businessAddress"
              type="text"
              placeholder="123 Main St, City"
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="phone">Phone</FieldLabel>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input id="name" type="text" placeholder="John Doe" required />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </Field>
          <Field className="md:col-span-2">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input id="password" type="password" required />
          </Field>
        </div>
        <div className="mt-4 flex flex-col gap-3">
          <Field>
            <Button type="submit" className="w-full">
              Sign Up
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
