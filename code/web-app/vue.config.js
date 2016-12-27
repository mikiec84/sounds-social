module.exports = {
  title: 'Sound Social',

  resolve: true,

  mergeConfig: {
    module: {
      rules: [
        {
          test: /\.scss$/,
          loaders: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ]
    }
  },
}
