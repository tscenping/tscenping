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
        xxs: { min: "320px", max: "360px" },
        xs: { min: "360px", max: "432px" },
      },
      height: {
        "screen-80": "80vh",
        "screen-85": "85vh",
        "screen-90": "90vh",
        "screen-95": "95vh",
        "screen-75": "75vh",
        "5/6": "85%",
        "9/10": "90%",
        "4/5": "80%",
      },
      width: {
        "screen-50": "50vw",
        "screen-80": "80vw",
        "screen-85": "85vw",
        "screen-90": "90vw",
        "screen-95": "95vw",
        "screen-75": "75vw",
        "1/10": "10%",
        "9/10": "90%",
      },
      maxWidth: {
        "3/5": "60%",
      },
      boxShadow: {
        inner: 'inset 0 0 0 2px #FFFFFF'
      }
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
