import path from 'path';
import { merge } from 'webpack-merge';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import common from './webpack.common.js';

const terserOptions = {
  minimize: true,
  minimizer: [
    new TerserPlugin({
      extractComments: false,
      terserOptions: {
        compress: {
          pure_funcs: ['console.log', 'console.debug']
        },
        format: {
          comments: false,
        },
      }
    })
  ]
};

const distPath = path.join(common.context, 'dist');
const jsEntry = path.join(common.context, 'src/js/index.js');
const cssEntry = path.join(common.context, 'src/scss/main.scss');

// UMD build — <script> tag and require()
const umd = merge(common, {
  mode: 'production',
  entry: {
    'kaysa.min.js': jsEntry,
    'kaysa.min.junk': cssEntry
  },
  output: {
    path: distPath,
    filename: '[name]',
    chunkFormat: false,
    library: {
      name: 'Kaysa',
      type: 'umd',
      export: 'default'
    },
    globalObject: 'this'
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [],
      cleanAfterEveryBuildPatterns: ['**/*.junk'],
      protectWebpackAssets: false
    })
  ],
  optimization: terserOptions
});

// ESM build — import
const esm = merge(common, {
  mode: 'production',
  entry: {
    'kaysa.esm.js': jsEntry
  },
  output: {
    path: distPath,
    filename: '[name]',
    chunkFormat: false,
    library: {
      type: 'module'
    },
    module: true
  },
  experiments: {
    outputModule: true
  },
  optimization: terserOptions
});

export default [umd, esm];
