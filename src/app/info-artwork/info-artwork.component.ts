import { ShareDataService } from '../services/share-data.service';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'app/services/global.service';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';

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

  constructor(private _route: ActivatedRoute, private _sharedService: ShareDataService, private _globalService: GlobalService) {}

  ngOnInit() {
  /* Sottoscrizione agli eventi che arrivano dal servizio condiviso */
    // this._sharedService.beaconLoad$.subscribe(bData => this.updatePage(bData));
    this._route.paramMap.subscribe((paramMap: ParamMap) => {
      const snapshot = this._route.snapshot;
      if (snapshot.url[0].path === 'artwork') {
        // Recupero l'id dell'opera da mostrare
        const id: number = Number.parseInt(paramMap.get('id'));
        const data: any = this._globalService.findArtwork(id);
        this.updatePage(data);
      };
    });
    // const initData: any = this._sharedService.getLastBeacon();
    // if (initData.type === 'artwork') {
    //   this.title = initData.title;
    //   this.imgUrl = initData.imgUrl;
    //   this.description = initData.description;
    //   this.audioUrl = initData.audioUrl;
    // }
  }

  updatePage(bData) {
    this.title = bData.title;
    this.imgUrl = bData.imgUrl;
    this.description = bData.description;
    this.audioUrl = bData.audioUrl;
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
