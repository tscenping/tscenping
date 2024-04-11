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
      height: {
        'screen-80': '80vh',
        'screen-85': '85vh',
        'screen-90': '90vh',
        'screen-95': '95vh',
        'screen-75': '75vh',
      },
      width: {
        'screen-50': '50vw',
        'screen-80': '80vw',
        'screen-85': '85vw',
        'screen-90': '90vw',
        'screen-95': '95vw',
        'screen-75': '75vw',
        '1/10': '10%',
        
      }
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
