"use client";

import { RefObject, useEffect, useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";

const MAX_TRANSLATION = 2; // px

export function useCursorProximity<T extends HTMLElement>(
  ref: RefObject<T | null>,
  maxDistance = 80,
) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 300, damping: 30, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 300, damping: 30, mass: 0.5 });

  const prefersReducedRef = useRef(false);

  useEffect(() => {
    prefersReducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (prefersReducedRef.current || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > maxDistance) {
        rawX.set(0);
        rawY.set(0);
        return;
      }

      const factor = (1 - dist / maxDistance) * MAX_TRANSLATION;
      rawX.set((dx / dist) * factor);
      rawY.set((dy / dist) * factor);
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [ref, maxDistance, rawX, rawY]);

  return { x, y };
}
