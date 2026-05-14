"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { ease, duration } from "@/lib/motion";
import { HeroVisual } from "@/components/hero/HeroVisual";
import { WaitlistForm } from "@/ui/WaitlistForm";

const HEADLINE = "Find out what actually improves your sleep.";

// Stagger container for each text block
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

// Word-by-word headline
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

// Nav entrance
const navVariant: Variants = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: ease.smooth },
  },
};

export function Hero() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => setReady(true));
  }, []);

  const words = HEADLINE.split(" ");

  return (
    <section
      className="relative flex min-h-[760px] items-center"
      style={{ minHeight: "calc(100svh - 64px)" }}
    >
      {/* Expose nav-entrance trigger via CSS class on body after ready */}
      {ready && (
        <style>{`
          .nav-ready { animation: navFadeIn 0.3s cubic-bezier(0.32,0.72,0,1) forwards; }
          @keyframes navFadeIn {
            from { opacity: 0; transform: translateY(-12px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      )}

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-[54fr_46fr] md:gap-[12%] md:py-24">
        {/* ── Left: text ───────────────────────────────────── */}
        <div className="flex flex-col justify-center">
          {/* Eyebrow */}
          <motion.p
            variants={fadeUp(0.12)}
            initial="hidden"
            animate={ready ? "visible" : "hidden"}
            className="mb-6 text-[12px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: "var(--color-accent)" }}
          >
            Sleep, Personalized
          </motion.p>

          {/* H1 — word-by-word */}
          <motion.h1
            variants={wordContainer}
            initial="hidden"
            animate={ready ? "visible" : "hidden"}
            aria-label={HEADLINE}
            className="mb-7 font-medium leading-[0.98] tracking-[-0.034em] text-[var(--color-text-primary)]"
            style={{
              fontSize: "clamp(44px, 5.6vw, 76px)",
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

          {/* Subhead */}
          <motion.p
            variants={fadeUp(0.52)}
            initial="hidden"
            animate={ready ? "visible" : "hidden"}
            className="mb-9 text-[18px] leading-[1.55] text-[var(--color-text-secondary)]"
            style={{ maxWidth: 500 }}
          >
            Your wearable shows what happened. Trune shows what&apos;s
            working&nbsp;— by running structured experiments on your own sleep
            data, so you finally know what&apos;s worth your time.
          </motion.p>

          {/* CTA form */}
          <motion.div
            variants={fadeUp(0.68)}
            initial="hidden"
            animate={ready ? "visible" : "hidden"}
          >
            <WaitlistForm source="homepage" />
          </motion.div>
        </div>

        {/* ── Right: visual ────────────────────────────────── */}
        <div className="relative hidden md:flex items-start justify-start pt-8">
          {ready && <HeroVisual startDelay={0.32} />}
        </div>
      </div>
    </section>
  );
}
