import { Router } from '@angular/router';
import { JsonFetchService } from './services/json-fetch.service';
import { ShareDataService } from './services/share-data.service';
import { MatSidenavModule, MatDialog } from '@angular/material';
import { Component, OnInit, NgZone } from '@angular/core';
import * as classes from './classes';
import { GlobalService } from './services/global.service';
import { WindowRefService } from './services/window-ref.service'
import { DialogComponent } from './dialog/dialog.component';
import { Artwork } from './classes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private linkList: Object[];
  private scannedBeacons: Array<string>;
  public inSession: boolean;
  private dialogUrl: string;

  constructor(
    private _sharedService: ShareDataService,
    private _globalService: GlobalService,
    private _ngZone: NgZone,
    private _jsonService: JsonFetchService,
    private _router: Router,
    private windowRef: WindowRefService,
    public dialog: MatDialog
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

  updateSidenav(data: any) {
    const newLink = {link: data.url, label: data.title};
    const beaconId = data.type + '_' + data.title;
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
    // Controllo che la risorsa non sia già memorizzata, altrimenti la recupero dal db
    const urlComponents: string[] = url.split('/');
    const resource = urlComponents[3];
    const id = Number.parseInt(urlComponents[4]);
    let inMemory = false;
    switch (resource) {
      case 'exhibitions':
        if (this._globalService.getExhibition() != null && this._globalService.getExhibition().id === id) {
          inMemory = true;
        }
        break;
      case 'rooms':
        if (this._globalService.findRoom(id) !== undefined) {
          inMemory = true;
          const data = this._globalService.findRoom(id);
          this.setNavigationUrl(data);
          this.manageDialog(data);
        }
        break;
      case 'artworks':
        if (this._globalService.findArtwork(id) !== undefined) {
          inMemory = true;
          const data = this._globalService.findArtwork(id);
          this.setNavigationUrl(data);
          this.manageDialog(data);
        }
        break;
    }
    if (!inMemory) {
      let data;
      /* Recupero dall'url l'indirizzo del db per costruire altre query */
      this._jsonService.setDbUrl(urlComponents[0] + '//' + urlComponents[2]);
      /* Recupero i dati dal db */
      this._jsonService.getJsonData(url)
      .subscribe(
        res => data = res,
        err => console.error,
        () => {
          // Se inizia la sessione setto la variabile
          this.inSession = true;
          // Salvataggio dei dati del nuovo beacon (se è una stanza o un'opera)
          this.saveData(data);
          this.setNavigationUrl(data);
          this.updateSidenav({url: this.dialogUrl, title: data.title});
          // Aggiorno il menù di navigazione
          this.manageDialog(data);
        }
      );
    }
  }

  saveData(data: any) {
    switch (data.type) {
      case 'exhibition':
        const exhibition: classes.GenericJsonClass =
          new classes.GenericJsonClass(
            data.id,
            data.type,
            data.title,
            data.description,
            data.imgUrl,
            data.containerStyle
          );
          this._globalService.setExhibition(exhibition);
          const museum: classes.GenericJsonClass =
            new classes.GenericJsonClass(
              null,
              data.museum.type,
              data.museum.title,
              data.museum.description,
              data.museum.imgUrl,
              data.museum.containerStyle
            );
          this._globalService.setMuseum(museum);
        break;
      case 'room':
        const room: classes.Room =
          new classes.Room(
            data.id,
            data.type,
            data.title,
            data.description,
            data.svgUrl,
            data.containerStyle);
        this._globalService.addRoom(room);
        // recupero anche tutte le opere della stanza così da non doverle scaricare dopo
        /* Recupero tutte le opere che ci sono all'interno di quella stanza */
        const baseUrl = this._jsonService.getDbUrl();
        this._jsonService.getJsonData(baseUrl + '/artworks?idRoom=' + data.id)
        .subscribe(
          res => data = res,
          err => console.error,
          () => {
            // Devo salvare le opere in memoria per non doverle ricaricare
            data.forEach(element => {
              this.saveData(element);
            });
            /* Devo collegare i link alla mappa */
            /* Devo popolare la lista delle opere */
          }
        );
        break;
      case 'artwork':
        const artwork: classes.Artwork =
          new classes.Artwork(
            data.id,
            data.type,
            data.title,
            data.description,
            data.imgUrl,
            data.containerStyle,
            data.position,
            data.audioUrl);
        this._globalService.addArtwork(artwork);
        if (this._globalService.findRoom(data.idRoom) !== undefined) {
          this._globalService.findRoom(data.idRoom).addArtwork(data.id);
        }
        break;
    }
  }

  private setNavigationUrl(data: any) {
    this.dialogUrl = (data.type === 'exhibition') ? data.type : (data.type + '/' + data.id);
  }

  private manageDialog(data: any) {
    /* apertura del dialog con le info del nuovo beacon */
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {title: data.title, type: data.type}
    });
    // Gestione della chiusura del dialog con il risultato
    dialogRef.afterClosed().subscribe(result => {
      this.manageRouting(result);
    })
  }

  private manageRouting(result: any) {
    if (result === 'change') {
      this._router.navigate([this.dialogUrl]);
    }
  }

  closeSession() {
    // TO-DO
  }

}
