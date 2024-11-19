const { CleanWebpackPlugin } = require("clean-webpack-plugin"); 
const HtmlWebpackPlugin = require("html-webpack-plugin");
const  ModuleFederationPlugin  = require("webpack").container.ModuleFederationPlugin;

const path = require("path");

module.exports = {
  entry: "./src/dashboard.js", 
  output: {
    filename: "[name].js", 
    path: path.resolve(__dirname, "dist"), 
    publicPath: 'http://localhost:9000/'
  },
  mode: "development",
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
      filename: "dashboard.html",
      title: "Dashboard App"
    }),
    new ModuleFederationPlugin({
      name: "DashboardApp",
      remotes: {
        appOne: "appOne@http://localhost:9001/remoteEntry.js",
        appTwo: "appTwo@http://localhost:9002/remoteEntry.js",
      }
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
    historyApiFallback: {
      index: "dasboard.html",
    },
    headers: {
      'Access-Control-Allow-Origin': '*',  // Tüm kaynaklardan erişime izin verir
    },
  }

};
