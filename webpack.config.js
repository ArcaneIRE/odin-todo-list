const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: '[local]--[hash:base64:5]'
              }
            },
          }
        ],
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
        title: 'Todo List',
        template: './src/index.html',
        filename: './index.html',
    })
  ]
};