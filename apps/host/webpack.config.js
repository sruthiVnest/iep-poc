const { withModuleFederation } = require('@nx/angular/module-federation');
const { merge } = require('webpack-merge');
const path = require('path');

module.exports = withModuleFederation({
  name: 'host',
  remotes: ['operations', 'projectinfo','quality'],
  exposes: {},
  shared: {
    '@angular/core': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    '@angular/common': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    '@angular/router': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    // Add other shared libraries here
  },
  // Merge with any custom webpack config if needed
  extraOptions: {
    output: {
      uniqueName: 'host',
      publicPath: 'auto',
    },
    resolve: {
      alias: {
        '@app': path.resolve(__dirname, 'apps/host/src/app'),
        '@assets': path.resolve(__dirname, 'apps/host/src/assets'),
      },
    },
  },
});
