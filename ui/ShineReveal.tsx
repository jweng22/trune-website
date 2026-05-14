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
  duration = 1.8,
  delay = 0,
}: Props) {
  const { ref: wrapRef, isInView } = useInView<HTMLDivElement>({
    threshold: 0.25,
    once: true,
  });
  const darkLayerRef = useRef<HTMLDivElement>(null);
  const orangeLayerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const maskPos = useMotionValue(200);

  // Update both layers on every mask-position change
  useEffect(() => {
    const unsubscribe = maskPos.on("change", (v) => {
      if (darkLayerRef.current) {
        darkLayerRef.current.style.webkitMaskPosition = `${v}% 0%`;
        darkLayerRef.current.style.maskPosition = `${v}% 0%`;
      }
      if (orangeLayerRef.current) {
        orangeLayerRef.current.style.webkitMaskPosition = `${v}% 0%`;
        orangeLayerRef.current.style.maskPosition = `${v}% 0%`;
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

  // Black layer: reveals text behind the leading edge
  const darkMaskStyle: React.CSSProperties = {
    WebkitMaskImage:
      "linear-gradient(to right, black 0%, black 65%, transparent 100%)",
    WebkitMaskSize: "300% 100%",
    maskImage:
      "linear-gradient(to right, black 0%, black 65%, transparent 100%)",
    maskSize: "300% 100%",
    WebkitMaskPosition: "200% 0%",
    maskPosition: "200% 0%",
  };

  // Orange layer: thin leading-edge strip (appears just ahead of the black reveal)
  const orangeMaskStyle: React.CSSProperties = {
    WebkitMaskImage:
      "linear-gradient(to right, transparent 0%, transparent 70%, black 74%, black 78%, transparent 86%)",
    WebkitMaskSize: "300% 100%",
    maskImage:
      "linear-gradient(to right, transparent 0%, transparent 70%, black 74%, black 78%, transparent 86%)",
    maskSize: "300% 100%",
    WebkitMaskPosition: "200% 0%",
    maskPosition: "200% 0%",
  };

  return (
    <div ref={wrapRef} className={`relative ${className ?? ""}`}>
      {/* Base layer — gray, always visible */}
      <div aria-hidden="true" style={{ color: "#DCDCD8" }}>
        {children}
      </div>
      {/* Orange leading-edge layer */}
      <div
        ref={orangeLayerRef}
        className="pointer-events-none absolute inset-0"
        style={{ color: "#F65A1B", ...orangeMaskStyle }}
        aria-hidden="true"
      >
        {children}
      </div>
      {/* Black reveal layer */}
      <div
        ref={darkLayerRef}
        className="pointer-events-none absolute inset-0"
        style={{ color: "var(--color-text-primary)", ...darkMaskStyle }}
      >
        {children}
      </div>
    </div>
  );
}
