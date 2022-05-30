const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./public/index.html', './src/**/*.svelte'],
  theme: {
    extend: {},
    screens: {
      'xxs': '420px',
      'xs': '453px',
      ...defaultTheme.screens,
    },
  },
  plugins: [],
}
