module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "prefer-const":"off",
    "@typescript-eslint/ban-ts-ignore":"off",
    "@typescript-eslint/type-annotation-spacing":"off",
    "@typescript-eslint/no-explicit-any":0,
    "@typescript-eslint/no-empty-function":0,
    "@typescript-eslint/no-inferrable-types":0,
    "@typescript-eslint/no-this-alias":0
  }
};
