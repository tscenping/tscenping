/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        customGreen: '#6DFCAF',
        buttonBg: '#424242',
        defaultBg: '#2D2D2D',
      },
    },
  },
  plugins: [],
}

