/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50:  '#f0faf4',
          100: '#dcf5e6',
          200: '#bbe9ce',
          300: '#8dd7ae',
          400: '#57be87',
          500: '#33a265',
          600: '#228150',
          700: '#1c6742',
          800: '#1a5136',
          900: '#17432d',
          950: '#0b2519',
        },
      },
    },
  },
  plugins: [],
}
