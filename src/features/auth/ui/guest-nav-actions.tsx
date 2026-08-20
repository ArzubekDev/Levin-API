import Link from "next/link";

import { buttonVariants } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";

export function GuestNavActions() {
  return (
    <div className="flex items-center gap-10">
      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "cursor-pointer text-slate-300 hover:bg-slate-800 hover:text-white",
        )}
      >
        Sign in
      </Link>

      <Link
        href="/login"
        className={cn(
          buttonVariants(),
          "hidden cursor-pointer bg-blue-600 text-white hover:bg-blue-700 sm:flex",
        )}
      >
        Get started
      </Link>
    </div>
  );
}
