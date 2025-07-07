const webpack = require('webpack');

module.exports = {
  target: 'web',
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
      util: require.resolve('util/'),
      buffer: require.resolve('buffer/'),
      process: require.resolve('process/browser'),
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
      fs: false,
      __filename: false,
      __dirname: false
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer']
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser'
    })
  ],
  node: {
    __filename: false,
    __dirname: false
  }
};
