const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); 
const HtmlWebpackPlugin = require("html-webpack-plugin");

const path = require("path");

module.exports = {
  entry: {
    home: "./src/home.js",
    image: "./src/image.js",
  }, 
  output: {
    filename: "[name].[contenthash].js", 
    path: path.resolve(__dirname, "dist"), 
    publicPath: "/static/",
  },
  mode: "production",
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 3000
    },
  },
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
      filename: "home.html",
      chunks: ["home"],
      title: "home app",
      template: "./src/index.hbs",
      meta:{
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
        description: "home page",
      },
      x: "Welcome to Webpack App!",
      favicon: "./src/assets/images/img1.png",
      minify: false,
    }),
    new HtmlWebpackPlugin({
      filename: "image.html",
      chunks: ["image"],
      title: "Image App",
      template: "./src/index.hbs",
      meta:{
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
        description: "Image App",
      },
      x: "Welcome to Image App!",
      favicon: "./src/assets/images/img1.png",
      minify: false,
    })       
  ],
};
