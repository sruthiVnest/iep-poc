import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'projectinfo',
  exposes: {
    './Routes': 'projectinfo/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
