const { CleanWebpackPlugin } = require("clean-webpack-plugin"); 
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;

const path = require("path");

module.exports = {
  entry: {
    image: "./src/image.js"
  }, 
  output: {
    filename: "[name].js", 
    path: path.resolve(__dirname, "dist"), 
    // publicPath: "",
    publicPath: "http://localhost:9002/"
  },
  mode: "development",
  // optimization: {
  //   runtimeChunk: 'single',
  //   splitChunks: {
  //     chunks: "all",
  //     minSize: 3000,
  //     cacheGroups: {
  //       vendor: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: module => (module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/) || [])[1]
  //       }
  //     }
  //   },
  // },
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(png|jpg)$/,
        type: 'asset/inline', 
      },

      {
        test: /\.txt$/,
        type: "asset/source", 
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"], 
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
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "image.html",
      title: "Image App",
      template: "./src/index.hbs",
      meta:{
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
        description: "Image App",
      },
      x: "Welcome to Image App!",
      favicon: "./src/assets/images/img1.png",
      minify: false,
    }),
    new ModuleFederationPlugin({
      name: "appTwo",
      filename: "remoteEntry.js", 
      remotes: {
        appOne: "appOne@http://localhost:9001/remoteEntry.js",
      },
      exposes: {
        "./ImagePage": "./src/pages/image-page/index.js",
      }
    })    
  ],
  devServer: {
    port: 9002,
    static: path.resolve(__dirname, 'dist'),
    open: true, 
    devMiddleware: { 
        writeToDisk: true ,
        index: "image.html",
    },
  }

};
