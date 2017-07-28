import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ShareDataService {
  private beaconLoadSource = new Subject<any>();
  beaconLoad$ = this.beaconLoadSource.asObservable();

  constructor() { }

  emitBeaconData(data: Object[]) {
    this.beaconLoadSource.next(data);
  }

}
