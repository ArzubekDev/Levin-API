import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/shared/lib/utils";

export function Container({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "mx-auto w-[98%] max-w-(--layout-container-max-width) px-(--layout-padding-x) sm:w-[90%] lg:w-(--layout-container-width)",
        className,
      )}
      {...props}
    />
  );
}
