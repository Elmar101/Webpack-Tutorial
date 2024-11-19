const { CleanWebpackPlugin } = require("clean-webpack-plugin"); 
const HtmlWebpackPlugin = require("html-webpack-plugin");
const  ModuleFederationPlugin  = require("webpack").container.ModuleFederationPlugin;

const path = require("path");

module.exports = {
  entry: {
    home: "./src/home.js",
  }, 
  output: {
    filename: "[name].js", 
    path: path.resolve(__dirname, "dist"), 
    // publicPath: "/static/",
    publicPath: "http://localhost:9001/"
  },
  mode: "development",
  // optimization: {
  //   runtimeChunk: "single",
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
      filename: "home.html",
      title: "index app",
      template: "./src/index.hbs",
      meta:{
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
        description: "home app",
      },
      x: "Welcome to Webpack App!",
      favicon: "./src/assets/images/img1.png",
      minify: false,
    }),
    new ModuleFederationPlugin({
      name: "appOne",
      filename: "remoteEntry.js",
      exposes: {
        "./Button": "./src/components/button/button.js",
      },
    })
  ],
  devServer: {
    port: 9001,
    static: path.resolve(__dirname, 'dist'),
    open: true, 
    devMiddleware: { 
        writeToDisk: true ,
        index: "home.html"
    },
    headers: {
      'Access-Control-Allow-Origin': '*',  // Tüm kaynaklardan erişime izin verir
    },
  }

};
