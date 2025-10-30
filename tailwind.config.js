/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'luxury-black': {
          DEFAULT: '#1a1a1a',
          light: '#2a2a2a',
          dark: '#0a0a0a'
        },
        'luxury-gold': {
          DEFAULT: '#c6a55c',
          light: '#d4b97a',
          dark: '#b8913e'
        },
        'luxury-cream': {
          DEFAULT: '#f9f6f0',
          light: '#fdfcf9',
          dark: '#f5f0e7'
        }
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif']
      },
      borderRadius: {
        'luxury': '0.5rem'
      }
    }
  },
  plugins: []
}
