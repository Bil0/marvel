import { Routes } from '@angular/router';
import { HeroesListComponent } from './heroes-list/heroes-list.component';

import { HeroesListResolver } from './services/heroes-list.resolver/heroes-list.resolver';

export const AppRoutes: Routes = [
  { path: '', component: HeroesListComponent, resolve: { heroes: HeroesListResolver } },
  { path: ':page', component: HeroesListComponent, resolve: { heroes: HeroesListResolver } }
];
