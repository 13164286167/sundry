
// webpack的配置文件 由于webpack是基于Node构建的，webpack配置文件中所有的合法node语法都可以用
var path = require('path')
// 如果要配置插件,需要在导出的对象上添加plugins节点
var htmlWebpackPlugin = require('html-webpack-plugin')
// 配置导出对象
module.exports = {
    // 入口文件
    entry: path.join(__dirname, './src/main.js'),
    /* 
    // 入口文件的配置项,配置两个
    entry:{
        entry:'./src/entry.js',
        //这里我们又引入了一个入口文件
        entry2:'./src/entry2.js'
    },
    */
    // 指定输出选项
    output: {
        path: path.join(__dirname, './dist'), // 指定输出路径
        /* 
             path:path.resolve(__dirname,'dist'), // 输出的路径，用了Node语法
        */
        filename: 'bundle.js' // 指定输出文件的名字
    },
    // 插件对象节点
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'), // 指定模板文件路径
            filename: 'index.html' // 设置生成内存页面的的名字
        }),
    ],
    // 配置所有第三方loader(载入程序)模块 例如解读CSS,图片如何转换，压缩
    module: {
        // 第三方模块的匹配规则
        rules: [
            // 这里的test于正则的test一样
            // 处理css文件的loader
            {test: /\.(css|scss)$/, use: ['style-loader', 'css-loader', 'sass-loader']},
            // 处理图片路径的loader 这里的limit为图片的大小(单位是字节)
            {test: /\.(jpg|png|gif|jpeg|bmp)$/, use: 'url-loader?limit=349950&name=[hash:8]-[name].[ext]'},
            // 处理字体图标的loader
            {test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader'},
            // 把Es6的高级语法转换成浏览器可以识别的低级语言
            {test: /\.js$/, use: 'babel-loader', exclude: /node_modules/},
            // 处理vue文件的loader
            {test: /\.vue$/, use: 'vue-loader'}
        ]
    },
    // 配置导入包的路径
    /*  resolve : {
            alias : { // alias别名 修改vue导入的路径
                "vue$" : "vue/dist/vue.js"
            }
        }*/
}
