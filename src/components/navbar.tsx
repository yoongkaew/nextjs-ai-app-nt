import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { NavMenu } from "@/components/nav-menu";
import { NavigationSheet } from "@/components/navigation-sheet";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { ShoppingBasket } from "lucide-react";
import CountCartItem from "@/app/(front)/components/CountCartItem";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import LogoutButton from "./logout-button";

const Navbar = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  return (
    <nav className="sticky top-0 z-50 h-20 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-full max-w-(--breakpoint-xl) items-center justify-between gap-6 px-6 sm:px-8">
        <Logo />

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-4">
          <Link href="/cart" className="group">
            <Badge variant="outline" className="gap-2 px-3">
              <ShoppingBasket className="size-3.5!" />
              <CountCartItem /> ชิ้น
            </Badge>
          </Link>

          {!session && (
            <>
              <Button asChild className="hidden sm:inline-flex" variant="outline" size="sm">
                <Link href="/login">เข้าสู่ระบบ</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/signup">สมัครสมาชิก</Link>
              </Button>
            </>
          )}

          {session && (
            <>
              <span className="hidden text-caption text-muted-foreground sm:inline">
                สวัสดี, {session.user.name}
              </span>
              <LogoutButton />
            </>
          )}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
