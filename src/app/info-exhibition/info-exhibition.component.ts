import { ShareDataService } from '../services/share-data.service';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router/src/shared';

@Component({
  selector: 'app-info-exhibition',
  templateUrl: './info-exhibition.component.html',
  styleUrls: ['./info-exhibition.component.scss']
})
export class InfoExhibitionComponent implements OnInit {
  private name: string;
  private imgUrl: string;
  private description: string;

  constructor(private _route: ActivatedRoute, private _sharedService: ShareDataService, private _globalService: GlobalService) {}

  ngOnInit() {
    /* Sottoscrizione agli eventi che arrivano dal servizio condiviso */
    // this._sharedService.beaconLoad$.subscribe(bData => this.updatePage(bData));
    this._route.paramMap.subscribe((paramMap: ParamMap) => {
      const snapshot = this._route.snapshot;
      this._globalService.manageRouting(snapshot.url);
      if (snapshot.url[0].path === 'exhibition') {
        const data = this._globalService.getExhibition();
        this.updatePage(data);
      }
    });
    // const initData: any = this._globalService.currentBeacon;
  }

  updatePage(bData) {
    this.name = bData.title;
    this.imgUrl = bData.imgUrl;
    this.description = bData.description;
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
