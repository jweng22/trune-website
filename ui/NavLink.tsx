"use client";

import NextLink from "next/link";
import { cn } from "@/lib/utils";

interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function NavLink({ href, children, className }: Props) {
  return (
    <NextLink
      href={href}
      className={cn(
        "relative inline-block text-sm font-medium",
        "text-[var(--color-text-secondary)] transition-colors duration-200 hover:text-[var(--color-text-primary)]",
        "after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current",
        "after:transition-[width] after:duration-[220ms] after:ease-[cubic-bezier(0.32,0.72,0,1)]",
        "hover:after:w-full",
        className,
      )}
    >
      {children}
    </NextLink>
  );
}
