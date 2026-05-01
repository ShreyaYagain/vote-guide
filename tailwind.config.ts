import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF9933", // Saffron
          50: "#fff8f0",
          100: "#ffedd5",
          200: "#ffdbb0",
          300: "#ffbf7a",
          400: "#ffa44d",
          500: "#FF9933",
          600: "#e67a1a",
          700: "#bf5b14",
          800: "#994a15",
          900: "#7d3e15",
        },
        success: {
          DEFAULT: "#138808", // India Green
          50: "#f0f9f0",
          100: "#dbf0db",
          200: "#b6e0b6",
          300: "#83c783",
          400: "#49a849",
          500: "#138808",
          600: "#0e6b06",
          700: "#0b5405",
          800: "#094304",
          900: "#073703",
        },
        navy: {
          DEFAULT: "#000080",
          dark: "#000060",
          light: "#0000a0",
        },
        cream: {
          DEFAULT: "#FAF7F0",
          dark: "#F0EAD6",
          border: "#D4C4A0", // Sand
        },
        gold: {
          DEFAULT: "#C8960C",
        },
        maroon: {
          DEFAULT: "#7B1C1C",
        },
      },
      fontFamily: {
        heading: ["'Playfair Display'", "serif"],
        sans: ["'DM Sans'", "sans-serif"],
        mono: ["'DM Mono'", "monospace"],
      },
      borderRadius: {
        component: "8px",
        card: "12px",
        xl: "20px",
      },
      backgroundImage: {
        "arch-gradient": "linear-gradient(to bottom, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
