"use client";

import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
}

interface Branch {
  segments: Point[];
  life: number;
  maxLife: number;
}

interface Bolt {
  segments: Point[];
  life: number;
  maxLife: number;
  width: number;
  color: string;
  branches: Branch[];
  flash: number;
}

export function LightningBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let bolts: Bolt[] = [];
    let lastBoltTime = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    function generateBolt(target: HTMLCanvasElement): Bolt {
      const startX = Math.random() * target.width;
      const endX = startX + (Math.random() - 0.5) * 400;
      const segmentsCount = 10 + Math.floor(Math.random() * 8);
      const points: Point[] = [];

      for (let i = 0; i <= segmentsCount; i++) {
        const t = i / segmentsCount;
        const baseX = startX + (endX - startX) * t;
        const jitter = (Math.random() - 0.5) * 120 * (1 - t * 0.3);
        points.push({
          x: baseX + jitter,
          y: t * target.height * 0.9 + target.height * 0.05,
        });
      }

      const branches: Branch[] = [];
      if (Math.random() > 0.7) {
        const branchStartIdx = Math.floor(Math.random() * (points.length - 4)) + 2;
        const origin = points[branchStartIdx];
        const branchPoints: Point[] = [origin];

        let bx = origin.x;
        let by = origin.y;
        for (let i = 0; i < 4; i++) {
          bx += (Math.random() - 0.5) * 80;
          by += Math.random() * 100 + 30;
          branchPoints.push({ x: bx, y: by });
        }
        branches.push({
          segments: branchPoints,
          life: 1,
          maxLife: 1,
        });
      }

      return {
        segments: points,
        life: 1,
        maxLife: 1,
        width: Math.random() * 1.5 + 0.5,
        color: Math.random() > 0.6 ? "#60a5fa" : "#818cf8",
        branches,
        flash: Math.random() * 0.08 + 0.02,
      };
    }

    function drawBolt(bolt: Bolt) {
      if (!ctx) return;
      const opacity = Math.max(0, bolt.life / bolt.maxLife);

      ctx.save();
      ctx.globalAlpha = opacity;

      ctx.shadowBlur = 25;
      ctx.shadowColor = bolt.color;
      ctx.strokeStyle = bolt.color;
      ctx.lineWidth = bolt.width;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(bolt.segments[0].x, bolt.segments[0].y);
      for (let i = 1; i < bolt.segments.length; i++) {
        ctx.lineTo(bolt.segments[i].x, bolt.segments[i].y);
      }
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.lineWidth = bolt.width * 0.35;
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.9})`;
      ctx.stroke();

      bolt.branches.forEach((branch) => {
        const branchOpacity = Math.max(0, branch.life / branch.maxLife) * opacity;
        ctx.globalAlpha = branchOpacity;
        ctx.shadowBlur = 15;
        ctx.shadowColor = bolt.color;
        ctx.lineWidth = bolt.width * 0.5;
        ctx.strokeStyle = bolt.color;
        ctx.beginPath();
        ctx.moveTo(branch.segments[0].x, branch.segments[0].y);
        for (let i = 1; i < branch.segments.length; i++) {
          ctx.lineTo(branch.segments[i].x, branch.segments[i].y);
        }
        ctx.stroke();
      });

      ctx.restore();
    }

    function animate(timestamp: number) {
      if (!ctx || !canvas) return;

      ctx.fillStyle = "rgba(2, 6, 23, 0.25)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      bolts.forEach((bolt) => {
        if (bolt.life > 0.8) {
          ctx.fillStyle = `rgba(59, 130, 246, ${bolt.flash * bolt.life})`;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      });

      if (timestamp - lastBoltTime > Math.random() * 6000 + 9000 && bolts.length < 2) {
        bolts.push(generateBolt(canvas));
        lastBoltTime = timestamp;
      }

      bolts = bolts.filter((bolt) => {
        bolt.life -= 0.011;
        bolt.branches.forEach((b) => (b.life -= 0.018));
        if (bolt.life > 0) drawBolt(bolt);
        return bolt.life > 0;
      });

      animationId = requestAnimationFrame(animate);
    }

    ctx.fillStyle = "oklch(0.129 0.042 264.695)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    bolts.push(generateBolt(canvas));
    lastBoltTime = performance.now();

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0" />;
}
