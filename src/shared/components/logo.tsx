import Link from "next/link";

import { AnimatedBoltIcon } from "@/shared/components/animated-bolt-icon";
import { cn } from "@/shared/lib/utils";

interface LogoProps {
  href?: string;
  size?: "sm" | "md";
  showText?: boolean;
  className?: string;
}

const sizeConfig = {
  sm: {
    icon: 24,
    text: "font-semibold",
  },
  md: {
    icon: 30,
    text: "font-semibold text-lg tracking-tight",
  },
} as const;

export function Logo({ href = "/", size = "md", showText = true, className }: LogoProps) {
  const config = sizeConfig[size];

  const content = (
    <>
      <AnimatedBoltIcon size={config.icon} />
      {showText && <span className={config.text}>Levin API</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn("inline-flex items-center gap-2.5", className)}>
        {content}
      </Link>
    );
  }

  return <div className={cn("inline-flex items-center gap-2.5", className)}>{content}</div>;
}
