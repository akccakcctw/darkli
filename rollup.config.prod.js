import { uglify } from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';

import baseConfig from './rollup.config.base';
import { name, version, author } from './package.json';

const exportName = 'Darkli';
const banner = `${'/*!\n'}`
  + ` * ${exportName} v${version}\n`
  + ` * (c) ${new Date().getFullYear()} ${author}\n`
  + ' * Released under the MIT License.\n'
  + ' */';

export default [
  // .js, .cjs.js, .esm.js
  {
    ...baseConfig,
    output: [
      {
        file: `dist/${name}.js`,
        format: 'umd',
        name: exportName,
        banner,
        sourcemap: true,
      },
      {
        file: `dist/${name}.common.js`,
        format: 'cjs',
        banner,
      },
      {
        file: `dist/${name}.esm.js`,
        format: 'esm',
        banner,
      },
      {
        file: `demo/${name}.js`,
        format: 'umd',
        name: exportName,
        banner,
        sourcemap: true,
      },
    ],
    plugins: [
      ...baseConfig.plugins,
    ],
  },
  // .min.js
  {
    ...baseConfig,
    output: [
      {
        file: `dist/${name}.min.js`,
        format: 'umd',
        name: exportName,
        banner,
      },
    ],
    plugins: [
      ...baseConfig.plugins,
      uglify({
        compress: {
          drop_console: true,
        },
      }, minify),
    ],
  },
];
