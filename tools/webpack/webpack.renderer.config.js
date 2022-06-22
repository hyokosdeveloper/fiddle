const rules = require('./common/webpack.rules');
const plugins = require('./common/webpack.plugins');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

plugins.push(
  new MonacoWebpackPlugin({
    languages: ['typescript', 'javascript', 'html', 'css'],
  }),
);
plugins.push(
  new MiniCssExtractPlugin({
    filename: './css/[name].css',
  }),
);

// Handling style files
rules.push({
  test: /\.css$/,
  use: [{ loader: MiniCssExtractPlugin.loader }, { loader: 'css-loader' }],
});

rules.push({
  test: /\.less$/i,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    {
      loader: 'css-loader',
    },
    {
      // Used to load the url loaders present in blueprintjs (/resources/icons)
      loader: 'resolve-url-loader',
    },
    {
      loader: 'less-loader',
      options: {
        lessOptions: {
          // Used to evaluate css function (https://github.com/palantir/blueprint/issues/5011).
          math: 'always',
        },
      },
    },
  ],
});

// Handling assets
rules.push(
  {
    test: /\.(gif|icns|ico|jpg|png|otf)$/,
    type: 'asset/resource',
  },
  {
    test: /\.(ttf|eot|svg)$/,
    use: {
      loader: 'file-loader',
      options: {
        name: 'fonts/[hash].[ext]',
      },
    },
  },
  {
    test: /\.(woff|woff2)$/,
    use: {
      loader: 'url-loader',
      options: {
        name: 'fonts/[hash].[ext]',
        limit: 5000,
        mimetype: 'application/font-woff',
      },
    },
  },
);

module.exports = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  devtool: 'source-map',
};
