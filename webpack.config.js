module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
    runtime: './src/core/runtime.js'
  },
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' }
      ]
    }, {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }]
  },
}
 