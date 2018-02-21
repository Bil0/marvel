import { TestBed, inject } from '@angular/core/testing';

import { HeroesListResolver } from './heroes-list.resolver';

describe('HeroesListResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroesListResolver]
    });
  });

  it('should be created', inject([HeroesListResolver], (service: HeroesListResolver) => {
    expect(service).toBeTruthy();
  }));
});
