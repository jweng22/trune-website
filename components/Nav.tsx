import Link from "next/link";

const NAV_LINKS = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/methodology", label: "Methodology" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-[var(--color-text-primary)]"
        >
          Trune
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/#waitlist"
          className="inline-flex h-9 items-center rounded-[var(--radius-pill)] bg-[var(--color-text-primary)] px-4 text-sm font-medium text-[var(--color-bg)] transition-colors hover:bg-[var(--color-accent)]"
        >
          Join waitlist
        </Link>
      </nav>
    </header>
  );
}
