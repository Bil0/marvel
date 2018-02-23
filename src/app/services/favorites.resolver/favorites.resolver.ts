import { Injectable } from '@angular/core';
import { ActivatedRoute, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { zipStatic } from 'rxjs/operators/zip';
import { map } from 'rxjs/operators/map';

import { CharacterDataWrapper } from '../../../../models/';
import { HeroesService } from '../heroes.service/heroes.service';


@Injectable()
export class FavoritesResolver implements Resolve<CharacterDataWrapper> {

  constructor(protected heroesService: HeroesService) { }

  resolve(route: ActivatedRouteSnapshot) {
    const heroesObservables = this.heroesService.getFavorites()
      .map(heroId => this.heroesService.getHero(heroId, false));

    return zipStatic(...heroesObservables).pipe(
      map((heroes: CharacterDataWrapper[]) => heroes.reduce((a, c, i) => {
        if (!i) { return a; }
        a.data.results = a.data.results.concat(c.data.results);
        a.data.count++;
        a.data.total++;
        return a;
      }, heroes[0]))
    );
  }
}
