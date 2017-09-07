import { ShareDataService } from './services/share-data.service';
import { MdSidenavModule } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ShareDataService]
})
export class AppComponent implements OnInit {
  private linkList: Object[];
  private scannedBeacons: Array<string>;

  constructor(private _sharedService: ShareDataService) {}

  ngOnInit() {
    /* Aggiungo il path alla homepage */
    this.linkList = [
      {link: '', label: 'Home Page'}
    ];
    this.scannedBeacons = [];
    /* Sottoscrizione agli eventi che arrivano dal servizio condiviso */
    this._sharedService.beaconLoad$.subscribe(bData => this.updateSidenav(bData));
  }

  addLink(link: Object) {
    this.linkList.push(link);
  }

  updateSidenav(bData) {
    const newLink = {link: bData.type, label: bData.title};
    const beaconId = bData.type + '_' + bData.title;
    /* Per evitare i doppioni all'interno del menù di navigazione */
    if (!this.scannedBeacons.includes(beaconId)) {
      this.scannedBeacons.push(beaconId);
      switch (bData.type) {
        case 'exhibition':
            this.addLink({
              link: 'exhibition', label: bData.title
            });
          break;
        case 'room':
          break;
        case 'artwork':
            this.addLink({
              link: 'artwork', label: bData.title
            })
          break;
      }
    }
  }

  getLinkList(): any {
    return this.linkList;
  }

}
