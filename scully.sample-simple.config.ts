/** load the plugins */

import { ScullyConfig } from '@scullyio/scully';

export const config: Promise<ScullyConfig> = (async () => {
  return {
    projectName: 'sample-simple',
    homeFolder: './apps/sample-simple',
    distFolder: 'dist',
    outDir: './dist/apps/sample-simple',
    routes: {},
  } as ScullyConfig;
})();
