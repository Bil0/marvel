import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesListDumbComponent } from './heroes-list-dumb.component';

describe('HeroesListDumbComponent', () => {
  let component: HeroesListDumbComponent;
  let fixture: ComponentFixture<HeroesListDumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroesListDumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesListDumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
