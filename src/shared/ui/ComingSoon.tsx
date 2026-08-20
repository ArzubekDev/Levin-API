"use client";

import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/shared/lib/utils";
import { AnimatedBoltIcon } from "@/shared/ui/AnimatedBoltIcon";
import HorizonBeam from "@/shared/ui/HorizonBeam";

interface ComingSoonProps {
  title?: string;
  description?: string;
  progress?: number;
  className?: string;
}

export function ComingSoon({
  title = "В процессе разработки",
  description = "Скоро будет доступно",
  className,
}: ComingSoonProps) {
  const reducedMotion = useReducedMotion();

  return (
    <section
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={cn(
        "relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-6 py-20",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(37_99_235/12%)_0%,transparent_58%)]"
      />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        <div className="relative mb-10 hidden items-center justify-center sm:flex">
          <HorizonBeam />

          <motion.div
            aria-hidden
            className="absolute size-36 rounded-full bg-blue-500/10 blur-2xl"
            animate={
              reducedMotion
                ? undefined
                : {
                    scale: [0.92, 1.08, 0.92],
                    opacity: [0.45, 0.8, 0.45],
                  }
            }
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="relative flex size-28 items-center justify-center rounded-full border border-blue-400/15 bg-slate-950/40 shadow-[0_0_48px_-12px_rgb(59_130_246/45%)] backdrop-blur-sm"
            animate={
              reducedMotion
                ? undefined
                : {
                    scale: [1, 1.03, 1],
                  }
            }
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="absolute inset-0.75 rounded-full border border-white/4" />
            <AnimatedBoltIcon size={56} variant="loader" />
          </motion.div>
        </div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
          className="w-full space-y-3"
        >
          <div className="relative flex flex-col items-center justify-center gap-3">
            <div className="hidden sm:block">
              <HorizonBeam />
            </div>

            <p className="relative z-10 inline-flex items-center gap-2 rounded-md border border-amber-400/25 bg-amber-400/10 px-2.5 py-1 text-[11px] font-medium tracking-[0.14em] text-amber-100/90 uppercase shadow-[0_0_24px_-8px_rgb(251_191_36/45%)] backdrop-blur-sm">
              <span
                aria-hidden
                className="size-1.5 shrink-0 rounded-full bg-amber-300 shadow-[0_0_8px_rgb(252_211_77/70%)]"
              />
              {title}
            </p>

            <h1 className="relative z-10 text-2xl font-semibold tracking-tight text-white md:text-3xl">
              {description}
            </h1>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
