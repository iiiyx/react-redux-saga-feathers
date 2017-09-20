module.exports = {
  extends: 'react-app',
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        jsxBracketSameLine: true,
        parser: 'flow',
      },
    ],
  },
};
