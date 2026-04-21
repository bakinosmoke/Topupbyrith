"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Gem } from "lucide-react";
import CurrencyToggle from "@/components/CurrencyToggle";

/* ─────────────────────────────────────────────────────────
   AURAPLAY Header
   Sticky · Glass morphism · Gold accents
───────────────────────────────────────────────────────── */
export default function Header() {
  const [menuOpen, setMenuOpen]     = useState(false);
  const [scrolled, setScrolled]     = useState(false);

  /* Add shadow/border once user scrolls */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#games", label: "Games"    },
    { href: "#faq",   label: "FAQ"      },
    { href: "/order", label: "My Order" },
  ];

  return (
    <header
      className="sticky top-0 z-50 w-full transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(8,11,18,0.85)"
          : "rgba(8,11,18,0.50)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled
          ? "1px solid rgba(212,175,55,0.15)"
          : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.45)" : "none",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-6">

          {/* ── Wordmark ──────────────────────────────── */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group select-none shrink-0"
          >
            {/* Diamond icon */}
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg
                         transition-all duration-300 group-hover:shadow-glow-gold-sm"
              style={{
                background: "linear-gradient(135deg, rgba(212,175,55,0.25), rgba(184,134,11,0.15))",
                border: "1px solid rgba(212,175,55,0.35)",
              }}
            >
              <Gem
                className="h-4 w-4 transition-transform duration-300 group-hover:scale-110"
                style={{ color: "var(--aura-gold)" }}
                strokeWidth={1.5}
              />
            </div>

            {/* Wordmark */}
            <span
              className="font-display font-semibold text-xl tracking-[0.04em]
                         transition-all duration-300"
              style={{ color: "var(--aura-text)" }}
            >
              AURA
              <span
                className="transition-colors duration-300 group-hover:text-aura-gold"
                style={{ color: "var(--aura-gold)" }}
              >
                PLAY
              </span>
            </span>
          </Link>

          {/* ── Desktop Nav ───────────────────────────── */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium rounded-lg
                           transition-all duration-200 group"
                style={{ color: "var(--aura-muted)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--aura-text)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--aura-muted)";
                }}
              >
                {link.label}
                <span
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 h-px w-0
                             bg-aura-gold rounded-full transition-all duration-300
                             group-hover:w-4"
                />
              </Link>
            ))}
          </nav>

          {/* ── Right side controls ───────────────────── */}
          <div className="flex items-center gap-3">
            {/* Currency toggle (keeps existing functionality) */}
            <div className="hidden sm:block">
              <CurrencyToggle />
            </div>

            {/* Top Up CTA — desktop */}
            <Link
              href="#games"
              className="hidden md:inline-flex btn-luxury-primary text-xs py-2 px-5"
            >
              Top Up Now
            </Link>

            {/* Hamburger — mobile */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg
                         transition-all duration-200"
              style={{
                border: "1px solid var(--aura-border)",
                color: "var(--aura-gold)",
                background: "rgba(212,175,55,0.05)",
              }}
              aria-label="Toggle menu"
            >
              {menuOpen
                ? <X    size={18} strokeWidth={2} />
                : <Menu size={18} strokeWidth={2} />
              }
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ───────────────────────────────── */}
      {menuOpen && (
        <div
          className="md:hidden border-t px-4 pb-6 pt-4 space-y-1 animate-fade-in"
          style={{
            borderColor: "var(--aura-border)",
            background: "rgba(8,11,18,0.97)",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between w-full rounded-xl px-4 py-3
                         text-sm font-medium transition-all duration-200"
              style={{
                color: "var(--aura-muted)",
                border: "1px solid transparent",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "var(--aura-text)";
                el.style.background = "rgba(212,175,55,0.06)";
                el.style.borderColor = "var(--aura-border)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "var(--aura-muted)";
                el.style.background = "transparent";
                el.style.borderColor = "transparent";
              }}
            >
              {link.label}
            </Link>
          ))}

          {/* Currency toggle in mobile menu */}
          <div className="px-2 pt-2">
            <CurrencyToggle />
          </div>

          <div className="px-2 pt-3">
            <Link
              href="#games"
              onClick={() => setMenuOpen(false)}
              className="btn-luxury-primary w-full justify-center text-sm py-3"
            >
              Top Up Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
