const isDev = process.env.MODE === 'development';

module.exports = {
  root: true,

  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  globals: {
    __DEV__: 'readonly',
  },

  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'plugin:prettier/recommended',
  ],

  parser: 'vue-eslint-parser',

  parserOptions: {
    ecmaVersion: 2021,
  },

  plugins: [],

  rules: {
    'no-console': isDev ? 'error' : 'off',
    'no-debugger': isDev ? 'error' : 'off',

    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',

    'vue/multi-word-component-names': 'off',
  },
};
