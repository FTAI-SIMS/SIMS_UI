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
        brand: {
          navy: '#072E40',
          orange: '#F36B21',
          blue: '#1296BA',
          lightBlue: '#AFDCED',
          yellow: '#F8C630',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 