"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, UserCheck } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { ease, duration } from "@/lib/motion";

const BADGES = [
  { Icon: ShieldCheck, label: "HIPAA-aware infrastructure" },
  { Icon: Lock,        label: "Encrypted at rest and in transit" },
  { Icon: UserCheck,   label: "Your data, your control" },
] as const;

function fadeUp(delay: number) {
  return {
    hidden:  { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: duration.slow, ease: ease.smooth, delay } },
  };
}

export function SecuritySection() {
  const { ref: sectionRef, isInView } = useInView<HTMLElement>({
    threshold: 0.25,
    once: true,
  });

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#FFFFFF",
        paddingTop: 100,
        paddingBottom: 100,
      }}
    >
      <div
        className="mx-auto flex flex-col items-center text-center"
        style={{ maxWidth: 600, paddingLeft: 24, paddingRight: 24 }}
      >
        {/* ── Tagline ── */}
        <motion.p
          variants={fadeUp(0)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="font-medium tracking-[-0.018em] text-[var(--color-text-primary)]"
          style={{
            fontSize: "clamp(24px, 2.8vw, 32px)",
            marginBottom: 20,
          }}
        >
          Built secure. Kept private. Always yours.
        </motion.p>

        {/* ── Trust badges ── */}
        <motion.div
          variants={fadeUp(0.14)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-wrap items-center justify-center gap-8"
        >
          {BADGES.map(({ Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2"
            >
              <Icon
                size={18}
                color="var(--color-text-secondary)"
                aria-hidden="true"
              />
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--color-text-secondary)",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
