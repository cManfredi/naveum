import { MdSidenavModule } from '@angular/material';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() btnClicked: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  openSidenav() {
    this.btnClicked.emit('toggleSidenav');
  }

}
