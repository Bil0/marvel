import { Injectable } from '@angular/core';
import { ActivatedRoute, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { zipStatic } from 'rxjs/operators/zip';
import { map } from 'rxjs/operators/map';
import { mergeMap } from 'rxjs/operators/mergeMap';

import { CharacterDataWrapper } from '../../../../models/';
import { HeroesService } from '../heroes.service/heroes.service';


@Injectable()
export class FavoritesResolver implements Resolve<CharacterDataWrapper> {

  constructor(protected heroesService: HeroesService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.heroesService.getFavorites().pipe(
      map(ids => ids.map(heroId => this.heroesService.getHero(heroId, false))),
      mergeMap(heroesObservables =>
        zipStatic(...heroesObservables).pipe(
          map((heroes: CharacterDataWrapper[]) => heroes.reduce((a, c, i) => {
            if (!i) { return a; }
            a.data.results = a.data.results.concat(c.data.results);
            a.data.count++;
            a.data.total++;
            return a;
          }, heroes[0]))
        )
      )
    );
  }
}
