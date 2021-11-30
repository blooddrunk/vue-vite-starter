const isDev = process.env.MODE === 'development';

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
    cssnano: isDev ? false : { preset: 'default' },
  },
};
