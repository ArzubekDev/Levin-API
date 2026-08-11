"use client";

import { motion, useReducedMotion } from "motion/react";

import { AnimatedBoltIcon } from "@/shared/components/animated-bolt-icon";
import { cn } from "@/shared/lib/utils";
import HorizonBeam from "@/shared/ui/HorizonBeam";

interface ComingSoonProps {
  title?: string;
  description?: string;
  /** Прогресс разработки, 0–100. По умолчанию 11%. */
  progress?: number;
  className?: string;
}

export function ComingSoon({
  title = "В процессе разработки",
  description = "Скоро будет доступно",
  progress = 11,
  className,
}: ComingSoonProps) {
  const reducedMotion = useReducedMotion();
  const clampedProgress = Math.min(100, Math.max(0, progress));

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
        <div className="relative mb-10 flex items-center justify-center">
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
          <p className="text-[11px] font-semibold tracking-[0.22em] text-blue-300/80 uppercase">
            Levin API
          </p>

         <div className="relative flex flex-col items-center justify-center">
          <HorizonBeam />
         <h1 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
            {title}
          </h1>

          <p className="mx-auto max-w-sm text-sm leading-relaxed text-slate-500 md:text-base">
            {description}
          </p>
         </div>

          <div className="mx-auto mt-8 w-full max-w-xs space-y-2.5">
            <div className="flex items-end justify-between px-0.5">
              <span className="text-[11px] font-medium tracking-wide text-slate-500 uppercase">
                Прогресс
              </span>
              <span className="font-mono text-sm font-semibold tabular-nums text-blue-300">
                {clampedProgress}%
              </span>
            </div>

            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={clampedProgress}
              aria-label={`Прогресс разработки: ${clampedProgress}%`}
              className="relative h-1.5 overflow-hidden rounded-full bg-slate-800/90 ring-1 ring-white/5"
            >
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-blue-600 via-sky-400 to-indigo-400"
                initial={reducedMotion ? false : { width: 0 }}
                animate={{ width: `${clampedProgress}%` }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              >
                {!reducedMotion && (
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/35 to-transparent"
                    animate={{ x: ["-120%", "160%"] }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 0.7,
                    }}
                  />
                )}
              </motion.div>
            </div>

            <p className="text-[11px] text-slate-600">завершено</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
