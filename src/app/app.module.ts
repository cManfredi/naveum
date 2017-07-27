/* Moduli */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import 'hammerjs';
import { MdSidenavModule, MdToolbarModule, MdButtonModule, MdIconModule, MdListModule } from '@angular/material';

/* Componenti */
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './pageNotFound.component';
import { InfoExhibitionComponent } from './info-exhibition/info-exhibition.component';

/* Servizi */
import { JsonFetchService } from './services/json-fetch.service';

/* Routes predefinite dell'applicazione, a mano a mano che si scoprono nuove pagine è possibile
   ne verranno aggiunte altre alla configurazione del router */
const appRoutes: Routes = [
  { path: '', component: MainComponent},
  { path: '/exhibition', component: InfoExhibitionComponent },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FooterComponent,
    HeaderComponent,
    PageNotFoundComponent,
    InfoExhibitionComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    MdSidenavModule,
    MdToolbarModule,
    MdButtonModule,
    MdIconModule,
    MdListModule
  ],
  providers: [JsonFetchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
