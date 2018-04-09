const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const ENV = process.env.NODE_ENV || 'dev';

const isProd = ENV == 'production';

const plugins = [
  new HtmlWebpackPlugin({
    minify: {
      html5: true,
      collapseWhitespace: true,
      removeComments: true,
    },
    template: path.join(__dirname, 'src/index.html'),
    filename: 'index.html',
    inject: 'body',
  }),
  new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css',
  }),
];

if (isProd) {
  plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
}

var VERSION = JSON.stringify(require('./package.json').version).replace(/["']/g, '');

module.exports = env => {
  console.log(
    `|******************* NODE_ENV: ${ENV.toUpperCase()} #### VERSION: ${VERSION} ***********************************|`
  );

  return {
    entry: {
      application: path.join(__dirname, 'src/boot.js'),
      vendor: ['react', 'react-dom'],
    },
    output: {
      filename: '[name].[hash].js',
      path: path.join(__dirname, 'dist'),
    },
    resolve: {
      alias: {
        envs: path.join(__dirname, 'src/envs', ENV),
      },
    },
    module: {
      rules: [
        {
          test: /\.js$|\.jsx$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            plugins: ['transform-decorators-legacy'],
            presets: ['env', 'stage-1', 'react'],
          },
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff',
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file-loader',
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
        },
        {
          test: /\.(png|jpg|jpeg)(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file-loader',
        },
      ],
    },
    plugins: plugins,
    optimization: {
      minimize: isProd,
      runtimeChunk: true,
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
          },
        },
      },
    },
    //paliativo - força atualizar dependencias ao atualizar css
    // acompanhando issue https://github.com/webpack-contrib/mini-css-extract-plugin/issues/23
    cache: isProd,
  };
};
