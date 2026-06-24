/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#3e3129',
        'brand-light': '#fdfbf9',
      }
    },
  },
  plugins: [],
}