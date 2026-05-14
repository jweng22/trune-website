"use client";

import { motion } from "framer-motion";
import { cardEnter, pathDraw, ease } from "@/lib/motion";

// 7-point sparkline upward trend
const SPARKLINE = [18, 14, 16, 10, 8, 5, 2];
const W = 60;
const H = 24;

function toPath(pts: number[]) {
  const max = Math.max(...pts);
  const min = Math.min(...pts);
  return pts
    .map((v, i) => {
      const x = (i / (pts.length - 1)) * W;
      const y = H - ((v - min) / (max - min)) * H;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

export function SleepScoreCard() {
  return (
    <motion.div
      variants={cardEnter}
      className="w-[280px] rounded-2xl bg-white p-5 select-none"
      style={{
        boxShadow:
          "0 1px 2px rgba(0,0,0,.04), 0 12px 32px rgba(0,0,0,.06), inset 0 0 0 0.5px rgba(0,0,0,.04)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-[12px] font-medium text-[var(--color-text-tertiary)]">
          Last night
        </span>
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-medium"
          style={{ background: "rgba(246,90,27,0.1)", color: "var(--color-accent)" }}
        >
          ↑ +14%
        </span>
      </div>

      {/* Score circle + sparkline */}
      <div className="flex items-end gap-4">
        <div
          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full"
          style={{ background: "var(--color-accent)" }}
        >
          <span className="text-[22px] font-medium leading-none text-white">
            34
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} overflow="visible">
            <motion.path
              d={toPath(SPARKLINE)}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={pathDraw}
            />
            {/* Leading dot */}
            <motion.circle
              cx={W}
              cy={H - ((SPARKLINE[SPARKLINE.length - 1] - Math.min(...SPARKLINE)) / (Math.max(...SPARKLINE) - Math.min(...SPARKLINE))) * H}
              r="2.5"
              fill="var(--color-accent)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.3, ease: ease.smooth }}
            />
          </svg>
          <span className="text-[11px] text-[var(--color-text-secondary)]">
            Sleep score
          </span>
        </div>
      </div>
    </motion.div>
  );
}
