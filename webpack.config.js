const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const outputDirectory = './dist/webclient';

module.exports = {
  resolve: {
    alias: {
      '@template': path.resolve(__dirname, './lib')
    }
  },
  entry: {
    index: './lib/client/client.js'
  },
  output: {
    path: path.join(__dirname, outputDirectory),
    publicPath: '/',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000
            }
          }
        ]
      }
    ]
  },
  devServer: {
    stats: 'minimal',
    host: '0.0.0.0',
    disableHostCheck: true,
    public: 'localhost:3000',
    port: 3000,
    historyApiFallback: true,
    open: false,
    proxy: {
      '/api': 'http://localhost:8182'
    }
  },
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      template: './lib/public/index.html',
      favicon: './lib/public/favicon/favicon.ico',
      chunks: ['index']
    }),
    new webpack.IgnorePlugin(/\.\/locale$/)
  ]
};
