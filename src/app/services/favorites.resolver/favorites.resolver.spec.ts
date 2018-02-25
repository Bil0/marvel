import { TestBed, inject, async } from '@angular/core/testing';
import { of } from 'rxjs/observable/of';

import { FavoritesResolver } from './favorites.resolver';
import { HeroesService } from '../heroes.service/heroes.service';

describe('FavoritesResolver', () => {
  const now = new Date();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FavoritesResolver,
        {
          provide: HeroesService,
          useValue: {
            getFavorites: () => of([ 1, 2, 3 ]),
            getHero: (id: number) => of({
              attributionHTML: '', attributionText: '', copyright: '', etag: '',
              code: 200, status: 'OK', data: {
                count: 1, limit: 1, offset: 1, total: 1,
                results: [{
                      comics: { items: [] } as any,
                      description: 'description' + id,
                      events: [] as any,
                      id: id,
                      modified: now,
                      name: 'charName' + id,
                      resourceURI: '',
                      series: [] as any,
                      stories: [] as any,
                      thumbnail: { extension: 'jpg', path: 'image' + id },
                      urls: []
                }]
              }
            })
          }
        }
      ],
    });
  });

  it('should be created', inject([FavoritesResolver], (resolver: FavoritesResolver) => {
    expect(resolver).toBeTruthy();
  }));

  it('should resolve favorites list', async(inject([FavoritesResolver], (resolver: FavoritesResolver) => {
    const heroesService = TestBed.get(HeroesService);
    const heroesServiceGetFavoritesSpy = spyOn(heroesService, 'getFavorites').and.callThrough();
    const heroesServiceGetHeroSpy = spyOn(heroesService, 'getHero').and.callThrough();

    resolver.resolve().subscribe(result => {
      expect(heroesServiceGetFavoritesSpy).toHaveBeenCalled();
      expect(heroesServiceGetHeroSpy).toHaveBeenCalledTimes(3);
      expect(heroesServiceGetHeroSpy).toHaveBeenCalledWith(1, false);
      expect(heroesServiceGetHeroSpy).toHaveBeenCalledWith(2, false);
      expect(heroesServiceGetHeroSpy).toHaveBeenCalledWith(3, false);
      expect(result).toEqual({
        attributionHTML: '', attributionText: '', copyright: '', etag: '',
        code: 200, status: 'OK', data: {
          count: 3, limit: 1, offset: 1, total: 3,
          results: '123'.split('').map(id => ({
                comics: { items: [] } as any,
                description: 'description' + id,
                events: [] as any,
                id: parseInt(id, 10),
                modified: now,
                name: 'charName' + id,
                resourceURI: '',
                series: [] as any,
                stories: [] as any,
                thumbnail: { extension: 'jpg', path: 'image' + id },
                urls: []
          }))
        }
      });
    });
  })));
});
