/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        
        cravio: "#FF5A1F",

     
        heading: "#000000",
        subheading: "#9097A2",
        nav: "#9CA3AF",
        description: "#C1C1C1",

  
        surface: "#F8F9FA",
        white: "#FFFFFF",
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