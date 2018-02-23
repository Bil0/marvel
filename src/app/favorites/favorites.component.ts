import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { tap } from 'rxjs/operators/tap';
import { map } from 'rxjs/operators/map';
import { of } from 'rxjs/observable/of';
import { combineLatest } from 'rxjs/observable/combineLatest';

import { CharacterDataWrapper, CharacterDataContainer, HeroPreview } from '../../../models/';
import { HeroesService } from 'app/services/heroes.service/heroes.service';

interface ListingResult { total: number, list: HeroPreview[] };

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesComponent implements OnInit {
  heroes: Observable<HeroPreview[]>;
  favorites: Observable<{ [ id: number ]: boolean }[]>;
  loadingHero: Observable<number | null>;
  loadingHeroList = new Subject<boolean>();

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected heroesService: HeroesService
  ) {
    this.loadingHero = this.heroesService.loadingHero.asObservable();
  }

  ngOnInit() {
    const result = this.route.data.pipe(
      map((response: { favorites: CharacterDataWrapper}) => response.favorites.data),
      map((d: CharacterDataContainer) => ({
        total: d.total,
        list: d.results.map(h => ({
          id: h.id,
          name: h.name,
          thumbnail: `${h.thumbnail.path}.${h.thumbnail.extension}`
        }))
      }))
    );

    this.heroes = result.pipe(map((r: ListingResult) => r.list));

    this.favorites = combineLatest(this.heroes, this.heroesService.getFavoritesUpdates()).pipe(
      map(([ heroes, favorites ]) => {

        const favoritesMap = heroes.reduce((a, c) => {
          a[c.id] = favorites.indexOf(c.id) >= 0;
          return a;
        }, {} as any);

        this.heroes = of(heroes.filter(h => favoritesMap[h.id]))

        return favoritesMap;
      })
    );
  }

  goToHeroDetails(heroId: number) {
    this.router.navigate([ { outlets: { dialog: [ 'hero', heroId ] } } ]);
  }

}
