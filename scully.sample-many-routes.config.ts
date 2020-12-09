/** load the plugins */

import { ScullyConfig } from '@scullyio/scully';

export const config: Promise<ScullyConfig> = (async () => {
  return {
    projectName: 'sample-many-routes',
    homeFolder: './apps/sample-many-routes',
    distFolder: 'dist',
    outDir: './dist/apps/sample-many-routes',
    routes: {},
  } as ScullyConfig;
})();
