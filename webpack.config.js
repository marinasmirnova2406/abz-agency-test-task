const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (_, argv) => {
  const prod = argv.mode === 'production';

  return {
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      clean: true,
      publicPath: prod ? './' : '/'
    },
    resolve: { extensions: ['.tsx', '.ts', '.js'] },
    module: {
      rules: [
        { test: /\.(ts|tsx)$/, use: 'babel-loader', exclude: /node_modules/ },
        { test: /\.s[ac]ss$/i, use: ['style-loader', 'css-loader', 'sass-loader'] }
      ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: 'public/template.html',
          inject: 'body',
          favicon: path.resolve(__dirname, 'public', 'favicon.ico')
        }),
        new CopyWebpackPlugin({
          patterns: [
            {
              from: path.resolve(__dirname, 'public', 'favicon.ico'),
              to: ''
            }
          ]
        })
      ],
    devServer: {
      port: 3000,
      hot: true,
      static: false,
      historyApiFallback: true
    },
    devtool: prod ? false : 'source-map'
  };
};