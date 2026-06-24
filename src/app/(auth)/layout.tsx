import type { Metadata } from "next";
import {
  EB_Garamond,
  Manrope,
  JetBrains_Mono,
  Noto_Sans_Thai,
  Noto_Serif_Thai,
} from "next/font/google";
import { cn } from "@/lib/utils";
import "../globals.css";

// Same TypeGallery type pairing as the storefront.
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
  title: "TypeGallery — เข้าสู่ระบบ",
  description: "Editorial, typography-forward storefront",
};

export default function AuthLayout({
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
      <body>{children}</body>
    </html>
  );
}
