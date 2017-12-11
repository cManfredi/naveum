import { Injectable } from '@angular/core';
import * as classes from '../classes';

@Injectable()
export class GlobalService {
  public lang: string;
  public currentPage = '';
  public currentBeacon: any;

  public rooms: Array<classes.Room>;
  public currentRoom = 0;

  constructor() {
    this.lang = 'en';
    this.rooms = [];
  }

  /* Le due funzioni sono separate perchè è possibile aggiungere una stanza ma non cambiare pagina */

  addRoom(room: classes.Room) {
    this.rooms.push(room);
  }

  updateRoom(roomId: number) {
    this.currentRoom = roomId;
  }

  findRoom(roomId: number) {
    return this.rooms.find( room => roomId === room.id);
  }

}
