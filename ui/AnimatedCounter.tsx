"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValue, animate } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { ease, duration as dur } from "@/lib/motion";

interface Props {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  delay?: number;
  hold?: boolean;
  className?: string;
  suffixClassName?: string;
}

export function AnimatedCounter({
  to,
  suffix,
  prefix,
  duration: animDuration = dur.arrival,
  delay = 0,
  hold = false,
  className,
  suffixClassName,
}: Props) {
  const { ref, isInView } = useInView<HTMLSpanElement>({
    threshold: 0.3,
    once: true,
  });
  const [display, setDisplay] = useState(0);
  const [suffixVisible, setSuffixVisible] = useState(false);
  const val = useMotionValue(0);
  const hasRun = useRef(false);

  useEffect(() => {
    const unsubscribe = val.on("change", (v) => setDisplay(Math.round(v)));
    return unsubscribe;
  }, [val]);

  useEffect(() => {
    if (!isInView || hasRun.current) return;
    hasRun.current = true;

    const totalDelay = delay + (hold ? 0.2 : 0);

    const kick = () => {
      const controls = animate(val, to, {
        duration: animDuration,
        ease: ease.emphatic,
        onComplete: () => {
          if (suffix) setSuffixVisible(true);
        },
      });
      return controls;
    };

    if (totalDelay > 0) {
      const t = setTimeout(kick, totalDelay * 1000);
      return () => clearTimeout(t);
    } else {
      kick();
    }
  }, [isInView, to, animDuration, delay, hold, suffix, val]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix && (
        <span
          className={suffixClassName}
          style={{
            display: "inline-block",
            opacity: suffixVisible ? 1 : 0,
            transform: suffixVisible ? "scale(1)" : "scale(0.8)",
            transition: "opacity 0.2s, transform 0.2s",
          }}
        >
          {suffix}
        </span>
      )}
    </span>
  );
}
