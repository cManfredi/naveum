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

  constructor(private _globalService: GlobalService, private _router: Router) { }

  ngOnInit() {
    this.inSettings = false;
    this.locName = '';
    this._globalService.routeNav$.subscribe( url => {
      switch (url) {
        case 'exhibition':
          this.locName = 'Mostra';
          break;
        case 'room':
          this.locName = 'Stanza';
          break;
        case 'artwork':
          this.locName = 'Opera';
          break;
        case 'settings':
          this.locName = 'Impostazioni';
          break;
      }
    })
  }

  openSidenav() {
    this.btnClicked.emit('toggleSidenav');
  }

  openSettings() {
    this._router.navigate(['settings']);
  }

}
