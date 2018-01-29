import {ShareDataService} from '../services/share-data.service';
import {GlobalService} from '../services/global.service';
import { MatSidenavModule } from '@angular/material';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ParamMap } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() btnClicked: EventEmitter<string> = new EventEmitter();
  inSettings: boolean;
  locName: string;
  inArtwork: boolean;

  constructor(private _globalService: GlobalService, private _router: Router) { }

  ngOnInit() {
    this.inSettings = false;
    this.inArtwork = false;
    this.locName = '';
    this._globalService.routeNav$.subscribe( url => {
      this.inArtwork = false;
      switch (url[0].path) {
        case 'exhibition':
          this.locName = 'Mostra';
          break;
        case 'room':
          this.locName = 'Stanza';
          break;
        case 'artwork':
          this.locName = 'Opera';
          this.inArtwork = true;
          break;
        case 'settings':
          this.locName = 'Impostazioni';
          break;
      }
    })
  }

  navToRoom() {
    const artworkId = Number.parseInt(this._router.url.split('/')[2]);
    const roomId = this._globalService.findArtwork(artworkId).roomId;
    this._router.navigate(['room/' + roomId]);
  }

  openSidenav() {
    this.btnClicked.emit('toggleSidenav');
  }

  openSettings() {
    this._router.navigate(['settings']);
  }

}
