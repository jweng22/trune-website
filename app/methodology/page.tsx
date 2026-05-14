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

function Block({
  children,
  last = false,
}: {
  children: React.ReactNode;
  last?: boolean;
}) {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.25, once: true });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp()}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="mx-auto max-w-[720px]"
      style={{
        paddingTop: 60,
        paddingBottom: 60,
        borderBottom: last ? "none" : "0.5px solid var(--color-border)",
      }}
    >
      {children}
    </motion.div>
  );
}

const H2_STYLE = {
  fontSize: 28,
  fontWeight: 500,
  lineHeight: 1.3,
  color: "var(--color-text-primary)",
  marginBottom: 24,
  letterSpacing: "-0.018em",
} as const;

const BODY_STYLE = {
  fontSize: 17,
  lineHeight: 1.62,
  color: "var(--color-text-secondary)",
} as const;

export default function MethodologyPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { ref: headerRef, isInView: headerInView } = useInView<HTMLDivElement>({
    threshold: 0.2,
    once: true,
  });

  return (
    <>
      <WaitlistModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        source="methodology-page"
      />

      <div style={{ background: "var(--color-bg)", minHeight: "100vh" }}>
        {/* Page header */}
        <div
          ref={headerRef}
          className="mx-auto max-w-[920px] px-6"
          style={{ paddingTop: 140 }}
        >
          <motion.p
            variants={fadeUp(0)}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            className="mb-5 text-[12px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: "#F65A1B" }}
          >
            Our Methodology
          </motion.p>
          <motion.h1
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            className="font-medium text-[var(--color-text-primary)]"
            style={{
              fontSize: "clamp(48px, 6vw, 84px)",
              lineHeight: 0.98,
              letterSpacing: "-0.034em",
              marginBottom: 32,
            }}
          >
            How Trune turns sleep changes into evidence.
          </motion.h1>
        </div>

        {/* Content blocks */}
        <div className="px-6 pb-0">
          {/* Block 1 */}
          <Block>
            <h2 style={H2_STYLE}>
              A different use case requires a different design
            </h2>
            <div className="flex flex-col gap-3">
              {[
                { tool: "Wearables", answer: "What happened?", highlight: false },
                { tool: "Advice", answer: "What could you do next?", highlight: false },
                { tool: "Habit-trackers", answer: "What did you try?", highlight: false },
                {
                  tool: "Trune",
                  answer: "Did this specific change actually improve your sleep?",
                  highlight: true,
                },
              ].map(({ tool, answer, highlight }) => (
                <div
                  key={tool}
                  className="flex items-start gap-4 rounded-xl px-4 py-3"
                  style={{
                    background: highlight ? "#FFF8F5" : "transparent",
                    borderLeft: `2px solid ${highlight ? "#F65A1B" : "var(--color-border)"}`,
                  }}
                >
                  <span
                    style={{
                      ...BODY_STYLE,
                      fontWeight: highlight ? 500 : 400,
                      color: highlight ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                      minWidth: 120,
                      flexShrink: 0,
                    }}
                  >
                    {tool}
                  </span>
                  <span
                    style={{
                      ...BODY_STYLE,
                      fontWeight: highlight ? 500 : 400,
                      color: highlight ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                    }}
                  >
                    was designed to answer: <em>{answer}</em>
                  </span>
                </div>
              ))}
            </div>
          </Block>

          {/* Block 2 */}
          <Block>
            <h2 style={H2_STYLE}>
              Clinical structure. Intelligent attribution. Personal evidence.
            </h2>
            <div className="flex flex-col gap-8">
              {[
                {
                  n: "1",
                  heading: "Clinical structure",
                  body: "Trune structures each protocol using the N-of-1 experiment methodology. Before the protocol begins, Trune establishes your personal baseline, defines the change being tested, sets how long the protocol will run, and selects which sleep metrics to measure based on the protocol. This structure creates a cleaner foundation for evaluating the result.",
                },
                {
                  n: "2",
                  heading: "Intelligent attribution",
                  body: "Sleep is affected by more than one variable at once. Trune looks at each protocol alongside relevant context, including adherence, timing, activity, schedule changes, stress, and other factors that may have shaped the result. This helps separate stronger signals from noise before drawing a conclusion.",
                },
                {
                  n: "3",
                  heading: "Personal evidence",
                  body: "Trune does not measure your results against a generic score or population average. Our engine processes your raw sleep data and evaluates it against your baseline, so each conclusion is tied to the actual sleep outcomes the protocol was designed to improve.",
                },
              ].map(({ n, heading, body }) => (
                <div key={n} className="flex gap-5">
                  <div
                    className="flex-shrink-0 rounded-full text-center text-[12px] font-semibold"
                    style={{
                      width: 24,
                      height: 24,
                      background: "#F65A1B",
                      color: "#FAFAF7",
                      lineHeight: "24px",
                      marginTop: 2,
                    }}
                  >
                    {n}
                  </div>
                  <div>
                    <p
                      className="mb-2 font-medium text-[var(--color-text-primary)]"
                      style={{ fontSize: 17 }}
                    >
                      {heading}
                    </p>
                    <p style={BODY_STYLE}>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Block>

          {/* Block 3 */}
          <Block>
            <h2 style={H2_STYLE}>When a result is ready</h2>
            <p style={BODY_STYLE}>
              Trune does not treat one better night as proof. A result is surfaced only when there is enough adherence, enough outcome data, and enough consistency to support a conclusion. Until then, the system continues collecting signal.
            </p>
          </Block>

          {/* Block 4 */}
          <Block>
            <h2 style={H2_STYLE}>How results compound</h2>
            <p style={BODY_STYLE}>
              Once a result is ready, Trune stores it as part of your protocol history. Each result records what was tested, whether it was followed, which outcomes moved, and how strong the signal was. Over time, those results give Trune a clearer understanding of what works for your body and how to guide future recommendations.
            </p>
          </Block>

          {/* Block 5 */}
          <Block last>
            <h2 style={H2_STYLE}>What Trune does not claim</h2>
            <p style={BODY_STYLE}>
              Trune does not diagnose sleep disorders, replace medical care, or claim that every protocol will work for every person. It is designed to help users run structured personal experiments and make better decisions from their own data.
            </p>
          </Block>
        </div>

        {/* Final CTA */}
        <MethodologyCTA onOpen={() => setModalOpen(true)} />
      </div>
    </>
  );
}

function MethodologyCTA({ onOpen }: { onOpen: () => void }) {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.3, once: true });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp()}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="mx-auto max-w-[720px] px-6 text-center"
      style={{ paddingTop: 120, paddingBottom: 160 }}
    >
      <p
        className="mb-8 text-[17px] text-[var(--color-text-secondary)]"
        style={{ lineHeight: 1.6 }}
      >
        Ready to learn what works for your body?
      </p>
      <button
        onClick={onOpen}
        className={[
          "h-12 rounded-[999px] bg-[var(--color-text-primary)]",
          "px-7 text-[15px] font-medium text-[var(--color-bg)]",
          "transition-colors duration-200 hover:bg-[var(--color-accent)]",
        ].join(" ")}
      >
        Join Waitlist
      </button>
    </motion.div>
  );
}
