// webpack.common.js (cleaned and converted to ESM)

import path from 'path';
import { fileURLToPath } from 'url';
import ESLintPlugin from 'eslint-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base directory of the project
const context = path.resolve(__dirname, '..');

const eslintOptions = {
  context,
  extensions: ['js'],
  exclude: ['/node_modules/'],
  overrideConfigFile: path.join(context, 'config/eslint.config.js')
};

export default {
  context,
  devtool: false,
  plugins: [
    new ESLintPlugin(eslintOptions),
    new MiniCssExtractPlugin({
      filename: ({ chunk }) => `${chunk.name.replace(/\.junk$/, '.css')}`
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [],
      cleanAfterEveryBuildPatterns: [path.join(context, '**/*.junk')]
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            configFile: path.join(context, 'config/babel.config.js')
          }
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: { api: 'modern' }
          }
        ]
      }
    ]
  }
};
