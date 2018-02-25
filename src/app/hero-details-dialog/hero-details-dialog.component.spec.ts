import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';

import { HeroDetailsDialogComponent } from './hero-details-dialog.component';
import { HeroesService } from 'app/services/heroes.service/heroes.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { HeroDetails } from '../../../models/index';

describe('HeroDetailsDialogComponent', () => {
  let component: HeroDetailsDialogComponent;
  let fixture: ComponentFixture<HeroDetailsDialogComponent>;
  let heroesService: HeroesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroDetailsDialogComponent ],
      providers: [
        {
          provide: HeroesService,
          useValue: {
            loadingHero: new Subject(),
            getFavoritesUpdates: () => of([]),
            inFavorites: () => true,
            addToFavorites: () => of(true),
            removeFromFavorites: () => of(false)
          }
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            comics: [ 'a', 'b', 'c' ],
            comicsApparitions: 12,
            description: 'description',
            id: 1,
            name: 'charName',
            thumbnail: 'image.jpg'
          } as HeroDetails
        }
      ],
      imports: [
        RouterTestingModule
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    heroesService = TestBed.get(HeroesService);
    fixture = TestBed.createComponent(HeroDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set hero favorite state', async(async () => {
    const heroesServiceInFavoritesSpy = spyOn(heroesService, 'inFavorites').and.returnValue(true);

    component.ngOnInit();

    expect(heroesServiceInFavoritesSpy).toHaveBeenCalledWith(component.hero.id);
    expect(component.inFavorites).toEqual(true);
  }));

  it('should mark a hero as favorite', async(() => {
    const heroesServiceAddToFavoriteSpy = spyOn(heroesService, 'addToFavorites').and.callThrough();

    component.handleFavorites({ checked: true } as any)
      .subscribe(() => expect(component.inFavorites).toBe(true));
    expect(heroesServiceAddToFavoriteSpy).toHaveBeenCalledWith(component.hero.id);
  }));

  it('should remove a hero from favorites', async(() => {
    const heroesServiceRemoveFromFavoriteSpy = spyOn(heroesService, 'removeFromFavorites').and.callThrough();

    component.handleFavorites({ checked: false } as any)
      .subscribe(() => expect(component.inFavorites).toBe(false));
    expect(heroesServiceRemoveFromFavoriteSpy).toHaveBeenCalledWith(component.hero.id);
  }));
});
