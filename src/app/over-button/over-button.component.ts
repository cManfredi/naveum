import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router/src/router_state';

@Component({
  selector: 'app-over-button',
  templateUrl: './over-button.component.html',
  styleUrls: ['./over-button.component.scss']
})
export class OverButtonComponent implements OnInit {

  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {
    // Sottoscrizione alla lettura di un nuovo beacon
    
  }

}
