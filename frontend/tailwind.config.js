/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customCharcoal: "#2C3333",
        customDarkTeal: "#2E4F4F",
        customTealBlue: "#0E8388",
        customGrayishCyan: "#CBE4DE",
      },
    },
  },
  plugins: [],
};
