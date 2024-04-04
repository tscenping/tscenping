/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customGreen: "#6DFCAF",
        defaultBg: "#2D2D2D",
      },
      screens: {
        xs: { min: "360px", max: "400px" },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
