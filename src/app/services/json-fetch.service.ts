import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class JsonFetchService {

  private dbUrl: string;

  constructor(private http: Http) { }

  getJsonData(url: string) {
    return this.http.get(url).map(res => res.json());
  }

  public getDbUrl(): string {
    return this.dbUrl;
  }

  public setDbUrl(dbUrl): void {
    this.dbUrl = dbUrl;
  }

}
