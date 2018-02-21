import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutes } from './app.routes';

import { HeroesService } from './services/heroes.service/heroes.service';
import { HeroesListResolver, ENTRIES_PER_PAGE } from './services/heroes-list.resolver/heroes-list.resolver';

import { AppComponent } from './app.component';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { HeroesListDumbComponent } from './heroes-list-dumb/heroes-list-dumb.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesListComponent,
    HeroesListDumbComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [
    HeroesService,
    HeroesListResolver,
    { provide: ENTRIES_PER_PAGE, useValue: 20 }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
