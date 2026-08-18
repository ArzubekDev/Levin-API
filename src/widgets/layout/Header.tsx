"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { HeaderAuthSlot } from "@/features/auth";
import { cn } from "@/shared/lib/utils";
import { Container } from "@/shared/ui/Container";
import { Logo } from "@/shared/ui/Logo";

import { HEADER_NAV_ITEMS } from "./consts";
import { HeaderMobileNav } from "./HeaderMobileNav";

const SCROLL_BG_THRESHOLD = 60;

const Header = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const isActive = (href: string) => pathname === href;

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY >= SCROLL_BG_THRESHOLD);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-100 border-b border-(--layout-border-subtle)",
        isScrolled ? "bg-slate-950" : "bg-slate-950/40 backdrop-blur-sm",
      )}
    >
      <Container className="flex h-(--layout-header-height) items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-10 md:flex">
          {HEADER_NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm text-slate-400 transition-colors hover:text-white",
                isActive(item.href) && "text-blue-400 hover:text-blue-400",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <HeaderAuthSlot />
          <HeaderMobileNav />
        </div>
      </Container>
    </header>
  );
};

export default Header;
