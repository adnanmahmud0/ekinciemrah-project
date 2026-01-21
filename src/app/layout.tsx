import "./globals.css";
import { nunitoSans, playball } from "./fonts";
import { AuthProvider } from "@/context/auth-context";
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
          <AuthProvider>{children}</AuthProvider>
          <Toaster richColors position="top-center" />
        </QueryProvider>
      </body>
    </html>
  );
}
