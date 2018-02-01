import { Router } from '@angular/router';
import { JsonFetchService } from './services/json-fetch.service';
import { MatSidenavModule, MatDialog } from '@angular/material';
import { Component, OnInit, NgZone, HostListener } from '@angular/core';
import * as classes from './classes';
import { GlobalService } from './services/global.service';
import { WindowRefService } from './services/window-ref.service'
import { DialogComponent } from './dialog/dialog.component';
import { DialogExitComponent } from './dialog-exit/dialog-exit.component';
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
  public differentPage: boolean;
  public sidenavImg: string;
  public sidenavTitle: string;
  public exhibitionUrl: string;
  private dialogUrl: string;

  constructor(
    private _globalService: GlobalService,
    private _ngZone: NgZone,
    private _jsonService: JsonFetchService,
    private _router: Router,
    private windowRef: WindowRefService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.init();
    /* Aggiungo la reference globale usando il servizio wrapper creato */
    this.windowRef.window.loadUrl =  (url) => {this._ngZone.run(() => this.loadUrlV2(url))};
  }

  private init() {
    this.inSession = false;
    this.sidenavImg = '';
    this.sidenavTitle = 'Home page';
    this.exhibitionUrl = '';
    this.differentPage = false;
    this.linkList = [];
    this.scannedBeacons = [];
  }

  private initSession() {
    this.inSession = true;
    this.sidenavImg = this._globalService.getExhibition().imgUrl;
    this.sidenavTitle = this._globalService.getExhibition().title;
    this.exhibitionUrl = 'exhibition';
  }

  updateSidenav() {
    this.linkList = [];
    const rooms = this._globalService.getRooms();
    rooms.sort((a, b) => b.id - a.id).forEach(room => {
      this.linkList.push({link: 'room/' + room.id, label: room.title});
    })
  }

  getLinkList(): Array<any> {
    return this.linkList;
  }

  loadUrl(url: string) {
    // Se il link è di una esibizione, effettuo il caricamento di tutti i dati associati
    const urlComponents: string[] = url.split('/');
    const resource = urlComponents[3];
    const id = Number.parseInt(urlComponents[4]);
    let data: any;
    // Controllo se siamo in una visita
    if (this.inSession === false) {
      // Mi aspetto che l'url sia dell'esibizione così da caricare i dati
      if (resource === 'exhibitions') {
        /* Recupero i dati dal db */
        this._jsonService.getExhibitionData(id)
        .subscribe(
          res => data = res[0],
          err => console.error,
          () => {
            // Salvataggio dei dati del nuovo beacon (se è una stanza o un'opera)
            this.saveDataV2(data);
            // Se inizia la sessione setto la variabile
            this.initSession();
            this.updateSidenav();
            this.setNavigationUrl(data);
            this.manageDialog(data);
          }
        );
      } else {
        // Mostrare un messaggio che chiede di partire dall'inizio della visita
      }
    } else {
      // Se la sessione è già stata avviata, tutti i dati sono nel db e quindi li recupero da lì
      switch (resource) {
        case 'exhibitions':
          // Nel caso l'esibizione trovata sia diversa dall'attuale è necessario chiudere la sessione e riaprire
          if (this._globalService.getExhibition() != null) {
            if (this._globalService.getExhibition().id === id) {
              data = this._globalService.getExhibition();
            } else {
              // Mostro un dialogo che chiede se chiudere la sessione e aprirne una nuova con la nuova esibizione
              const dialogExit = this.dialog.open(DialogExitComponent, {
                data: {title: data.title}
              });
              dialogExit.afterClosed().subscribe(result => {
                if (result === 'ok') {
                  // chiudo la sessione
                  this.closeSession();
                  this.loadUrlV2(url);
                }
              });
            }
          } else {
            // per qualche motivo sono in sessione ma non è stata caricata la visita, chiudo e ricarico
            this.closeSession();
            this.loadUrlV2(url);
          }
          break;
        case 'rooms':
          if (this._globalService.findRoom(id) !== undefined) {
            data = this._globalService.findRoom(id);
          } else {
            // Messaggio di errore, risorsa sconosciuta
          }
          break;
        case 'artworks':
          if (this._globalService.findArtwork(id) !== undefined) {
            data = this._globalService.findArtwork(id);
          } else {
            // Messaggio di errore, risorsa sconosciuta
          }
          break;
      }
      this.setNavigationUrl(data);
      this.manageDialog(data);
    }
  }

  // loadUrl(url: string) {
  //   // Controllo che la risorsa non sia già memorizzata, altrimenti la recupero dal db
  //   const urlComponents: string[] = url.split('/');
  //   const resource = urlComponents[3];
  //   const id = Number.parseInt(urlComponents[4]);
  //   let inMemory = false;
  //   let data;
  //   switch (resource) {
  //     case 'exhibitions':
  //       // Nel caso l'esibizione trovata sia diversa dall'attuale è necessario chiudere la sessione e riaprire
  //       if (this._globalService.getExhibition() != null) {
  //         if (this._globalService.getExhibition().id === id) {
  //           inMemory = true;
  //           data = this._globalService.getExhibition();
  //         } else {
  //           // Mostro un dialogo che chiede se chiudere la sessione e aprirne una nuova con la nuova esibizione
  //           const dialogExit = this.dialog.open(DialogExitComponent, {
  //             data: {title: data.title}
  //           });
  //           dialogExit.afterClosed().subscribe(result => {
  //             if (result === 'ok') {
  //               // chiudo la sessione
  //               this.closeSession();
  //               // inMemory rimane false così il programma recupera la nuova esibizione
  //             }
  //           });
  //         }
  //       }
  //       break;
  //     case 'rooms':
  //       if (this._globalService.findRoom(id) !== undefined) {
  //         inMemory = true;
  //         data = this._globalService.findRoom(id);
  //       }
  //       break;
  //     case 'artworks':
  //       if (this._globalService.findArtwork(id) !== undefined) {
  //         inMemory = true;
  //         data = this._globalService.findArtwork(id);
  //       }
  //       break;
  //   }
  //   if (!inMemory) {
  //     /* Recupero dall'url l'indirizzo del db per costruire altre query */
  //     this._jsonService.setDbUrl(urlComponents[0] + '//' + urlComponents[2]);
  //     /* Recupero i dati dal db */
  //     this._jsonService.getJsonData(url)
  //     .subscribe(
  //       res => data = res,
  //       err => console.error,
  //       () => {
  //         // Salvataggio dei dati del nuovo beacon (se è una stanza o un'opera)
  //         this.saveData(data);
  //         // Se inizia la sessione setto la variabile
  //         this.initSession();
  //         this.updateSidenav();
  //         this.setNavigationUrl(data);
  //         this.manageDialog(data);
  //       }
  //     );
  //   } else {
  //     this.setNavigationUrl(data);
  //     this.manageDialog(data);
  //   }
  // }

  saveData(data: any) {
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
      // carico le stanze
      data.rooms.forEach(roomData => {
        const room = new classes.Room(
          roomData.id,
          roomData.type,
          roomData.title,
          roomData.description,
          roomData.svgUrl,
          roomData.containerStyle);
        this._globalService.addRoom(room);
        // carico le opere di ogni stanza
        roomData.artworks.forEach(artworkData => {
          const artwork: classes.Artwork =
            new classes.Artwork(
              artworkData.id,
              artworkData.type,
              artworkData.title,
              artworkData.description,
              artworkData.imgUrl,
              artworkData.containerStyle,
              room.id,
              artworkData.position,
              artworkData.audioUrl);
          this._globalService.addArtwork(artwork);
          this._globalService.findRoom(room.id).addArtwork(artwork.id);
        });
      });
  }

  // saveData(data: any) {
  //   switch (data.type) {
  //     case 'exhibition':
  //       const exhibition: classes.GenericJsonClass =
  //         new classes.GenericJsonClass(
  //           data.id,
  //           data.type,
  //           data.title,
  //           data.description,
  //           data.imgUrl,
  //           data.containerStyle
  //         );
  //         this._globalService.setExhibition(exhibition);
  //         const museum: classes.GenericJsonClass =
  //           new classes.GenericJsonClass(
  //             null,
  //             data.museum.type,
  //             data.museum.title,
  //             data.museum.description,
  //             data.museum.imgUrl,
  //             data.museum.containerStyle
  //           );
  //         this._globalService.setMuseum(museum);
  //       break;
  //     case 'room':
  //       const room: classes.Room =
  //         new classes.Room(
  //           data.id,
  //           data.type,
  //           data.title,
  //           data.description,
  //           data.svgUrl,
  //           data.containerStyle);
  //       this._globalService.addRoom(room);
  //       // recupero anche tutte le opere della stanza così da non doverle scaricare dopo
  //       /* Recupero tutte le opere che ci sono all'interno di quella stanza */
  //       const baseUrl = this._jsonService.getDbUrl();
  //       this._jsonService.getJsonData(baseUrl + '/artworks?idRoom=' + data.id)
  //       .subscribe(
  //         res => data = res,
  //         err => console.error,
  //         () => {
  //           // Devo salvare le opere in memoria per non doverle ricaricare
  //           data.forEach(artwork => {
  //             if (this._globalService.findArtwork(artwork.id) === undefined) {
  //               this.saveData(artwork);
  //             }
  //           });
  //         }
  //       );
  //       break;
  //     case 'artwork':
  //       const artwork: classes.Artwork =
  //         new classes.Artwork(
  //           data.id,
  //           data.type,
  //           data.title,
  //           data.description,
  //           data.imgUrl,
  //           data.containerStyle,
  //           data.roomId,
  //           data.position,
  //           data.audioUrl);
  //       this._globalService.addArtwork(artwork);
  //       if (this._globalService.findRoom(data.idRoom) !== undefined) {
  //         this._globalService.findRoom(data.idRoom).addArtwork(data.id);
  //       } else {
  //         // tslint:disable-next-line:no-shadowed-variable
  //         const baseUrl = this._jsonService.getDbUrl();
  //         this._jsonService.getJsonData(baseUrl + '/rooms/' + data.idRoom)
  //         .subscribe(
  //           res => data = res,
  //           err => console.error,
  //           () => {
  //             this.saveData(data);
  //             this.updateSidenav();
  //           }
  //         );
  //       }
  //       break;
  //   }
  // }

  private setNavigationUrl(data: any) {
    this.dialogUrl = (data.type === 'exhibition') ? data.type : (data.type + '/' + data.id);
    this._globalService.linkToCurrent = this.dialogUrl;
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
    } else if (result === 'remain') {
      const paths = this._router.url.split('/');
      paths.splice(0, 1);
      const url = [];
      paths.forEach(el => {
        url.push({path: el})
      });
      this._globalService.manageRouting(url);
    }
  }

  closeSession() {
    this.init();
    this._globalService.clearData();
    this.dialogUrl = '';
  }

}
