import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'quality',
  exposes: {
    './Routes': 'apps/quality/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
