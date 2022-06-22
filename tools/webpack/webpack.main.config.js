const plugins = require('./common/webpack.plugins');
const rules = require('./common/webpack.rules');

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/main/main.ts',
  module: {
    rules,
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  // https://webpack.js.org/configuration/optimization/#optimizationnodeenv
  optimization: {
    nodeEnv: false,
  },
  plugins,
};
