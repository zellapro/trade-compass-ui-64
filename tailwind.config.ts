
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
          green: "#22C55E",
          red: "#EF4444",
          blue: "#3B82F6",
          "blue-light": "#EBF5FF",
          "blue-dark": "#1E40AF",
          purple: "#8B5CF6",
          orange: "#F97316",
          yellow: "#F59E0B"
        },
        zella: {
          background: "#0D0F1A",  // deep slate black
          surface: "rgba(255, 255, 255, 0.05)",  // glass surface
          "cyan-glow": "#00FFFF",  // neon accent 1
          "electric-purple": "#6F00FF",  // neon accent 2
          "primary-text": "#E3E6F3",  // soft white
          "secondary-text": "#A0A4B8",  // muted text
          "positive-signal": "#00FF99",  // glowing mint
          "negative-signal": "#FF4D6D",  // negative signal
          "divider-line": "rgba(255, 255, 255, 0.05)",  // divider lines
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
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" }
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" }
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 10px rgba(0, 255, 255, 0.3)" },
          "50%": { boxShadow: "0 0 20px rgba(0, 255, 255, 0.6)" }
        },
        "border-glow": {
          "0%, 100%": { borderColor: "rgba(0, 255, 255, 0.3)" },
          "50%": { borderColor: "rgba(0, 255, 255, 0.6)" }
        },
        "button-glow": {
          "0%, 100%": { boxShadow: "0 0 5px #6F00FF" },
          "50%": { boxShadow: "0 0 15px #6F00FF" }
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out forwards",
        "scale-in": "scale-in 0.3s ease-out forwards",
        "pulse-glow": "pulse-glow 2s infinite",
        "shimmer": "shimmer 2s infinite linear",
        "float": "float 3s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s infinite",
        "border-glow": "border-glow 2s infinite",
        "button-glow": "button-glow 2s infinite",
      },
      backgroundImage: {
        "gradient-card-glow": "linear-gradient(90deg, #00FFFF 0%, #6F00FF 100%)",
      },
      boxShadow: {
        "neon-glow": "0 0 20px rgba(0, 255, 255, 0.15)",
        "button-glow": "0 0 10px #6F00FF",
        "card-hover": "0 0 30px rgba(0, 255, 255, 0.2)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
