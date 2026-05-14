import type { Variants } from "framer-motion";

// ─── Easing curves ────────────────────────────────────────────────────────────

export const ease = {
  smooth:   [0.32, 0.72, 0,   1  ] as const,  // Apple-style, default entrances
  emphatic: [0.16, 1,    0.3, 1  ] as const,  // headline reveals, hero arrivals
  spring:   [0.34, 1.56, 0.64,1  ] as const,  // subtle overshoot, counters
  exit:     [0.7,  0,    0.84,0  ] as const,  // exits
};

// ─── Durations ────────────────────────────────────────────────────────────────

export const duration = {
  fast:    0.18,
  base:    0.32,
  slow:    0.6,
  arrival: 1.2,
  draw:    1.4,
};

// ─── Stagger ──────────────────────────────────────────────────────────────────

export const stagger = {
  tight:  0.04,
  base:   0.08,
  loose:  0.12,
};

// ─── Shared variants ─────────────────────────────────────────────────────────

export const arrivalFadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: ease.smooth },
  },
};

export const arrivalScale: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.slow, ease: ease.emphatic },
  },
};

export const cardEnter: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: duration.slow, ease: ease.emphatic },
  },
};

export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: ease.emphatic },
  },
};

export const pathDraw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: duration.draw, ease: ease.emphatic },
  },
};
