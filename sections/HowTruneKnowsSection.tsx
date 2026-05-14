"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { ease, duration } from "@/lib/motion";

function fadeUp(delay: number) {
  return {
    hidden:  { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: duration.slow, ease: ease.smooth, delay } },
  };
}

export function HowTruneKnowsSection() {
  const { ref: sectionRef, isInView } = useInView<HTMLElement>({
    threshold: 0.15,
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
        {/* ── Headline ── */}
        <motion.h2
          variants={fadeUp(0)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="font-medium leading-[1.05] tracking-[-0.028em] text-[var(--color-text-primary)]"
          style={{
            fontSize: "clamp(36px, 4.4vw, 56px)",
            marginBottom: 28,
          }}
        >
          How Trune knows it works
        </motion.h2>

        {/* ── Paragraph ── */}
        <motion.p
          variants={fadeUp(0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            fontSize: 18,
            lineHeight: 1.62,
            color: "var(--color-text-secondary)",
            marginBottom: 32,
          }}
        >
          Trune turns sleep protocols into structured experiments using the same
          N-of-1 approach used in clinical research. Each result is compared
          against your baseline, evaluated over time, and analyzed alongside the
          context that may have influenced your sleep before Trune surfaces a
          conclusion.
        </motion.p>

        {/* ── CTA link ── */}
        <motion.div
          variants={fadeUp(0.2)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Link href="/methodology" className="trune-outline-btn">
            Read the full methodology&nbsp;&rarr;
          </Link>
        </motion.div>

        {/* ── Credibility block ── */}
        <motion.div
          variants={fadeUp(0.3)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ marginTop: 60 }}
        >
          {/* TODO: Replace with real Hopkins Entrepreneur Center logo + verify credibility statement with Hopkins. */}
          <p
            style={{
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.08em",
              color: "var(--color-text-tertiary)",
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            Methodology built with
          </p>
          <p
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "var(--color-text-secondary)",
            }}
          >
            Johns Hopkins Entrepreneur Center
          </p>
        </motion.div>
      </div>

      {/* ── Button styles ── */}
      <style>{`
        .trune-outline-btn {
          display: inline-flex;
          align-items: center;
          padding: 12px 24px;
          border: 1px solid var(--color-text-primary);
          background: transparent;
          color: var(--color-text-primary);
          border-radius: var(--radius-pill, 999px);
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          transition: background 220ms ease, color 220ms ease;
        }

        .trune-outline-btn:hover {
          background: var(--color-text-primary);
          color: var(--color-bg);
        }

        .trune-outline-btn:hover .trune-arrow {
          transform: translateX(4px);
        }

        @media (prefers-reduced-motion: reduce) {
          .trune-outline-btn {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
