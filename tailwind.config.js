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
        "screen-80": "80svh",
        "screen-85": "85svh",
        "screen-90": "90svh",
        "screen-95": "95svh",
        "screen-75": "75svh",
        "5/6": "85%",
        "1/10": "10%",
        "2/10": "20%",
        "3/10": "30%",
        "4/10": "40%",
        "5/10": "50%",
        "6/10": "60%",
        "7/10": "70%",
        "8/10": "80%",
        "9/10": "90%",
        "1/20": "5%",
        "3/20": "15%",
        "5/20": "25%",
        "7/20": "35%",
        "9/20": "45%",
        "11/20": "55%",
        "13/20": "65%",
        "15/20": "75%",
        "17/20": "85%",
        "19/20": "95%",
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
        inner: "inset 0 0 0 2px #FFFFFF",
        winInner: "inset 0 0 0 1px black",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        ".main-button-text": {
          "@apply text-base sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl": {},
        },  
        ".subtitle-text" :{
          "@apply text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-3xl": {},
        },
      });
    },
  ],
};
