import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';

import { HeroPreview, CharacterDataWrapper, CharacterDataContainer } from '../../../models/';

interface ListingResult { total: number, list: HeroPreview[] };

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroesListComponent implements OnInit {
  heroes: Observable<HeroPreview[]>;
  total: Observable<number>

  constructor(protected route: ActivatedRoute) { }

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
    this.total = result.pipe(map((r: ListingResult) => r.total));
  }

  nextPage() {
    return this.route.params.pipe(
      map((params: { page: string }) => (parseInt(params.page, 10) || 1) + 1),
      tap(p => console.log(p))
    );
  }
}
