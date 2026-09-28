/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: {
            50: '#f0f9ff',
            100: '#e0f2fe',
            500: '#0284c7',
            600: '#0369a1',
            700: '#075985',
            800: '#0c4a6e',
            900: '#082f49',
          },
          amber: {
            50: '#fffbeb',
            100: '#fef3c7',
            500: '#f59e0b',
            600: '#d97706',
            700: '#b45309',
          },
          red: {
            500: '#ef4444',
            600: '#dc2626',
            700: '#b91c1c',
          },
          green: {
            500: '#22c55e',
            600: '#16a34a',
            700: '#15803d',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', '"Poppins"', '"Noto Sans Devanagari"', 'system-ui', 'sans-serif'],
        devanagari: ['"Poppins"', '"Noto Sans Devanagari"', 'system-ui', 'sans-serif'],
        hindi: ['"Poppins"', '"Noto Sans Devanagari"', 'system-ui', 'sans-serif'],
        marathi: ['"Poppins"', '"Noto Sans Devanagari"', 'system-ui', 'sans-serif'],
        heading: ['"Rozha One"', 'serif']
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-gentle': 'bounce 2s infinite',
        'spin-slow': 'spin 12s linear infinite',
      }
    },
  },
  plugins: [],
}
