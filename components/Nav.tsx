"use client";

import Link from "next/link";
import { useScroll, useTransform, motion } from "framer-motion";
import { useState } from "react";
import { ease } from "@/lib/motion";
import { WaitlistModal } from "@/ui/WaitlistModal";

const LEFT_LINKS = [
  { href: "/about", label: "About" },
  { href: "/methodology", label: "Our Methodology" },
  { href: "/blog", label: "Blog" },
];

const TRANSITION = { duration: 0.32, ease: ease.smooth };

export default function Nav() {
  const { scrollY } = useScroll();
  const [modalOpen, setModalOpen] = useState(false);

  const maxWidth = useTransform(scrollY, [60, 120], ["1280px", "760px"]);
  const height = useTransform(scrollY, [60, 120], ["72px", "56px"]);
  const paddingX = useTransform(scrollY, [60, 120], ["40px", "20px"]);
  const marginTop = useTransform(scrollY, [60, 120], ["0px", "14px"]);
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
    ["blur(0px) saturate(100%)", "blur(20px) saturate(180%)"],
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
    <>
      <WaitlistModal isOpen={modalOpen} onClose={() => setModalOpen(false)} source="nav" />

      <header
        className="w-full flex justify-center"
        style={{ pointerEvents: "none" }}
      >
        <motion.nav
          className="grid w-full items-center overflow-hidden"
          style={{
            gridTemplateColumns: "1fr auto 1fr",
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
            border: "0.5px solid",
            borderColor,
            pointerEvents: "auto",
          }}
          transition={TRANSITION}
        >
          {/* Left links */}
          <ul className="hidden items-center gap-7 md:flex">
            {LEFT_LINKS.map(({ href, label }) => (
              <li key={href}>
                <NavLink href={href}>{label}</NavLink>
              </li>
            ))}
          </ul>

          {/* Centered logo */}
          <Link
            href="/"
            className="flex items-center justify-center text-[18px] font-medium text-[var(--color-text-primary)] transition-opacity hover:opacity-70"
            style={{ letterSpacing: "-0.015em" }}
          >
            Trune
          </Link>

          {/* Right: Login + Join Waitlist */}
          <div className="hidden items-center justify-end gap-4 md:flex">
            <NavLink href="#">Login</NavLink>
            <button
              onClick={() => setModalOpen(true)}
              className={[
                "flex-shrink-0 rounded-[999px] bg-[var(--color-text-primary)] px-4 py-[7px]",
                "text-[13px] font-medium text-[var(--color-bg)]",
                "transition-colors duration-200 hover:bg-[var(--color-accent)]",
              ].join(" ")}
            >
              Join Waitlist
            </button>
          </div>
        </motion.nav>
      </header>
    </>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
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
      {children}
    </Link>
  );
}
