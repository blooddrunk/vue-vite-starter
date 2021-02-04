const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  prefix: 'tw-',
  important: true,
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',

  theme: {
    extend: {
      screens: {
        '3xl': '1920px',
      },

      colors: {
        cyan: colors.cyan,
        teal: colors.teal,
        orange: colors.orange,

        inherit: 'inherit',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        tertiary: 'var(--color-tertiary)',
        light: 'var(--color-light)',
        medium: 'var(--color-medium)',
        dark: 'var(--color-dark)',
      },

      spacing: {
        84: '21rem',
        88: '22rem',
      },

      backgroundColor: (theme) => ({
        main: theme('colors.gray.100'),
      }),

      borderWidth: {
        thin: 'thin',
      },

      fontFamily: {
        sans: ['Microsoft YaHei', '微软雅黑', ...defaultTheme.fontFamily.sans],
      },
    },
  },

  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
