const path = require('path');

module.exports = {
	"extends": "airbnb-base",
	"plugins": [
		"import"
	],
	"env": {
		"browser": true,
		"es6": true,
	},
	"rules": {
		"no-console": 0,
    "no-plusplus": 0,
    "no-param-reassign": 0,
    "no-underscore-dangle": 0,
	},
  "settings": {
    "import/resolver": {
      alias: {
        map: [
          ['^@base', path.resolve(__dirname)],
          ['^@', path.resolve(__dirname, 'src')]
        ],
        extensions: ['.js', '.json', '.scss'],
      }
    },
  }
};
