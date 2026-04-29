/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Deep Mediterranean Blue (#1A4B7A)
        mediterranean: {
          50: '#E8F4FD',
          100: '#C5E5F9',
          200: '#9DD5F4',
          300: '#75C5EF',
          400: '#4BA5E8',
          500: '#1A4B7A',
          600: '#16406A',
          700: '#113356',
          800: '#0D2642',
          900: '#0A1A2E',
          DEFAULT: '#1A4B7A',
        },
        // Deep Navy for dark overlays / footer (#0D3B66)
        'mediterranean-deep': '#0D3B66',
        // Warm Linen / Cream (#FAF3E0)
        linen: {
          50: '#FFFFFF',
          100: '#FDFBF7',
          200: '#FAF3E0',
          300: '#F5EBCC',
          400: '#F0E3B8',
          DEFAULT: '#FAF3E0',
        },
        // Lemon Gold accent (#E8A435)
        'lemon-gold': {
          50: '#FFF9EB',
          100: '#FFF0C7',
          200: '#FFE39A',
          300: '#FFD36D',
          400: '#FFC84A',
          500: '#E8A435',
          600: '#D48E28',
          700: '#B0711E',
          800: '#8C5818',
          900: '#684012',
          DEFAULT: '#E8A435',
        },
        // Warm Amber helper
        amber: {
          DEFAULT: '#D48E28',
        },
        // Terracotta (#C75B39)
        terracotta: {
          50: '#FDF2EE',
          100: '#F9E0D5',
          200: '#F2C0AA',
          300: '#EB9F7F',
          400: '#E5865E',
          500: '#C75B39',
          600: '#B84B30',
          700: '#9A3D28',
          800: '#7D3222',
          900: '#5E261A',
          DEFAULT: '#C75B39',
        },
        // Leaf Green (#5A8F6E)
        'leaf-green': {
          50: '#EDF5EE',
          100: '#D5E8D8',
          200: '#B8D9BD',
          300: '#9BCAA2',
          400: '#7EBB87',
          500: '#5A8F6E',
          600: '#4A7A5A',
          700: '#3A6546',
          800: '#2A5032',
          900: '#1A3B1E',
          DEFAULT: '#5A8F6E',
        },
        // Rich dark text (#2C1810)
        'rich-brown': '#2C1810',
        // Muted text (#6B5B4F)
        'muted-brown': '#6B5B4F',
      },
      fontFamily: {
        heading: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-source-sans)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in-slow': 'fadeIn 1.2s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'ken-burns': 'kenBurns 20s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        kenBurns: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'scale(1.08) translate(-1%, -1%)' },
        },
      },
    },
  },
  plugins: [],
}
