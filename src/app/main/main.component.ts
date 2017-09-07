import { ShareDataService } from './../services/share-data.service';
import { JsonFetchService } from './../services/json-fetch.service';
import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private router: Router, private jsonFetch: JsonFetchService, private _sharedService: ShareDataService
  ) { }

  ngOnInit() {
  }

  loadBeaconData(url: string) {
    url = 'http://localhost:3000/artwork2';
    let data;
    this.jsonFetch.getJsonData(url)
    .subscribe(
      res => data = res,
      err => console.error,
      () => {
        this._sharedService.emitBeaconData(data);
        this.router.navigate([data.type]);
      }
    );
  }

}
