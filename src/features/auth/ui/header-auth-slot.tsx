"use client";

import { useSession } from "@/features/auth/lib/use-session";
import { GuestNavActions } from "@/features/auth/ui/guest-nav-actions";
import { UserNavActions } from "@/features/auth/ui/user-nav-actions";

export function HeaderAuthSlot() {
  const { status, user, signOut } = useSession();

  if (status === "loading" || status === "unavailable") {
    return <div className="h-8 w-28 animate-pulse rounded-lg bg-slate-800/80" aria-hidden />;
  }

  if (status === "authenticated" && user) {
    return <UserNavActions user={user} onSignOut={signOut} />;
  }

  return <GuestNavActions />;
}
