// webpack.dev.js (cleaned up ESM version)

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { merge } from 'webpack-merge';
import common from './webpack.common.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const entry = {
  'kaysa.dev.js': path.join(common.context, 'src/js/index.js'),
  'kaysa.dev.junk': path.join(common.context, 'src/scss/main.scss')
};

const certPath = '/etc/ssl/localcerts';

export default merge(common, {
  mode: 'development',
  entry,
  output: {
    filename: '[name]',
    path: path.join(common.context, 'dev'),
    chunkFormat: false,
    library: {
      name: 'kaysa',
      type: 'umd',
      export: 'default'
    },
    globalObject: 'this'
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },    
    server: {
      type: 'https',
      options: {
        key: fs.readFileSync(path.join(certPath, 'kaysa-key.pem')),
        cert: fs.readFileSync(path.join(certPath, 'kaysa.pem'))
      }
    },
    // host: '0.0.0.0' ifadesi, bir sunucunun tüm ağ arayüzlerini dinlemesi gerektiğini belirtir. Yani, bu ayarla sunucu yalnızca localhost (127.0.0.1) üzerinden değil, aynı zamanda makinenizin tüm IP adresleri üzerinden de erişilebilir hale gelir.
    host: '0.0.0.0',
    allowedHosts: ['kaysa', 'localhost', '127.0.0.1'],
    port: 9005,
    // webSocketServer: 'sockjs',
    devMiddleware: {
      publicPath: '/instant-compiled-folder'
    },
    open: {
      target: ['https://kaysa:9005'],
      app: { name: 'google-chrome' }
    },
    watchFiles: [path.join(common.context, 'src')],
    hot: true,
    compress: true,
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

