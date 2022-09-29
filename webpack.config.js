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
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
        title: 'Todo List',
        template: './src/index.html',
        filename: './index.html',
        meta: {
          'og:site_name': {property: 'og:site_name', content: 'davidcorcoran.ie'},
          'og:title': {property: 'og:title', content: 'Todo List'},
          'og:image': {property: 'og:image', content: 'https://i.imgur.com/YlmXkeL.png'},
          'og:description': {property: 'og:description', content: 'A simple todo list for The Odin Project.'},
          'og:url': {property: 'og:url', content: 'https://www.davidcorcoran.ie/odin-todo-list/'},
        }
    })
  ]
};