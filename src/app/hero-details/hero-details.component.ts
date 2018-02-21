import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';

import { HeroDetails, CharacterDataWrapper, Character } from '../../../models/';
import { HeroDetailsDialogComponent } from '../hero-details-dialog/hero-details-dialog.component';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroDetailsComponent implements OnInit {

  constructor(
    protected dialog: MatDialog,
    protected route: ActivatedRoute,
    protected router: Router
  ) { }

  ngOnInit() {
    this.route.data.pipe(
      map((response: { hero: CharacterDataWrapper}) => response.hero.data.results[0]),
      map((d: Character) => ({
          id: d.id,
          name: d.name,
          thumbnail: `${d.thumbnail.path}.${d.thumbnail.extension}`,
          description: d.description,
          comics: d.comics.items.splice(0, 3).map(i => i.name),
          comicsApparitions: d.comics.available
      }))
    ).subscribe(hero => {
      const dialogConfig: MatDialogConfig = { data: hero, width: '70%' };
      let dialogRef: any;
      setTimeout(() => {
        dialogRef = this.dialog.open(HeroDetailsDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(() => this.router.navigate([ { outlets: { dialog: null } } ]));
      });

    });

  }

}
