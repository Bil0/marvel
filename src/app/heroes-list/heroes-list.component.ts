import { Component, OnInit, ChangeDetectionStrategy, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';

import { HeroPreview, CharacterDataWrapper, CharacterDataContainer } from '../../../models/';
import { ENTRIES_PER_PAGE } from '../services/heroes-list.resolver/heroes-list.resolver';

interface ListingResult { total: number, list: HeroPreview[] };

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroesListComponent implements OnInit {
  heroes: Observable<HeroPreview[]>;
  totalPages: Observable<number>;
  currentPage: Observable<number>;

  constructor(protected route: ActivatedRoute, @Inject(ENTRIES_PER_PAGE) protected limit: number) { }

  ngOnInit() {
    const result = this.route.data.pipe(
      map((response: { heroes: CharacterDataWrapper}) => response.heroes.data),
      map((d: CharacterDataContainer) => ({
        total: d.total,
        list: d.results.map(h => ({
          id: h.id,
          name: h.name,
          thumbnail: `${h.thumbnail.path}.${h.thumbnail.extension}`
        }))
      }))
    )

    this.heroes = result.pipe(map((r: ListingResult) => r.list));
    this.totalPages = result.pipe(map((r: ListingResult) => Math.ceil(r.total / this.limit)));
    this.currentPage = this.route.params.pipe(map(({ page }) => parseInt(page || '1', 10))
    );
  }
}
