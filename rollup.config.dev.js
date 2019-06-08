import baseConfig from './rollup.config.base';
import { name } from './package.json';

const exportName = 'Darkli';

export default {
  ...baseConfig,
  output: [
    {
      file: `dist/${name}.js`,
      format: 'umd',
      name: exportName,
      sourcemap: true,
    },
    {
      file: `dist/${name}.common.js`,
      format: 'cjs',
    },
    {
      file: `dist/${name}.esm.js`,
      format: 'es',
    },
    {
      file: `demo/${name}.js`,
      format: 'umd',
      name: exportName,
      sourcemap: true,
    },
  ],
};
