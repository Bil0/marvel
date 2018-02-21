import { Component, OnInit, ChangeDetectionStrategy, Input, Inject } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { map, tap } from 'rxjs/operators';
import { PageEvent } from '@angular/material';

import { HeroPreview, CharacterDataWrapper, CharacterDataContainer } from '../../../models/';
import { ENTRIES_PER_PAGE } from '../services/heroes-list.resolver/heroes-list.resolver';
import { HeroesService } from 'app/services/heroes.service/heroes.service';

interface ListingResult { total: number, list: HeroPreview[] };

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroesListComponent implements OnInit {
  heroes: Observable<HeroPreview[]>;
  totalItems: Observable<number>;
  currentPage: Observable<number>;
  loadingHero: Observable<number | null>;
  loadingHeroList = new Subject<boolean>();

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    @Inject(ENTRIES_PER_PAGE) public limit: number,
    protected heroesService: HeroesService
  ) {
    this.loadingHero = this.heroesService.loadingHero.asObservable();
  }

  ngOnInit() {
    const result = this.route.data.pipe(
      tap(() => this.loadingHeroList.next(false)),
      map((response: { heroes: CharacterDataWrapper}) => response.heroes.data),
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
    this.totalItems = result.pipe(map((r: ListingResult) => r.total));
    this.currentPage = this.route.params.pipe(map(({ page }) => parseInt(page || '1', 10) - 1));
  }

  goToHeroDetails(heroId: number) {
    this.router.navigate([ { outlets: { dialog: [ 'hero', heroId ] } } ]);
  }

  changePage(event: PageEvent) {
    this.loadingHeroList.next(true)
    this.router.navigate(['', event.pageIndex + 1 ]);
  }
}
