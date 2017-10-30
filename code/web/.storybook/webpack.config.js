const path = require('path')

module.exports = (storybookBaseConfig, configType) => {
  storybookBaseConfig.module.rules = storybookBaseConfig.module.rules.concat([
    {
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader'],
      include: path.resolve(__dirname, '../')
    },
    {
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../')
    },
  ])

  return storybookBaseConfig
}
