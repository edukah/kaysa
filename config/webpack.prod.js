// webpack.prod.js (cleaned and converted to ESM)

import path from 'path';
import { fileURLToPath } from 'url';
import { merge } from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import common from './webpack.common.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const entry = {
  'kaysa.min.js': path.join(common.context, 'src/js/index.js'),
  'kaysa.min.junk': path.join(common.context, 'src/scss/main.scss')
};

export default merge(common, {
  mode: 'production',
  entry,
  output: {
    path: path.join(common.context, 'dist'),
    filename: '[name]',
    chunkFormat: false,
    library: {
      name: 'Kaysa',
      type: 'umd',
      export: 'default'
    },
    globalObject: 'this'
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      })
    ]
  }
});

