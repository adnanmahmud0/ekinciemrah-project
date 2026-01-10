import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function VerifyCodeForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Verify Code</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter the verification code sent to your email
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="code">Verification Code</FieldLabel>
          <Input id="code" type="text" placeholder="123456" required />
        </Field>
        <Field>
          <Button type="submit">Verify</Button>
        </Field>
        <Field>
          <FieldDescription className="text-center">
            Didn&apos;t receive a code?{" "}
            <a href="#" className="underline underline-offset-4">
              Resend
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
