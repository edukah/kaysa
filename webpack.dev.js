import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';
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
  port: 9003,
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

let browserApp;
try { execSync('which firefox', { stdio: 'ignore' }); browserApp = 'firefox'; } catch {}

export default merge(common, {
  mode: 'development',

  // Filesystem Cache — değişmeyen dosyaları yeniden derlemez, rebuild'leri dramatik hızlandırır.
  cache: { type: 'filesystem' },

  // Source Map Hafifletmesi (Hız Aşırtma)
  // Ağır source-map yerine, dev modunda çok daha hızlı çalışan bu versiyonu kullanıyoruz.
  devtool: 'eval-cheap-module-source-map',

  // İzleme (Watch) Kısıtlamaları
  watchOptions: {
    // Claude'un ve gereksiz klasörlerin izlenmesini tamamen yasaklıyoruz
    ignored: ['**/node_modules', '**/.claude/**', '**/.git/**', '**/*.log'],
    // Ufak değişikliklerde anında derlemek yerine 600 milisaniye bekleyip topluca derler.
    // Bu, tarayıcıya üst üste DDOS atılmasını engeller.
    aggregateTimeout: 600,
  },

  entry,
  output: {
    filename: '[name]',
    path: path.join(common.context, 'dev'),
    library: {
      name: 'Kaysa',
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
      ...(browserApp && { app: { name: browserApp } })
    },
    hot: false,
    liveReload: true,
    // Dev modunda gzip sıkıştırma gereksiz CPU yükü — tarayıcıya ham gönder.
    compress: false,
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