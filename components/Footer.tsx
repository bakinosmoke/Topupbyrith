import Link from "next/link";
import { Gem, Send } from "lucide-react";

/* ─────────────────────────────────────────────────────────
   AURAPLAY Footer
───────────────────────────────────────────────────────── */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative mt-8"
      style={{
        borderTop: "1px solid var(--aura-border)",
        background:
          "linear-gradient(180deg, rgba(15,19,28,0.60) 0%, rgba(8,11,18,0.95) 100%)",
      }}
    >
      {/* Subtle top glow line */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.35) 50%, transparent 100%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">

        {/* ── Main footer grid ──────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">

          {/* Brand column */}
          <div className="sm:col-span-1">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group w-fit mb-4">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{
                  background: "rgba(212,175,55,0.12)",
                  border: "1px solid rgba(212,175,55,0.30)",
                }}
              >
                <Gem
                  className="h-4 w-4"
                  style={{ color: "var(--aura-gold)" }}
                  strokeWidth={1.5}
                />
              </div>
              <span
                className="font-display font-semibold text-lg tracking-[0.04em]"
                style={{ color: "var(--aura-text)" }}
              >
                AURA<span style={{ color: "var(--aura-gold)" }}>PLAY</span>
              </span>
            </Link>

            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: "var(--aura-muted)" }}
            >
              Cambodia&apos;s premium game top-up platform.
              Instant delivery, secure payment — every time.
            </p>

            {/* Telegram CTA */}
            <a
              href="https://t.me/auraplay"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 text-sm font-medium
                         transition-all duration-200 group/tg"
              style={{ color: "var(--aura-gold)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--aura-light)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--aura-gold)";
              }}
            >
              <Send className="h-4 w-4 transition-transform duration-200 group-hover/tg:translate-x-0.5" strokeWidth={1.5} />
              @auraplay
            </a>
          </div>

          {/* Navigation column */}
          <div>
            <h4
              className="font-mono text-[10px] tracking-[0.18em] uppercase font-semibold mb-5"
              style={{ color: "var(--aura-gold)" }}
            >
              Platform
            </h4>
            <ul className="space-y-3">
              {[
                { href: "#games",  label: "Game Catalog" },
                { href: "/order",  label: "Track Order"  },
                { href: "#faq",    label: "FAQ"           },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "var(--aura-muted)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "var(--aura-text)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "var(--aura-muted)";
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment column */}
          <div>
            <h4
              className="font-mono text-[10px] tracking-[0.18em] uppercase font-semibold mb-5"
              style={{ color: "var(--aura-gold)" }}
            >
              Payment
            </h4>
            <ul className="space-y-3">
              {["KHQR", "ABA Pay", "Wing", "ACLEDA"].map((method) => (
                <li
                  key={method}
                  className="text-sm"
                  style={{ color: "var(--aura-muted)" }}
                >
                  {method}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Divider ───────────────────────────────── */}
        <div className="divider-gold mb-6" />

        {/* ── Bottom bar ────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-xs"
            style={{ color: "var(--aura-subtle)" }}
          >
            © {currentYear} AURAPLAY. All rights reserved.
          </p>
          <p
            className="text-xs font-display italic"
            style={{ color: "var(--aura-subtle)" }}
          >
            Top up. Play. Radiate.
          </p>
        </div>
      </div>
    </footer>
  );
}
