import { TestBed, inject, async } from '@angular/core/testing';
import { of } from 'rxjs/observable/of';

import { HeroResolver } from './hero.resolver';
import { HeroesService } from 'app/services/heroes.service/heroes.service';

describe('HeroResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HeroResolver,
        {
          provide: HeroesService,
          useValue: {
            getHero: (id: number) => of({})
          }
        }
      ]
    });
  });

  it('should be created', inject([HeroResolver], (resolver: HeroResolver) => {
    expect(resolver).toBeTruthy();
  }));

  it('should resolve hero details', async(inject([HeroResolver], (resolver: HeroResolver) => {
    const heroesService = TestBed.get(HeroesService);
    const heroesServiceGetHeroSpy = spyOn(heroesService, 'getHero').and.callThrough();

    resolver.resolve({ params: { id: '1' } } as any).subscribe(result => {
      expect(heroesServiceGetHeroSpy).toHaveBeenCalledWith(1);
    });
  })));
});
