import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.ts"],
  theme: {
    extend: {
      colors: {
        paper: "rgb(var(--paper) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        sand: "rgb(var(--sand) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        onaccent: "#141414",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        spin360: { to: { transform: "rotate(360deg)" } },
        pulseDot: { "0%": { transform: "scale(1)", opacity: "0.7" }, "100%": { transform: "scale(2.6)", opacity: "0" } },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        spin360: "spin360 18s linear infinite",
        pulseDot: "pulseDot 1.8s ease-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
