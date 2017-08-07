import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ShareDataService {
  /* lastBeacon mantiene in memoria l'ultimo beacon in modo che sia accessibile a componenti appena creati */
  private lastBeacon: Object = {};
  private beaconLoadSource = new Subject<any>();
  public beaconLoad$ = this.beaconLoadSource.asObservable();

  constructor() { }

  emitBeaconData(data: Object) {
    this.lastBeacon = data;
    this.beaconLoadSource.next(data);
  }

  public getLastBeacon(): Object {
    return this.lastBeacon;
  }

}
