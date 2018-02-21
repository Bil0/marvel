import { Routes } from '@angular/router';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { HeroDetailsComponent } from './hero-details/hero-details.component';

import { HeroesListResolver } from './services/heroes-list.resolver/heroes-list.resolver';
import { HeroResolver } from './services/hero.resolver/hero.resolver';

export const AppRoutes: Routes = [
  { path: '', component: HeroesListComponent, resolve: { heroes: HeroesListResolver } },
  { path: ':page', component: HeroesListComponent, resolve: { heroes: HeroesListResolver } },
  { path: 'hero/:id', component: HeroDetailsComponent, resolve: { hero: HeroResolver }, outlet: 'dialog' }
];
