/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ftai-blue': '#003366',
        'ftai-grey': '#4A5568',
        'ftai-light-blue': '#EBF8FF',
        'ftai-red': '#E53E3E',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 