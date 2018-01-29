import { Injectable } from '@angular/core';
import * as classes from '../classes';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GlobalService {
  private lang: string;
  private data: {
    museum: classes.GenericJsonClass,
    exhibition: classes.GenericJsonClass,
    rooms: Array<classes.Room>,
    artworks: Array<classes.Artwork>
  };

  // Observable per aggiornare navbar e overbutton quando si naviga
  private routerNavSource = new Subject<any>();
  public routeNav$ = this.routerNavSource.asObservable();

  public linkToCurrent: string;

  public currentRoom: number;
  public currentArtwork: number;

  // Gestione tabs in room
  lastTabSelected: number;

  constructor() {
    this.lang = 'en';
    this.init();
  }

  private init(): void {
    this.lastTabSelected = 0;
    this.linkToCurrent = '';
    this.currentArtwork = 0;
    this.currentRoom = 0;
    this.data = {
      museum: null,
      exhibition: null,
      rooms: [],
      artworks: []
    };
  }

  getData(): any {
    return this.data;
  }

  /* Le due funzioni sono separate perchè è possibile aggiungere una stanza ma non cambiare pagina */

  getMuseum(): classes.GenericJsonClass {
    return this.data.museum;
  }

  setMuseum(museum: classes.GenericJsonClass) {
    this.data.museum = museum;
  }

  getExhibition(): classes.GenericJsonClass {
    return this.data.exhibition;
  }

  setExhibition(exhibition: classes.GenericJsonClass) {
    this.data.exhibition = exhibition;
  }

  addRoom(room: classes.Room) {
    if (this.findRoom(room.id) === undefined) {
      this.data.rooms.push(room);
    }
  }

  updateRoom(roomId: number) {
    this.currentRoom = roomId;
  }

  findRoom(roomId: number): classes.Room {
    return this.data.rooms.find( room => roomId === room.id);
  }

  getRooms(): Array<classes.Room> {
    return this.data.rooms;
  }

  addArtwork(artwork: classes.Artwork) {
    if (this.findArtwork(artwork.id) === undefined) {
      this.data.artworks.push(artwork);
    }
  }

  updateArtwork(artworkId: number) {
    this.currentArtwork = artworkId;
  }

  findArtwork(artworkId: number): classes.Artwork {
    return this.data.artworks.find( artwork => artworkId === artwork.id);
  }

  clearData(): void {
    this.init();
  }

  manageRouting(data) {
    this.routerNavSource.next(data);
  }

}
