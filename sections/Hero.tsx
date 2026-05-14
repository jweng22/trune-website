"use client";

import { useEffect, useState, useRef } from "react";
import { motion, Variants } from "framer-motion";
import { ease } from "@/lib/motion";
import { HeroVisual } from "@/components/hero/HeroVisual";
import { WaitlistModal } from "@/ui/WaitlistModal";
import { useCursorProximity } from "@/hooks/useCursorProximity";

const HEADLINE = "Find out what actually improves your sleep";

function fadeUp(delay: number): Variants {
  return {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: ease.smooth, delay },
    },
  };
}

const wordContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.18 },
  },
};

const wordItem: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: ease.emphatic },
  },
};

export function Hero() {
  const [ready, setReady] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const { x: btnX, y: btnY } = useCursorProximity(btnRef);

  useEffect(() => {
    document.fonts.ready.then(() => setReady(true));
  }, []);

  const words = HEADLINE.split(" ");

  return (
    <>
      <WaitlistModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        source="homepage-hero"
      />

      <section
        className="relative flex min-h-[760px] items-center"
        style={{
          background: "#F6F7FB",
          minHeight: "calc(100svh - 64px)",
        }}
      >
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-[54fr_46fr] md:gap-[12%] md:py-24">
          {/* Left: text */}
          <div className="flex flex-col justify-center">
            {/* H1 — word-by-word reveal */}
            <motion.h1
              variants={wordContainer}
              initial="hidden"
              animate={ready ? "visible" : "hidden"}
              aria-label={HEADLINE}
              className="mb-7 font-medium text-[var(--color-text-primary)]"
              style={{
                fontSize: "clamp(44px, 5.6vw, 76px)",
                lineHeight: 0.98,
                letterSpacing: "-0.034em",
                maxWidth: 640,
              }}
            >
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block will-change-transform"
                  style={{ marginRight: "0.25em" }}
                  variants={wordItem}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Subhead — exact copy with curly quotes */}
            <motion.p
              variants={fadeUp(0.52)}
              initial="hidden"
              animate={ready ? "visible" : "hidden"}
              className="text-[18px] leading-[1.55] text-[var(--color-text-secondary)]"
              style={{ maxWidth: 500, marginBottom: 36 }}
            >
              Your wearable shows your data. Trune answers the &ldquo;so
              what&rdquo;, turning your data into action so you can learn what
              works for your body.
            </motion.p>

            {/* CTA button */}
            <motion.div
              variants={fadeUp(0.68)}
              initial="hidden"
              animate={ready ? "visible" : "hidden"}
            >
              <motion.button
                ref={btnRef}
                onClick={() => setModalOpen(true)}
                style={{ x: btnX, y: btnY }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.22, ease: ease.smooth }}
                className={[
                  "h-12 rounded-[999px] bg-[var(--color-text-primary)]",
                  "px-7 text-[15px] font-medium text-[var(--color-bg)]",
                  "transition-colors duration-200 hover:bg-[var(--color-accent)]",
                ].join(" ")}
              >
                Join Waitlist
              </motion.button>
              <p
                className="mt-[14px] text-[13px] text-[var(--color-text-tertiary)]"
              >
                Limited beta access for early users.
              </p>
            </motion.div>
          </div>

          {/* Right: visual */}
          <div className="relative hidden items-start justify-start pt-8 md:flex">
            {ready && <HeroVisual startDelay={0.32} />}
          </div>
        </div>
      </section>
    </>
  );
}
