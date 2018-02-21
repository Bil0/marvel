import { Injectable } from '@angular/core';
import { ActivatedRoute, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { CharacterDataWrapper } from '../../../../models/';
import { HeroesService } from '../heroes.service/heroes.service';

@Injectable()
export class HeroResolver implements Resolve<CharacterDataWrapper> {

  constructor(protected heroesService: HeroesService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.heroesService.getHero(parseInt(route.params.id, 10));
  }

}
