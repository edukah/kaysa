// webpack.dev.js (cleaned up ESM version)

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { merge } from 'webpack-merge';
import common from './webpack.common.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const entry = {
  'build.dev.js': path.join(common.context, 'src/js/index.js'),
  'build.dev.junk': path.join(common.context, 'src/scss/main.scss')
};

// mkcert files
const certPath = '/etc/ssl/localcerts/localhost.pem';
const keyPath = '/etc/ssl/localcerts/localhost-key.pem';
let devServerOptions = {};
if(fs.existsSync(certPath) && fs.existsSync(keyPath)){
  devServerOptions = {
    cert: fs.readFileSync(certPath),
    key: fs.readFileSync(keyPath)
  };
}

export default merge(common, {
  mode: 'development',
  entry,
  output: {
    filename: '[name]',
    path: path.join(common.context, 'dev'),
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
      options: devServerOptions
    },
    host: '0.0.0.0',
    allowedHosts: ['localhost', '127.0.0.1'],
    port: 9005,
    devMiddleware: {
      publicPath: '/_hot/'
    },
    open: {
      target: ['https://localhost:9005'],
      app: { name: 'google-chrome' }
    },
    watchFiles: [path.join(common.context, 'src')],
    hot: true,
    compress: true,
    static: [
      { directory: path.join(common.context, 'dev') },
      { directory: path.join(common.context, 'docs') }
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

