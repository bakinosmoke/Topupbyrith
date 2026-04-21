import type { Metadata } from "next";
import "./globals.css";
import { prisma } from "@/lib/prisma";
import { CurrencyProvider } from "@/lib/currency";
import RouteProgress from "@/components/RouteProgress";
import AnnouncementBar from "@/components/AnnouncementBar";

/* ── SEO & Social Metadata ───────────────────────────── */
export const metadata: Metadata = {
  title: {
    default:  "AURAPLAY — Premium Game Top-Up",
    template: "%s | AURAPLAY",
  },
  description:
    "Top up Mobile Legends, Free Fire, PUBG, Genshin Impact and more. Instant delivery, secure KHQR payment. Cambodia's most trusted game top-up platform.",
  keywords: [
    "AURAPLAY",
    "game top up Cambodia",
    "mobile legends diamonds",
    "free fire diamonds",
    "PUBG UC",
    "genshin genesis crystals",
    "ABA Pay",
    "KHQR payment",
    "Cambodia top up",
    "instant game credits",
    "top up online",
  ],
  authors:  [{ name: "AURAPLAY" }],
  creator:  "AURAPLAY",
  publisher:"AURAPLAY",
  openGraph: {
    title:       "AURAPLAY — Premium Game Top-Up",
    description: "Instant game top-ups with KHQR · ABA Pay · Wing · ACLEDA. Top up. Play. Radiate.",
    type:        "website",
    locale:      "en_US",
    siteName:    "AURAPLAY",
  },
  twitter: {
    card:        "summary_large_image",
    title:       "AURAPLAY — Premium Game Top-Up",
    description: "Instant game top-ups with KHQR · ABA Pay · Wing · ACLEDA",
  },
  robots: {
    index:  true,
    follow: true,
  },
};

/* ── Root Layout ─────────────────────────────────────── */
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /* Fetch global settings; fail gracefully */
  const settings = await prisma.settings
    .findUnique({ where: { id: 1 } })
    .catch(() => null);

  const exchangeRate = settings?.exchangeRate ?? 4100;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ── Google Fonts ──────────────────────────── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />

        {/* ── Theme colour (browser chrome) ─────────── */}
        <meta name="theme-color" content="#080B12" />
      </head>

      <body>
        {/* Top-of-page navigation progress bar */}
        <RouteProgress />

        {/* Exchange rate context wraps the entire app */}
        <CurrencyProvider exchangeRate={exchangeRate}>
          {/* Global announcement / promo banner */}
          <AnnouncementBar />

          {/* Page content */}
          {children}
        </CurrencyProvider>
      </body>
    </html>
  );
}
