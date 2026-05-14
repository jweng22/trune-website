"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "trune-announcement-v1-dismissed";

export function AnnouncementBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {}
  }, []);

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    setVisible(false);
  }

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          initial={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
          style={{ overflow: "hidden", background: "#0A0A0A", position: "relative" }}
        >
          <div
            className="flex items-center justify-center"
            style={{ padding: "10px 48px" }}
          >
            <a
              href="/#waitlist"
              className="group text-center"
              style={{
                color: "#FAFAF7",
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "-0.005em",
                textDecoration: "none",
              }}
            >
              Private beta now open to select users —{" "}
              <span className="group-hover:underline" style={{ textUnderlineOffset: 2 }}>
                Join Waitlist
              </span>{" "}
              <span
                className="inline-block transition-transform duration-200 group-hover:translate-x-[3px]"
              >
                ↗
              </span>
            </a>
          </div>
          <button
            onClick={dismiss}
            aria-label="Dismiss announcement"
            style={{
              position: "absolute",
              right: 20,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#8A8A87",
              fontSize: 20,
              lineHeight: 1,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px 8px",
              transition: "color 200ms",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#FAFAF7";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#8A8A87";
            }}
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
