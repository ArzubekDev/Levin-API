import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/shared/lib/utils";

type ContainerSize = "default" | "narrow" | "wide";

type ContainerProps<T extends ElementType = "div"> = {
  as?: T;
  size?: ContainerSize;
} & ComponentPropsWithoutRef<T>;

const sizeClasses: Record<ContainerSize, string> = {
  default: "w-(--layout-container-width) max-w-(--layout-container-max-width)",
  narrow: "w-(--layout-container-width-narrow) max-w-(--layout-container-max-width-narrow)",
  wide: "w-(--layout-container-width-wide) max-w-(--layout-container-max-width-wide)",
};

export function Container<T extends ElementType = "div">({
  as,
  size = "default",
  className,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={cn("mx-auto px-(--layout-padding-x)", sizeClasses[size], className)}
      {...props}
    />
  );
}
