import path from 'path';
import fs from 'fs';
import { merge } from 'webpack-merge';
import common from './webpack.common.js';

const scriptName = 'kaysa';
const entry = {
  'build.dev.js': path.join(common.context, 'src/js/index.js'),
  'build.dev.junk': path.join(common.context, 'src/scss/main.scss')
};
const devServerConfig = {
  type: 'http',
  host: 'localhost',
  port: 9006,
  get target () {
    return `${this.type}://${this.host}:${this.port}`;
  },
  sslPath: {
    cert: `/etc/ssl/localcerts/${scriptName}.dev.pem`,
    key: `/etc/ssl/localcerts/${scriptName}.dev-key.pem`
  },
  options: {}
};

if(fs.existsSync(devServerConfig.sslPath.cert) && fs.existsSync(devServerConfig.sslPath.key)){
  devServerConfig.type = 'https';
  devServerConfig.host = `${scriptName}.dev`;

  devServerConfig.options = {
    cert: fs.readFileSync(devServerConfig.sslPath.cert),
    key: fs.readFileSync(devServerConfig.sslPath.key)
  };
}

export default merge(common, {
  mode: 'development',
  entry,
  output: {
    filename: '[name]',
    path: path.join(common.context, 'dev'),
    library: {
      name: scriptName,
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
      type: devServerConfig.type,
      options: devServerConfig.options
    },
    host: '0.0.0.0',
    allowedHosts: [devServerConfig.host, 'localhost', '127.0.0.1'],
    port: devServerConfig.port,
    devMiddleware: {
      publicPath: '/_hot/'
    },
    open: {
      target: [devServerConfig.target],
      app: { name: 'google-chrome' }
    },
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