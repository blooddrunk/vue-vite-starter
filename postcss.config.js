const isDev = process.env.MODE === 'development';

module.exports = () => {
  return {
    plugins: {
      // https://github.com/csstools/postcss-preset-env
      // defaults to stage 2
      'postcss-preset-env': {
        stage: 2,
        features: { 'nesting-rules': false },
      },

      // https://github.com/cssnano/cssnano
      cssnano: isDev ? false : { preset: 'default' },

      'tailwindcss/nesting': {},

      // https://github.com/tailwindcss/tailwindcss
      tailwindcss: {},
    },
  };
};
