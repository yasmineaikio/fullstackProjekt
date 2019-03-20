const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: './index.js',
  mode: 'development',
  module: {
    rules: [
      {
        loader: ['vue-style-loader', 'css-loader'],
        test: /\.css$/
      },
      {
        loader: 'vue-loader',
        test: /\.vue$/
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: __dirname
  },
  devServer: {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        disableHostCheck: true
    }
},
  plugins: [
    new VueLoaderPlugin()
  ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.min.js'
    }
  }
}