"use client";

import { motion, Variants } from "framer-motion";
import { ShineReveal } from "@/ui/ShineReveal";
import { useInView } from "@/hooks/useInView";
import { ease, duration } from "@/lib/motion";

const HEADLINE =
  "Sleep Advice is everywhere. What works for your body is not.";

const P1 =
  "Everyone is trying to help you interpret your data. Reddit, YouTube, wearable coaching tabs, and peers all offer a different “right answer.” But most advice does not account for your physiology, routine, goals, or how your body actually responds.";

const P2 =
  "Optimal sleep looks different for everyone. The same protocol that helps one person fall asleep faster may do nothing for someone else. What matters is finding what works for your body, within the constraints of your daily life.";

function fadeUp(delay: number): Variants {
  return {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: ease.smooth, delay },
    },
  };
}

const cardVariant: Variants = {
  hidden: { opacity: 0, x: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: duration.slow, ease: ease.emphatic },
  },
};

function bellPath(cx: number, amplitude: number, sigma: number, pts = 80): string {
  return Array.from({ length: pts }, (_, i) => {
    const x = (i / (pts - 1)) * 260;
    const t = (x - cx) / sigma;
    const y = 60 - amplitude * Math.exp(-0.5 * t * t);
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
}

const popPath = bellPath(100, 40, 28);
const youPath = bellPath(160, 46, 22);

export function SleepAdviceSection() {
  const { ref: sectionRef, isInView } = useInView<HTMLElement>({
    threshold: 0.1,
    once: true,
  });
  const { ref: p2Ref, isInView: p2InView } = useInView<HTMLParagraphElement>({
    threshold: 0.5,
    once: true,
  });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: "var(--color-bg)",
        paddingTop: 160,
        paddingBottom: 120,
        boxShadow: "inset 0 20px 40px -20px rgba(0,0,0,0.03)",
      }}
    >
      <div className="mx-auto max-w-[980px] px-6 text-center">
        <ShineReveal className="mx-auto" duration={1.8} delay={0.1}>
          <h2
            className="font-medium leading-[1.04] tracking-[-0.028em]"
            style={{
              fontSize: "clamp(40px, 5vw, 64px)",
              maxWidth: 980,
            }}
          >
            {HEADLINE}
          </h2>
        </ShineReveal>
      </div>

      {/* Two-column block */}
      <div className="mx-auto mt-36 grid max-w-[1100px] grid-cols-1 gap-16 px-6 md:grid-cols-[52fr_44fr] md:gap-12">
        {/* Left: paragraphs */}
        <div className="flex flex-col gap-8">
          <motion.p
            variants={fadeUp(0)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-[18px] leading-[1.6] text-[var(--color-text-secondary)]"
          >
            {P1}
          </motion.p>

          <motion.p
            ref={p2Ref}
            variants={fadeUp(0.48)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-[18px] leading-[1.6] text-[var(--color-text-secondary)]"
          >
            {P2}
          </motion.p>
        </div>

        {/* Right: personalization card */}
        <motion.div
          variants={cardVariant}
          initial="hidden"
          animate={p2InView ? "visible" : "hidden"}
          className="self-center rounded-2xl bg-white p-6"
          style={{
            boxShadow:
              "0 1px 2px rgba(0,0,0,.04), 0 12px 32px rgba(0,0,0,.06), inset 0 0 0 0.5px rgba(0,0,0,.04)",
          }}
        >
          <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--color-text-tertiary)]">
            Your sleep response, modeled
          </p>

          <svg width="260" height="80" viewBox="0 0 260 80" overflow="visible">
            <motion.path
              d={popPath}
              fill="none"
              stroke="#B8B8B0"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={p2InView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1.2, ease: ease.emphatic }}
            />
            <motion.path
              d={youPath}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={p2InView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: ease.emphatic }}
            />
          </svg>

          <div className="mt-3 flex items-center justify-between text-[11px]">
            <span style={{ color: "#B8B8B0" }}>Population average</span>
            <span className="font-medium" style={{ color: "var(--color-accent)" }}>
              You
            </span>
          </div>

          <p className="mt-4 text-[13px] leading-[1.5] text-[var(--color-text-secondary)]">
            Your physiology, your routine, your context&nbsp;— modeled in your
            own data.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
