import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule  } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

import { HeroesListComponent } from './heroes-list.component';
import { CharacterDataWrapper, CharacterDataContainer } from '../../../models/index';
import { HeroesService } from 'app/services/heroes.service/heroes.service';

describe('HeroesListComponent', () => {
  let component: HeroesListComponent;
  let fixture: ComponentFixture<HeroesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroesListComponent ],
      providers: [
        {
          provide: HeroesService,
          useValue: { loadingHero: new Subject(), getFavoritesUpdates: () => of([]) }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            data: of( { heroes: {
              attributionHTML: '', attributionText: '', copyright: '', etag: '',
              code: 200, status: 'OK', data: {
                count: 10, limit: 10, offset: 10, total: 100,
                results: '0123456789'.split('').map(i => ({
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
    fixture = TestBed.createComponent(HeroesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should show 20 heroes at a time with heroes names and pictures', async(() => {
    component.heroes.subscribe(heroes => {
      expect(heroes.length).toEqual(10);
      expect(heroes[0]).toEqual({ name: 'charName0', id: 1, thumbnail: 'image0.jpg' });
    })
  }));

  it('should navigate to hero details', async(() => {
    const router = TestBed.get(Router);
    const navigateSpy = spyOn(router, 'navigate');

    component.heroes.subscribe(heroes => {
      component.goToHeroDetails(heroes[0].id);
      fixture.detectChanges();
      expect(navigateSpy).toHaveBeenCalledWith([ { outlets: { 'dialog': [ 'hero', heroes[0].id ] }} ]);
    })

  }));

  it('should navigate to other pages', async(() => {
    const router = TestBed.get(Router);
    const navigateSpy = spyOn(router, 'navigate');
    component.changePage({ pageIndex: 5 } as any);

    fixture.detectChanges();
    expect(navigateSpy).toHaveBeenCalledWith([ 'heroes', 6 ]);
  }));

});
