const babel = require('rollup-plugin-babel');

// https://rollupjs.org/#javascript-api
module.exports = {
  input: 'src/js/darkli.js',
  output: [
    {
      file: 'dist/darkli.js',
      format: 'umd',
    },
    {
      file: 'dist/darkli.common.js',
      format: 'cjs',
    },
    {
      file: 'dist/darkli.esm.js',
      format: 'es',
    },
    {
      file: 'demo/darkli.js',
      format: 'umd',
    },
  ],
  name: 'Darkli',
  plugins: [
    babel({
      exclude: '/node_modules/**',
    }),
  ],
};
