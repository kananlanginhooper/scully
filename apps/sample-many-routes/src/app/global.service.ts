//
//
//
//
// This is just a demo of some service that could be used.  The exact coding in this file are not important, and only used as an example
//
//
//
//

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  diseasesCount = 0;
  arrDiseaseList = [];
  AWSBucketEndpoint =
    'https://gard-rarediseases-json.s3.us-east-2.amazonaws.com';

  // TODO: Change to: https://jsonplaceholder.typicode.com/photos, for a more generic page

  constructor(private httpClient: HttpClient) {
    this.httpClient
      .get<any>(`${this.AWSBucketEndpoint}/diseases.json`)
      .subscribe((jsonDiseaseList) => {
        this.diseasesCount = jsonDiseaseList.totalSize;

        // Mark as partial information
        jsonDiseaseList.records.forEach((disease, index, arr) => {
          arr[index] = { ...disease, ...{ JsonCompileFinished: false } };
        });

        this.arrDiseaseList = jsonDiseaseList.records;
      });
  }

  getDiseaseRecordData(diseaseNameEncoded: string): Observable<object> {
    return new Observable((subscriber) => {
      const diseaseAfterFilter = this.arrDiseaseList.filter(
        (disease) => disease.EncodedName === diseaseNameEncoded
      );
      let diseaseRecord = diseaseAfterFilter[0];

      if (diseaseRecord.JsonCompileFinished) {
        subscriber.next(diseaseRecord);
      } else {
        // fetch individual data, and merge into main list
        this.httpClient
          .get<any>(
            `${this.AWSBucketEndpoint}/singles/${diseaseRecord.EncodedName}.json`
          )
          .subscribe((jsonDisease) => {
            // merge data, also alter arrDiseaseList array
            diseaseRecord = {
              ...diseaseRecord,
              ...jsonDisease,
              ...{ JsonCompileFinished: true },
            };
            subscriber.next(diseaseRecord);
          });
      }
    });
  }
}
