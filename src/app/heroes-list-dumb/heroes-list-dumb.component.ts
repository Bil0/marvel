import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { HeroPreview } from '../../../models/';

@Component({
  selector: 'app-heroes-list-dumb',
  templateUrl: './heroes-list-dumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroesListDumbComponent implements OnInit {
  @Input() currentPage = 1;
  @Input() totalPages = 0;
  @Input() heroes: HeroPreview[];

  constructor() { }

  ngOnInit() {
  }
}
