/** load the plugins */

import { ScullyConfig } from '@scullyio/scully';
import { HttpClient, HttpXhrBackend } from '@angular/common/http';

// Setup for the XHR call to fetch json
const xMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const httpClient = new HttpClient(new HttpXhrBackend({ build: () => new xMLHttpRequest() }));
const AWSBucketEndpoint = 'https://gard-rarediseases-json.s3.us-east-2.amazonaws.com';

export const config = new Promise<ScullyConfig>((resolve, reject) => {
  httpClient.get<any>(`${AWSBucketEndpoint}/diseases.json`).subscribe((jsonDiseaseList) => {
    const arrDiseaseListRoutes: Array<string> = [];
    jsonDiseaseList.records.forEach((disease) => arrDiseaseListRoutes.push(`/detail/${disease.EncodedName}`));
    const PromiseBuiltConfig: ScullyConfig = {
      projectName: 'sample-many-routes',
      homeFolder: './apps/sample-many-routes',
      distFolder: 'dist',
      outDir: './dist/apps/sample-many-routes',
      routes: {},
      extraRoutes: arrDiseaseListRoutes,
      interactiveLogging: false,
    };
    resolve(PromiseBuiltConfig);
  });
});
