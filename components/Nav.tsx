"use client";

import Link from "next/link";
import { useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { ease } from "@/lib/motion";

const NAV_LINKS = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/methodology", label: "Methodology" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

const TRANSITION = { duration: 0.32, ease: ease.smooth };

export default function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 80);
  });

  // Interpolated values (0 = top, 1 = scrolled)
  const maxWidth = useTransform(scrollY, [60, 120], ["1280px", "720px"]);
  const height   = useTransform(scrollY, [60, 120], ["72px", "56px"]);
  const paddingX = useTransform(scrollY, [60, 120], ["24px", "20px"]);
  const marginTop = useTransform(scrollY, [60, 120], ["0px", "16px"]);
  const borderRadius = useTransform(scrollY, [60, 120], ["0px", "999px"]);
  const bgColor = useTransform(
    scrollY,
    [60, 120],
    ["rgba(250,250,247,0)", "rgba(250,250,247,0.85)"],
  );
  const borderColor = useTransform(
    scrollY,
    [60, 120],
    ["rgba(229,229,224,0)", "rgba(229,229,224,0.6)"],
  );
  const backdropFilter = useTransform(
    scrollY,
    [60, 120],
    ["blur(0px) saturate(100%)", "blur(16px) saturate(180%)"],
  );
  const boxShadow = useTransform(
    scrollY,
    [60, 120],
    [
      "0 4px 24px rgba(0,0,0,0), inset 0 0 0 0.5px rgba(0,0,0,0)",
      "0 4px 24px rgba(0,0,0,0.06), inset 0 0 0 0.5px rgba(0,0,0,0.04)",
    ],
  );

  return (
    <header
      className="sticky top-0 z-50 w-full flex justify-center"
      style={{ pointerEvents: "none" }}
    >
      <motion.nav
        className="flex w-full items-center justify-between overflow-hidden"
        style={{
          maxWidth,
          height,
          paddingLeft: paddingX,
          paddingRight: paddingX,
          marginTop,
          borderRadius,
          backgroundColor: bgColor,
          backdropFilter,
          WebkitBackdropFilter: backdropFilter,
          boxShadow,
          border: `0.5px solid`,
          borderColor,
          pointerEvents: "auto",
        }}
        transition={TRANSITION}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex-shrink-0 text-[18px] font-medium text-[var(--color-text-primary)] transition-opacity hover:opacity-70"
          style={{ letterSpacing: "-0.01em" }}
        >
          Trune
        </Link>

        {/* Center links */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={[
                  "relative text-[14px] font-medium text-[var(--color-text-secondary)]",
                  "transition-colors duration-200 hover:text-[var(--color-text-primary)]",
                  "after:absolute after:bottom-[-2px] after:left-0 after:h-[1px] after:w-0",
                  "after:bg-[var(--color-text-primary)] after:transition-[width] after:duration-[220ms]",
                  "after:[transition-timing-function:cubic-bezier(0.32,0.72,0,1)]",
                  "hover:after:w-full",
                ].join(" ")}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href="/#waitlist"
          className={[
            "flex-shrink-0 rounded-[999px] bg-[var(--color-text-primary)] px-4 py-[7px]",
            "text-[13px] font-medium text-[var(--color-bg)]",
            "transition-colors duration-200 hover:bg-[var(--color-accent)]",
          ].join(" ")}
        >
          Join waitlist
        </Link>
      </motion.nav>
    </header>
  );
}
