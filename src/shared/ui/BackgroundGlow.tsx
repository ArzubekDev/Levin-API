"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";

const PRIMARY = {
  maxX: 120,
  maxY: 80,
  spring: { stiffness: 55, damping: 16, mass: 0.9 },
};

const SECONDARY = {
  maxX: -70,
  maxY: -50,
  spring: { stiffness: 28, damping: 18, mass: 1.3 },
};

const BackgroundGlow = () => {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const primaryX = useSpring(rawX, PRIMARY.spring);
  const primaryY = useSpring(rawY, PRIMARY.spring);

  const secondaryRawX = useTransform(rawX, (value) => (value / PRIMARY.maxX) * SECONDARY.maxX);
  const secondaryRawY = useTransform(rawY, (value) => (value / PRIMARY.maxY) * SECONDARY.maxY);
  const secondaryX = useSpring(secondaryRawX, SECONDARY.spring);
  const secondaryY = useSpring(secondaryRawY, SECONDARY.spring);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const onMove = (event: MouseEvent) => {
      const nx = (event.clientX / window.innerWidth - 0.5) * 2;
      const ny = (event.clientY / window.innerHeight - 0.5) * 2;
      rawX.set(nx * PRIMARY.maxX);
      rawY.set(ny * PRIMARY.maxY);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [rawX, rawY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-1 hidden h-full w-full overflow-hidden md:block">
      <motion.div
        style={{ x: primaryX, y: primaryY }}
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.9, 1, 0.9],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-4%] left-[18%] h-112 w-md rounded-full bg-blue-500/16 blur-3xl will-change-transform"
      />

      <motion.div
        style={{ x: secondaryX, y: secondaryY }}
        animate={{
          scale: [1.05, 0.92, 1.05],
          opacity: [0.75, 1, 0.75],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
        className="absolute right-[8%] bottom-[12%] h-112 w-md rounded-full bg-indigo-500/12 blur-3xl will-change-transform"
      />
    </div>
  );
};

export default BackgroundGlow;
