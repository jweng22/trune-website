"use client";

import { motion, Variants } from "framer-motion";
import { CellNetwork } from "@/components/realPeople/CellNetwork";
import { AnimatedStat } from "@/components/realPeople/AnimatedStat";
import { useInView } from "@/hooks/useInView";
import { ease, duration } from "@/lib/motion";

const HEADLINE_WORDS = ["Real", "people", "are", "not", "averages."];

const wordContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const wordItem: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: ease.emphatic },
  },
};

function fadeUp(d: number): Variants {
  return {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: ease.smooth, delay: d },
    },
  };
}

export function RealPeopleSection() {
  const { ref: headRef, isInView: headInView } = useInView<HTMLHeadingElement>({
    threshold: 0.3,
    once: true,
  });
  const { ref: statsRef, isInView: statsInView } = useInView<HTMLDivElement>({
    threshold: 0.3,
    once: true,
  });
  const { ref: subRef, isInView: subInView } = useInView<HTMLDivElement>({
    threshold: 0.3,
    once: true,
  });

  return (
    <section
      className="overflow-hidden bg-white"
      style={{ paddingTop: 180, paddingBottom: 160 }}
    >
      <div className="mx-auto max-w-[1180px] px-6">
        {/* Headline — word-by-word */}
        <motion.h2
          ref={headRef}
          variants={wordContainer}
          initial="hidden"
          animate={headInView ? "visible" : "hidden"}
          aria-label="Real people are not averages."
          className="text-center font-medium leading-[0.94] tracking-[-0.04em]"
          style={{ fontSize: "clamp(64px, 9vw, 132px)" }}
        >
          {HEADLINE_WORDS.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block will-change-transform"
              style={{
                marginRight: "0.2em",
                color:
                  word === "averages."
                    ? "var(--color-accent)"
                    : "var(--color-text-primary)",
              }}
              variants={wordItem}
            >
              {word}
            </motion.span>
          ))}
        </motion.h2>

        {/* Cell network */}
        <div className="mt-24 flex justify-center">
          <CellNetwork />
        </div>

        {/* Stats row */}
        <div
          ref={statsRef}
          className="mx-auto mt-20 grid max-w-[800px] grid-cols-3 gap-16 text-center"
        >
          {statsInView && (
            <>
              <AnimatedStat value={37} suffix="T" caption="cells in your body" delay={0} />
              <AnimatedStat value={11} caption="interacting systems" delay={0} />
              <AnimatedStat value={1} caption="of you" hold delay={0} />
            </>
          )}
        </div>

        {/* Sub-copy */}
        <div ref={subRef} className="mx-auto mt-24 max-w-[720px] text-center">
          <motion.h3
            variants={wordContainer}
            initial="hidden"
            animate={subInView ? "visible" : "hidden"}
            className="mb-5 text-[24px] font-medium tracking-[-0.01em] text-[var(--color-text-primary)]"
          >
            {["Density.", "Interconnection.", "Uniqueness."].map((word, i) => (
              <motion.span
                key={i}
                className="inline-block will-change-transform"
                style={{ marginRight: "0.3em" }}
                variants={wordItem}
              >
                {word}
              </motion.span>
            ))}
          </motion.h3>
          <motion.p
            variants={fadeUp(0.3)}
            initial="hidden"
            animate={subInView ? "visible" : "hidden"}
            className="text-[18px] leading-[1.62] text-[var(--color-text-secondary)]"
          >
            Your body is a system of systems&nbsp;— not a number, not an
            average, not a generic protocol. Trune treats it that way. We model
            your sleep against the version of you that is alive right now: your
            physiology, your habits, your environment. Every recommendation
            flows from that.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
