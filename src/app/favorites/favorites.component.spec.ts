
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule  } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

import { CharacterDataWrapper, CharacterDataContainer } from '../../../models/index';
import { HeroesService } from 'app/services/heroes.service/heroes.service';

import { FavoritesComponent } from './favorites.component';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritesComponent ],
      providers: [
        {
          provide: HeroesService,
          useValue: { loadingHero: new Subject(), getFavoritesUpdates: () => of([]) }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            data: of( { favorites: {
              attributionHTML: '', attributionText: '', copyright: '', etag: '',
              code: 200, status: 'OK', data: {
                count: 5, limit: 5, offset: 0, total: 5,
                results: '01234'.split('').map(i => ({
                      comics: { items: [] } as any,
                      description: 'description' + i,
                      events: [] as any,
                      id: parseInt(i, 10) + 1,
                      modified: new Date(),
                      name: 'charName' + i,
                      resourceURI: '',
                      series: [] as any,
                      stories: [] as any,
                      thumbnail: { extension: 'jpg', path: 'image' + i },
                      urls: []
                }))
              }
            } as CharacterDataWrapper }),
            params: of({})
          }
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
    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to hero details', async(() => {
    const router = TestBed.get(Router);
    const navigateSpy = spyOn(router, 'navigate');

    component.ngOnInit();

    component.heroes.subscribe(favorites => {
      component.goToHeroDetails(favorites[0].id);
      fixture.detectChanges();
      expect(navigateSpy).toHaveBeenCalledWith([ { outlets: { 'dialog': [ 'hero', favorites[0].id ] }} ]);
    })
  }));

  it('should display favorite hero list', async(() => {
    component.ngOnInit();

    component.heroes.subscribe(heroes => {
      expect(heroes.length).toEqual(5);
      expect(heroes[0]).toEqual({ name: 'charName0', id: 1, thumbnail: 'image0.jpg' });
    })
  }));
});
