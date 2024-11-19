const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); 
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

const path = require("path");

module.exports = {
  entry: "./src/dashboard.js", 
  output: {
    filename: "[name].[contenthash].js", 
    path: path.resolve(__dirname, "dist"), 
    publicPath: "http://localhost:9000"
  },
  mode: "production",
  // optimization: {
  //   splitChunks: {
  //     chunks: "all",
  //     minSize: 3000,
  //     automaticNameDelimiter: "_",
  //   },
  // },
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: 'asset', 
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, 
          },
        }
      },

      {
        test: /\.txt$/,
        type: "asset/source", 
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
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
        use: ["handlebars-loader"],
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "dashboard.html",
      title: "Dashboard app"
    }),
    new ModuleFederationPlugin({
      name: "dashboard",
      remotes: {
        appOne: "appOne@http://localhost:9001/remoteEntry.js",
        appTwo: "appTwo@http://localhost:9002/remoteEntry.js",
      }
    })   
  ],
};
