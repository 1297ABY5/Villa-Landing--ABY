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
      // Your existing font setup is a best practice.
      fontFamily: {
        sans: ["var(--font-inter)"],
        heading: ["var(--font-playfair)"],
      },

      // --- EXPANDED COLOR PALETTE ---
      // Added darker shades for hover/active states.
      colors: {
        'brand-dark': '#1a202c',       // Sophisticated dark charcoal
        'brand-gold': '#c59d5f',       // Refined, brushed gold
        'brand-gold-dark': '#b38e55',  // Darker gold for hovers
        'brand-light': '#f7fafc',      // Elegant off-white
      },

      // --- CUSTOM SHADOWS ---
      // More subtle and realistic shadows for a premium feel.
      boxShadow: {
        'glow-gold': '0 0 20px 0 rgba(197, 157, 95, 0.3)',
        'soft': '0 4px 12px 0 rgba(0, 0, 0, 0.05)',
      },

      // --- CUSTOM KEYFRAMES ---
      // For unique animations not found in the plugin library.
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'shine': {
          'from': { transform: 'translateX(-100%) skewX(-20deg)' },
          'to': { transform: 'translateX(200%) skewX(-20deg)' },
        },
      },

      // --- CUSTOM ANIMATIONS ---
      // Applying the keyframes to usable animation classes.
      animation: {
        'fade-in-up': 'fade-in-up 1s ease-out forwards',
        'shine': 'shine 1.5s ease-in-out',
      },
    },
  },
  
  // --- PLUGINS ---
  // This is where we add powerful new features to Tailwind.
  plugins: [
    // PLUGIN: For beautiful default styling of CMS/Markdown content.
    require('@tailwindcss/typography'),

    // PLUGIN: For sensible default styles for form elements.
    require('@tailwindcss/forms'),
    
    // PLUGIN: A rich library of animations without writing keyframes manually.
    // See docs: https://github.com/jamiebuilds/tailwindcss-animate
    require('tailwindcss-animate'),

    // CUSTOM PLUGIN: For generating animation-delay utilities.
    // This allows you to write classes like `animation-delay-300` in your HTML.
    plugin(function({ addUtilities }) {
      addUtilities({
        '.animation-delay-100': { 'animation-delay': '100ms' },
        '.animation-delay-200': { 'animation-delay': '200ms' },
        '.animation-delay-300': { 'animation-delay': '300ms' },
        '.animation-delay-400': { 'animation-delay': '400ms' },
        '.animation-delay-500': { 'animation-delay': '500ms' },
        '.animation-delay-700': { 'animation-delay': '700ms' },
        '.animation-delay-1000': { 'animation-delay': '1000ms' },
      })
    })
  ],
};
