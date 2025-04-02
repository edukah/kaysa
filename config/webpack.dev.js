// webpack.dev.js (cleaned up ESM version)

import path from 'path';
import { fileURLToPath } from 'url';
import { merge } from 'webpack-merge';
import common from './webpack.common.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const entry = {
  'kaysa.dev.js': path.join(common.context, 'src/js/index.js'),
  'kaysa.dev.junk': path.join(common.context, 'src/scss/main.scss')
};

export default merge(common, {
  mode: 'development',
  entry,
  output: {
    filename: '[name]',
    path: path.join(common.context, 'dev'),
    chunkFormat: false,
    library: {
      name: 'Kaysa',
      type: 'umd',
      export: 'default'
    },
    globalObject: 'this'
  },
  devServer: {
    devMiddleware: {
      publicPath: '/instant-compiled-folder'
    },
    watchFiles: [path.join(common.context, 'src')],
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    hot: true,
    compress: true,
    open: {
      target: ['https://localhost:9008'],
      app: { name: 'google-chrome' }
    },
    host: '0.0.0.0',
    port: 9008,
    server: 'https',
    webSocketServer: 'sockjs',
    static: [
      { directory: path.join(common.context, 'dev') },
      { directory: path.join(common.context, 'examples') }
    ],
    client: {
      overlay: {
        errors: true,
        warnings: true,
        runtimeErrors: false
      }
    }
  }
});

