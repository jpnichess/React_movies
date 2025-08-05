/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'h-[35rem]',
    'max-w-[25rem]',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}