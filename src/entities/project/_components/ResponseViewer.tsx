"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";

import { cn } from "@/shared/lib/utils";

interface ResponseViewerProps {
  response: string;
  status: number | null;
  isExpanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
}

export function ResponseViewer({
  response,
  status,
  isExpanded,
  onExpandedChange,
}: ResponseViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isCollapsible = status !== null && status !== 404;

  useEffect(() => {
    if (!isExpanded || !isCollapsible) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        onExpandedChange(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [isExpanded, isCollapsible, onExpandedChange]);

  return (
    <div
      ref={containerRef}
      role={isCollapsible ? "button" : undefined}
      tabIndex={isCollapsible ? 0 : undefined}
      aria-expanded={isCollapsible ? isExpanded : undefined}
      onClick={isCollapsible ? () => onExpandedChange(true) : undefined}
      onKeyDown={(e) => {
        if (isCollapsible && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onExpandedChange(true);
        }
      }}
      className={cn(
        "relative rounded-xl border border-slate-800 bg-slate-950/80 outline-none",
        isCollapsible && "cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500/40",
        isCollapsible && !isExpanded && "h-75",
      )}
    >
      <pre
        className={cn(
          "overflow-x-auto p-4 font-mono text-sm text-slate-300",
          isCollapsible && !isExpanded && "h-full overflow-y-hidden",
          isCollapsible && isExpanded && "overflow-y-auto",
        )}
      >
        {response}
      </pre>

      {isCollapsible && !isExpanded && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 flex h-28 items-center justify-center rounded-b-xl bg-linear-to-t from-slate-950 via-slate-950/90 to-transparent"
        >
          <ChevronDown className="size-5 text-slate-400" />
        </div>
      )}
    </div>
  );
}
