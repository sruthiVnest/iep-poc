const { withModuleFederation } = require('@nx/angular/module-federation');

module.exports = withModuleFederation({
  name: 'host',
  remotes: ['operations', 'projectinfo', 'quality'],
  exposes: {},
  shared: {
    '@angular/core': {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    },
    '@angular/common': {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    },
    '@angular/router': {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    },
  },
});
