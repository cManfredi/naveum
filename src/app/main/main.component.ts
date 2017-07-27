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
    private router: Router, private jsonFetch: JsonFetchService, private shareData: ShareDataService
  ) { }

  ngOnInit() {
  }

  loadBeaconData(url: string) {
    url = 'https://api.myjson.com/bins/jxdnx';
    const data = this.jsonFetch.getJsonData(url);
    console.log(data);
    /* Switch sulle info recuperate nell'url */
    switch (data.type) {
      default:
        break;
    }
    /* Emissione dei nuovi dati per popolare il sidenav */
    this.shareData.emitChange('');
    /* Navigazione alla pagina di competenza */
    // this.router.navigate(['/exhibition']);
  }

}
