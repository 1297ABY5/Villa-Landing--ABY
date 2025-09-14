/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: "class", // allow dark/light mode
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "3rem",
        xl: "4rem",
        "2xl": "5rem",
      },
    },
    extend: {
      colors: {
        brand: {
          gold: "#D4AF37", // premium gold
          dark: "#0A0A0A", // deep luxury black
          stone: "#2C2C2C", // neutral stone for elegance
          ivory: "#F9F6F1", // luxury light beige
        },
        gray: colors.zinc, // smoother neutral palette
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        display: ["Playfair Display", "serif"], // premium serif
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        premium: "0 8px 24px rgba(0,0,0,0.15)",
        glow: "0 0 20px rgba(212,175,55,0.6)", // golden glow
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in-out",
        slideUp: "slideUp 1s ease-out",
        pulseSlow: "pulse 4s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"), // premium form styling
    require("@tailwindcss/typography"), // better content readability
    require("@tailwindcss/aspect-ratio"), // perfect image ratios
  ],
};
