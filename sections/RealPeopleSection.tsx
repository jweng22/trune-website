"use client";

import { motion, Variants } from "framer-motion";
import { CellNetwork } from "@/components/realPeople/CellNetwork";
import { AnimatedStat } from "@/components/realPeople/AnimatedStat";
import { useInView } from "@/hooks/useInView";
import { ease } from "@/lib/motion";

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

export function RealPeopleSection() {
  const { ref: headRef, isInView: headInView } = useInView<HTMLHeadingElement>({
    threshold: 0.3,
    once: true,
  });
  const { ref: statsRef, isInView: statsInView } = useInView<HTMLDivElement>({
    threshold: 0.3,
    once: true,
  });

  return (
    <section
      className="overflow-hidden bg-white"
      style={{ paddingTop: 180, paddingBottom: 160 }}
    >
      <div className="mx-auto max-w-[1180px] px-6">
        {/* Headline */}
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
      </div>
    </section>
  );
}
