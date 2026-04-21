import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

/* ─────────────────────────────────────────────────────────
   AURAPLAY GameCard
   Dark surface · Gold border · Smooth hover
───────────────────────────────────────────────────────── */
interface GameCardProps {
  slug:         string;
  name:         string;
  publisher:    string;
  currencyName: string;
  imageUrl:     string | null;
  featured:     boolean;
}

export default function GameCard({
  slug,
  name,
  publisher,
  currencyName,
  imageUrl,
  featured,
}: GameCardProps) {
  return (
    <Link
      href={`/games/${slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl
                 transition-all duration-500 ease-luxury focus-visible:outline-none
                 focus-visible:ring-2 focus-visible:ring-aura-gold"
      style={{
        background: "var(--aura-surface)",
        border: "1px solid var(--aura-border)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.40)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(212,175,55,0.45)";
        el.style.boxShadow   = "0 8px 40px rgba(0,0,0,0.60), 0 0 24px rgba(212,175,55,0.12)";
        el.style.transform   = "translateY(-4px) scale(1.01)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--aura-border)";
        el.style.boxShadow   = "0 4px 24px rgba(0,0,0,0.40)";
        el.style.transform   = "";
      }}
    >
      {/* ── Featured badge ─────────────────────────── */}
      {featured && (
        <div
          className="absolute top-3 left-3 z-10 badge-exclusive"
          aria-label="Exclusive"
        >
          ◇ EXCLUSIVE
        </div>
      )}

      {/* ── Image / Illustration ───────────────────── */}
      <div
        className="relative aspect-[4/3] w-full overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #111520 0%, #0C1018 100%)",
        }}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-luxury
                       group-hover:scale-105"
          />
        ) : (
          /* Placeholder when no image */
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-display text-5xl font-bold select-none"
              style={{ color: "rgba(212,175,55,0.20)" }}
            >
              {name.charAt(0)}
            </span>
          </div>
        )}

        {/* Subtle gold inner shadow at bottom of image */}
        <div
          className="absolute inset-x-0 bottom-0 h-12 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(15,19,28,0.9) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Card body ──────────────────────────────── */}
      <div className="flex flex-col gap-1.5 p-4 flex-1">
        {/* Game name */}
        <h3
          className="font-display font-semibold text-base leading-tight
                     transition-colors duration-200 group-hover:text-aura-gold"
          style={{ color: "var(--aura-text)" }}
        >
          {name}
        </h3>

        {/* Publisher */}
        <p
          className="font-mono text-[10px] uppercase tracking-[0.12em]"
          style={{ color: "var(--aura-subtle)" }}
        >
          {publisher}
        </p>

        {/* Currency name */}
        <p
          className="text-xs font-medium mt-0.5"
          style={{ color: "var(--aura-muted)" }}
        >
          {currencyName}
        </p>
      </div>

      {/* ── Top Up button row ──────────────────────── */}
      <div
        className="px-4 pb-4"
      >
        <span
          className="flex w-full items-center justify-center gap-2 rounded-xl
                     py-2.5 text-xs font-semibold tracking-wide
                     transition-all duration-300 ease-luxury"
          style={{
            color: "var(--aura-gold)",
            border: "1px solid rgba(212,175,55,0.30)",
            background: "rgba(212,175,55,0.04)",
          }}
          /* Hover handled by parent group via onMouseEnter */
        >
          Top Up
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
            strokeWidth={2}
          />
        </span>
      </div>
    </Link>
  );
}
