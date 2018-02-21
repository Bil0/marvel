import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroDetailsDialogComponent } from './hero-details-dialog.component';

describe('HeroDetailsDialogComponent', () => {
  let component: HeroDetailsDialogComponent;
  let fixture: ComponentFixture<HeroDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
