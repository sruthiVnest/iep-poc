const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.js');

module.exports = merge(baseConfig, {
  // Add production-specific webpack config here if needed
  mode: 'production',
  // Example: plugins: [new SomeProductionPlugin()]
});
