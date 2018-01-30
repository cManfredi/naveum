import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'app/services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-over-button',
  templateUrl: './over-button.component.html',
  styleUrls: ['./over-button.component.scss']
})
export class OverButtonComponent implements OnInit {
  differentPage: boolean;

  constructor(private _globalService: GlobalService, private _router: Router) { }

  ngOnInit() {
    this.differentPage = false;
    this._globalService.routeNav$.subscribe( url => {
      let completeUrl = '';
      url.forEach(element => {
        completeUrl += '/' + element.path;
      });
      if (completeUrl !== '/' + this._globalService.linkToCurrent) {
        this.differentPage = true;
      }
    })
  }

  goToCurrentPage() {
    this._router.navigate([this._globalService.linkToCurrent]);
    this.differentPage = false;
  }

}
