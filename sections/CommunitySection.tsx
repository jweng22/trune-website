"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { ease, duration } from "@/lib/motion";

// ── Seeded deterministic dot positions ─────────────────────────────────────
// Cloud: ~40 dots in a 600×160 area, randomly distributed.
// Using a simple LCG to avoid Math.random() across renders.
function lcg(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

const rand = lcg(42);

const CLOUD_DOTS = Array.from({ length: 40 }, (_, i) => ({
  id:  i,
  cx:  rand() * 560 + 20,         // 20 – 580
  cy:  rand() * 120 + 10,         // 10 – 130
  r:   rand() * 2.5 + 2,          // 2 – 4.5
  // Subtle drift: random phase offset per dot
  driftX: (rand() - 0.5) * 12,
  driftY: (rand() - 0.5) * 8,
  driftDuration: rand() * 6 + 6,  // 6 – 12 s
}));

// Cluster: 8 orange dots below the filter bar (tight formation)
const CLUSTER_DOTS = [
  { id: 0, cx: 270, cy: 0 }, { id: 1, cx: 286, cy: -6 },
  { id: 2, cx: 302, cy: 3  }, { id: 3, cx: 258, cy: 8  },
  { id: 4, cx: 318, cy: -4 }, { id: 5, cx: 276, cy: 14 },
  { id: 6, cx: 294, cy: 11 }, { id: 7, cx: 310, cy: 8  },
];

function fadeUp(delay: number) {
  return {
    hidden:  { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: duration.slow, ease: ease.smooth, delay } },
  };
}

export function CommunitySection() {
  const { ref: sectionRef, isInView } = useInView<HTMLElement>({
    threshold: 0.1,
    once: true,
  });
  const { ref: visualRef, isInView: visualInView } = useInView<HTMLDivElement>({
    threshold: 0.25,
    once: true,
  });

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--color-bg)",
        paddingTop: 140,
        paddingBottom: 120,
      }}
    >
      <div className="mx-auto max-w-[920px] px-6">
        {/* ── Eyebrow ── */}
        <motion.p
          variants={fadeUp(0)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.16em",
            color: "var(--color-accent)",
            marginBottom: 16,
            textTransform: "uppercase",
          }}
        >
          Your Community, Filtered by Relevance
        </motion.p>

        {/* ── Headline ── */}
        <motion.h2
          variants={fadeUp(0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="font-medium leading-[1.05] tracking-[-0.028em] text-[var(--color-text-primary)]"
          style={{
            fontSize: "clamp(36px, 4.4vw, 56px)",
            marginBottom: 24,
          }}
        >
          Sleep advice is everywhere. Relevance is rare.
        </motion.h2>

        {/* ── Paragraph ── */}
        <motion.p
          variants={fadeUp(0.18)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            fontSize: 18,
            lineHeight: 1.62,
            color: "var(--color-text-secondary)",
            maxWidth: 680,
          }}
        >
          Trune is the only platform that filters peer insight based on shared
          goals, routines, and sleep data.
        </motion.p>

        {/* ── Filter graphic ── */}
        <div
          ref={visualRef}
          style={{ marginTop: 80 }}
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 600 340"
            width="100%"
            style={{ maxWidth: 600, display: "block", margin: "0 auto", overflow: "visible" }}
          >
            {/* Defs: glow filter for filter bar */}
            <defs>
              <filter id="trune-glow" x="-20%" y="-200%" width="140%" height="500%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* ── Cloud of dots ── */}
            {CLOUD_DOTS.map((dot) => (
              <circle
                key={dot.id}
                cx={dot.cx}
                cy={dot.cy}
                r={dot.r}
                fill="#B8B8B0"
                opacity={0.55}
                style={{
                  animation: `trune-drift-${dot.id} ${dot.driftDuration}s ease-in-out ${(dot.id * 0.23) % 3}s infinite alternate`,
                }}
              />
            ))}

            {/* ── Trune filter bar ── */}
            {/* Label above */}
            <text
              x={300}
              y={176}
              textAnchor="middle"
              style={{
                fontSize: 11,
                fill: "var(--color-accent)",
                fontFamily: "var(--font-inter, sans-serif)",
                fontWeight: 500,
                letterSpacing: "0.06em",
              }}
            >
              Trune filter
            </text>

            {/* Bar line */}
            <line
              x1={100}
              y1={186}
              x2={500}
              y2={186}
              stroke="var(--color-accent)"
              strokeWidth={2}
              opacity={0.35}
              filter="url(#trune-glow)"
            />

            {/* ── Cluster of orange dots below filter ── */}
            {CLUSTER_DOTS.map((dot) => (
              <motion.circle
                key={dot.id}
                cx={dot.cx}
                cy={dot.cy + 240}
                r={5}
                fill="var(--color-accent)"
                initial={{ opacity: 0, cy: dot.cy + 186 }}
                animate={
                  visualInView
                    ? { opacity: 0.85, cy: dot.cy + 240 }
                    : { opacity: 0, cy: dot.cy + 186 }
                }
                transition={{
                  duration: 0.55,
                  ease: ease.emphatic,
                  delay: dot.id * 0.07 + 0.3,
                }}
              />
            ))}
          </svg>
        </div>
      </div>

      {/* ── Drift keyframes — generated per dot ── */}
      <style>{`
        ${CLOUD_DOTS.map(
          (dot) => `
          @keyframes trune-drift-${dot.id} {
            0%   { transform: translate(0px, 0px); }
            100% { transform: translate(${dot.driftX.toFixed(1)}px, ${dot.driftY.toFixed(1)}px); }
          }
        `,
        ).join("")}

        @media (prefers-reduced-motion: reduce) {
          ${CLOUD_DOTS.map((dot) => `@keyframes trune-drift-${dot.id} { 0%, 100% {} }`).join("")}
        }
      `}</style>
    </section>
  );
}
