
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        trading: {
          green: "hsl(var(--trading-green))",
          red: "hsl(var(--trading-red))",
          blue: "hsl(var(--trading-blue))",
          purple: "hsl(var(--trading-purple))",
          yellow: "hsl(var(--trading-yellow))",
          "blue-light": "hsl(var(--trading-blue-light))",
          "blue-dark": "hsl(var(--trading-blue-dark))",
          "green-light": "hsl(var(--trading-green-light))",
          "green-dark": "hsl(var(--trading-green-dark))",
          "red-light": "hsl(var(--trading-red-light))",
          "red-dark": "hsl(var(--trading-red-dark))",
          "yellow-light": "hsl(var(--trading-yellow-light))",
          "yellow-dark": "hsl(var(--trading-yellow-dark))",
          orange: "#F97316"
        },
        glass: {
          bg: "hsl(var(--glass-bg) / 0.4)",
          border: "hsl(var(--glass-border) / 0.1)",
        },
        glow: {
          purple: "hsl(var(--glow-purple))",
          cyan: "hsl(var(--glow-cyan))",
          blue: "hsl(var(--glow-blue))",
          gold: "hsl(var(--glow-gold))", // New gold glow for premium theme
        },
        tooltip: {
          bg: "hsl(var(--tooltip-bg))",
        },
        scrollbar: {
          thumb: "hsl(var(--scrollbar-thumb))",
          track: "hsl(var(--scrollbar-track))",
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "theme-transition": {
          "0%": { opacity: "0.9", filter: "blur(2px)" },
          "100%": { opacity: "1", filter: "blur(0px)" },
        },
        "pulse-glow": {
          "0%, 100%": { 
            boxShadow: "0 0 5px 1px hsl(var(--glow-gold) / 0.5)" 
          },
          "50%": { 
            boxShadow: "0 0 10px 3px hsl(var(--glow-gold) / 0.7)" 
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "theme-transition": "theme-transition 0.2s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
