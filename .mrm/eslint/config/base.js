module.exports = {
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      { arrowParens: 'always', singleQuote: true, trailingComma: 'none' }
    ],
    strict: 'error'
  }
};
