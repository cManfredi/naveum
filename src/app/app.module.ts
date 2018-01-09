/* Moduli */
import { NgModule, NgZone } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import 'hammerjs';
import {
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatDialogModule,
  MatTabsModule
} from '@angular/material';
import { InlineSVGModule } from 'ng-inline-svg';

/* Componenti */
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './pageNotFound.component';
import { InfoExhibitionComponent } from './info-exhibition/info-exhibition.component';
import { InfoMuseumComponent } from './info-museum/info-museum.component';
import { InfoArtworkComponent } from './info-artwork/info-artwork.component';
import { InfoRoomComponent } from './info-room/info-room.component';
import { DialogComponent } from './dialog/dialog.component';

/* Servizi */
import { JsonFetchService } from './services/json-fetch.service';
import { ShareDataService } from './services/share-data.service';
import { GlobalService } from './services/global.service';
import { WindowRefService } from './services/window-ref.service';
import { OverButtonComponent } from './over-button/over-button.component';

/* Routes predefinite dell'applicazione, a mano a mano che si scoprono nuove pagine è possibile
   ne verranno aggiunte altre alla configurazione del router */
const appRoutes: Routes = [
  { path: '', component: MainComponent},
  { path: 'exhibition', component: InfoExhibitionComponent },
  { path: 'museum', component: InfoMuseumComponent },
  { path: 'room/:id', component: InfoRoomComponent},
  { path: 'artwork/:id', component: InfoArtworkComponent },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FooterComponent,
    HeaderComponent,
    PageNotFoundComponent,
    InfoExhibitionComponent,
    InfoMuseumComponent,
    InfoArtworkComponent,
    InfoRoomComponent,
    DialogComponent,
    OverButtonComponent
  ],
  entryComponents: [
    DialogComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatTabsModule,
    InlineSVGModule
  ],
  providers: [
    JsonFetchService,
    ShareDataService,
    GlobalService,
    WindowRefService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
