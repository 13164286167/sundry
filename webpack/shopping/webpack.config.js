var path = require('path')
module.exports = {
    entry: {
        admin: './admin/index.js',
        consumer: './consumer/index.js'
    },
    output: {
        path: path.jion(__dirname,'dist'),
        publicPath: '/dist/',
        filename: '[name].bundle.js'
    }
}