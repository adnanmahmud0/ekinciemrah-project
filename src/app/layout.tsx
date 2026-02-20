import "./globals.css";
import { nunitoSans, playball } from "./fonts";
import { AuthProvider } from "@/context/auth-context";
import { FlyAnimationProvider } from "@/context/fly-animation-context";
import QueryProvider from "@/providers/query-provider";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${nunitoSans.variable} ${playball.variable}`}>
      <body>
        <QueryProvider>
          <AuthProvider>
            <FlyAnimationProvider>{children}</FlyAnimationProvider>
          </AuthProvider>
          <Toaster richColors position="top-right" closeButton />
        </QueryProvider>
      </body>
    </html>
  );
}
