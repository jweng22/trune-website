import Link from "next/link";
import { Mail } from "lucide-react";

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
      { href: "/legal/terms", label: "Terms of Service" },
      { href: "/legal/privacy", label: "Privacy Policy" },
    ],
  },
];

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23 7s-.27-1.9-1.1-2.74c-1.05-1.1-2.22-1.1-2.76-1.17C16.24 3 12 3 12 3s-4.24 0-7.14.09c-.54.07-1.71.07-2.76 1.17C1.27 5.1 1 7 1 7S.73 9.1.73 11.2v1.93C.73 15.23 1 17.33 1 17.33s.27 1.9 1.1 2.74c1.05 1.1 2.43 1.06 3.05 1.18C7.2 21.4 12 21.45 12 21.45s4.24 0 7.14-.2c.54-.07 1.71-.07 2.76-1.17.83-.84 1.1-2.74 1.1-2.74S23.27 15.23 23.27 13.13V11.2C23.27 9.1 23 7 23 7zM9.74 15.02V8.84l7.46 3.1-7.46 3.08z"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.885v2.27h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
    </svg>
  );
}

const SOCIALS = [
  { href: "https://instagram.com/trunehealth", icon: InstagramIcon, label: "Instagram" },
  { href: "https://x.com/trunehealth", icon: XIcon, label: "X (Twitter)" },
  { href: "https://youtube.com/@trunehealth", icon: YoutubeIcon, label: "YouTube" },
  { href: "mailto:hello@trunehealth.com", icon: () => <Mail size={20} strokeWidth={1.5} />, label: "Email" },
  { href: "https://facebook.com/trunehealth", icon: FacebookIcon, label: "Facebook" },
];

export default function Footer() {
  return (
    <footer style={{ background: "#0A0A0A" }}>
      <style>{`
        .footer-link {
          display: inline-block;
          color: #C0C0BD;
          font-size: 15px;
          padding: 8px 0;
          text-decoration: none;
          border-radius: 999px;
          background: linear-gradient(#FAFAF7, #FAFAF7) no-repeat left center;
          background-size: 0% 100%;
          transition:
            background-size 240ms cubic-bezier(0.32,0.72,0,1),
            color 0ms 120ms,
            padding 240ms cubic-bezier(0.32,0.72,0,1);
        }
        .footer-link:hover {
          color: #0A0A0A;
          padding-left: 14px;
          padding-right: 14px;
          background-size: 100% 100%;
          transition:
            background-size 240ms cubic-bezier(0.32,0.72,0,1),
            color 0ms 0ms,
            padding 240ms cubic-bezier(0.32,0.72,0,1);
        }
        .social-btn {
          display: block;
          color: #8A8A87;
          transition: color 200ms ease, transform 200ms ease;
        }
        .social-btn:hover {
          color: #FAFAF7;
          transform: scale(1.1);
        }
      `}</style>

      {/* Main columns */}
      <div className="mx-auto max-w-7xl px-6" style={{ paddingTop: 100, paddingBottom: 100 }}>
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3
                className="mb-5 text-[12px] font-semibold uppercase"
                style={{ color: "#8A8A87", letterSpacing: "0.12em" }}
              >
                {col.title}
              </h3>
              <ul>
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom row */}
      <div
        className="mx-auto max-w-7xl px-6"
        style={{
          paddingTop: 32,
          paddingBottom: 32,
          borderTop: "0.5px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[20px] font-medium" style={{ color: "#FAFAF7" }}>
              Trune
            </p>
            <p className="mt-1 text-[13px]" style={{ color: "#8A8A87" }}>
              © {new Date().getFullYear()} Trune Health. Built in Baltimore.
            </p>
          </div>

          <ul className="flex items-center gap-5">
            {SOCIALS.map(({ href, icon: Icon, label }) => (
              <li key={label}>
                <Link href={href} aria-label={label} className="social-btn">
                  <Icon />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
