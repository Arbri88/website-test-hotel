/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        mediterranean: '#1A4B7A',
        'mediterranean-deep': '#0D3B66',
        'lemon-gold': '#E8A435',
        terracotta: '#C75B39',
        linen: '#FAF3E0',
        'leaf-green': '#5A8F6E',
        cerulean: '#0D3B66',
        amber: '#D4A574',
        'rose-warm': '#E8B4A0',
      },
      fontFamily: {
        heading: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-source-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
