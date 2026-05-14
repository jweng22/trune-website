"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { ease } from "@/lib/motion";
import { WaitlistModal } from "@/ui/WaitlistModal";

function fadeUp(delay = 0): Variants {
  return {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: ease.smooth, delay },
    },
  };
}

const BODY_STYLE: React.CSSProperties = {
  fontSize: 18,
  lineHeight: 1.7,
  color: "#2A2A2A",
  marginBottom: 28,
};

export default function AboutPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { ref: headerRef, isInView: headerInView } = useInView<HTMLDivElement>({
    threshold: 0.2,
    once: true,
  });
  const { ref: bodyRef, isInView: bodyInView } = useInView<HTMLDivElement>({
    threshold: 0.1,
    once: true,
  });
  const { ref: ctaRef, isInView: ctaInView } = useInView<HTMLDivElement>({
    threshold: 0.3,
    once: true,
  });

  return (
    <>
      <WaitlistModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        source="about-page"
      />

      <div
        style={{ background: "var(--color-bg)", minHeight: "100vh" }}
        className="pb-40"
      >
        <div className="mx-auto max-w-[720px] px-6" style={{ paddingTop: 140 }}>
          {/* H1 */}
          <motion.h1
            ref={headerRef}
            variants={fadeUp(0)}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            className="font-medium text-[var(--color-text-primary)]"
            style={{
              fontSize: "clamp(32px, 3.8vw, 48px)",
              lineHeight: 1.18,
              letterSpacing: "-0.022em",
              marginBottom: 60,
            }}
          >
            We&apos;re on a mission to help people find the highest-value health
            actions that fit within the constraints of their daily lives.
          </motion.h1>

          {/* Body — founder letter */}
          <motion.div
            ref={bodyRef}
            variants={fadeUp(0)}
            initial="hidden"
            animate={bodyInView ? "visible" : "hidden"}
          >
            <p style={BODY_STYLE}>
              I&apos;ve been using wearables for years, going back to some of
              the earliest devices. I started with off-brand wearables in grade
              school, long before today&apos;s devices became mainstream. Since
              then, wearables have evolved dramatically — now tracking more
              health signals than ever, with impressive accuracy.
            </p>

            <p style={BODY_STYLE}>
              But even with all that data, I kept coming back to the same
              question:
            </p>

            {/* Pull-quote 1 */}
            <p
              className="text-center italic"
              style={{
                fontSize: 36,
                fontWeight: 500,
                color: "#F65A1B",
                margin: "40px 0",
                lineHeight: 1.2,
              }}
            >
              So what?
            </p>

            <p style={BODY_STYLE}>
              That question became especially real for me last year, when the
              stress of a demanding job triggered a period of insomnia. I found
              myself searching everywhere for answers — Reddit threads, books,
              podcasts, supplement recommendations, copying friends&apos;
              routines. Some of the advice sounded convincing. Some of it worked
              for other people. I tried a lot of it.
            </p>

            <p style={BODY_STYLE}>
              But almost none of it answered the question that actually
              mattered:
            </p>

            {/* Pull-quote 2 */}
            <p
              className="italic"
              style={{
                fontSize: 24,
                fontWeight: 500,
                color: "var(--color-text-primary)",
                margin: "36px 0",
                maxWidth: 640,
                lineHeight: 1.45,
              }}
            >
              Will this work for me, given my body, my routine, and the amount
              of effort I can realistically sustain?
            </p>

            <p style={BODY_STYLE}>
              Most people do not struggle because they lack information. They
              struggle because information is hard to turn into action, and
              action is hard to sustain when you do not know whether it is
              working.
            </p>

            <p style={BODY_STYLE}>We&apos;re trying to fix that.</p>

            <p style={BODY_STYLE}>
              We built Trune around a simple belief: the best health action
              isn&apos;t always the one with the strongest theoretical benefit.
              It&apos;s the one that creates the most meaningful improvement for
              the effort you can actually sustain.
            </p>

            <p style={BODY_STYLE}>
              Trune is not another app that gives you more data, another score,
              or another list of generic health suggestions. It is designed to
              help you learn what works for your body — by turning existing data
              into action and measuring the effect of each change you try.
              Through structured protocols that fit into your life, Trune helps
              small, realistic steps compound over time.
            </p>

            <p style={BODY_STYLE}>
              So that&apos;s Trune. We are still in the first chapter, and
              there is a lot more to build. We are looking for early adopters
              who want to help shape a more practical, personalized way to
              improve their sleep. If that sounds like you, join the beta and
              tell us what you think.
            </p>

            <p
              style={{
                fontSize: 18,
                lineHeight: 1.7,
                color: "var(--color-text-secondary)",
                fontWeight: 500,
                marginTop: 56,
              }}
            >
              — The Co-founders of Trune
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            ref={ctaRef}
            variants={fadeUp()}
            initial="hidden"
            animate={ctaInView ? "visible" : "hidden"}
            style={{ marginTop: 80 }}
          >
            <button
              onClick={() => setModalOpen(true)}
              className={[
                "h-12 rounded-[999px] bg-[var(--color-text-primary)]",
                "px-7 text-[15px] font-medium text-[var(--color-bg)]",
                "transition-colors duration-200 hover:bg-[var(--color-accent)]",
              ].join(" ")}
            >
              Join Waitlist
            </button>
          </motion.div>
        </div>
      </div>
    </>
  );
}
