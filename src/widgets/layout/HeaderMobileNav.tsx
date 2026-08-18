"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/shared/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { cn } from "@/shared/lib/utils";

import { HEADER_MOBILE_NAV_ITEMS } from "./consts";

export function HeaderMobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer text-slate-300 hover:bg-slate-800 hover:text-white md:hidden"
            aria-label="Открыть меню"
          >
            <Menu />
          </Button>
        }
      />
      <SheetContent side="right" className="border-slate-800 bg-slate-950">
        <SheetHeader>
          <SheetTitle>Меню</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4">
          {HEADER_MOBILE_NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-lg px-3 py-2.5 text-sm text-slate-300 transition-colors hover:bg-slate-800 hover:text-white",
                pathname === item.href && "bg-slate-800 text-blue-400 hover:text-blue-400",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
