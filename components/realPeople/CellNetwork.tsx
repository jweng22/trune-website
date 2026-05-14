"use client";

import { useEffect, useRef, useState } from "react";

const GOLDEN_ANGLE = 2.39996322972865;
const DOT_COUNT = 160;
const MAX_LINE_DIST = 32;
const MAX_LINES = 240;
const CX = 280;
const CY = 180;
const ACCENT_INDICES = new Set([7, 23, 58, 112]);

interface Dot {
  x: number;
  y: number;
  isAccent: boolean;
  animDuration: number;
  animDelay: number;
  driftX: number;
  driftY: number;
}

interface Line {
  x1: number; y1: number;
  x2: number; y2: number;
  animDuration: number;
  animDelay: number;
}

function generateDots(): Dot[] {
  return Array.from({ length: DOT_COUNT }, (_, i) => {
    const r = Math.sqrt(i + 1) * 17.5;
    const theta = i * GOLDEN_ANGLE;
    const x = CX + r * Math.cos(theta);
    const y = CY + r * Math.sin(theta);
    return {
      x,
      y,
      isAccent: ACCENT_INDICES.has(i),
      animDuration: 7 + (i % 3) * 0.8,
      animDelay: -(i * 0.15),
      driftX: ((i % 5) - 2) * 0.8,
      driftY: ((i % 7) - 3) * 0.7,
    };
  });
}

function generateLines(dots: Dot[]): Line[] {
  const lines: Line[] = [];
  for (let i = 0; i < dots.length && lines.length < MAX_LINES; i++) {
    for (let j = i + 1; j < dots.length && lines.length < MAX_LINES; j++) {
      const dx = dots[i].x - dots[j].x;
      const dy = dots[i].y - dots[j].y;
      if (Math.sqrt(dx * dx + dy * dy) < MAX_LINE_DIST) {
        lines.push({
          x1: dots[i].x, y1: dots[i].y,
          x2: dots[j].x, y2: dots[j].y,
          animDuration: 4.5,
          animDelay: -(lines.length * 0.08),
        });
      }
    }
  }
  return lines;
}

// Pre-generate deterministically
const DOTS = generateDots();
const LINES = generateLines(DOTS);

export function CellNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative mx-auto" style={{ width: 560, height: 360 }}>
      {/* Inject keyframes once */}
      <style>{`
        @keyframes dotDrift {
          0%,100% { transform: translate(0px,0px); }
          33%      { transform: translate(var(--dx),var(--dy)); }
          66%      { transform: translate(calc(var(--dx)*-0.6),calc(var(--dy)*0.4)); }
        }
        @keyframes linePulse {
          0%,100% { opacity: 0.3; }
          50%      { opacity: 0.6; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cell-dot, .cell-line { animation: none !important; }
        }
      `}</style>

      <svg
        width={560}
        height={360}
        viewBox="0 0 560 360"
        className="overflow-visible"
        aria-hidden="true"
      >
        {/* Lines */}
        {LINES.map((line, i) => (
          <line
            key={i}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="#E5E5E0"
            strokeWidth="0.75"
            className="cell-line"
            style={
              active
                ? {
                    animationName: "linePulse",
                    animationDuration: `${line.animDuration}s`,
                    animationDelay: `${line.animDelay}s`,
                    animationTimingFunction: "ease-in-out",
                    animationIterationCount: "infinite",
                  }
                : { opacity: 0.3 }
            }
          />
        ))}

        {/* Dots */}
        {DOTS.map((dot, i) => (
          <circle
            key={i}
            cx={dot.x}
            cy={dot.y}
            r="2.5"
            fill={dot.isAccent ? "rgba(246,90,27,0.7)" : "#DEDED8"}
            className="cell-dot"
            style={
              active
                ? ({
                    "--dx": `${dot.driftX}px`,
                    "--dy": `${dot.driftY}px`,
                    animationName: "dotDrift",
                    animationDuration: `${dot.animDuration}s`,
                    animationDelay: `${dot.animDelay}s`,
                    animationTimingFunction: "ease-in-out",
                    animationIterationCount: "infinite",
                  } as React.CSSProperties)
                : {}
            }
          />
        ))}
      </svg>
    </div>
  );
}
