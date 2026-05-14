"use client";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
  Variants,
} from "framer-motion";
import { BarChart2, Circle, Sparkles } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { ease, duration as dur } from "@/lib/motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type StepIndex = 0 | 1 | 2 | 3;

// ─── Step data ────────────────────────────────────────────────────────────────

const STEPS: { title: string; body: string }[] = [
  {
    title: "Build your sleep profile",
    body: "Connect your data and answer a couple short questions so Trune can analyze your patterns, habits, and signals in context to build a deep understanding of your sleep.",
  },
  {
    title: "Discover where to start",
    body: "Explore research-backed sleep protocols and build your plan with personalized starting points based on your sleep profile and goals.",
  },
  {
    title: "Track with almost no effort",
    body: "Get one quick check-in each day to confirm what you tried. Trune handles the measurement and analysis in the background.",
  },
  {
    title: "See what actually worked",
    body: "Trune measures what changed in your sleep data and shows whether the protocols you tried actually helped, so you can keep what works and stop wasting time on what doesn't.",
  },
];

// ─── Shared variants ──────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: dur.slow, ease: ease.emphatic },
  },
};

// ─── Step 1 Visual ────────────────────────────────────────────────────────────

const TAGS = [
  { label: "Sleep score 67",       angle: -140, dist: 130 },
  { label: "Last bedtime 11:43pm", angle: -40,  dist: 140 },
  { label: "Workout: run 5km",     angle: 40,   dist: 135 },
  { label: "Caffeine: 1 coffee 3pm", angle: 110, dist: 145 },
  { label: "Sleep latency 22min",  angle: 160,  dist: 130 },
  { label: "REM: 1h 32m",          angle: -90,  dist: 140 },
];

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function Step1Visual({ active }: { active: boolean }) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Silhouette */}
      <div className="relative" style={{ width: 180, height: 240 }}>
        <svg
          width="180"
          height="240"
          viewBox="0 0 180 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Head */}
          <circle
            cx="90"
            cy="38"
            r="26"
            stroke="#D0D0CB"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Neck */}
          <line
            x1="90"
            y1="64"
            x2="90"
            y2="80"
            stroke="#D0D0CB"
            strokeWidth="1.5"
          />
          {/* Shoulders */}
          <path
            d="M48 100 Q60 78 90 80 Q120 78 132 100"
            stroke="#D0D0CB"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          {/* Torso */}
          <path
            d="M56 100 L52 160 L128 160 L124 100"
            stroke="#D0D0CB"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Left arm */}
          <path
            d="M52 104 L34 148 L38 150"
            stroke="#D0D0CB"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          {/* Right arm */}
          <path
            d="M128 104 L146 148 L142 150"
            stroke="#D0D0CB"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          {/* Left leg */}
          <path
            d="M68 160 L60 210 L70 212"
            stroke="#D0D0CB"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          {/* Right leg */}
          <path
            d="M112 160 L120 210 L110 212"
            stroke="#D0D0CB"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* Floating tags */}
        {TAGS.map((tag, i) => {
          const rad = toRad(tag.angle);
          const tx = Math.cos(rad) * tag.dist;
          const ty = Math.sin(rad) * tag.dist;
          return (
            <motion.div
              key={tag.label}
              initial={{ opacity: 0, x: tx * 0.35, y: ty * 0.35 }}
              animate={
                active
                  ? {
                      opacity: [0, 1],
                      x: [tx * 0.35, tx],
                      y: [ty * 0.35, ty],
                    }
                  : { opacity: 0, x: tx * 0.35, y: ty * 0.35 }
              }
              transition={{
                duration: 0.55,
                ease: ease.emphatic,
                delay: active ? 0.1 + i * 0.08 : 0,
              }}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px))`,
                x: 0,
                y: 0,
                pointerEvents: "none",
              }}
            >
              <motion.div
                animate={
                  active
                    ? { opacity: [0.85, 1, 0.85] }
                    : { opacity: 0.85 }
                }
                transition={
                  active
                    ? {
                        duration: 4,
                        ease: "easeInOut",
                        repeat: Infinity,
                        delay: i * 0.6,
                      }
                    : {}
                }
                className="whitespace-nowrap rounded-[999px] border bg-white px-3 py-1.5 text-[13px] text-[var(--color-text-primary)] shadow-sm"
                style={{ borderColor: "var(--color-border)", borderWidth: "0.5px" }}
              >
                {tag.label}
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Caption */}
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
        transition={{ duration: dur.slow, ease: ease.smooth, delay: active ? 0.7 : 0 }}
        className="mt-6 text-center text-[14px] text-[var(--color-text-secondary)]"
        style={{ maxWidth: 300 }}
      >
        Trune learns from everything that shapes your sleep.
      </motion.p>
    </div>
  );
}

// ─── Step 2 Visual ────────────────────────────────────────────────────────────

interface ProtocolCard {
  title: string;
  match: number;
  description: string;
  cta: string;
  ctaVariant: "orange" | "gray" | "outline";
}

const PROTOCOL_CARDS: ProtocolCard[] = [
  {
    title: "Caffeine cutoff at 2 PM",
    match: 94,
    description: "Based on your stimulant sensitivity profile",
    cta: "Try this",
    ctaVariant: "orange",
  },
  {
    title: "Cool bedroom (65–67°F)",
    match: 87,
    description: "Matches your thermal preference pattern",
    cta: "Want to retry",
    ctaVariant: "gray",
  },
  {
    title: "Magnesium glycinate, 200mg",
    match: 79,
    description: "Supplements with moderate evidence for your profile",
    cta: "Already tried",
    ctaVariant: "outline",
  },
];

function AnimatedMatchScore({
  value,
  active,
  delay,
}: {
  value: number;
  active: boolean;
  delay: number;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const unsub = rounded.on("change", setDisplay);
    return unsub;
  }, [rounded]);

  useEffect(() => {
    if (active) {
      const ctrl = animate(count, value, {
        duration: 1.1,
        ease: ease.smooth,
        delay,
      });
      return ctrl.stop;
    } else {
      count.set(0);
      setDisplay(0);
    }
  }, [active, value, count, delay]);

  return <span>{display}%</span>;
}

function Step2Visual({ active }: { active: boolean }) {
  return (
    <div className="flex flex-col items-center gap-3" style={{ maxWidth: 380 }}>
      {PROTOCOL_CARDS.map((card, i) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 32, scale: 0.96 }}
          animate={
            active
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 32, scale: 0.96 }
          }
          transition={{
            duration: dur.slow,
            ease: ease.emphatic,
            delay: active ? i * 0.12 : 0,
          }}
          className="w-full rounded-2xl border bg-white p-5 shadow-sm"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div className="mb-2 flex items-start justify-between gap-3">
            <p className="text-[15px] font-medium text-[var(--color-text-primary)] leading-snug">
              {card.title}
            </p>
            <span
              className="flex-shrink-0 rounded-[999px] px-2.5 py-0.5 text-[12px] font-medium"
              style={{
                backgroundColor: "rgba(246,90,27,0.10)",
                color: "var(--color-accent)",
              }}
            >
              <AnimatedMatchScore
                value={card.match}
                active={active}
                delay={0.3 + i * 0.12}
              />{" "}
              match
            </span>
          </div>
          <p className="mb-3 text-[13px] text-[var(--color-text-secondary)]">
            {card.description}
          </p>
          <div>
            {card.ctaVariant === "orange" && (
              <span
                className="inline-block rounded-[999px] px-3 py-1 text-[12px] font-medium text-white"
                style={{ backgroundColor: "var(--color-accent)" }}
              >
                {card.cta}
              </span>
            )}
            {card.ctaVariant === "gray" && (
              <span
                className="inline-block rounded-[999px] px-3 py-1 text-[12px] font-medium"
                style={{
                  backgroundColor: "var(--color-border)",
                  color: "var(--color-text-secondary)",
                }}
              >
                {card.cta}
              </span>
            )}
            {card.ctaVariant === "outline" && (
              <span
                className="inline-block rounded-[999px] border px-3 py-1 text-[12px] font-medium"
                style={{
                  borderColor: "var(--color-border)",
                  color: "var(--color-text-secondary)",
                }}
              >
                {card.cta}
              </span>
            )}
          </div>
        </motion.div>
      ))}

      <motion.p
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: dur.slow, ease: ease.smooth, delay: active ? 0.5 : 0 }}
        className="mt-1 text-center text-[13px] text-[var(--color-text-tertiary)]"
      >
        You&apos;re in control — keep what works, skip what doesn&apos;t.
      </motion.p>
    </div>
  );
}

// ─── Step 3 Visual ────────────────────────────────────────────────────────────

function Step3Visual({ active }: { active: boolean }) {
  const [phase, setPhase] = useState<"hidden" | "notification" | "tapped" | "logged">(
    "hidden"
  );

  // Reset when step becomes inactive
  useEffect(() => {
    if (!active) {
      setPhase("hidden");
    }
  }, [active]);

  // Run through phases each time we're active and phase is "hidden"
  const loopTrigger = phase === "hidden" && active;
  useEffect(() => {
    if (!loopTrigger) return;
    const t1 = setTimeout(() => setPhase("notification"), 300);
    const t2 = setTimeout(() => setPhase("tapped"), 1800);
    const t3 = setTimeout(() => setPhase("logged"), 2800);
    // Loop: reset to hidden after 8s so the effect re-fires
    const t4 = setTimeout(() => setPhase("hidden"), 7800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [loopTrigger]);

  const FLOATING_ICONS = [
    { Icon: BarChart2, offset: -50, delay: 0 },
    { Icon: Circle, offset: 0, delay: 0.8 },
    { Icon: Sparkles, offset: 50, delay: 1.6 },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Floating background icons */}
      <div className="relative mb-4 flex items-end justify-center gap-8" style={{ height: 48 }}>
        {FLOATING_ICONS.map(({ Icon, offset, delay }, i) => (
          <motion.div
            key={i}
            animate={
              active
                ? {
                    y: [0, -20, 0],
                    opacity: [0, 0.3, 0],
                  }
                : { opacity: 0 }
            }
            transition={{
              duration: 3.2,
              ease: "easeInOut",
              repeat: Infinity,
              delay: active ? delay : 0,
            }}
            style={{ transform: `translateX(${offset}px)` }}
          >
            <Icon size={16} style={{ color: "var(--color-text-tertiary)" }} />
          </motion.div>
        ))}
      </div>

      {/* Phone mockup */}
      <div
        className="relative overflow-hidden rounded-[32px]"
        style={{
          width: 280,
          height: 380,
          backgroundColor: "#F0F0EC",
          boxShadow: "0 8px 40px rgba(0,0,0,0.10), inset 0 0 0 1px rgba(0,0,0,0.06)",
        }}
      >
        {/* Inner screen */}
        <div
          className="absolute inset-3 overflow-hidden rounded-[24px] bg-white"
        >
          {/* Status bar */}
          <div
            className="flex items-center justify-between px-5 pt-3 pb-1"
            style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}
          >
            <span>9:41</span>
            <div className="flex gap-1">
              <span>&#9679;&#9679;&#9679;</span>
            </div>
          </div>

          {/* Notification card */}
          <AnimatePresence>
            {(phase === "notification" ||
              phase === "tapped" ||
              phase === "logged") && (
              <motion.div
                key="notification"
                initial={{ y: -80, opacity: 0 }}
                animate={phase === "tapped" || phase === "logged"
                  ? { y: 0, opacity: 1 }
                  : { y: 0, opacity: 1 }
                }
                exit={{ y: -80, opacity: 0 }}
                transition={{ duration: 0.45, ease: ease.emphatic }}
                className="mx-3 mt-2 rounded-2xl border bg-white p-4 shadow-sm"
                style={{ borderColor: "var(--color-border)" }}
              >
                <p
                  className="mb-1 text-[11px] font-medium"
                  style={{ color: "var(--color-text-tertiary)", letterSpacing: "0.06em" }}
                >
                  TRUNE &middot; QUICK CHECK-IN
                </p>
                <p
                  className="mb-3 text-[14px] font-medium"
                  style={{ color: "var(--color-text-primary)", lineHeight: 1.35 }}
                >
                  Did you stick with cool bedroom last night?
                </p>
                <div className="flex gap-2">
                  <motion.button
                    animate={
                      phase === "tapped"
                        ? {
                            scale: [1, 1.05, 1],
                          }
                        : { scale: 1 }
                    }
                    transition={{ duration: 0.4, ease: ease.spring }}
                    className="rounded-[999px] px-4 py-1.5 text-[13px] font-medium text-white"
                    style={{ backgroundColor: "#22C55E" }}
                  >
                    Yes
                  </motion.button>
                  <button
                    className="rounded-[999px] px-4 py-1.5 text-[13px] font-medium"
                    style={{
                      backgroundColor: "var(--color-border)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    No
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Logged state */}
          <AnimatePresence>
            {phase === "logged" && (
              <motion.div
                key="logged"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: ease.smooth }}
                className="mx-3 mt-3 flex items-center gap-2"
              >
                <motion.svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.2, ease: "linear", repeat: Infinity }}
                >
                  <circle
                    cx="7"
                    cy="7"
                    r="5.5"
                    stroke="var(--color-text-tertiary)"
                    strokeOpacity="0.3"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M7 1.5a5.5 5.5 0 0 1 5.5 5.5"
                    stroke="var(--color-accent)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </motion.svg>
                <p className="text-[12px]" style={{ color: "var(--color-text-secondary)" }}>
                  Logged. Trune is analyzing in the background.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Home indicator */}
        <div
          className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full"
          style={{ width: 100, height: 4, backgroundColor: "rgba(0,0,0,0.12)" }}
        />
      </div>
    </div>
  );
}

// ─── Step 4 Visual ────────────────────────────────────────────────────────────

const METRICS = [
  { label: "Sleep latency", from: "22min", to: "14min", delta: "−36%", positive: true },
  { label: "Total sleep",   from: "6h 41m", to: "7h 28m", delta: "+11%", positive: true },
  { label: "REM",           from: "1h 32m", to: "1h 48m", delta: "+17%", positive: true },
];

// SVG line chart data
const BEFORE_POINTS = [0, 12, 8, 18, 10, 14, 6, 16, 10, 12].map(
  (v, i, arr) => ({ x: (i / (arr.length - 1)) * 170, y: 60 - v })
);
const AFTER_POINTS = [14, 26, 22, 30, 24, 32, 28, 36, 30, 34].map(
  (v, i, arr) => ({ x: (i / (arr.length - 1)) * 170, y: 60 - v })
);

function pointsToPath(points: { x: number; y: number }[]) {
  return points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");
}

const SEPARATOR_X = 85;

function Step4Visual({ active }: { active: boolean }) {
  const { ref: chartRef, isInView: chartInView } = useInView<SVGSVGElement>({
    threshold: 0.5,
    once: false,
  });

  const shouldAnimate = active && chartInView;

  return (
    <div
      className="rounded-2xl border bg-white p-6 shadow-sm"
      style={{ borderColor: "var(--color-border)", maxWidth: 380 }}
    >
      {/* Header */}
      <p
        className="mb-2 text-[11px] font-medium uppercase tracking-wider"
        style={{ color: "var(--color-text-tertiary)", letterSpacing: "0.1em" }}
      >
        Protocol result: Caffeine cutoff at 2 PM
      </p>

      {/* Verdict */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: dur.slow, ease: ease.emphatic }}
        className="mb-5 flex items-center gap-2"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          style={{ flexShrink: 0 }}
        >
          <circle cx="9" cy="9" r="8.25" stroke="var(--color-accent)" strokeWidth="1.5" />
          <path
            d="M5.5 9.3l2.5 2.5 4.5-4.5"
            stroke="var(--color-accent)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span
          className="text-[18px] font-medium"
          style={{ color: "var(--color-accent)" }}
        >
          Improved your sleep
        </span>
      </motion.div>

      {/* Line chart */}
      <div className="mb-5 overflow-hidden rounded-xl" style={{ background: "#FAFAF9", padding: "12px 8px 8px" }}>
        <svg
          ref={chartRef}
          width="100%"
          viewBox="0 0 200 80"
          preserveAspectRatio="none"
          style={{ height: 80, display: "block" }}
        >
          {/* Before line */}
          <motion.path
            d={pointsToPath(BEFORE_POINTS.map((p) => ({ ...p, x: p.x + 15 })))}
            stroke="#D0D0CB"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              shouldAnimate
                ? { pathLength: 1, opacity: 1 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={{ duration: 1.1, ease: ease.emphatic }}
          />

          {/* After line */}
          <motion.path
            d={pointsToPath(AFTER_POINTS.map((p) => ({ ...p, x: p.x + 15 })))}
            stroke="var(--color-accent)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              shouldAnimate
                ? { pathLength: 1, opacity: 1 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={{ duration: 1.1, ease: ease.emphatic, delay: 0.25 }}
          />

          {/* Dashed vertical separator */}
          <motion.line
            x1={SEPARATOR_X + 15}
            y1="4"
            x2={SEPARATOR_X + 15}
            y2="68"
            stroke="#D0D0CB"
            strokeWidth="1"
            strokeDasharray="3 3"
            initial={{ opacity: 0 }}
            animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.9 }}
          />

          {/* "Started" label */}
          <motion.text
            x={SEPARATOR_X + 17}
            y="72"
            fontSize="7"
            fill="#9A9A95"
            initial={{ opacity: 0 }}
            animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 1.0 }}
          >
            Started
          </motion.text>

          {/* Legend */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.1 }}
          >
            <line x1="152" y1="10" x2="162" y2="10" stroke="#D0D0CB" strokeWidth="1.5" />
            <text x="164" y="13.5" fontSize="7" fill="#9A9A95">Before</text>
            <line x1="152" y1="20" x2="162" y2="20" stroke="var(--color-accent)" strokeWidth="1.5" />
            <text x="164" y="23.5" fontSize="7" fill="#9A9A95">After</text>
          </motion.g>
        </svg>
      </div>

      {/* Metrics */}
      <div className="flex flex-col gap-2">
        {METRICS.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, x: -8 }}
            animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
            transition={{
              duration: dur.base,
              ease: ease.smooth,
              delay: active ? 0.9 + i * 0.12 : 0,
            }}
            className="flex items-center justify-between"
          >
            <span className="text-[13px] text-[var(--color-text-secondary)]">
              {m.label}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[13px] text-[var(--color-text-tertiary)]">
                {m.from}
              </span>
              <span className="text-[13px]" style={{ color: "var(--color-text-tertiary)" }}>
                &rarr;
              </span>
              <span className="text-[13px] font-medium text-[var(--color-text-primary)]">
                {m.to}
              </span>
              <span
                className="rounded-[999px] px-2 py-0.5 text-[11px] font-medium"
                style={{
                  backgroundColor: "rgba(34,197,94,0.10)",
                  color: "#16A34A",
                }}
              >
                {m.delta}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Attribution badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={
          active
            ? {
                opacity: [0, 1],
                scale: [0.95, 1],
              }
            : { opacity: 0, scale: 0.95 }
        }
        transition={{ duration: dur.base, ease: ease.emphatic, delay: active ? 1.3 : 0 }}
        className="mt-4"
      >
        <motion.span
          animate={active ? { opacity: [1, 0.7, 1] } : {}}
          transition={active ? { duration: 2.4, ease: "easeInOut", repeat: Infinity, delay: 1.8 } : {}}
          className="inline-block rounded-[999px] border px-3 py-1 text-[12px]"
          style={{
            borderColor: "var(--color-border)",
            color: "var(--color-text-secondary)",
          }}
        >
          Attribution analysis &middot; Not just correlation
        </motion.span>
      </motion.div>
    </div>
  );
}

// ─── Step visual dispatcher ───────────────────────────────────────────────────

function StepVisual({ index, active }: { index: StepIndex; active: boolean }) {
  switch (index) {
    case 0: return <Step1Visual active={active} />;
    case 1: return <Step2Visual active={active} />;
    case 2: return <Step3Visual active={active} />;
    case 3: return <Step4Visual active={active} />;
  }
}

// ─── Left column — sticky nav ─────────────────────────────────────────────────

function StickyNav({
  activeStep,
  progressFraction,
}: {
  activeStep: StepIndex;
  progressFraction: number;
}) {
  const { ref: headerRef, isInView: headerInView } = useInView<HTMLDivElement>({
    threshold: 0.4,
    once: true,
  });

  return (
    <div className="sticky top-[100px]">
      {/* Eyebrow + heading */}
      <motion.div
        ref={headerRef}
        initial="hidden"
        animate={headerInView ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        <motion.p
          variants={fadeUp}
          className="mb-4 text-[12px] font-semibold uppercase"
          style={{
            color: "var(--color-accent)",
            letterSpacing: "0.16em",
          }}
        >
          How it works
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="mb-9 font-medium text-[var(--color-text-primary)]"
          style={{
            fontSize: "clamp(36px, 4.4vw, 56px)",
            lineHeight: 1.05,
            letterSpacing: "-0.028em",
          }}
        >
          Four steps to a real answer about your sleep
        </motion.h2>
      </motion.div>

      {/* Step indicators */}
      <div className="relative flex flex-col gap-0">
        {/* Progress track */}
        <div
          className="absolute left-[11px] top-3 bottom-3 w-[2px] rounded-full"
          style={{ backgroundColor: "var(--color-border)" }}
        />
        {/* Progress fill */}
        <motion.div
          className="absolute left-[11px] top-3 w-[2px] rounded-full origin-top"
          style={{
            backgroundColor: "var(--color-accent)",
            height: `calc(${progressFraction * 100}% - 24px)`,
          }}
          transition={{ duration: 0.1 }}
        />

        {STEPS.map((step, i) => {
          const isActive = i === activeStep;
          return (
            <div
              key={step.title}
              className="relative flex items-center gap-4 py-3"
            >
              {/* Circle badge */}
              <div
                className="relative z-10 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-semibold transition-colors duration-300"
                style={{
                  backgroundColor: isActive
                    ? "var(--color-accent)"
                    : "var(--color-border)",
                  color: isActive ? "#fff" : "var(--color-text-secondary)",
                }}
              >
                {i + 1}
              </div>
              {/* Title */}
              <span
                className="text-[16px] font-medium transition-colors duration-300"
                style={{
                  color: isActive
                    ? "var(--color-text-primary)"
                    : "var(--color-text-tertiary)",
                }}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Mobile progress indicator ────────────────────────────────────────────────

function MobileStepIndicator({ activeStep }: { activeStep: StepIndex }) {
  return (
    <div className="mb-8 flex items-center gap-2">
      {STEPS.map((_, i) => (
        <div
          key={i}
          className="h-1 flex-1 rounded-full transition-colors duration-300"
          style={{
            backgroundColor:
              i <= activeStep ? "var(--color-accent)" : "var(--color-border)",
          }}
        />
      ))}
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState<StepIndex>(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [progressFraction, setProgressFraction] = useState(0);

  const setStepRef = useCallback(
    (i: number) => (el: HTMLDivElement | null) => {
      stepRefs.current[i] = el;
    },
    []
  );

  // IntersectionObserver to track active step
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveStep(i as StepIndex);
          }
        },
        {
          root: null,
          rootMargin: "-40% 0px -40% 0px",
          threshold: 0,
        }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Scroll progress for the vertical bar
  useEffect(() => {
    function onScroll() {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      const frac = Math.max(0, Math.min(1, scrolled / total));
      setProgressFraction(frac);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      className="bg-white"
      style={{ paddingTop: 160, paddingBottom: 160 }}
    >
      <div className="mx-auto max-w-[1280px] px-6">
        {/* Mobile: horizontal progress */}
        <div className="mb-10 md:hidden">
          <p
            className="mb-2 text-[12px] font-semibold uppercase"
            style={{ color: "var(--color-accent)", letterSpacing: "0.16em" }}
          >
            How it works
          </p>
          <h2
            className="mb-6 font-medium text-[var(--color-text-primary)]"
            style={{
              fontSize: "clamp(30px, 7vw, 44px)",
              lineHeight: 1.1,
              letterSpacing: "-0.024em",
            }}
          >
            Four steps to a real answer about your sleep
          </h2>
          <MobileStepIndicator activeStep={activeStep} />
        </div>

        {/* Desktop: 2-column grid */}
        <div
          ref={containerRef}
          className="relative gap-[100px] md:grid"
          style={{ gridTemplateColumns: "40fr 60fr" }}
        >
          {/* Left sticky column (desktop only) */}
          <div className="hidden md:block">
            <StickyNav
              activeStep={activeStep}
              progressFraction={progressFraction}
            />
          </div>

          {/* Right scrolling column */}
          <div className="flex flex-col">
            {STEPS.map((step, i) => (
              <div
                key={step.title}
                ref={setStepRef(i)}
                className="flex min-h-[100vh] flex-col justify-center py-16 md:py-24"
              >
                {/* Mobile step label */}
                <div className="mb-1 flex items-center gap-2 md:hidden">
                  <div
                    className="flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold text-white"
                    style={{ backgroundColor: "var(--color-accent)" }}
                  >
                    {i + 1}
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{ duration: dur.slow, ease: ease.emphatic }}
                >
                  <h3
                    className="mb-4 font-medium text-[var(--color-text-primary)]"
                    style={{
                      fontSize: "clamp(24px, 2.4vw, 32px)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.022em",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="mb-10 text-[17px] leading-[1.6] text-[var(--color-text-secondary)]"
                    style={{ maxWidth: 500 }}
                  >
                    {step.body}
                  </p>
                </motion.div>

                {/* Visual */}
                <div className="flex justify-start">
                  <StepVisual
                    index={i as StepIndex}
                    active={activeStep === i}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
