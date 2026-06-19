/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ["var(--font-playfair)", "Playfair Display", "serif"],
        sans: ["var(--font-source-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        mediterranean: "#1A4B7A",
        "lemon-gold": "#E8A435",
        terracotta: "#C75B39",
        linen: "#FAF3E0",
        "leaf-green": "#5A8F6E",
      },
    },
  },
  plugins: [],
};
