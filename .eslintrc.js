const path = require('path');

module.exports = {
  root: true,
	extends: [
    'airbnb-base',
  ],
	plugins: [
		'import',
	],
  parserOptions: {
    parser: require.resolve('babel-eslint'),
    ecmaVersion: 2018,
    sourceType: 'module',
  },
	env: {
		browser: true,
		es6: true,
	},
	rules: {
		'no-console': 0,
    'no-plusplus': 0,
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    quotes: [
      'error',
      'single',
      {
        'allowTemplateLiterals': true
      },
    ],
	},
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['^@base', path.resolve(__dirname)],
          ['^@', path.resolve(__dirname, 'src')]
        ],
        extensions: ['.js', '.json', '.scss'],
      }
    },
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['test/**'],
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
  },
};
