"use client";

import { ChevronDown, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import { Separator } from "@/shared/components/ui/separator";
import type { User } from "@/shared/lib/api";
import { cn } from "@/shared/lib/utils";

import { USER_NAV_ITEMS } from "../model/consts";

interface UserNavActionsProps {
  user: User;
  onSignOut: () => void;
}

function getUserLabel(user: User) {
  return user.name?.trim() || user.email.split("@")[0];
}

function getUserInitial(user: User) {
  return getUserLabel(user).charAt(0).toUpperCase();
}

function formatPlan(plan: string) {
  return plan.charAt(0).toUpperCase() + plan.slice(1);
}

function UserAvatar({ user, size = "md" }: { user: User; size?: "md" | "lg" }) {
  const sizeClass = size === "lg" ? "size-10 text-sm" : "size-7 text-xs";

  if (user.avatar) {
    return (
      <Image
        src={user.avatar}
        alt="avatar"
        className={cn(sizeClass, "ring-border rounded-full object-cover ring-1")}
        width={40}
        height={40}
      />
    );
  }

  return (
    <span
      className={cn(
        sizeClass,
        "from-primary/20 to-accent/30 text-primary-foreground/90 ring-border flex items-center justify-center rounded-full bg-linear-to-br font-semibold ring-1",
      )}
    >
      {getUserInitial(user)}
    </span>
  );
}

function MenuItem({
  href,
  icon,
  children,
  onClick,
  variant = "default",
}: {
  href?: string;
  icon: ReactNode;
  children: ReactNode;
  onClick?: () => void;
  variant?: "default" | "danger";
}) {
  const className = cn(
    "flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors",
    variant === "default" && "text-muted-foreground hover:bg-muted hover:text-foreground",
    variant === "danger" && "text-destructive hover:bg-destructive/10 hover:text-destructive",
  );

  if (href) {
    return (
      <Link href={href} className={className} onClick={onClick}>
        <span className="flex size-4 shrink-0 items-center justify-center opacity-80 [&>svg]:size-4">
          {icon}
        </span>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={className} onClick={onClick}>
      <span className="flex size-4 shrink-0 items-center justify-center opacity-80 [&>svg]:size-4">
        {icon}
      </span>
      {children}
    </button>
  );
}

export function UserNavActions({ user, onSignOut }: UserNavActionsProps) {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            className="border-border bg-card/50 text-foreground hover:bg-muted hover:text-foreground data-popup-open:bg-muted h-9 gap-2 rounded-full border px-2 shadow-sm"
          >
            <UserAvatar user={user} />
            <span className="hidden max-w-28 truncate text-sm font-medium sm:inline">
              {getUserLabel(user)}
            </span>
            <ChevronDown className="text-muted-foreground size-3.5" />
          </Button>
        }
      />

      <PopoverContent
        align="end"
        sideOffset={10}
        className="border-border bg-popover/95 ring-border w-72 gap-0 overflow-hidden rounded-xl p-0 shadow-lg ring-1 shadow-black/40 backdrop-blur-xl"
      >
        <div className="border-border flex items-start gap-3 border-b p-3">
          <UserAvatar user={user} size="lg" />
          <div className="min-w-0 flex-1 pt-0.5">
            <p className="text-foreground truncate text-sm font-medium">{getUserLabel(user)}</p>
            <p className="text-muted-foreground truncate text-xs">{user.email}</p>
            <Badge
              variant="secondary"
              className="text-muted-foreground mt-2 text-sm tracking-wide uppercase"
            >
              {formatPlan(user.plan)} plan
            </Badge>
          </div>
        </div>

        <div className="p-1.5">
          {USER_NAV_ITEMS.map((item) => {
            return (
              <MenuItem key={item.href} href={item.href} icon={item.icon}>
                {item.label}
              </MenuItem>
            );
          })}
        </div>

        <Separator className="bg-border" />

        <div className="p-1.5">
          <MenuItem icon={<LogOut />} variant="danger" onClick={onSignOut}>
            Sign out
          </MenuItem>
        </div>
      </PopoverContent>
    </Popover>
  );
}
