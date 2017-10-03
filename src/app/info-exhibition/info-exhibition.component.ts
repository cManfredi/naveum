import { ShareDataService } from '../services/share-data.service';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-info-exhibition',
  templateUrl: './info-exhibition.component.html',
  styleUrls: ['./info-exhibition.component.scss']
})
export class InfoExhibitionComponent implements OnInit {
  private name: string;
  private imgUrl: string;
  private description: string;

  constructor(private _sharedService: ShareDataService, private _globalService: GlobalService) {}

  ngOnInit() {
    /* Sottoscrizione agli eventi che arrivano dal servizio condiviso */
    this._sharedService.beaconLoad$.subscribe(bData => this.updatePage(bData));
    const initData: any = this._globalService.currentBeacon;
    
  }

  updatePage(bData) {
    console.log('refreshing data');
    if (bData.type === 'exhibition') {
      this.name = bData.title;
      this.imgUrl = bData.imgUrl;
      this.description = bData.description;
    }
  }

  getName() {
    return this.name;
  }

  getImgUrl() {
    return this.imgUrl;
  }

  getdescription() {
    return this.description;
  }

}
