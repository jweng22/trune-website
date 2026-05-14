"use client";

import { motion, Variants } from "framer-motion";
import { wordReveal, ease } from "@/lib/motion";

interface Props {
  text: string;
  className?: string;
  staggerDelay?: number;
  wordVariants?: Variants;
  as?: keyof React.JSX.IntrinsicElements;
  delay?: number;
}

const containerVariants = (stagger: number, delay: number): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

export function WordReveal({
  text,
  className,
  staggerDelay = 0.06,
  wordVariants = wordReveal,
  as: Tag = "h1",
  delay = 0,
}: Props) {
  const words = text.split(" ");

  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.h1;

  return (
    <MotionTag
      className={className}
      variants={containerVariants(staggerDelay, delay)}
      initial="hidden"
      animate="visible"
      aria-label={text}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block will-change-transform"
          style={{ marginRight: "0.25em" }}
          variants={wordVariants}
        >
          {word}
        </motion.span>
      ))}
    </MotionTag>
  );
}

/** Variant for large headline — bigger blur, larger y travel */
export const headlineWordVariant: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: ease.emphatic },
  },
};
