import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        sand: "#F5F0E8",
        ivory: "#FAF7F2",
        cream: "#EDE8DF",
        charcoal: "#1C1A18",
        "warm-gray": "#6B6560",
        champagne: "#C9A96E",
        "champagne-light": "#E8D5A3",
        glow: "#D4784A",
        line: "#E2DAD0"
      },
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"]
      },
      boxShadow: {
        soft: "0 20px 70px rgba(28, 26, 24, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
