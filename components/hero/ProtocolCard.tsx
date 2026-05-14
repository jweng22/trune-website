"use client";

import { motion } from "framer-motion";
import { cardEnter } from "@/lib/motion";

const items = [
  { done: true, text: "No caffeine after 2 PM" },
  { done: false, text: "Lights down by 9:30" },
];

export function ProtocolCard() {
  return (
    <motion.div
      variants={cardEnter}
      className="w-[260px] rounded-2xl bg-white p-[18px] select-none"
      style={{
        boxShadow:
          "0 1px 2px rgba(0,0,0,.04), 0 12px 32px rgba(0,0,0,.06), inset 0 0 0 0.5px rgba(0,0,0,.04)",
      }}
    >
      <p className="mb-4 text-[12px] font-medium text-[var(--color-text-tertiary)]">
        Tonight&apos;s protocol
      </p>
      <div className="flex flex-col gap-3">
        {items.map(({ done, text }) => (
          <div key={text} className="flex items-center gap-3">
            <div
              className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border"
              style={
                done
                  ? {
                      background: "var(--color-accent)",
                      borderColor: "var(--color-accent)",
                    }
                  : { borderColor: "var(--color-border)" }
              }
            >
              {done && (
                <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                  <path
                    d="M1 3l2 2 4-4"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <span className="text-sm text-[var(--color-text-primary)]">
              {text}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
