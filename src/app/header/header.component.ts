import {ShareDataService} from '../services/share-data.service';
import {GlobalService} from '../services/global.service';
import { MatSidenavModule } from '@angular/material';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  artworkLoaded: boolean;
  @Output() btnClicked: EventEmitter<string> = new EventEmitter();

  constructor(private _globalService: GlobalService, private _shareService: ShareDataService) { }

  ngOnInit() {
    this.artworkLoaded = false;
    this._shareService.beaconLoad$.subscribe((data) => {this.changeButton(data)});
  }

  getImgUrl(): string {
    return '';
  }

  openSidenav() {
    this.btnClicked.emit('toggleSidenav');
  }

  goToCurrentPage() {

  }

  changeButton(data: any) {

  }

}
