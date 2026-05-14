"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, animate } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { ease } from "@/lib/motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
}

export function ShineReveal({
  children,
  className,
  duration = 1.6,
  delay = 0,
}: Props) {
  const { ref: wrapRef, isInView } = useInView<HTMLDivElement>({
    threshold: 0.25,
    once: true,
  });
  const darkLayerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const maskPos = useMotionValue(200);

  useEffect(() => {
    const unsubscribe = maskPos.on("change", (v) => {
      if (darkLayerRef.current) {
        darkLayerRef.current.style.webkitMaskPosition = `${v}% 0%`;
        darkLayerRef.current.style.maskPosition = `${v}% 0%`;
      }
    });
    return unsubscribe;
  }, [maskPos]);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const kick = () => {
      animate(maskPos, -100, {
        duration,
        ease: ease.emphatic,
      });
    };

    if (delay > 0) {
      const t = setTimeout(kick, delay * 1000);
      return () => clearTimeout(t);
    } else {
      kick();
    }
  }, [isInView, duration, delay, maskPos]);

  const maskStyle: React.CSSProperties = {
    WebkitMaskImage:
      "linear-gradient(to right, black 0%, black 65%, transparent 100%)",
    WebkitMaskSize: "300% 100%",
    maskImage:
      "linear-gradient(to right, black 0%, black 65%, transparent 100%)",
    maskSize: "300% 100%",
    WebkitMaskPosition: "200% 0%",
    maskPosition: "200% 0%",
  };

  return (
    <div ref={wrapRef} className={`relative ${className ?? ""}`}>
      {/* Base layer — light */}
      <div aria-hidden="true" style={{ color: "#DCDCD8" }}>
        {children}
      </div>
      {/* Reveal layer — dark, masked */}
      <div
        ref={darkLayerRef}
        className="pointer-events-none absolute inset-0"
        style={{ color: "var(--color-text-primary)", ...maskStyle }}
      >
        {children}
      </div>
    </div>
  );
}
