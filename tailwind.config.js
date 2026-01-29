/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#1C1C1C',
          orange: '#F97316',
          light: '#FAFAFA',
          gray: '#A1A1AA'
        }
      },
      fontFamily: {
        sans: ['"PP Neue Montreal"', 'sans-serif'],
        pixel: ['"PP Neue Bit"', 'monospace'],
      }
    }
  },
  plugins: [],
}
