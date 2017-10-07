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

  constructor(private _sharedService: ShareDataService, private _globalService: GlobalService) { }

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
  }

  getSvgUrl(): string {
    return this.svg;
  }

}
