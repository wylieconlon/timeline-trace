 module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
    iframe: './src/iframe.js'
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
    }]
  },
  externals: [{'fs': 'null'}],
}
 