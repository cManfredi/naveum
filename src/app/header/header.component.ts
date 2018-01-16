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
  public inSettings;

  constructor(private _globalService: GlobalService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.inSettings = false;
  }

  getImgUrl(): string {
    return '';
  }

  openSidenav() {
    this.btnClicked.emit('toggleSidenav');
  }

  openSettings() {
    this._router.navigate(['settings']);
  }

}
