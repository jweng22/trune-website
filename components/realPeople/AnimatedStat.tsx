"use client";

import { AnimatedCounter } from "@/ui/AnimatedCounter";

interface Props {
  value: number;
  suffix?: string;
  caption: string;
  hold?: boolean;
  delay?: number;
}

export function AnimatedStat({ value, suffix, caption, hold, delay = 0 }: Props) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="font-medium leading-none tracking-[-0.03em] text-[var(--color-text-primary)]"
        style={{ fontSize: "clamp(64px, 7.5vw, 104px)" }}
      >
        <AnimatedCounter
          to={value}
          suffix={suffix}
          delay={delay}
          hold={hold}
        />
      </div>
      <p className="mt-2 text-[14px] font-medium text-[var(--color-text-secondary)]">
        {caption}
      </p>
    </div>
  );
}
