import { Routes } from '@angular/router';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { HeroDetailsComponent } from './hero-details/hero-details.component';
import { FavoritesComponent } from './favorites/favorites.component';

import { HeroesListResolver } from './services/heroes-list.resolver/heroes-list.resolver';
import { HeroResolver } from './services/hero.resolver/hero.resolver';
import { FavoritesResolver } from './services/favorites.resolver/favorites.resolver';

export const AppRoutes: Routes = [
  { path: '', redirectTo: 'heroes', pathMatch: 'full' },
  { path: 'heroes', component: HeroesListComponent, resolve: { heroes: HeroesListResolver } },
  { path: 'heroes/:page', component: HeroesListComponent, resolve: { heroes: HeroesListResolver } },
  { path: 'hero/:id', component: HeroDetailsComponent, resolve: { hero: HeroResolver }, outlet: 'dialog' },
  { path: 'favorites', component: FavoritesComponent, resolve: { favorites: FavoritesResolver } }
];
