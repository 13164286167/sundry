var path = require('path')
module.exports = {
    mode: 'development',
    entry: {
        admin: './src/admin/index.js',
        consumer: './src/consumer/index.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: __dirname+'/dist'
    }
}