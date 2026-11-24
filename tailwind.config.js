/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        game: {
          bg: '#F7F5EF',
          board: '#FFF8EA',
          border: '#A5D6C4',
          path: '#1C7D88',
          primary: '#FF7F6A',
          primaryHover: '#F26B55',
          ink: '#243B40',
        },
      },
      fontFamily: {
        sans: ['Nunito', 'Quicksand', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -10px rgba(28, 125, 136, 0.14)',
        card: '0 4px 14px -2px rgba(36, 59, 64, 0.08)',
      },
    },
  },
  plugins: [],
};