import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { HeroPreview } from '../../../models/';

@Component({
  selector: 'app-heroes-list-dumb',
  templateUrl: './heroes-list-dumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroesListDumbComponent implements OnInit {
  @Input() currentPage;
  @Input() totalPages;
  @Input() heroes: HeroPreview[];
  @Input() favorites: { [id: number]: boolean }[];
  @Input() loading;

  @Output() onNavigate = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }
}
