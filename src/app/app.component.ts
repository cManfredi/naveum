import { Router } from '@angular/router';
import { JsonFetchService } from './services/json-fetch.service';
import { ShareDataService } from './services/share-data.service';
import { MdSidenavModule } from '@angular/material';
import { Component, OnInit, NgZone } from '@angular/core';
import * as classes from './classes';
import { GlobalService } from 'app/services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private linkList: Object[];
  private scannedBeacons: Array<string>;

  constructor(
    private _sharedService: ShareDataService,
    private _globalService: GlobalService,
    private _ngZone: NgZone,
    private _jsonService: JsonFetchService,
    private router: Router
  ) {}

  ngOnInit() {
    /* Aggiungo la reference globale */
    window.angularComponentRef = {
      zone: this._ngZone,
      func: (url) => {this.loadUrl(url)},
      component: this
    };
    /* Aggiungo il path alla homepage */
    this.linkList = [
      {link: '', label: 'Home Page'}
    ];
    this.scannedBeacons = [];
    /* Sottoscrizione agli eventi che arrivano dal servizio condiviso */
    this._sharedService.beaconLoad$.subscribe(bData => this.updateSidenav(bData));
  }

  addLink(link: Object) {
    this.linkList.push(link);
  }

  updateSidenav(bData) {
    const newLink = {link: bData.type, label: bData.title};
    const beaconId = bData.type + '_' + bData.title;
    /* Per evitare i doppioni all'interno del menù di navigazione */
    if (!this.scannedBeacons.includes(beaconId)) {
      this.scannedBeacons.push(beaconId);
      /* Non c'è uno switch, i link non dipendono dal tipo di contenuto, basta che non sia un'opera */
      if (newLink.link !== 'artwork') {
        this.addLink(newLink);
      }
    }
  }

  getLinkList(): any {
    return this.linkList;
  }

  loadUrl(url: string) {
    let data;
    this._jsonService.getJsonData(url)
    .subscribe(
      res => data = res,
      err => console.error,
      () => {
        this.saveData(data);
        this._sharedService.emitBeaconData(data);
        this.router.navigate([data.type]);
      }
    );
  }

  saveData(data: any) {
    switch (data.type) {
      case 'room':
        const room: classes.Room = new classes.Room(data.id, data.title, data.description, data.imgUrl, data.containerStyle);
        this._globalService.addRoom(room);
        break;
      case 'artwork':
        break;
    }
  }

}
