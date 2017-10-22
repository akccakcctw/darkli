const babel = require('rollup-plugin-babel');

// https://rollupjs.org/#javascript-api
module.exports = {
  input: 'src/js/darklight.js',
  output: [
    {
      file: 'dist/darklight.js',
      format: 'umd',
    },
    {
      file: 'dist/darklight.common.js',
      format: 'cjs',
    },
    {
      file: 'dist/darklight.esm.js',
      format: 'es',
    },
    {
      file: 'demo/darklight.js',
      format: 'umd',
    },
  ],
  name: 'Darklight',
  plugins: [
    babel({
      exclude: '/node_modules/**',
    }),
  ],
};
