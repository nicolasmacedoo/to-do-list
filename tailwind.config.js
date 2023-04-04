const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      white: '#FFF',
      gray: {
        100: '#F2F2F2',
        200: '#d9d9d9',
        300: '#808080',
        400: '#333333',
        500: '#262626',
        600: '#1A1A1A',
        700: '#0D0D0D',
      },
      purple: {
        200: '#8284FA',
        400: '#5E60CE',
      },
      blue: {
        200: '#4EA8DE',
        500: '#1E6F9F',
      },
      danger: '#E25858',
    },
    extend: {
      content: {
        link: 'url("/public/vector.svg")',
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
}
