import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ShareDataService {
  private emittingSource = new Subject<any>();
  private stream = this.emittingSource.asObservable();

  constructor() { }

  emitChange(change: any) {
    this.emittingSource.next(change);
  }

}
