"use client";

import { useState, useRef, useId } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ease, duration } from "@/lib/motion";
import { useCursorProximity } from "@/hooks/useCursorProximity";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type State = "idle" | "loading" | "success" | "error";

export function WaitlistForm({ source = "homepage" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [shake, setShake] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const inputId = useId();
  const { x: btnX, y: btnY } = useCursorProximity(btnRef);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      triggerError("Please enter a valid email address.");
      return;
    }
    setState("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = (await res.json()) as { ok: boolean; duplicate?: boolean; error?: string };
      if (data.ok) {
        setState("success");
      } else {
        triggerError(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      triggerError("Network error. Please try again.");
    }
  }

  function triggerError(msg: string) {
    setState("error");
    setErrorMsg(msg);
    setShake(true);
    setTimeout(() => setShake(false), 500);
    setTimeout(() => setState("idle"), 4000);
  }

  const shakeVariants: Variants = {
    idle: { x: 0 },
    shake: {
      x: [0, -4, 4, -4, 4, -3, 3, 0],
      transition: { duration: 0.32, ease: [0.32, 0, 0.68, 1] },
    },
  };

  return (
    <div>
      <AnimatePresence mode="wait">
        {state === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: duration.base, ease: ease.emphatic }}
            className="flex items-center gap-3"
          >
            {/* Orange check circle */}
            <motion.svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1, ease: ease.emphatic }}
            >
              <circle cx="10" cy="10" r="9" stroke="var(--color-accent)" strokeWidth="1.5" />
              <motion.path
                d="M6.5 10.2l2.5 2.5 4.5-4.5"
                stroke="var(--color-accent)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.35, delay: 0.25, ease: ease.emphatic }}
              />
            </motion.svg>
            <span className="text-sm font-medium text-[var(--color-text-primary)]">
              You&apos;re in. Watch your inbox.
            </span>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            variants={shakeVariants}
            animate={shake ? "shake" : "idle"}
            className="flex flex-col gap-3 sm:flex-row"
            noValidate
          >
            <div className="relative flex-1">
              <label htmlFor={inputId} className="sr-only">Email address</label>
              <input
                id={inputId}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                disabled={state === "loading"}
                className={[
                  "w-full h-12 rounded-[var(--radius-pill)] border border-[var(--color-border)]",
                  "px-5 text-[15px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)]",
                  "bg-white outline-none transition-shadow duration-[180ms]",
                  "focus:shadow-[0_0_0_2px_var(--color-accent)]",
                  "disabled:opacity-60",
                ].join(" ")}
                autoComplete="email"
              />
            </div>

            <motion.button
              ref={btnRef}
              type="submit"
              disabled={state === "loading"}
              style={{ x: btnX, y: btnY }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.22, ease: ease.smooth }}
              className={[
                "h-12 rounded-[var(--radius-pill)] bg-[var(--color-text-primary)]",
                "px-6 text-sm font-medium text-[var(--color-bg)] whitespace-nowrap",
                "flex items-center gap-2 justify-center",
                "transition-colors duration-200 hover:bg-[var(--color-accent)]",
                "disabled:opacity-60 disabled:pointer-events-none",
              ].join(" ")}
            >
              {state === "loading" ? (
                <Spinner />
              ) : (
                <>
                  Join the beta
                  <motion.span
                    className="inline-block"
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.22, ease: ease.smooth }}
                  >
                    →
                  </motion.span>
                </>
              )}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Error message */}
      <AnimatePresence>
        {state === "error" && errorMsg && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: duration.fast }}
            className="mt-2 text-sm text-red-500"
          >
            {errorMsg}
          </motion.p>
        )}
      </AnimatePresence>

      <p className="mt-3 text-[13px] text-[var(--color-text-tertiary)]">
        Limited beta access for early users. No spam, ever.
      </p>
    </div>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="2"
      />
      <path
        d="M8 2a6 6 0 0 1 6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
