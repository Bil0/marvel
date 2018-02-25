import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule  } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

import { CharacterDataWrapper, CharacterDataContainer } from '../../../models/index';
import { HeroesService } from 'app/services/heroes.service/heroes.service';

import { HeroDetailsComponent } from './hero-details.component';
import { MatDialog } from '@angular/material';
import { HeroDetailsDialogComponent } from 'app/hero-details-dialog/hero-details-dialog.component';

describe('HeroDetailsComponent', () => {
  let component: HeroDetailsComponent;
  let fixture: ComponentFixture<HeroDetailsComponent>;
  let dialogOpenSpy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroDetailsComponent ],
      providers: [
        {
          provide: HeroesService,
          useValue: { loadingHero: new Subject(), getFavoritesUpdates: () => of([]) }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            data: of( { hero: {
              attributionHTML: '', attributionText: '', copyright: '', etag: '',
              code: 200, status: 'OK', data: {
                count: 10, limit: 10, offset: 10, total: 100,
                results: [{
                      comics: {
                        items: '1234'.split('').map(i => ({ name: i })),
                        available: 5
                      } as any,
                      description: 'description',
                      events: [] as any,
                      id: 1,
                      modified: new Date(),
                      name: 'charName',
                      resourceURI: '',
                      series: [] as any,
                      stories: [] as any,
                      thumbnail: { extension: 'jpg', path: 'image' },
                      urls: []
                }]
              }
            } as CharacterDataWrapper }),
          }
        },
        {
          provide: MatDialog,
          useValue: { open: () => ({ afterClosed: () => of(null) }) }
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
    dialogOpenSpy = spyOn(TestBed.get(MatDialog), 'open').and.callThrough();
    fixture = TestBed.createComponent(HeroDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open a hero details dialog', async(() => {
    const route = TestBed.get(ActivatedRoute);
    route.data.subscribe(d => {
      const hero = d.hero.data.results[0];
      const data = {
          id: hero.id,
          name: hero.name,
          thumbnail: `${hero.thumbnail.path}.${hero.thumbnail.extension}`,
          description: hero.description,
          comics: hero.comics.items.slice(0, 3).map(i => i.name),
          comicsApparitions: hero.comics.available
      };

      setTimeout(() =>
        expect(dialogOpenSpy).toHaveBeenCalledWith(HeroDetailsDialogComponent, { width: '70%', data })
      );
    });

    component.ngOnInit();
  }));
});
