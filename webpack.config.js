const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = (_, argv) => {
  const prod = argv.mode === "production";

  return {
    entry: "./src/index.tsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
      clean: true,
      publicPath: prod ? "./" : "/",
    },
    resolve: { extensions: [".tsx", ".ts", ".js"] },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: "babel-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            prod ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp)$/i,
          type: "asset/resource",
          use: prod
            ? [
                {
                  loader: "image-webpack-loader",
                  options: {
                    mozjpeg: { progressive: true },
                    optipng: { enabled: true },
                    pngquant: { quality: [0.65, 0.9], speed: 4 },
                    gifsicle: { interlaced: false },
                    webp: { quality: 75 },
                  },
                },
              ]
            : [],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "public/template.html",
        inject: "body",
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "public", "favicon.ico"),
            to: "",
          },
        ],
      }),
      ...(prod
        ? [
            new MiniCssExtractPlugin({
              filename: "[name].[contenthash].css",
            }),
          ]
        : []),
    ],
    optimization: {
      minimize: prod,
      minimizer: ["...", ...(prod ? [new CssMinimizerPlugin()] : [])],
    },
    devServer: {
      port: 3000,
      hot: true,
      static: path.resolve(__dirname, 'public'),
      historyApiFallback: true,
      client: {
        overlay: true,
        logging: 'info',
      },
    },
    devtool: prod ? false : "source-map",
  };
};
