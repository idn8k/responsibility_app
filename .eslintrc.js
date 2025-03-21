module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'next/core-web-vitals', // Next.js recommended ESLint rules
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    quotes: ['error', 'single', { avoidEscape: true }],
    'no-unused-vars': 'warn',
    'no-console': 'warn',
  },
};
