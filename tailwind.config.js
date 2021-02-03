const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  theme: {
    extend: {
      boxShadow: (theme) => ({
        accent: `
          0 0 1px 3px ${theme('colors.blue.600')},
          0 0 1px 5px ${theme('colors.blue.400')}, 
          0 0 1px 7px ${theme('colors.blue.200')}
        `,
      }),
    },
  },
};
