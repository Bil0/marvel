import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatPaginatorModule,
  MatListModule,
  MatDividerModule,
  MatToolbarModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatChipsModule,
  MatCheckboxModule
} from '@angular/material';

import { AppRoutes } from './app.routes';

import { HeroesService, MAX_FAVORITES } from './services/heroes.service/heroes.service';
import { HeroesListResolver, ENTRIES_PER_PAGE } from './services/heroes-list.resolver/heroes-list.resolver';
import { HeroResolver } from './services/hero.resolver/hero.resolver';

import { AppComponent } from './app.component';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { HeroesListDumbComponent } from './heroes-list-dumb/heroes-list-dumb.component';
import { HeroDetailsComponent } from './hero-details/hero-details.component';
import { HeroDetailsDialogComponent } from './hero-details-dialog/hero-details-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesListComponent,
    HeroesListDumbComponent,
    HeroDetailsComponent,
    HeroDetailsDialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes),
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatListModule,
    MatDividerModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatChipsModule,
    MatCheckboxModule
  ],
  providers: [
    HeroesService,
    HeroesListResolver,
    HeroResolver,
    { provide: ENTRIES_PER_PAGE, useValue: 20 },
    { provide: MAX_FAVORITES, useValue: 5 }
  ],
  entryComponents: [
    HeroDetailsDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
