import Link from "next/link";

import { HeaderAuthSlot } from "@/features/auth";
import { Logo } from "@/shared/components/logo";
import { Container } from "@/shared/ui/Container";

import { HEADER_NAV_ITEMS } from "./consts";

const Header = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-100 border-b border-(--layout-border-subtle) bg-slate-950/40 backdrop-blur-sm">
      <Container className="flex h-(--layout-header-height) items-center justify-between">
        <Logo />
        <nav className="flex items-center gap-10">
          {HEADER_NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-slate-400 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <HeaderAuthSlot />
      </Container>
    </header>
  );
};

export default Header;
