const TerserWebpackPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); 
const HtmlWebpackPlugin = require("html-webpack-plugin");

const path = require("path");

module.exports = {
  entry: "./src/index.js", 
  output: {
    filename: "[name].[contenthash].js", 
    path: path.resolve(__dirname, "dist"), 
    // publicPath: "dist/", 
    publicPath: "",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: 'asset/resource',
      },
      // {
      //   test: /\.(png|jpg)$/,
      //   type: 'asset/inline', 
      // },
      // {
      //   test: /\.(png|jpg)$/,
      //   type: 'asset', 
      //   parser: {
      //     dataUrlCondition: {
      //       maxSize: 2 * 1024, 
      //     },
      //   }
      // },

      {
        test: /\.txt$/,
        type: "asset/source", 
      },
      {
        test: /\.css$/,
        // use: ["style-loader", "css-loader"],
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        // use: ["style-loader", "css-loader", "sass-loader"], 
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
      {
        test: /\.hbs$/,
        // use: [{loader:"handlebars-loader"}],
        use: ["handlebars-loader"],
      }
    ],
  },
  plugins: [
    new TerserWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Webpack App",
      template: "./src/index.hbs",
      meta:{
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
        description: "Webpack App",
      },
      x: "Welcome to Webpack App!",
    })     
  ],
};
