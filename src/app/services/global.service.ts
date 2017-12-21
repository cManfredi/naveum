import { Injectable } from '@angular/core';
import * as classes from '../classes';

@Injectable()
export class GlobalService {
  private lang: string;
  private data: {
    museum: classes.GenericJsonClass,
    exhibition: classes.GenericJsonClass,
    rooms: Array<classes.Room>,
    artworks: Array<classes.Artwork>
  };

  public currentPage = '';
  public currentBeacon: any;

  public currentRoom = 0;
  public currentArtwork = 0;

  constructor() {
    this.lang = 'en';
    this.data = {
      museum: null,
      exhibition: null,
      rooms: [],
      artworks: []
    };
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
    this.data.rooms.push(room);
  }

  updateRoom(roomId: number) {
    this.currentRoom = roomId;
  }

  findRoom(roomId: number): classes.Room {
    return this.data.rooms.find( room => roomId === room.id);
  }

  addArtwork(artwork: classes.Artwork) {
    this.data.artworks.push(artwork);
  }

  updateArtwork(artworkId: number) {
    this.currentArtwork = artworkId;
  }

  findArtwork(artworkId: number): classes.Artwork {
    return this.data.artworks.find( artwork => artworkId === artwork.id);
  }

}
