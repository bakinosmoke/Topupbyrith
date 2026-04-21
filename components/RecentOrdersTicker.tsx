"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";

/* ─────────────────────────────────────────────────────────
   AURAPLAY RecentOrdersTicker
   Scrolling live order feed — gold on obsidian
───────────────────────────────────────────────────────── */

interface Order {
  id:       string;
  game:     string;
  amount:   string;
  timeAgo:  string;
}

/* Demo seed data — replace with real API/Prisma query if needed */
const DEMO_ORDERS: Order[] = [
  { id: "1", game: "Mobile Legends", amount: "Weekly Diamond Pass",  timeAgo: "just now"   },
  { id: "2", game: "Free Fire",       amount: "Elite Pass + 100 Dia", timeAgo: "1 min ago"  },
  { id: "3", game: "PUBG Mobile",     amount: "6000 UC",             timeAgo: "2 min ago"  },
  { id: "4", game: "Genshin Impact",  amount: "6480 Genesis Crystals",timeAgo: "4 min ago"  },
  { id: "5", game: "Mobile Legends",  amount: "Twilight Pass",       timeAgo: "5 min ago"  },
  { id: "6", game: "Honor of Kings",  amount: "648 Tokens",          timeAgo: "7 min ago"  },
  { id: "7", game: "Free Fire",       amount: "520 Diamonds",        timeAgo: "9 min ago"  },
  { id: "8", game: "PUBG Mobile",     amount: "1800 UC",             timeAgo: "11 min ago" },
];

export default function RecentOrdersTicker() {
  /* Duplicate orders for seamless infinite scroll */
  const doubled = [...DEMO_ORDERS, ...DEMO_ORDERS];

  return (
    <div
      className="relative w-full overflow-hidden py-4"
      style={{
        borderTop:    "1px solid var(--aura-border)",
        borderBottom: "1px solid var(--aura-border)",
        background:   "rgba(15,19,28,0.55)",
      }}
    >
      {/* Fade masks */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
        style={{
          background:
            "linear-gradient(90deg, var(--aura-bg) 0%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
        style={{
          background:
            "linear-gradient(270deg, var(--aura-bg) 0%, transparent 100%)",
        }}
      />

      {/* Scrolling track */}
      <div
        className="flex gap-0"
        style={{ animation: "scroll 32s linear infinite" }}
      >
        {doubled.map((order, i) => (
          <TickerItem key={`${order.id}-${i}`} order={order} />
        ))}
      </div>
    </div>
  );
}

function TickerItem({ order }: { order: Order }) {
  return (
    <div
      className="flex shrink-0 items-center gap-3 px-8"
      style={{ borderRight: "1px solid var(--aura-border)" }}
    >
      {/* Gold dot pulse */}
      <span className="relative flex h-2 w-2 shrink-0">
        <span
          className="absolute inline-flex h-full w-full rounded-full animate-pulse-gold"
          style={{ background: "var(--aura-gold)", opacity: 0.6 }}
        />
        <span
          className="relative inline-flex h-2 w-2 rounded-full"
          style={{ background: "var(--aura-gold)" }}
        />
      </span>

      {/* Game + amount */}
      <div className="flex items-baseline gap-2 whitespace-nowrap">
        <span
          className="text-xs font-medium"
          style={{ color: "var(--aura-text)" }}
        >
          {order.game}
        </span>

        {/* Separator */}
        <span style={{ color: "var(--aura-border-md)" }}>·</span>

        {/* Amount in monospace */}
        <span
          className="font-mono text-xs font-semibold"
          style={{ color: "var(--aura-gold)" }}
        >
          {order.amount}
        </span>
      </div>

      {/* Time */}
      <span
        className="font-mono text-[10px]"
        style={{ color: "var(--aura-subtle)" }}
      >
        {order.timeAgo}
      </span>
    </div>
  );
}
