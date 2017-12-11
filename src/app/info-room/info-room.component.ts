import {JsonFetchService} from '../services/json-fetch.service';
import { GlobalService } from '../services/global.service';
import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../services/share-data.service';

@Component({
  selector: 'app-info-room',
  templateUrl: './info-room.component.html',
  styleUrls: ['./info-room.component.scss']
})
export class InfoRoomComponent implements OnInit {
  private name: string;
  private imgUrl: string;
  private description: string;
  private svg: string;

  constructor(private _sharedService: ShareDataService, private _globalService: GlobalService, private _jsonService: JsonFetchService) { }

  ngOnInit() {
    /* Sottoscrizione agli eventi che arrivano dal servizio condiviso */
    this._sharedService.beaconLoad$.subscribe(bData => this.refresh(bData));
    const initData: any = this._globalService.currentBeacon;
    this.refresh(initData);
  }

  refresh(bData: any) {
    if (bData.type === 'room') {
      this.name = bData.title;
      this.svg = bData.svgUrl;
      this.description = bData.description;
    }
    let data: any;
    /* Recupero tutte le opere che ci sono all'interno di quella stanza */
    const baseUrl = this._jsonService.getDbUrl();
    this._jsonService.getJsonData(baseUrl + '/artworks?idRoom=' + this._globalService.findRoom(bData.id))
    .subscribe(
      res => data = res,
      err => console.error,
      () => {
        console.log(data);
        /* Devo collegare i link alla mappa */
        /* Devo popolare la lista delle opere */
      }
    );
  }

  getSvgUrl(): string {
    return this.svg;
  }

}
