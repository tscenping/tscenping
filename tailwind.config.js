/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customGreen: "#6DFCAF",        
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
