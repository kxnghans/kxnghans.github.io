/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "dark-bg": "#1E1F22", // Main background
        "dark-card": "#242529", // Card and element background
        "dark-shadow-light": "#2e2f34", // Light shadow for dark mode
        "dark-shadow-dark": "#1a1b1e", // Dark shadow for dark mode
      },
      keyframes: {
        "gentle-pulse": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.75 },
        },
      },
      animation: {
        "gentle-pulse": "gentle-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
