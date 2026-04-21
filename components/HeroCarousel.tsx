"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ─────────────────────────────────────────────────────────
   AURAPLAY HeroCarousel
   Full-width banner — gold indicators · auto-advance
───────────────────────────────────────────────────────── */

interface Banner {
  id:         string;
  imageUrl:   string;
  linkUrl?:   string | null;
  altText?:   string | null;
  sortOrder:  number;
}

interface HeroCarouselProps {
  banners: Banner[];
}

const AUTOPLAY_MS = 5500;

export default function HeroCarousel({ banners }: HeroCarouselProps) {
  const [active, setActive]   = useState(0);
  const [paused, setPaused]   = useState(false);

  const total = banners.length;

  const prev = useCallback(() =>
    setActive((i) => (i - 1 + total) % total), [total]);

  const next = useCallback(() =>
    setActive((i) => (i + 1) % total), [total]);

  /* Auto-advance */
  useEffect(() => {
    if (paused || total <= 1) return;
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [next, paused, total]);

  if (total === 0) return null;

  return (
    <div
      className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Slide track ──────────────────────────── */}
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{
          border:      "1px solid var(--aura-border)",
          aspectRatio: "16 / 5",
          background:  "var(--aura-surface)",
        }}
      >
        {banners.map((banner, i) => (
          <div
            key={banner.id}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === active ? 1 : 0, pointerEvents: i === active ? "auto" : "none" }}
          >
            {banner.linkUrl ? (
              <Link href={banner.linkUrl} className="block h-full w-full">
                <SlideImage banner={banner} />
              </Link>
            ) : (
              <SlideImage banner={banner} />
            )}
          </div>
        ))}

        {/* Bottom gradient */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
          style={{
            background:
              "linear-gradient(to top, rgba(8,11,18,0.70) 0%, transparent 100%)",
          }}
        />

        {/* ── Prev / Next arrows ─────────────────── */}
        {total > 1 && (
          <>
            <CarouselBtn side="left"  onClick={prev} />
            <CarouselBtn side="right" onClick={next} />
          </>
        )}
      </div>

      {/* ── Gold dot indicators ────────────────── */}
      {total > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="rounded-full transition-all duration-300 focus-visible:outline-none
                         focus-visible:ring-2 focus-visible:ring-aura-gold"
              style={{
                width:      i === active ? "24px"  : "8px",
                height:     "8px",
                background: i === active
                  ? "linear-gradient(90deg, #D4AF37, #F0D060)"
                  : "rgba(212,175,55,0.25)",
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Slide image sub-component ───────────────────────── */
function SlideImage({ banner }: { banner: Banner }) {
  return (
    <Image
      src={banner.imageUrl}
      alt={banner.altText ?? "AURAPLAY Banner"}
      fill
      priority
      sizes="(max-width: 1280px) 100vw, 1280px"
      className="object-cover"
      draggable={false}
    />
  );
}

/* ── Arrow button sub-component ──────────────────────── */
function CarouselBtn({
  side,
  onClick,
}: {
  side: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 -translate-y-1/2 z-10
                 flex h-9 w-9 items-center justify-center rounded-full
                 transition-all duration-200
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aura-gold"
      style={{
        [side]:      "12px",
        background:  "rgba(8,11,18,0.70)",
        border:      "1px solid rgba(212,175,55,0.30)",
        color:       "var(--aura-gold)",
        backdropFilter: "blur(8px)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background   = "rgba(212,175,55,0.15)";
        el.style.borderColor  = "rgba(212,175,55,0.60)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background   = "rgba(8,11,18,0.70)";
        el.style.borderColor  = "rgba(212,175,55,0.30)";
      }}
      aria-label={side === "left" ? "Previous slide" : "Next slide"}
    >
      {side === "left"
        ? <ChevronLeft  size={18} strokeWidth={2} />
        : <ChevronRight size={18} strokeWidth={2} />
      }
    </button>
  );
}
