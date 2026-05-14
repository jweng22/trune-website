"use client";

import { createPortal } from "react-dom";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ease, duration as dur } from "@/lib/motion";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
type State = "idle" | "loading" | "success" | "error";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
}

export function WaitlistModal({ isOpen, onClose, source = "homepage" }: Props) {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      window.addEventListener("keydown", onKey);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setState("idle");
      setEmail("");
      setErrorMsg("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setState("error");
      setErrorMsg("Please enter a valid email address.");
      setTimeout(() => setState("idle"), 4000);
      return;
    }
    setState("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (data.ok) {
        setState("success");
      } else {
        setState("error");
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
        setTimeout(() => setState("idle"), 4000);
      }
    } catch {
      setState("error");
      setErrorMsg("Network error. Please try again.");
      setTimeout(() => setState("idle"), 4000);
    }
  }

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: dur.base, ease: ease.emphatic }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#FFFFFF",
              borderRadius: 20,
              padding: 32,
              maxWidth: 460,
              width: "100%",
              boxShadow: "0 24px 80px rgba(0,0,0,0.18)",
            }}
          >
            <AnimatePresence mode="wait">
              {state === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: dur.base, ease: ease.emphatic }}
                  className="py-4 text-center"
                >
                  <div className="mb-5 flex justify-center">
                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                      <circle cx="22" cy="22" r="21" stroke="#F65A1B" strokeWidth="1.5" />
                      <motion.path
                        d="M14 22.4l5.5 5.5 10.5-10.5"
                        stroke="#F65A1B"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.4, ease: ease.emphatic }}
                      />
                    </svg>
                  </div>
                  <p
                    className="text-[20px] font-medium text-[var(--color-text-primary)]"
                    style={{ lineHeight: 1.3 }}
                  >
                    You&apos;re in. Check your inbox for next steps.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 text-[14px] text-[var(--color-text-tertiary)] transition-colors hover:text-[var(--color-text-primary)]"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <motion.div key="form">
                  <div className="mb-6 flex items-start justify-between">
                    <div>
                      <h2
                        className="text-[24px] font-medium text-[var(--color-text-primary)]"
                        style={{ lineHeight: 1.2 }}
                      >
                        Join the Trune beta
                      </h2>
                      <p className="mt-2 text-[15px] leading-[1.5] text-[var(--color-text-secondary)]">
                        Drop your email and we&apos;ll send you the onboarding form.
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      aria-label="Close"
                      className="ml-4 mt-0.5 flex-shrink-0 text-[var(--color-text-tertiary)] transition-colors hover:text-[var(--color-text-primary)]"
                      style={{ fontSize: 22, lineHeight: 1 }}
                    >
                      ×
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} noValidate>
                    <input
                      ref={inputRef}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      disabled={state === "loading"}
                      autoComplete="email"
                      className={[
                        "mb-3 h-12 w-full rounded-[999px] border border-[var(--color-border)]",
                        "px-5 text-[15px] text-[var(--color-text-primary)]",
                        "placeholder:text-[var(--color-text-tertiary)]",
                        "bg-white outline-none transition-shadow duration-[180ms]",
                        "focus:shadow-[0_0_0_2px_var(--color-accent)]",
                        "disabled:opacity-60",
                        state === "error" ? "border-red-400" : "",
                      ].join(" ")}
                    />

                    {state === "error" && errorMsg && (
                      <p className="mb-3 text-[13px] text-red-500">{errorMsg}</p>
                    )}

                    <button
                      type="submit"
                      disabled={state === "loading"}
                      className={[
                        "flex h-12 w-full items-center justify-center gap-2",
                        "rounded-[999px] bg-[var(--color-text-primary)]",
                        "text-[15px] font-medium text-[var(--color-bg)]",
                        "transition-colors duration-200 hover:bg-[var(--color-accent)]",
                        "disabled:pointer-events-none disabled:opacity-60",
                      ].join(" ")}
                    >
                      {state === "loading" ? <Spinner /> : "Continue"}
                    </button>

                    <p className="mt-3 text-center text-[13px] text-[var(--color-text-tertiary)]">
                      No spam, ever.
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function Spinner() {
  return (
    <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" />
      <path d="M8 2a6 6 0 0 1 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
