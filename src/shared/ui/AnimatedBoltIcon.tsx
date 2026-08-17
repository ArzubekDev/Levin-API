"use client";

import { useEffect, useId, useRef } from "react";

import { cn } from "@/shared/lib/utils";

interface AnimatedBoltIconProps {
  size?: number;
  className?: string;
  variant?: "idle" | "loader";
}

export function AnimatedBoltIcon({
  size = 30,
  className,
  variant = "idle",
}: AnimatedBoltIconProps) {
  const gradientId = useId();
  const wrapRef = useRef<HTMLSpanElement>(null);
  const isLoader = variant === "loader";

  useEffect(() => {
    if (isLoader) return;

    const wrap = wrapRef.current;
    if (!wrap) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      wrap.classList.add("bolt-draw-play");
      return;
    }

    const playAnim = () => {
      wrap.classList.remove("bolt-draw-play");
      void wrap.offsetWidth;
      wrap.classList.add("bolt-draw-play");
    };

    const initialTimeout = window.setTimeout(playAnim, 300);
    const interval = window.setInterval(playAnim, 12000);

    return () => {
      window.clearTimeout(initialTimeout);
      window.clearInterval(interval);
    };
  }, [isLoader]);

  return (
    <span
      ref={wrapRef}
      className={cn("inline-flex shrink-0 leading-none", isLoader && "bolt-draw-loop", className)}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "block",
          isLoader
            ? "drop-shadow-[0_0_14px_rgba(110,168,255,0.65)]"
            : "drop-shadow-[0_0_6px_rgba(79,125,255,0.55)]",
        )}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6ea8ff" />
            <stop offset="100%" stopColor="#8b6bff" />
          </linearGradient>
        </defs>
        <path
          className="bolt-stroke"
          stroke={`url(#${gradientId})`}
          d="M55 5 L20 55 L45 55 L38 95 L82 42 L55 42 Z"
        />
      </svg>
    </span>
  );
}
