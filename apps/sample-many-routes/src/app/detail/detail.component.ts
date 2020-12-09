import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  diseaseRecord: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    const urlSegments = this.activatedRoute.snapshot.url;
    const CurrentDiseaseName = urlSegments[1].path;

    this.globalService
      .getDiseaseRecordData(CurrentDiseaseName)
      .subscribe((diseaseRecord) => (this.diseaseRecord = diseaseRecord));
  }
}
