"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { ease, duration } from "@/lib/motion";

function fadeUp(delay: number) {
  return {
    hidden:  { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: duration.slow, ease: ease.smooth, delay } },
  };
}

// Concentric ring data
const RINGS = [
  { radius: 40,  label: "Cycle 1: baseline",           delay: 0    },
  { radius: 72,  label: "Cycle 2: response patterns",  delay: 0.18 },
  { radius: 104, label: "Cycle 3: personalized model", delay: 0.36 },
] as const;

export function BuiltToLearnSection() {
  const { ref: sectionRef, isInView } = useInView<HTMLElement>({
    threshold: 0.15,
    once: true,
  });
  const { ref: visualRef, isInView: visualInView } = useInView<HTMLDivElement>({
    threshold: 0.3,
    once: true,
  });

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#FFFFFF",
        paddingTop: 140,
        paddingBottom: 120,
      }}
    >
      <div className="mx-auto max-w-[920px] px-6">
        {/* ── Headline ── */}
        <motion.h2
          variants={fadeUp(0)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="font-medium leading-[1.05] tracking-[-0.028em] text-[var(--color-text-primary)]"
          style={{
            fontSize: "clamp(36px, 4.4vw, 56px)",
            marginBottom: 24,
          }}
        >
          Built to learn you
        </motion.h2>

        {/* ── Primary paragraph ── */}
        <motion.p
          variants={fadeUp(0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            fontSize: 18,
            lineHeight: 1.62,
            color: "var(--color-text-secondary)",
            maxWidth: 680,
            marginBottom: 16,
          }}
        >
          Every completed protocol helps Trune understand how your body responds,
          so each future recommendation becomes more personal.
        </motion.p>

        {/* ── Tagline ── */}
        <motion.p
          variants={fadeUp(0.18)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            fontSize: 18,
            lineHeight: 1.6,
            color: "var(--color-text-primary)",
            fontWeight: 500,
            maxWidth: 680,
          }}
        >
          The more you use Trune, the better your experience becomes.
        </motion.p>

        {/* ── Growing rings visual ── */}
        <div
          ref={visualRef}
          style={{ marginTop: 60, display: "flex", justifyContent: "flex-start" }}
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 480 240"
            width={480}
            height={240}
            style={{ overflow: "visible" }}
          >
            {/* Center dot */}
            <circle cx={120} cy={120} r={5} fill="var(--color-accent)" opacity={0.7} />

            {RINGS.map(({ radius, label, delay }) => (
              <g key={label}>
                {/* Ring — scale 0 → 1 on inView */}
                <motion.circle
                  cx={120}
                  cy={120}
                  r={radius}
                  fill="none"
                  stroke="var(--color-border)"
                  strokeWidth={1}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={
                    visualInView
                      ? { scale: 1, opacity: 1 }
                      : { scale: 0, opacity: 0 }
                  }
                  transition={{
                    duration: duration.slow,
                    ease: ease.emphatic,
                    delay,
                  }}
                  style={{ transformOrigin: "120px 120px" }}
                />

                {/* Label at the right edge of the ring */}
                <motion.text
                  x={120 + radius + 10}
                  y={120}
                  dominantBaseline="middle"
                  initial={{ opacity: 0, x: 120 + radius }}
                  animate={
                    visualInView
                      ? { opacity: 1, x: 120 + radius + 10 }
                      : { opacity: 0, x: 120 + radius }
                  }
                  transition={{
                    duration: duration.base,
                    ease: ease.smooth,
                    delay: delay + 0.2,
                  }}
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    fill: "var(--color-text-tertiary)",
                    fontFamily: "var(--font-inter, sans-serif)",
                  }}
                >
                  {label}
                </motion.text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}
