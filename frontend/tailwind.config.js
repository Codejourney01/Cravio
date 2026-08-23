/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        cravio: "#FF5A1F",

        heading: "var(--color-heading)",
        subheading: "var(--color-subheading)",
        nav: "var(--color-nav)",
        description: "var(--color-description)",

        surface: "var(--color-surface)",
        card: "var(--color-card)",
        border: "var(--color-border)",

        white: "var(--color-white)",
      },

      borderRadius: {
        cravio: "14px",
      },

      boxShadow: {
        cravio: "0 8px 30px rgba(0, 0, 0, 0.08)",
      },
    },
  },

  plugins: [],
};