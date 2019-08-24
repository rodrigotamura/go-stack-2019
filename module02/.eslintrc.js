module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'class-methods-use-this': 'off', // it will disable to put 'this' auto
    'no-param-reassign': 'off', // allow to receive and make changes of params
    camelcase: 'off', // avoiding camelCase
    // ESlint does not allow to declare variables that we are not using
    // so, at the follow config we are escaping 'next' variable
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
  },
};
