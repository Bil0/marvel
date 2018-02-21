import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HeroDetailsComponent } from 'app/hero-details/hero-details.component';

@Component({
  selector: 'app-hero-details-dialog',
  templateUrl: './hero-details-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroDetailsDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public hero: any,
    protected dialogRef: MatDialogRef<HeroDetailsComponent>
  ) { }

  ngOnInit() {
  }

}
