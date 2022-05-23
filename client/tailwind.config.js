const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./public/index.html', './src/**/*.svelte'],
  theme: {
    extend: {},
    screens: {
      'xs': '490px',
      ...defaultTheme.screens,
    },
  },
  plugins: [],
}
