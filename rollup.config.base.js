import path from 'path';
import alias from 'rollup-plugin-alias';
import { eslint } from 'rollup-plugin-eslint';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import json from 'rollup-plugin-json';

// https://rollupjs.org/guide/en#configuration-files
export default {
  input: 'src/js/darkli.js',
  plugins: [
    alias({
      resolve: ['.js', '.json'],
      '@base': path.resolve(__dirname),
      '@': path.resolve(__dirname, './src'),
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    eslint({
      include: ['src/**/*.js'],
    }),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
    }),
    json(),
  ],
};
