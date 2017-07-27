import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class JsonFetchService {
  private toReturn;

  constructor(private http: Http) { }

  getJsonData(url: string) {
    this.http.get(url).subscribe(res => this.toReturn = res.json());
    return this.toReturn;
  }

}
