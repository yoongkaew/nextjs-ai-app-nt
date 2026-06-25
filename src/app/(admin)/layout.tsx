import type { Metadata } from "next";
import Link from "next/link";
import {
  EB_Garamond,
  Manrope,
  JetBrains_Mono,
  Noto_Sans_Thai,
  Noto_Serif_Thai,
} from "next/font/google";
import { cn } from "@/lib/utils";
import { requireAdmin } from "@/lib/admin-auth";
import { Toaster } from "@/components/ui/sonner";
import LogoutButton from "@/components/logout-button";
import { AdminSidebar } from "./admin/components/admin-sidebar";
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
  title: "TypeGallery — แผงควบคุมผู้ดูแล",
  description: "Admin dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Single guard for the whole admin area — redirects if not an admin.
  const session = await requireAdmin();

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
        <div className="flex min-h-screen flex-col md:flex-row">
          <aside className="flex flex-col gap-6 border-b border-border bg-background p-6 md:w-64 md:shrink-0 md:border-r md:border-b-0">
            <Link
              href="/admin"
              className="font-heading text-xl tracking-tight text-primary"
            >
              TypeGallery
              <span className="text-tertiary italic">.admin</span>
            </Link>
            <AdminSidebar />
            <div className="mt-auto hidden flex-col gap-3 md:flex">
              <p className="text-caption text-muted-foreground truncate">
                {session.user.email}
              </p>
              <LogoutButton />
            </div>
          </aside>
          <main className="flex-1 p-6 sm:p-8 lg:p-10">{children}</main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
