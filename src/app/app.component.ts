import { Router } from '@angular/router';
import { JsonFetchService } from './services/json-fetch.service';
import { ShareDataService } from './services/share-data.service';
import { MdSidenavModule, MdDialog } from '@angular/material';
import { Component, OnInit, NgZone } from '@angular/core';
import * as classes from './classes';
import { GlobalService } from './services/global.service';
import { WindowRefService } from './services/window-ref.service'
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private linkList: Object[];
  private scannedBeacons: Array<string>;
  public inSession: boolean;

  constructor(
    private _sharedService: ShareDataService,
    private _globalService: GlobalService,
    private _ngZone: NgZone,
    private _jsonService: JsonFetchService,
    private _router: Router,
    private windowRef: WindowRefService,
    public dialog: MdDialog
  ) {}

  ngOnInit() {
    this.inSession = false;
    /* Aggiungo la reference globale usando il servizio wrapper creato */
    this.windowRef.window.loadUrl =  (url) => {this._ngZone.run(() => this.loadUrl(url))};
    /* Aggiungo il path alla homepage */
    this.linkList = [
      {link: '', label: 'Home Page'}
    ];
    this.scannedBeacons = [];
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
      /* Non c'è uno switch, i link non dipendono dal tipo di contenuto, basta che non sia un'opera */
      if (newLink.link !== 'artwork') {
        this.addLink(newLink);
      }
    }
  }

  getLinkList(): any {
    return this.linkList;
  }

  loadUrl(url: string) {
    let data;
    /* Recupero dall'url l'indirizzo del db per costruire altre query */
    const urlComponents: string[] = url.split('/');
    this._jsonService.setDbUrl(urlComponents[0] + '//' + urlComponents[2]);
    /* Recupero i dati dal db */
    this._jsonService.getJsonData(url)
    .subscribe(
      res => data = res,
      err => console.error,
      () => {
        // Se inizia la sessione setto la variabile
        this.inSession = true;
        // Aggiorno il menù di navigazione
        this.updateSidenav(data);
        // Salvataggio dei dati del nuovo beacon (se è una stanza o un'opera)
        this.saveData(data);
        // Mediante il servizio condiviso avviso i componenti che c'è un nuovo beacon da caricare nel caso
        // di un refresh
        this._sharedService.emitBeaconData(data);
        // this._router.navigate([data.type]);
        /* apertura del dialog con le info del nuovo beacon */
        const dialogRef = this.dialog.open(DialogComponent, {
          data: data
        });
        // Gestione della chiusura del dialog con il risultato
        dialogRef.afterClosed().subscribe(result => {
          this.manageRouting(result);
        })
      }
    );
  }

  saveData(data: any) {
    this._globalService.currentBeacon = data;
    switch (data.type) {
      case 'exhibition':
        break;
      case 'room':
        const room: classes.Room = new classes.Room(data.id, data.title, data.description, data.svgUrl, data.containerStyle);
        this._globalService.addRoom(room);
        break;
      case 'artwork':
        break;
    }
  }

  private manageRouting(result: any) {
    if (result === 'change') {
      this._router.navigate([this._globalService.currentBeacon.type]);
    }
  }

  closeSession() {
    // TO-DO
  }

}
