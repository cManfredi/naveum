import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'app/services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-over-button',
  templateUrl: './over-button.component.html',
  styleUrls: ['./over-button.component.scss']
})
export class OverButtonComponent implements OnInit {
  buttonLink: string;

  constructor(private _globalService: GlobalService, private _router: Router) { }

  ngOnInit() {
    // this.buttonLink = '';
    // this._globalService.routeNav$.subscribe( url => {
    //   this.buttonLink = this._globalService.linkToCurrent;
    // })
  }

  goToCurrentPage() {
    this._router.navigate([this._globalService.linkToCurrent]);
  }

}
