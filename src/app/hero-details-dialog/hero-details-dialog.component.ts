import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCheckbox, MatCheckboxChange } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { HeroDetailsComponent } from 'app/hero-details/hero-details.component';
import { HeroesService } from '../services/heroes.service/heroes.service';
import { HeroDetails } from '../../../models/index';

@Component({
  selector: 'app-hero-details-dialog',
  templateUrl: './hero-details-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroDetailsDialogComponent implements OnInit {
  inFavorites: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public hero: HeroDetails,
    protected heroesService: HeroesService
  ) { }

  ngOnInit() {
    this.inFavorites = this.heroesService.inFavorites(this.hero.id);
  }

  handleFavorites(event: MatCheckboxChange) {
    let obs: Observable<any>;
    if (event.checked) {
      obs = this.heroesService.addToFavorites(this.hero.id);
    } else {
      obs = this.heroesService.removeFromFavorites(this.hero.id);
    }

    obs.subscribe(() => this.inFavorites = event.checked);
  }
}
