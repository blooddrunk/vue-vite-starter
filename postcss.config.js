// https://github.com/nuxt/nuxt.js/blob/ed564c3bd8/packages/webpack/src/utils/postcss.js
module.exports = {
  plugins: {
    // https://github.com/tailwindcss/tailwindcss
    tailwindcss: {},

    // https://github.com/csstools/postcss-preset-env
    // defaults to stage 2
    'postcss-preset-env': {
      stage: 1,
    },

    // https://github.com/cssnano/cssnano
    cssnano: import.meta.env.DEV ? false : { preset: 'default' },
  },
};
