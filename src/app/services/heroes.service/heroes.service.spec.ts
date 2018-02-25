import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { HeroesService } from './heroes.service';

describe('HeroesService', () => {
  let http: HttpClient;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroesService],
      imports: [
        HttpClientTestingModule
      ]
    });

    http = TestBed.get(HttpClient);
    sessionStorage.removeItem('sessionId');
  });


  it('should be created', inject([HeroesService], (service: HeroesService) => {
    expect(service).toBeTruthy();
  }));

  it(
    'should fetch character list given limit and offset',
    async(inject([ HeroesService ], (service: HeroesService) => {
      const httpGetSpy = spyOn(http, 'get');
      service.getHeroesList(10, 20);

      expect(httpGetSpy).toHaveBeenCalledWith('/api/characters?limit=10&offset=20');
    }))
  );

  it(
    'should fetch character details',
    async(inject([ HeroesService ], (service: HeroesService) => {
      const httpGetSpy = spyOn(http, 'get').and.callThrough();
      const loadingHeroSpy = spyOn(service.loadingHero, 'next');

      service.getHero(1, false).subscribe(() => {
        expect(loadingHeroSpy).toHaveBeenCalledWith(null);
      });
      expect(httpGetSpy).toHaveBeenCalledWith('/api/characters/1');

      service.getHero(1).subscribe(() => {
        expect(loadingHeroSpy).toHaveBeenCalledWith(null);
      });
      expect(httpGetSpy).toHaveBeenCalledWith('/api/characters/1');

      service.getHero(2, true).subscribe(() => {
        expect(loadingHeroSpy).toHaveBeenCalledWith(null);
        expect(loadingHeroSpy).toHaveBeenCalledWith(2);
      });
      expect(httpGetSpy).toHaveBeenCalledWith('/api/characters/2');
    }))
  );

  it(
    'should fetch user favorites heroes and set a sessionId',
    async(inject([ HeroesService ], (service: HeroesService) => {
      const httpGetSpy = spyOn(http, 'get').and.returnValue(of({ list: [], sessionId: 's' }));
      service.getFavorites().subscribe(() => {
        service.getFavorites();
        expect(httpGetSpy).toHaveBeenCalledWith('/api/favorites', { headers: { sessionId: 's' } });
      });

      expect(httpGetSpy).toHaveBeenCalledWith('/api/favorites', { headers: { sessionId: '' } });
    }))
  );

  it(
    'should set a hero as a favorite',
    async(inject([ HeroesService ], (service: HeroesService) => {
      const favorites = [];
      const httpPostSpy = spyOn(http, 'post').and.callFake((url, hero) => {
        favorites.push(hero.heroId);
        return of({ favorites, sessionId: 't' })
      });
      const callbackObject = { fn: (f) => {} };
      const callbackSpy = spyOn(callbackObject, 'fn');

      service.getFavoritesUpdates().subscribe(callbackSpy);

      service.addToFavorites(1).subscribe(r => {
        expect(callbackSpy).toHaveBeenCalledWith(r);
        service.addToFavorites(2).subscribe(r2 => {
          expect(r2).toEqual([ 1, 2 ]);
          expect(callbackSpy).toHaveBeenCalledWith(r2);
        });
        expect(httpPostSpy).toHaveBeenCalledWith('/api/favorites', { heroId: 2 }, { headers: { sessionId: 't' } });
      });

      expect(httpPostSpy).toHaveBeenCalledWith('/api/favorites', { heroId: 1 }, { headers: { sessionId: '' } });
    }))
  );

  it(
    'should remove a hero from favorites',
    async(inject([ HeroesService ], (service: HeroesService) => {
      const favorites = [];
      const httpDeleteSpy = spyOn(http, 'delete').and.returnValue(of({ favorites: [], sessionId: 't' }));
      const callbackObject = { fn: (f) => {} };
      const callbackSpy = spyOn(callbackObject, 'fn');

      service.getFavoritesUpdates().subscribe(callbackSpy);

      service.removeFromFavorites(1).subscribe(r => expect(callbackSpy).toHaveBeenCalledWith(r));
      expect(httpDeleteSpy).toHaveBeenCalledWith('/api/favorites/1', { headers: { sessionId: '' } });
    }))
  );

  it(
    'should check for favorites',
    async(inject([ HeroesService ], (service: HeroesService) => {
      const favorites = [];
      const httpPostSpy = spyOn(http, 'post').and.callFake((url, hero) => {
        favorites.push(hero.heroId);
        return of({ favorites, sessionId: 't' })
      });

      expect(service.inFavorites(5)).toBe(false);

      service.addToFavorites(5).subscribe(() => {
        expect(service.inFavorites(5)).toBe(true);
      })
  })));
});
