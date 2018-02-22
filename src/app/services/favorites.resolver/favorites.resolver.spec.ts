import { TestBed, inject } from '@angular/core/testing';

import { FavoritesResolver } from './favorites.resolver';

describe('FavoritesResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FavoritesResolver]
    });
  });

  it('should be created', inject([FavoritesResolver], (resolver: FavoritesResolver) => {
    expect(resolver).toBeTruthy();
  }));
});
