import { TestBed, inject } from '@angular/core/testing';

import { HeroResolver } from './hero.resolver';

describe('HeroResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroResolver]
    });
  });

  it('should be created', inject([HeroResolver], (service: HeroResolver) => {
    expect(service).toBeTruthy();
  }));
});
