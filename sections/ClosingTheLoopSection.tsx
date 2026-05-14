"use client";

import { motion } from "framer-motion";
import { Play, BarChart2, Lightbulb, RefreshCw } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { ease, duration } from "@/lib/motion";

// Node definitions: clock positions around a 480×480 SVG, radius 160 from center (240,240)
const NODES = [
  { id: "try",     label: "Try",     cx: 240, cy:  80, Icon: Play       },
  { id: "measure", label: "Measure", cx: 400, cy: 240, Icon: BarChart2  },
  { id: "learn",   label: "Learn",   cx: 240, cy: 400, Icon: Lightbulb  },
  { id: "refine",  label: "Refine",  cx:  80, cy: 240, Icon: RefreshCw  },
] as const;

// Build a large-arc SVG path between two node centers that follows the circle (radius 160).
function arcPath(
  x1: number, y1: number,
  x2: number, y2: number,
  rx: number = 160,
): string {
  // Always sweep clockwise (sweep-flag = 1), large-arc = 0 (quarter-circle).
  return `M ${x1} ${y1} A ${rx} ${rx} 0 0 1 ${x2} ${y2}`;
}

// Arc connector pairs (clockwise): Try→Measure, Measure→Learn, Learn→Refine, Refine→Try
const ARCS = [
  arcPath(240,  80, 400, 240),
  arcPath(400, 240, 240, 400),
  arcPath(240, 400,  80, 240),
  arcPath( 80, 240, 240,  80),
];

// Full closed circular path for particle travel (clockwise starting at top).
const LOOP_PATH =
  "M 240 80 A 160 160 0 0 1 400 240 A 160 160 0 0 1 240 400 A 160 160 0 0 1 80 240 A 160 160 0 0 1 240 80";

const PARAGRAPH =
  "Sleep data, advice, and habit-tracking all capture part of the picture. What's missing is the feedback loop that links what you tried to what actually changed. Trune connects these pieces, so you can make more informed decisions, measure the impact, and improve your sleep with an intelligent system that learns what works for your body.";

function fadeUp(delay: number) {
  return {
    hidden:   { opacity: 0, y: 8 },
    visible:  { opacity: 1, y: 0, transition: { duration: duration.slow, ease: ease.smooth, delay } },
  };
}

export function ClosingTheLoopSection() {
  const { ref: sectionRef, isInView } = useInView<HTMLElement>({
    threshold: 0.1,
    once: true,
  });
  const { ref: paraRef, isInView: paraInView } = useInView<HTMLParagraphElement>({
    threshold: 0.4,
    once: true,
  });

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--color-bg)",
        paddingTop: 160,
        paddingBottom: 140,
      }}
    >
      {/* ── Eyebrow + Headline ── */}
      <div className="mx-auto max-w-[980px] px-6 text-center">
        <motion.p
          variants={fadeUp(0)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.16em",
            color: "var(--color-accent)",
            marginBottom: 16,
            textTransform: "uppercase",
          }}
        >
          Trune is closing the loop
        </motion.p>

        <motion.h2
          variants={fadeUp(0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="font-medium leading-[1.04] tracking-[-0.028em] text-[var(--color-text-primary)]"
          style={{
            fontSize: "clamp(40px, 5vw, 64px)",
            maxWidth: 980,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Tracking shows you what happened. Trune shows you what's working.
        </motion.h2>
      </div>

      {/* ── Loop Graphic ── */}
      <motion.div
        variants={fadeUp(0.22)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mx-auto flex justify-center"
        style={{ marginTop: 80 }}
      >
        <svg
          viewBox="0 0 480 480"
          width={480}
          height={480}
          style={{ overflow: "visible" }}
          aria-hidden="true"
        >
          {/* ── Dashed arc connectors ── */}
          {ARCS.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="none"
              stroke="var(--color-border)"
              strokeWidth={1.5}
              strokeDasharray="4 6"
              strokeLinecap="round"
            />
          ))}

          {/* ── Center ripple ── */}
          {[0, 1, 2].map((i) => (
            <circle
              key={`ripple-${i}`}
              cx={240}
              cy={240}
              r={20}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth={1.5}
              style={{
                transformOrigin: "240px 240px",
                animation: `trune-ripple 4s ease-out ${i * 1.33}s infinite`,
              }}
            />
          ))}

          {/* ── Center dot ── */}
          <circle cx={240} cy={240} r={4} fill="var(--color-accent)" />

          {/* ── Nodes ── */}
          {NODES.map(({ id, label, cx, cy, Icon }) => (
            <FeedbackNode
              key={id}
              label={label}
              cx={cx}
              cy={cy}
              Icon={Icon}
            />
          ))}

          {/* ── Animated particle ── */}
          <circle r={5} fill="var(--color-accent)" opacity={0.85}>
            <animateMotion
              dur="6s"
              repeatCount="indefinite"
              rotate="auto"
              path={LOOP_PATH}
            />
          </circle>
        </svg>
      </motion.div>

      {/* ── Body paragraph ── */}
      <div className="mx-auto mt-20 max-w-[720px] px-6 text-center">
        <motion.p
          ref={paraRef}
          variants={fadeUp(0)}
          initial="hidden"
          animate={paraInView ? "visible" : "hidden"}
          style={{
            fontSize: 18,
            lineHeight: 1.62,
            color: "var(--color-text-secondary)",
          }}
        >
          {PARAGRAPH}
        </motion.p>
      </div>

      {/* ── Keyframe styles (CSS animations) ── */}
      <style>{`
        @keyframes trune-ripple {
          0%   { transform: scale(0.2); opacity: 0.7; }
          100% { transform: scale(2.0); opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          @keyframes trune-ripple {
            0%, 100% { opacity: 0; }
          }
        }
      `}</style>
    </section>
  );
}

// ── Sub-component: individual node ──────────────────────────────────────────

interface FeedbackNodeProps {
  label: string;
  cx: number;
  cy: number;
  Icon: React.ComponentType<{ size?: number; color?: string }>;
}

function FeedbackNode({ label, cx, cy, Icon }: FeedbackNodeProps) {
  const CENTER = 240;

  // Determine label position based on which cardinal side the node sits on.
  // Top (cy<CENTER): label above, centered.
  // Bottom (cy>CENTER): label below, centered.
  // Left (cx<CENTER): label to the left, right-anchored.
  // Right (cx>CENTER): label to the right, left-anchored.
  let labelX = cx;
  let labelY = cy;
  let textAnchor: "middle" | "start" | "end" = "middle";

  if (cy < CENTER) {
    // Top node
    labelY = cy - 52;
    textAnchor = "middle";
  } else if (cy > CENTER) {
    // Bottom node
    labelY = cy + 56;
    textAnchor = "middle";
  } else if (cx < CENTER) {
    // Left node
    labelX = cx - 52;
    labelY = cy + 5;
    textAnchor = "end";
  } else {
    // Right node
    labelX = cx + 52;
    labelY = cy + 5;
    textAnchor = "start";
  }

  return (
    <g
      className="trune-feedback-node"
      style={{ cursor: "default" }}
      role="img"
      aria-label={label}
    >
      {/* Drop shadow filter */}
      <defs>
        <filter id={`shadow-${label}`} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#0A0A0A" floodOpacity="0.07" />
        </filter>
      </defs>

      {/* Circle background */}
      <circle
        cx={cx}
        cy={cy}
        r={40}
        fill="white"
        stroke="var(--color-border)"
        strokeWidth={0.5}
        filter={`url(#shadow-${label})`}
        className="trune-node-circle"
      />

      {/* Icon — rendered as foreignObject so we can use the React component */}
      <foreignObject
        x={cx - 12}
        y={cy - 12}
        width={24}
        height={24}
        style={{ overflow: "visible", pointerEvents: "none" }}
      >
        <div
          style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 24, height: 24 }}
        >
          <Icon size={24} color="var(--color-text-secondary)" />
        </div>
      </foreignObject>

      {/* Label */}
      <text
        x={labelX}
        y={labelY}
        textAnchor={textAnchor}
        className="trune-node-label"
        style={{
          fontSize: 14,
          fontWeight: 500,
          fill: "var(--color-text-primary)",
          fontFamily: "var(--font-inter, sans-serif)",
        }}
      >
        {label}
      </text>
    </g>
  );
}
