"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { ease } from "@/lib/motion";

const TESTIMONIALS = [
  {
    title: "After years of bad sleep",
    body: "After years of bad sleep, I was exhausted and honestly pretty hopeless that anything would help. Trune was the first thing that made me feel like I could cut through the internet noise and figure out what actually worked for me. My sleep is the best it's ever been, and I finally have energy again.",
  },
  {
    title: "My wearable wasn't helping",
    body: "My wearable kept telling me my sleep score was bad, but that was about it, and after a while, that got really frustrating. Trune was the first product that helped me move from “something is wrong” to “here’s what to test” and what actually seems to be helping.",
  },
  {
    title: "Everyone had a different answer",
    body: "I had already read Reddit threads, listened to podcasts, and bought supplements people swore by. Trune was the first thing that helped me stop chasing random advice and focus on what might actually make sense for my body.",
  },
  {
    title: "Way less work than I expected",
    body: "What surprised me most is how little work it takes. I didn't want another app where I had to log everything manually. The daily check-in takes almost no time, and the rest happens in the background.",
  },
  {
    title: "This actually feels personal",
    body: "Most sleep advice feels like it was written for a generic person. Trune feels different. It actually starts to feel like the app is learning how my body responds, not just giving me the same list everyone else gets.",
  },
  {
    title: "I stopped guessing",
    body: "Before Trune, I was constantly changing things and hoping I'd feel better. Now I can actually see which changes seem to matter and which ones are probably just noise.",
  },
  {
    title: "I felt like nothing would work",
    body: "I had sleep problems for the last five years and got to the point where I felt like nothing was going to work. Trune helped me stop guessing and finally identify the changes that were actually making a difference.",
  },
  {
    title: "More useful than random advice",
    body: "I like that the peer insight doesn't just feel like random internet opinions. Seeing what people with similar routines and sleep patterns are trying is way more useful than reading generic advice from strangers.",
  },
];

function StarRow() {
  return (
    <div className="mb-4 flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#F65A1B">
          <path d="M7 1l1.545 3.13L12 4.635l-2.5 2.437.59 3.44L7 8.83l-3.09 1.682.59-3.44L2 4.635l3.455-.505z" />
        </svg>
      ))}
    </div>
  );
}

interface CardProps {
  title: string;
  body: string;
  visible: boolean;
  delay: number;
}

function TestimonialCard({ title, body, visible, delay }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.5, ease: ease.emphatic, delay }}
      className="flex h-full min-h-[280px] flex-col rounded-2xl bg-white p-7"
      style={{
        border: "0.5px solid var(--color-border)",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04)",
      }}
    >
      <StarRow />
      <p className="mb-3 text-[16px] font-medium text-[var(--color-text-primary)]">
        {title}
      </p>
      <p className="flex-1 text-[15px] leading-[1.55] text-[var(--color-text-secondary)]">
        {body}
      </p>
      <p className="mt-5 text-[12px] text-[var(--color-text-tertiary)]">
        Early Trune beta tester
      </p>
    </motion.div>
  );
}

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { ref: sectionRef, isInView } = useInView<HTMLElement>({
    threshold: 0.1,
    once: true,
  });

  const total = TESTIMONIALS.length;
  const DESKTOP_VISIBLE = 3;

  const advance = useCallback(() => {
    setActiveIndex((i) => (i + 1) % total);
  }, [total]);

  const retreat = useCallback(() => {
    setActiveIndex((i) => (i - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(advance, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused, advance]);

  function handleDragEnd(dx: number) {
    if (Math.abs(dx) < 30) return;
    if (dx < 0) advance();
    else retreat();
    setDragStart(null);
  }

  // Which 3 cards to show on desktop
  function visibleIndices(): number[] {
    return [
      activeIndex % total,
      (activeIndex + 1) % total,
      (activeIndex + 2) % total,
    ];
  }

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-white"
      style={{ paddingTop: 140, paddingBottom: 120 }}
    >
      <div className="mx-auto max-w-[1180px] px-6">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: ease.smooth }}
          className="mb-8 text-center text-[12px] font-semibold uppercase tracking-[0.16em]"
          style={{ color: "#F65A1B" }}
        >
          What our early users are saying
        </motion.p>

        {/* Desktop carousel: 3 visible */}
        <div
          className="hidden gap-6 md:grid"
          style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {visibleIndices().map((idx, i) => (
            <TestimonialCard
              key={`${activeIndex}-${i}`}
              title={TESTIMONIALS[idx].title}
              body={TESTIMONIALS[idx].body}
              visible={isInView}
              delay={i * 0.06}
            />
          ))}
        </div>

        {/* Mobile carousel: 1 visible */}
        <div
          className="block md:hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onMouseDown={(e) => setDragStart(e.clientX)}
          onMouseUp={(e) => {
            if (dragStart !== null) handleDragEnd(e.clientX - dragStart);
          }}
          onTouchStart={(e) => setDragStart(e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (dragStart !== null)
              handleDragEnd(e.changedTouches[0].clientX - dragStart);
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: ease.smooth }}
            >
              <TestimonialCard
                title={TESTIMONIALS[activeIndex].title}
                body={TESTIMONIALS[activeIndex].body}
                visible={isInView}
                delay={0}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot indicators */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              style={{
                width: i === activeIndex ? 20 : 6,
                height: 6,
                borderRadius: 999,
                background: i === activeIndex ? "#F65A1B" : "#D0D0CB",
                transition: "all 300ms cubic-bezier(0.32,0.72,0,1)",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
