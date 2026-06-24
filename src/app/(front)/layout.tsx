import { Suspense } from "react";
import type { Metadata } from "next";
import {
  EB_Garamond,
  Manrope,
  JetBrains_Mono,
  Noto_Sans_Thai,
  Noto_Serif_Thai,
} from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";
import SiteFooter from "@/components/site-footer";
import { Toaster } from "@/components/ui/sonner";

// TypeGallery type pairing — serif headline / sans body / mono detail.
const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-eb-garamond",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

// Thai fallbacks so Thai copy stays legible within the editorial system.
const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai"],
  variable: "--font-noto-thai",
  display: "swap",
});

const notoSerifThai = Noto_Serif_Thai({
  subsets: ["thai"],
  variable: "--font-noto-serif-thai",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TypeGallery — ระบบ E-Commerce",
  description: "Editorial, typography-forward storefront",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={cn(
        ebGaramond.variable,
        manrope.variable,
        jetbrainsMono.variable,
        notoSansThai.variable,
        notoSerifThai.variable,
        "font-sans"
      )}
    >
      <body>
        <Suspense fallback={<div className="h-20 border-b border-border bg-background" />}>
          <Navbar />
        </Suspense>
        <main className="min-h-[60vh]">{children}</main>
        <Suspense fallback={<div className="h-96 bg-surface-inverse" />}>
          <SiteFooter />
        </Suspense>
        <Toaster />
      </body>
    </html>
  );
}
