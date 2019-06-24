// webpack.config.js

const path = require('path');
//Html插件
let HtmlWebpackPlugin = require('html-webpack-plugin');
// 拆分css样式的插件
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry: {
      index:'./src/index.js',    // 入口文件
      login:"./src/login.js"
    },
    output: {
      // 添加hash可以防止文件缓存，每次都会生成4位的hash串
      filename: 'bundle.[hash:4].js',   
      path: path.resolve('dist')
  },
  devServer: {
    contentBase: "./src",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true//实时刷新
  },
  module:{
    rules: [
      {
          test: /\.css$/,
          use: ExtractTextWebpackPlugin.extract({
              use: 'css-loader',
              publicPath: '../'
          })
      },
      {
          test: /\.(jpe?g|png|gif)$/,
          use: [
              {
                  loader: 'url-loader',
                  options: {
                      limit: 8192,    // 小于8k的图片自动转成base64格式，并且不会存在实体图片
                      outputPath: 'images/'   // 图片打包后存放的目录
                  }
              }
          ]
      }
  ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',   
      filename: 'index.html',
      chunks: ['index']   // 对应关系,index.js对应的是index.html
    }),
    new HtmlWebpackPlugin({
        template: './src/login.html',
        filename: 'login.html',
        chunks: ['login']   // 对应关系,login.js对应的是login.html
    }),
    new ExtractTextWebpackPlugin('css/style.css')
  ]
}