"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin", label: "ภาพรวม", icon: LayoutDashboard },
  { href: "/admin/products", label: "สินค้า", icon: Package },
  { href: "/admin/orders", label: "คำสั่งซื้อ", icon: ShoppingCart },
] as const;

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 md:flex-col">
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        // Exact match for the dashboard root; prefix match for sub-sections.
        const isActive =
          href === "/admin" ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 border border-transparent px-3 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "border-border bg-card text-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="size-4 shrink-0" />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
