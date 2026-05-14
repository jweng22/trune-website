"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ease, duration } from "@/lib/motion";
import { useCursorProximity } from "@/hooks/useCursorProximity";
import { SleepScoreCard } from "./SleepScoreCard";
import { ProtocolCard } from "./ProtocolCard";
import { TrendCard } from "./TrendCard";

interface CardWrapProps {
  delay: number;
  rotate: number;
  x: number;
  y: number;
  zIndex: number;
  children: React.ReactNode;
}

function CardWrap({ delay, rotate, x, y, zIndex, children }: CardWrapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { x: curX, y: curY } = useCursorProximity(ref);

  // Ambient breathing animation values are CSS, keyed by card slot
  return (
    <motion.div
      ref={ref}
      className="absolute will-change-transform"
      style={{ zIndex, x: curX, y: curY }}
      initial={{ opacity: 0, y: y + 24, scale: 0.94 }}
      animate={{ opacity: 1, y, scale: 1 }}
      transition={{ delay, duration: duration.slow, ease: ease.emphatic }}
    >
      <motion.div
        style={{ rotate }}
        animate={{ y: [0, -2, 0, 2, 0] }}
        transition={{
          y: {
            duration: 5.5 + zIndex * 0.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: zIndex * 1.5,
          },
        }}
      >
        {/* Inner variants container for card children */}
        <motion.div
          variants={{ hidden: {}, visible: {} }}
          initial="hidden"
          animate="visible"
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

interface Props {
  /** Cards start appearing at this time offset (seconds) */
  startDelay?: number;
}

export function HeroVisual({ startDelay = 0.32 }: Props) {
  return (
    <div className="relative w-full" style={{ height: 520 }}>
      {/* Radial ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(246,90,27,0.06) 0%, transparent 65%)",
        }}
      />

      {/* Card 1 — top-left */}
      <CardWrap delay={startDelay} rotate={-2} x={0} y={0} zIndex={3}>
        <motion.div
          variants={{ hidden: {}, visible: {} }}
          initial="hidden"
          animate="visible"
        >
          <SleepScoreCard />
        </motion.div>
      </CardWrap>

      {/* Card 2 — middle-right */}
      <CardWrap delay={startDelay + 0.2} rotate={1} x={80} y={60} zIndex={2}>
        <ProtocolCard />
      </CardWrap>

      {/* Card 3 — bottom-left */}
      <CardWrap delay={startDelay + 0.4} rotate={-1.5} x={40} y={180} zIndex={1}>
        <TrendCard />
      </CardWrap>
    </div>
  );
}
