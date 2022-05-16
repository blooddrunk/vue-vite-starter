const isDev = process.env.MODE === 'development';

module.exports = {
  root: true,

  env: {
    browser: true,
    es2022: true,
    node: true,
    'vue/setup-compiler-macros': true,
  },

  globals: {
    __DEV__: 'readonly',
    $ref: 'readonly',
    $computed: 'readonly',
    $shallowRef: 'readonly',
    $customRef: 'readonly',
    $toRef: 'readonly',
  },

  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended',
    'plugin:prettier/recommended',
    './.eslintrc-auto-import.json',
  ],

  parser: 'vue-eslint-parser',

  parserOptions: {
    ecmaVersion: 'latest',
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
