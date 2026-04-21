import { prisma } from "@/lib/prisma";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GameCard from "@/components/GameCard";
import RecentOrdersTicker from "@/components/RecentOrdersTicker";
import HeroCarousel from "@/components/HeroCarousel";
import Link from "next/link";
import {
  Zap,
  ShieldCheck,
  BadgePercent,
  Gamepad2,
  UserRoundCheck,
  CreditCard,
  ArrowRight,
  Search,
  Gem,
} from "lucide-react";

export const dynamic = "force-dynamic";

/* ─────────────────────────────────────────────────────────
   AURAPLAY Homepage
   Luxury Gold × Obsidian — "Top up. Play. Radiate."
───────────────────────────────────────────────────────── */
export default async function HomePage() {
  const [games, banners] = await Promise.all([
    prisma.game.findMany({
      where:   { active: true },
      orderBy: [{ featured: "desc" }, { sortOrder: "asc" }],
    }),
    prisma.heroBanner.findMany({
      where:   { active: true },
      orderBy: { sortOrder: "asc" },
    }),
  ]);

  return (
    <>
      <Header />

      {/* ── Hero Carousel (conditional) ──────────────────── */}
      {banners.length > 0 && (
        <div className="pt-6">
          <HeroCarousel banners={banners} />
        </div>
      )}

      {/* ═══════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 sm:py-32">

        {/* Ambient radial glows */}
        <div
          className="pointer-events-none absolute -top-24 left-1/3 h-[500px] w-[500px]
                     rounded-full bg-aura-gold/[0.06] blur-[130px] animate-float"
        />
        <div
          className="pointer-events-none absolute bottom-0 right-1/4 h-[380px] w-[380px]
                     rounded-full bg-aura-deep/[0.05] blur-[110px] animate-float-slow"
        />

        {/* Fine horizontal rule across full width */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-aura-gold/25 to-transparent" />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">

          {/* VIP Badge */}
          <div
            className="badge-gold mb-8 fade-up"
            style={{ animationDelay: "0ms" }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-aura-gold animate-pulse-gold opacity-90" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-aura-gold" />
            </span>
            Cambodia&apos;s Premium Top-Up Platform
          </div>

          {/* Main Headline — Cormorant Garamond */}
          <h1
            className="font-display font-bold leading-[1.08] tracking-tight fade-up"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5rem)", animationDelay: "80ms" }}
          >
            Top up.{" "}
            <em className="not-italic gold-shimmer-text">Play.</em>
            {" "}Radiate.
          </h1>

          {/* Ornament */}
          <div
            className="mx-auto mt-6 mb-6 w-16 h-px fade-up"
            style={{
              background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
              animationDelay: "140ms",
            }}
          />

          {/* Subtitle */}
          <p
            className="text-base sm:text-lg text-aura-muted max-w-lg mx-auto leading-relaxed fade-up"
            style={{ animationDelay: "180ms" }}
          >
            Mobile Legends, Free Fire, PUBG, Genshin Impact &amp; more.
            Enter your UID, pay securely with KHQR, and receive in seconds.
          </p>

          {/* CTAs */}
          <div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 fade-up"
            style={{ animationDelay: "260ms" }}
          >
            <Link
              href="#games"
              className="btn-luxury-primary group text-sm py-3.5 px-8"
            >
              <Gem className="h-4 w-4" strokeWidth={2} />
              Browse Games
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
              />
            </Link>
            <Link href="/order" className="btn-luxury-ghost py-3.5 px-8 text-sm">
              <Search className="h-4 w-4" strokeWidth={2} />
              Track Order
            </Link>
          </div>

          {/* Trust line */}
          <p
            className="mt-8 text-xs text-aura-subtle tracking-widest uppercase fade-up"
            style={{ animationDelay: "340ms" }}
          >
            Trusted by 10,000+ gamers · Instant delivery · Secure KHQR
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          RECENT ORDERS TICKER
      ═══════════════════════════════════════════════════ */}
      <RecentOrdersTicker />

      {/* ═══════════════════════════════════════════════════
          GAMES GRID
      ═══════════════════════════════════════════════════ */}
      <section id="games" className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-14 fade-up">
          <p className="text-xs font-mono tracking-[0.2em] text-aura-gold uppercase mb-3">
            — Game Catalog —
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-3">
            Choose Your Game
          </h2>
          <p className="text-aura-muted text-sm">
            Select a title below and top up in under a minute.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {games.map((game, i) => (
            <div
              key={game.id}
              className="fade-up"
              style={{ animationDelay: `${Math.min(i, 8) * 55}ms` }}
            >
              <GameCard
                slug={game.slug}
                name={game.name}
                publisher={game.publisher}
                currencyName={game.currencyName}
                imageUrl={game.imageUrl}
                featured={game.featured}
              />
            </div>
          ))}
        </div>

        {/* Empty state */}
        {games.length === 0 && (
          <div className="text-center py-24 text-aura-muted">
            <p className="font-mono text-sm">
              No games yet. Run{" "}
              <code className="text-aura-gold">npm run db:seed</code> to populate.
            </p>
          </div>
        )}
      </section>

      {/* ═══════════════════════════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════════════════════════ */}
      <section className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">

        {/* Fine rule */}
        <div className="divider-gold mb-16 fade-up" />

        <div className="text-center mb-14 fade-up">
          <p className="text-xs font-mono tracking-[0.2em] text-aura-gold uppercase mb-3">
            — Process —
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-3">
            How It Works
          </h2>
          <p className="text-aura-muted text-sm">Three steps. Under a minute.</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {(
            [
              {
                step: "01",
                Icon: Gamepad2,
                title: "Pick a Game",
                desc: "Choose from our curated catalog of popular titles.",
              },
              {
                step: "02",
                Icon: UserRoundCheck,
                title: "Enter Your UID",
                desc: "Just your player ID — no password ever required.",
              },
              {
                step: "03",
                Icon: CreditCard,
                title: "Pay & Receive",
                desc: "Pay with KHQR. Credits arrive within seconds.",
              },
            ] as const
          ).map((s, i) => (
            <div
              key={s.step}
              className="group relative rounded-2xl border bg-aura-surface p-8 text-center
                         transition-all duration-500
                         hover:border-aura-gold/40 hover:-translate-y-1 hover:shadow-glow-gold-sm
                         fade-up"
              style={{
                borderColor: "var(--aura-border)",
                animationDelay: `${i * 100}ms`,
              }}
            >
              {/* Step number — large serif watermark */}
              <span
                className="absolute top-4 right-5 font-display text-6xl font-bold
                           text-aura-gold/[0.07] select-none pointer-events-none leading-none"
              >
                {s.step}
              </span>

              {/* Icon */}
              <div
                className="inline-flex h-14 w-14 items-center justify-center rounded-xl mb-5
                           transition-all duration-500
                           group-hover:scale-110 group-hover:rotate-2"
                style={{
                  background: "rgba(212,175,55,0.10)",
                  border: "1px solid rgba(212,175,55,0.25)",
                  color: "var(--aura-gold)",
                }}
              >
                <s.Icon className="h-6 w-6" strokeWidth={1.5} />
              </div>

              <div
                className="text-[10px] font-mono font-semibold tracking-[0.2em]
                           text-aura-gold uppercase mb-2"
              >
                STEP {s.step}
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-aura-muted leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FEATURES
      ═══════════════════════════════════════════════════ */}
      <section className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-3 gap-5">
          {(
            [
              {
                Icon: Zap,
                title: "Instant Delivery",
                desc: "Credits arrive in seconds, around the clock.",
              },
              {
                Icon: ShieldCheck,
                title: "100% Secure",
                desc: "Only your UID needed. Your account stays safe.",
              },
              {
                Icon: BadgePercent,
                title: "Best Prices",
                desc: "Competitive rates with regular exclusive promos.",
              },
            ] as const
          ).map((f, i) => (
            <div
              key={f.title}
              className="group flex items-start gap-4 rounded-2xl p-6 fade-up
                         transition-all duration-500
                         hover:border-aura-gold/30 hover:bg-aura-surface/80"
              style={{
                border: "1px solid var(--aura-border)",
                background: "rgba(15,19,28,0.50)",
                animationDelay: `${i * 70}ms`,
              }}
            >
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl
                           transition-transform duration-500 group-hover:scale-110"
                style={{
                  background: "rgba(212,175,55,0.10)",
                  color: "var(--aura-gold)",
                }}
              >
                <f.Icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-display font-semibold text-base mb-1">{f.title}</h3>
                <p className="text-xs text-aura-muted leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════════════ */}
      <section id="faq" className="relative mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">

        <div className="divider-gold mb-16 fade-up" />

        <div className="text-center mb-12 fade-up">
          <p className="text-xs font-mono tracking-[0.2em] text-aura-gold uppercase mb-3">
            — Questions —
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold">FAQ</h2>
        </div>

        <div className="space-y-2.5">
          {(
            [
              {
                q: "How long does delivery take?",
                a: "Instant — seconds after payment confirms. Up to 5 minutes during peak hours.",
              },
              {
                q: "Is this safe for my account?",
                a: "Yes. We only need your UID — never your password. Orders go through licensed distributors.",
              },
              {
                q: "What payment methods are accepted?",
                a: "KHQR is fully supported (ABA, Wing, ACLEDA, etc.). More methods are coming soon.",
              },
              {
                q: "Entered the wrong UID?",
                a: "Contact us on Telegram @auraplay immediately. We can fix it before delivery.",
              },
              {
                q: "Do I receive in-game bonuses?",
                a: "Yes! All first-time and event bonuses apply — exactly as if you topped up in-game.",
              },
            ] as const
          ).map((item, i) => (
            <details
              key={i}
              className="group rounded-xl transition-all duration-300
                         open:shadow-glow-gold-sm fade-up"
              style={{
                border: "1px solid var(--aura-border)",
                background: "rgba(15,19,28,0.50)",
                animationDelay: `${i * 60}ms`,
              }}
            >
              <summary
                className="flex cursor-pointer list-none items-center justify-between
                           p-5 text-sm font-semibold select-none
                           group-open:text-aura-gold transition-colors duration-200"
              >
                {item.q}
                {/* ◇ toggle icon */}
                <span
                  className="ml-4 flex h-7 w-7 shrink-0 items-center justify-center
                             rounded-full text-aura-gold
                             transition-transform duration-300 group-open:rotate-45"
                  style={{ border: "1px solid var(--aura-border-md)" }}
                >
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p className="px-5 pb-5 text-sm text-aura-muted leading-relaxed">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════════════ */}
      <section className="relative mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
        <div
          className="relative overflow-hidden rounded-3xl p-10 sm:p-16 text-center
                     fade-up"
          style={{
            border: "1px solid rgba(212,175,55,0.25)",
            background:
              "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(212,175,55,0.09) 0%, rgba(15,19,28,0.9) 65%), #0F131C",
          }}
        >
          {/* Corner glows */}
          <div
            className="pointer-events-none absolute -top-20 -right-20 h-64 w-64
                       rounded-full bg-aura-gold/[0.12] blur-[80px]"
          />
          <div
            className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48
                       rounded-full bg-aura-deep/[0.10] blur-[70px]"
          />

          {/* Diamond ornament */}
          <div className="relative text-aura-gold/40 text-2xl mb-6 select-none">◇</div>

          <h3 className="relative font-display text-3xl sm:text-4xl font-bold mb-3">
            Ready to{" "}
            <span className="gold-gradient">radiate?</span>
          </h3>
          <p className="relative text-aura-muted text-sm mb-8 max-w-sm mx-auto">
            Pick a game and complete your top-up in under a minute.
          </p>

          <Link href="#games" className="btn-luxury-primary relative">
            Browse Games
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
