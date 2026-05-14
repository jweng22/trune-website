"use client";

import { motion } from "framer-motion";
import { cardEnter, pathDraw, ease } from "@/lib/motion";

const DATA = [28, 32, 29, 35, 34, 38, 36, 42, 40, 45, 44, 50];
const W = 260;
const H = 80;

function buildPath(pts: number[]) {
  const max = Math.max(...pts);
  const min = Math.min(...pts);
  const span = max - min || 1;
  return pts
    .map((v, i) => {
      const x = (i / (pts.length - 1)) * W;
      const y = H - ((v - min) / span) * (H - 8) - 4;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

function buildArea(pts: number[]) {
  return buildPath(pts) + ` L${W},${H} L0,${H} Z`;
}

// Leading dot position
const lastIdx = DATA.length - 1;
const maxV = Math.max(...DATA);
const minV = Math.min(...DATA);
const spanV = maxV - minV || 1;
const dotX = W;
const dotY = H - ((DATA[lastIdx] - minV) / spanV) * (H - 8) - 4;

export function TrendCard() {
  return (
    <motion.div
      variants={cardEnter}
      className="w-[300px] rounded-2xl bg-white p-5 select-none"
      style={{
        boxShadow:
          "0 1px 2px rgba(0,0,0,.04), 0 12px 32px rgba(0,0,0,.06), inset 0 0 0 0.5px rgba(0,0,0,.04)",
      }}
    >
      <p className="mb-4 text-[12px] font-medium text-[var(--color-text-tertiary)]">
        Last 30 days
      </p>

      {/* Chart */}
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} overflow="visible">
        {/* Area fill */}
        <motion.path
          d={buildArea(DATA)}
          fill="var(--color-accent)"
          fillOpacity="0.08"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4, ease: ease.smooth }}
        />
        {/* Data dots */}
        {DATA.map((v, i) => {
          const x = (i / (DATA.length - 1)) * W;
          const y = H - ((v - minV) / spanV) * (H - 8) - 4;
          return (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="2"
              fill="var(--color-accent)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + i * 0.05, duration: 0.2 }}
            />
          );
        })}
        {/* Line */}
        <motion.path
          d={buildPath(DATA)}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={pathDraw}
        />
        {/* Leading dot */}
        <motion.circle
          cx={dotX}
          cy={dotY}
          r="3.5"
          fill="var(--color-accent)"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, duration: 0.3, ease: ease.emphatic }}
        />
      </svg>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between">
        <span className="text-[13px] text-[var(--color-text-secondary)]">
          Sleep score trending up
        </span>
        <span
          className="rounded-full px-2 py-0.5 text-[11px] font-medium"
          style={{ background: "rgba(246,90,27,0.1)", color: "var(--color-accent)" }}
        >
          +18%
        </span>
      </div>
    </motion.div>
  );
}
