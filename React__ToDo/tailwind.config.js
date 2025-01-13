/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', /* Tell tailwind adding darkmode via class */
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        'purple': '#3f3cbb',
        'midnight': '#121063',
        'metal': '#565584',
        'tahiti': '#3ab7bf',
        'silver': '#ecebff',
        'bubble-gum': '#ff77e9',
        'bermuda': '#78dcca',
        'red': '#FF0000',
      },
    },
    fontFamily: {
      signature: ["Roboto Slab"],
    }
  },
  plugins: [],
}

