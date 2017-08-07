import { ShareDataService } from '../services/share-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-exhibition',
  templateUrl: './info-exhibition.component.html',
  styleUrls: ['./info-exhibition.component.scss']
})
export class InfoExhibitionComponent implements OnInit {
  private name: string;
  private imgUrl: string;
  private description: string;

  constructor(private _sharedService: ShareDataService) {}

  ngOnInit() {
    /* Sottoscrizione agli eventi che arrivano dal servizio condiviso */
    this._sharedService.beaconLoad$.subscribe(bData => this.updatePage(bData));
    const initData: any = this._sharedService.getLastBeacon();
    if (initData.type === 'exhibition') {
      this.name = initData.title;
      this.imgUrl = initData.imgUrl;
      this.description = initData.description;
    }
    console.log(this.imgUrl);
  }

  updatePage(bData) {
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

}
