import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'operations',
  exposes: {
    './Routes': 'apps/operations/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
