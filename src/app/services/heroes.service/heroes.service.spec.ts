import { TestBed, inject } from '@angular/core/testing';

import { HeroesService } from './heroes-service.service';

describe('HeroesServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroesService]
    });
  });

  it('should be created', inject([HeroesService], (service: HeroesService) => {
    expect(service).toBeTruthy();
  }));

  it('should fetch character list given limit and offset');

  it('should fetch character details');

  it('should fetch user favorites heroes');

  it('should set a hero as a favorite');
});
