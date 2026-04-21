import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── AURAPLAY Brand Palette ─────────────────────────── */
        "aura-gold":    "#D4AF37",   // primary gold
        "aura-deep":    "#B8860B",   // hover / deep gold
        "aura-light":   "#F0D060",   // light gold highlight
        "aura-bg":      "#080B12",   // obsidian background
        "aura-surface": "#0F131C",   // card/surface background
        "aura-card":    "#111520",   // slightly lighter card
        "aura-elevated":"#171C2A",   // elevated surfaces
        "aura-text":    "#F5F3EF",   // warm white text
        "aura-muted":   "#9A9287",   // muted stone text
        "aura-subtle":  "#5C5550",   // very muted text
        /* Border shorthands - use /opacity in Tailwind 3 */
        "aura-border":  "rgba(212,175,55,0.18)",
      },

      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans:    ["Inter",             "system-ui", "sans-serif"],
        mono:    ['"JetBrains Mono"',  "monospace"],
      },

      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
      },

      boxShadow: {
        "glow-gold":    "0 0 20px rgba(212,175,55,0.25)",
        "glow-gold-sm": "0 0 10px rgba(212,175,55,0.15)",
        "glow-gold-lg": "0 0 48px rgba(212,175,55,0.35)",
        "glow-gold-xl": "0 0 80px rgba(212,175,55,0.20)",
        "card":         "0 4px 24px rgba(0,0,0,0.45)",
        "card-hover":   "0 8px 40px rgba(0,0,0,0.65)",
      },

      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #D4AF37 0%, #F0D060 50%, #B8860B 100%)",
        "gold-gradient-h":
          "linear-gradient(90deg, #B8860B 0%, #D4AF37 50%, #F0D060 100%)",
        "surface-gradient":
          "linear-gradient(180deg, #0F131C 0%, #080B12 100%)",
        "card-gradient":
          "linear-gradient(145deg, #111520 0%, #0C1018 100%)",
        "gold-shimmer":
          "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.15) 50%, transparent 100%)",
      },

      animation: {
        float:        "float 7s ease-in-out infinite",
        "float-slow": "float 12s ease-in-out infinite",
        "fade-up":    "fadeUp 0.65s ease-out forwards",
        "fade-in":    "fadeIn 0.4s ease-out forwards",
        shimmer:      "shimmer 3s linear infinite",
        scroll:       "scroll 28s linear infinite",
        "pulse-gold": "pulseGold 2.5s ease-in-out infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
      },

      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%":     { transform: "translateY(-14px)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(22px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        scroll: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseGold: {
          "0%,100%": { opacity: "1" },
          "50%":     { opacity: "0.55" },
        },
        glowPulse: {
          "0%,100%": { boxShadow: "0 0 12px rgba(212,175,55,0.2)" },
          "50%":     { boxShadow: "0 0 28px rgba(212,175,55,0.45)" },
        },
      },

      transitionTimingFunction: {
        luxury: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },

      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
