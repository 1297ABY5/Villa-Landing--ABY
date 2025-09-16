// tailwind.config.js

const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // --- FONTS ---
      fontFamily: {
        // Body text → Roboto (with fallbacks)
        sans: ["Roboto", "Arial", "Helvetica", "sans-serif"],

        // Headings → Segoe UI (with fallbacks)
        heading: ["Segoe UI", "Tahoma", "Geneva", "Verdana", "sans-serif"],
      },

      // --- EXPANDED COLOR PALETTE ---
      colors: {
        'brand-dark': '#1a202c',
        'brand-dark-75': 'rgba(26, 32, 44, 0.75)',
        'brand-gold': '#c59d5f',
        'brand-gold-dark': '#b38e55',
        'brand-light': '#f7fafc',
      },

      // --- CUSTOM SHADOWS ---
      boxShadow: {
        'soft': '0 4px 25px 0 rgba(0, 0, 0, 0.05)',
        'glow-gold': '0 0 25px 0 rgba(197, 157, 95, 0.25)',
      },

      // --- KEYFRAMES ---
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'shine': {
          'from': { transform: 'translateX(-100%) skewX(-20deg)' },
          'to': { transform: 'translateX(200%) skewX(-20deg)' },
        },
      },

      // --- ANIMATIONS ---
      animation: {
        'fade-in-up': 'fade-in-up 1s ease-out forwards',
        'fade-in-down': 'fade-in-down 1s ease-out forwards',
        'fade-in-left': 'fade-in-left 1s ease-out forwards',
        'shine': 'shine 1.5s ease-in-out',
      },
    },
  },

  // --- PLUGINS ---
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.animation-delay-100': { 'animation-delay': '100ms' },
        '.animation-delay-200': { 'animation-delay': '200ms' },
        '.animation-delay-300': { 'animation-delay': '300ms' },
        '.animation-delay-500': { 'animation-delay': '500ms' },
        '.animation-delay-700': { 'animation-delay': '700ms' },
      });
    }),

    plugin(function({ addUtilities, theme }) {
      const textShadows = {
        '.text-shadow-sm': {
          'text-shadow': '0 1px 2px rgba(0, 0, 0, 0.1)',
        },
        '.text-shadow-soft': {
          'text-shadow': '0 2px 10px rgba(0, 0, 0, 0.15)',
        },
        '.text-shadow-glow-gold': {
          'text-shadow': `0 0 15px ${theme('colors.brand-gold')}30`,
        },
      };
      addUtilities(textShadows);
    }),
  ],
};
