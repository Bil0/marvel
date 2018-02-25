import { TestBed, inject, async } from '@angular/core/testing';
import { of } from 'rxjs/observable/of';

import { HeroesListResolver, ENTRIES_PER_PAGE } from './heroes-list.resolver';
import { HeroesService } from 'app/services/heroes.service/heroes.service';

describe('HeroesListResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HeroesListResolver,
        { provide: ENTRIES_PER_PAGE, useValue: 20 },
        {
          provide: HeroesService,
          useValue: {
            getHeroesList: (id: number) => of({})
          }
        }
      ]
    });
  });

  it('should be created', inject([HeroesListResolver], (resolver: HeroesListResolver) => {
    expect(resolver).toBeTruthy();
  }));

  it(
    'should resolve heroes list from router params',
    async(inject([ HeroesListResolver], (resolver: HeroesListResolver) => {
      const heroesService = TestBed.get(HeroesService);
      const heroesServiceGetHeroesSpy = spyOn(heroesService, 'getHeroesList').and.callThrough();

      resolver.resolve({ params: { page: '3' } } as any).subscribe(result => {
        expect(heroesServiceGetHeroesSpy).toHaveBeenCalledWith(20, 40);
      });

      resolver.resolve({ params: {} } as any).subscribe(result => {
        expect(heroesServiceGetHeroesSpy).toHaveBeenCalledWith(20, 0);
      });
    }))
  );
});
