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
  name: string;
  private imgUrl: string;
  description: string;
  private svg: string;
  public artworks: Array<any>;
  selectedIndex: number;
  currentArtwork: number;
  inRoom: boolean;

  // tslint:disable-next-line:max-line-length
  constructor(private _router: Router, private _route: ActivatedRoute, private _globalService: GlobalService, private _jsonService: JsonFetchService) { }

  ngOnInit() {
    this.artworks = [];
    this.selectedIndex = 0;
    this.currentArtwork = 0;
    this.inRoom = false;
    /* Sottoscrizione agli eventi che arrivano dal servizio condiviso */
    // this._sharedService.beaconLoad$.subscribe(bData => this.refresh(bData));
    // const initData: any = this._globalService.currentBeacon;
    // this.refresh(initData);
    this._route.paramMap.subscribe((paramMap: ParamMap) => {
      const snapshot = this._route.snapshot;
      this._globalService.manageRouting(snapshot.url);
      if (snapshot.url[0].path === 'room') {
        // Recupero l'id dell'opera da mostrare
        const id: number = Number.parseInt(paramMap.get('id'));
        const data: any = this._globalService.findRoom(id);
        this.refresh(id, data);
      };
    });
  }

  refresh(id, bData: any) {
    this.name = bData.title;
    this.svg = bData.imgUrl;
    this.description = bData.description;
    this.currentArtwork = 0;
    bData.artworks.forEach(element => {
      const artwork = this._globalService.findArtwork(element);
      this.artworks.push({id: artwork.id, title: artwork.title});
      if (this._globalService.linkToCurrent === 'artwork/' + artwork.id) {
        this.currentArtwork = artwork.id;
      }
    });
    this.inRoom = false;
    if (this._globalService.linkToCurrent === 'room/' + id) {
      this.inRoom = true;
    }
    this.artworks.sort((a, b) => a.id - b.id);
    this.selectedIndex = this._globalService.lastTabSelected;
  }

  getSvgUrl(): string {
    return this.svg;
  }

  manageRouting(id: any) {
    this._router.navigate(['/artwork/' + id]);
  }

  onTabSelect(event) {
    this._globalService.lastTabSelected = event.index;
  }

}
