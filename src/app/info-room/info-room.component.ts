import {JsonFetchService} from '../services/json-fetch.service';
import { GlobalService } from '../services/global.service';
import { Component, OnInit } from '@angular/core';
import { Artwork } from '../classes';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';

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
  public artworks: Array<any>;

  // tslint:disable-next-line:max-line-length
  constructor(private _router: Router, private _route: ActivatedRoute, private _globalService: GlobalService, private _jsonService: JsonFetchService) { }

  ngOnInit() {
    this.artworks = [];
    /* Sottoscrizione agli eventi che arrivano dal servizio condiviso */
    // this._sharedService.beaconLoad$.subscribe(bData => this.refresh(bData));
    // const initData: any = this._globalService.currentBeacon;
    // this.refresh(initData);
    this._route.paramMap.subscribe((paramMap: ParamMap) => {
      const snapshot = this._route.snapshot;
      if (snapshot.url[0].path === 'room') {
        // Recupero l'id dell'opera da mostrare
        const id: number = Number.parseInt(paramMap.get('id'));
        const data: any = this._globalService.findRoom(id);
        this.refresh(data);
      };
    });
  }

  refresh(bData: any) {
    this.name = bData.title;
    this.svg = bData.svgUrl;
    this.description = bData.description;
    bData.artworks.forEach(element => {
      const artwork = this._globalService.findArtwork(element);
      this.artworks.push({id: artwork.id, title: artwork.title, link: '/artwork/' + artwork.id});
    });
    this.artworks.sort((a, b) => a.id - b.id);
  }

  getSvgUrl(): string {
    return this.svg;
  }

  manageRouting(url: string) {
    this._router.navigate([url]);
  }

}
