"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useCursorProximity } from "@/hooks/useCursorProximity";
import { WaitlistModal } from "@/ui/WaitlistModal";
import { ease, duration as dur } from "@/lib/motion";

export function FinalCTASection() {
  const [modalOpen, setModalOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const { x: btnX, y: btnY } = useCursorProximity(btnRef);

  const { ref: headingRef, isInView: headingInView } =
    useInView<HTMLHeadingElement>({ threshold: 0.4, once: true });

  const { ref: bodyRef, isInView: bodyInView } =
    useInView<HTMLParagraphElement>({ threshold: 0.4, once: true });

  const { ref: ctaRef, isInView: ctaInView } =
    useInView<HTMLDivElement>({ threshold: 0.4, once: true });

  return (
    <>
      <WaitlistModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        source="homepage-final-cta"
      />

      <section
        id="waitlist"
        className="flex flex-col items-center text-center"
        style={{
          backgroundColor: "#F6F7FB",
          paddingTop: 160,
          paddingBottom: 160,
          paddingLeft: 24,
          paddingRight: 24,
        }}
      >
        <div style={{ maxWidth: 760, width: "100%" }}>
          {/* Heading */}
          <motion.h2
            ref={headingRef}
            initial={{ opacity: 0, y: 20 }}
            animate={
              headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: dur.slow, ease: ease.emphatic }}
            className="font-medium text-[var(--color-text-primary)]"
            style={{
              fontSize: "clamp(48px, 6vw, 80px)",
              lineHeight: 1.0,
              letterSpacing: "-0.034em",
              marginBottom: 24,
            }}
          >
            Be One of the First
          </motion.h2>

          {/* Paragraph */}
          <motion.p
            ref={bodyRef}
            initial={{ opacity: 0, y: 16 }}
            animate={
              bodyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
            }
            transition={{ duration: dur.slow, ease: ease.emphatic, delay: 0.1 }}
            className="text-[19px] leading-[1.55] text-[var(--color-text-secondary)]"
            style={{
              maxWidth: 600,
              marginBottom: 40,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Trune is opening limited beta access to a select group of early
            users. Apply to join and be among the first to experience a more
            personalized way to improve sleep.
          </motion.p>

          {/* CTA */}
          <motion.div
            ref={ctaRef}
            initial={{ opacity: 0, y: 12 }}
            animate={
              ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
            }
            transition={{ duration: dur.slow, ease: ease.emphatic, delay: 0.2 }}
          >
            <motion.button
              ref={btnRef}
              onClick={() => setModalOpen(true)}
              style={{ x: btnX, y: btnY }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.22, ease: ease.smooth }}
              className={[
                "h-12 cursor-pointer rounded-[999px] bg-[var(--color-text-primary)]",
                "px-7 text-[15px] font-medium text-white",
                "transition-colors duration-200 hover:bg-[var(--color-accent)]",
              ].join(" ")}
            >
              Join Waitlist
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
