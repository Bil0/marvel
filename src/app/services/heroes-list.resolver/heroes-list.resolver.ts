import { Injectable, Inject, InjectionToken } from '@angular/core';
import { ActivatedRoute, Resolve } from '@angular/router';

import { CharacterDataWrapper } from '../../../../models/';
import { HeroesService } from '../heroes.service/heroes.service';
import { ActivatedRouteSnapshot } from '@angular/router/src/router_state';


export const ENTRIES_PER_PAGE = new InjectionToken('Entries per page');

@Injectable()
export class HeroesListResolver implements Resolve<CharacterDataWrapper> {

  constructor(
    protected heroesService: HeroesService,
    @Inject(ENTRIES_PER_PAGE) protected limit
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    const offset = ((parseInt(route.params['page'], 10) || 1) - 1) * this.limit;
    return this.heroesService.getHeroesList(this.limit, offset);
  }

}
