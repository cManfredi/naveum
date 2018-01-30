import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class JsonFetchService {
  private baseUrl = 'https://api.mlab.com/api/1/databases/naveum/collections/';
  private apiKey = 'DwBVhA_VKdogGizIA37mM04uK8IZlR3Q';

  constructor(private http: Http) { }

  getExhibitionData(collectionId: number) {
    const url = this.baseUrl + '/exhibitions?q={id:' + collectionId + '}&apiKey=' + this.apiKey;
    return this.http.get(url).map(res => res.json());
  }

}
