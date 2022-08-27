const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new htmlWebpackPlugin({
        title: 'Todo List',
        template: './src/index/index.html',
        filename: './index.html',
    })
  ]
};