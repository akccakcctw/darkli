const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        browsers: ['last 2 version', 'ie >= 11'],
      },
      useBuiltIns: 'usage',
      debug: false,
      corejs: 3,
    },
  ],
];

const plugins = [
  '@babel/plugin-proposal-export-default-from',
  '@babel/plugin-proposal-object-rest-spread',
  '@babel/plugin-syntax-dynamic-import',
];

module.exports = {
  presets,
  plugins,
};
