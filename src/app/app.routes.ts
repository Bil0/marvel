import { Routes } from '@angular/router';
import { HeroesListComponent } from './heroes-list/heroes-list.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: HeroesListComponent,
  }
];
