import { ShareDataService } from '../services/share-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-artwork',
  templateUrl: './info-artwork.component.html',
  styleUrls: ['./info-artwork.component.scss']
})
export class InfoArtworkComponent implements OnInit {
  private title: string;
  private imgUrl: string;
  private description: string;
  private audioUrl: string;

  constructor(private _sharedService: ShareDataService) {}

  ngOnInit() {
  /* Sottoscrizione agli eventi che arrivano dal servizio condiviso */
    this._sharedService.beaconLoad$.subscribe(bData => this.updatePage(bData));
    const initData: any = this._sharedService.getLastBeacon();
    if (initData.type === 'artwork') {
      this.title = initData.title;
      this.imgUrl = initData.imgUrl;
      this.description = initData.description;
      this.audioUrl = initData.audioUrl;
    }
  }

  updatePage(bData) {
    if (bData.type === 'artwork') {
      this.title = bData.title;
      this.imgUrl = bData.imgUrl;
      this.description = bData.description;
      this.audioUrl = bData.audioUrl;
    }
  }

  getTitle() {
    return this.title;
  }

  getImgUrl() {
    return this.imgUrl;
  }

  getAudioUrl() {
    return this.audioUrl;
  }

   getdescription() {
    return this.description;
  }

}
