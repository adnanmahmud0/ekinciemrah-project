import "./globals.css";
import { nunitoSans, playball } from "./fonts";
import { AuthProvider } from "@/context/auth-context";
import { FlyAnimationProvider } from "@/context/fly-animation-context";
import QueryProvider from "@/providers/query-provider";
import { Toaster } from "sonner";
import type { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://unifiedproduce.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Unified Produce | Fresh & Quality Products for Your Business",
    template: "%s | Unified Produce",
  },
  description:
    "Unified Produce is your trusted B2B wholesale produce supplier. Order fresh fruits, vegetables, and quality grocery products online with flexible delivery options.",
  keywords: [
    "wholesale produce",
    "B2B grocery",
    "fresh vegetables",
    "fruit supplier",
    "restaurant supplies",
    "catering supplies",
    "bulk food ordering",
    "Unified Produce",
  ],
  authors: [{ name: "Unified Produce" }],
  creator: "Unified Produce",
  publisher: "Unified Produce",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Unified Produce",
    title: "Unified Produce | Fresh & Quality Products for Your Business",
    description:
      "Order fresh fruits, vegetables, and quality grocery products online. Trusted B2B wholesale supplier with flexible delivery options.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Unified Produce - Fresh Wholesale Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Unified Produce | Fresh & Quality Products for Your Business",
    description:
      "Order fresh fruits, vegetables, and quality grocery products online. Trusted B2B wholesale supplier with flexible delivery options.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

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
