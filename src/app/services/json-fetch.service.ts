import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class JsonFetchService {

  constructor(private http: Http) { }

  getJsonData(url: string) {
    return this.http.get(url).map(res => res.json());
  }

}
