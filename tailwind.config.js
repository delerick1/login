/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '16': 'repeat(16, minmax(0, 1fr))',
        '13': 'repeat(13, minmax(0, 1fr))',
        '10': 'repeat(10, minmax(0, 1fr))',
      }
    },
  },
  plugins: [],
}