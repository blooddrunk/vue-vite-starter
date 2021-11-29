const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',

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

        primary: {
          DEFAULT: 'var(--color-primary)',
        },

        secondary: {
          DEFAULT: 'var(--color-secondary)',
        },

        tertiary: {
          DEFAULT: 'var(--color-tertiary)',
        },

        light: 'var(--color-light)',
        medium: 'var(--color-medium)',
        dark: 'var(--color-dark)',
      },

      spacing: {
        84: '21rem',
        88: '22rem',
      },

      minWidth: (theme) => theme('spacing'),

      maxWidth: (theme) => ({
        ...theme('spacing'),
        '8xl': '88rem',
        '9xl': '96rem',
        '10xl': '104rem',
      }),

      minHeight: (theme) => theme('spacing'),

      maxHeight: (theme) => ({
        ...theme('spacing'),
        '8xl': '88rem',
        '9xl': '96rem',
        '10xl': '104rem',
      }),

      backgroundColor: (theme) => ({
        main: theme('colors.gray.100'),
      }),

      borderWidth: {
        thin: 'thin',
      },

      fontFamily: {
        sans: ['Microsoft YaHei', ...defaultTheme.fontFamily.sans],
      },
    },
  },

  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
  ],
};
