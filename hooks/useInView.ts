"use client";

import { useEffect, useRef, useState } from "react";

interface Options {
  threshold?: number;
  once?: boolean;
  rootMargin?: string;
}

export function useInView<T extends Element>({
  threshold = 0.25,
  once = true,
  rootMargin = "0px",
}: Options = {}) {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once, rootMargin]);

  return { ref, isInView };
}
