import Link from "next/link";

const COLUMNS = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Product",
    links: [
      { href: "/#faq", label: "FAQ" },
      { href: "/#roadmap", label: "Roadmap" },
      { href: "/#beta", label: "Beta" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "mailto:hello@trunehealth.com?subject=Feature%20request", label: "Request a feature" },
      { href: "mailto:hello@trunehealth.com?subject=Bug%20report", label: "Report a bug" },
      { href: "mailto:hello@trunehealth.com", label: "Contact us" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal/terms", label: "Terms" },
      { href: "/legal/privacy", label: "Privacy" },
    ],
  },
];

const SOCIALS = [
  { href: "https://instagram.com/trunehealth", label: "Instagram" },
  { href: "https://x.com/trunehealth", label: "X" },
  { href: "https://youtube.com/@trunehealth", label: "YouTube" },
  { href: "mailto:hello@trunehealth.com", label: "Email" },
  { href: "https://facebook.com/trunehealth", label: "Facebook" },
];

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-xs font-medium uppercase tracking-wider text-[var(--color-text-tertiary)]">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-[var(--color-border)] pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-[var(--color-text-tertiary)]">
            © {new Date().getFullYear()} Trune Health, Inc.
          </p>
          <ul className="flex flex-wrap gap-6">
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <Link
                  href={social.href}
                  className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
                >
                  {social.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
