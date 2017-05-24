const babel = require('rollup-plugin-babel');

module.exports = {
  entry: 'src/js/darklight.js',
  targets: [
    {
      dest: 'dist/darklight.js',
    },
    {
      dest: 'dist/darklight.common.js',
      format: 'cjs',
    },
    {
      dest: 'dist/darklight.esm.js',
      format: 'es',
    },
    {
      dest: 'demo/darklight.js',
    },
  ],
  format: 'umd',
  moduleName: 'Darklight',
  plugins: [
    babel({
      exclude: '/node_modules/**',
    }),
  ],
};
