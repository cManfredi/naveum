import { ShareDataService } from './services/share-data.service';
import { MdSidenavModule } from '@angular/material';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private shareData: ShareDataService) {}

  addLink(link: string) {
  }

}
