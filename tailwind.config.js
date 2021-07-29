module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    boxShadow: {
      neonpink: "0 0 50px rgba(205, 13, 163, 0.25)",
      neonblue: "0 0 50px rgba(105, 177, 244, 0.25)"
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
